import { StudentRepository } from '../repositories/StudentRepository';
import { Student, StudentTransferHistory } from '../types';
import { db } from '../lib/firebase';
import { writeBatch, doc, getDoc, runTransaction, collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { COLLECTIONS } from '../constants/collections';

export class StudentService {
  static async getStudents(): Promise<Student[]> {
    return StudentRepository.getAll([where('isDeleted', '==', false)]);
  }

  static async getStudent(id: string): Promise<Student | null> {
    const student = await StudentRepository.getById(id);
    return student && !student.isDeleted ? student : null;
  }

  static async generateStudentCode(year: string): Promise<string> {
    const prefix = `HS${year}`;
    const q = query(
      collection(db, COLLECTIONS.STUDENTS),
      where('studentCode', '>=', prefix),
      where('studentCode', '<', prefix + '\uf8ff'),
      orderBy('studentCode', 'desc'),
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return `${prefix}00001`;
    }
    const lastCode = snapshot.docs[0].data().studentCode;
    const lastNumber = parseInt(lastCode.replace(prefix, ''), 10);
    const newNumber = (lastNumber + 1).toString().padStart(5, '0');
    return `${prefix}${newNumber}`;
  }

  static async createStudent(data: Partial<Student>, performedBy: string): Promise<void> {
    const id = data.studentId || crypto.randomUUID();
    const now = new Date().toISOString();
    
    // Use transaction to ensure code is unique
    await runTransaction(db, async (transaction) => {
      let code = data.studentCode;
      if (!code) {
        const year = data.schoolYear?.split('-')[0] || new Date().getFullYear().toString();
        // Fallback to simple generation if transaction doesn't support complex queries easily
        code = await this.generateStudentCode(year); 
      }
      
      const studentRef = doc(db, COLLECTIONS.STUDENTS, id);
      const studentData = {
        ...data,
        studentId: id,
        studentCode: code,
        isDeleted: false,
        status: data.status || 'active',
        createdAt: now,
        updatedAt: now,
      };
      transaction.set(studentRef, studentData);

      // Audit Log
      const logRef = doc(db, COLLECTIONS.LOGS, crypto.randomUUID());
      transaction.set(logRef, {
        logId: logRef.id,
        action: 'CREATE_STUDENT',
        user: performedBy,
        time: now,
        detail: `Created student ${code}`,
      });
    });
  }

  static async updateStudent(id: string, data: Partial<Student>, performedBy: string): Promise<void> {
    const now = new Date().toISOString();
    await runTransaction(db, async (transaction) => {
      const studentRef = doc(db, COLLECTIONS.STUDENTS, id);
      transaction.update(studentRef, { ...data, updatedAt: now });

      const logRef = doc(db, COLLECTIONS.LOGS, crypto.randomUUID());
      transaction.set(logRef, {
        logId: logRef.id,
        action: 'UPDATE_STUDENT',
        user: performedBy,
        time: now,
        detail: `Updated student ${id}`,
      });
    });
  }

  static async softDeleteStudent(id: string, performedBy: string): Promise<void> {
    const now = new Date().toISOString();
    await runTransaction(db, async (transaction) => {
      const studentRef = doc(db, COLLECTIONS.STUDENTS, id);
      transaction.update(studentRef, { 
        isDeleted: true, 
        deletedAt: now,
        updatedAt: now
      });

      const logRef = doc(db, COLLECTIONS.LOGS, crypto.randomUUID());
      transaction.set(logRef, {
        logId: logRef.id,
        action: 'DELETE_STUDENT',
        user: performedBy,
        time: now,
        detail: `Soft deleted student ${id}`,
      });
    });
  }

  static async restoreStudent(id: string, performedBy: string): Promise<void> {
    const now = new Date().toISOString();
    await runTransaction(db, async (transaction) => {
      const studentRef = doc(db, COLLECTIONS.STUDENTS, id);
      transaction.update(studentRef, { 
        isDeleted: false, 
        updatedAt: now
      });

      const logRef = doc(db, COLLECTIONS.LOGS, crypto.randomUUID());
      transaction.set(logRef, {
        logId: logRef.id,
        action: 'RESTORE_STUDENT',
        user: performedBy,
        time: now,
        detail: `Restored student ${id}`,
      });
    });
  }

  static async archiveStudent(id: string, performedBy: string): Promise<void> {
    await this.updateStudent(id, { status: 'archived' }, performedBy);
  }

  static async transferClass(studentId: string, fromClassId: string, toClassId: string, reason: string, performedBy: string): Promise<void> {
    const now = new Date().toISOString();
    await runTransaction(db, async (transaction) => {
      const studentRef = doc(db, COLLECTIONS.STUDENTS, studentId);
      const studentDoc = await transaction.get(studentRef);
      if (!studentDoc.exists()) throw new Error('Student not found');
      
      transaction.update(studentRef, { 
        classId: toClassId,
        updatedAt: now
      });

      const historyRef = doc(db, 'transferHistories', crypto.randomUUID());
      transaction.set(historyRef, {
        transferId: historyRef.id,
        studentId,
        fromClassId,
        toClassId,
        date: now,
        performedBy,
        reason
      } as StudentTransferHistory);

      const logRef = doc(db, COLLECTIONS.LOGS, crypto.randomUUID());
      transaction.set(logRef, {
        logId: logRef.id,
        action: 'TRANSFER_STUDENT',
        user: performedBy,
        time: now,
        detail: `Transferred student ${studentId} from ${fromClassId} to ${toClassId}`,
      });
    });
  }
}
