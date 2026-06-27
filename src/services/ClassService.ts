import { Classroom, StudentTransferHistory } from '../types';
import { ClassroomRepository } from '../repositories/ClassroomRepository';
import { db } from '../lib/firebase';
import { doc, runTransaction, writeBatch, collection, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { COLLECTIONS } from '../constants/collections';

export class ClassService {
  static async getClasses(): Promise<Classroom[]> {
    return ClassroomRepository.getAll([orderBy('createdAt', 'desc')]);
  }

  static async getClass(id: string): Promise<Classroom | null> {
    return ClassroomRepository.getById(id);
  }

  static async createClass(data: Partial<Classroom>, currentUser: string = 'system'): Promise<string> {
    const classId = crypto.randomUUID();
    const now = new Date().toISOString();
    
    const newClass: Classroom = {
      ...data,
      classId,
      status: data.status || 'enrolling',
      studentCount: 0,
      createdAt: now,
      updatedAt: now,
    } as Classroom;

    const batch = writeBatch(db);
    batch.set(doc(db, COLLECTIONS.CLASSROOMS, classId), newClass);
    
    // Add audit log
    const logId = crypto.randomUUID();
    batch.set(doc(db, COLLECTIONS.LOGS, logId), {
      logId,
      action: 'CREATE_CLASS',
      user: currentUser,
      time: now,
      detail: `Created class ${newClass.className} (${newClass.classCode})`
    });

    await batch.commit();
    return classId;
  }

  static async updateClass(classId: string, data: Partial<Classroom>, currentUser: string = 'system'): Promise<void> {
    const now = new Date().toISOString();
    const batch = writeBatch(db);
    
    batch.update(doc(db, COLLECTIONS.CLASSROOMS, classId), {
      ...data,
      updatedAt: now,
    });

    const logId = crypto.randomUUID();
    batch.set(doc(db, COLLECTIONS.LOGS, logId), {
      logId,
      action: 'UPDATE_CLASS',
      user: currentUser,
      time: now,
      detail: `Updated class ${classId}`
    });

    await batch.commit();
  }

  static async deleteClass(classId: string, currentUser: string = 'system'): Promise<void> {
    // We do not hard delete, only archive
    await this.archiveClass(classId, currentUser);
  }

  static async archiveClass(classId: string, currentUser: string = 'system'): Promise<void> {
    const now = new Date().toISOString();
    const batch = writeBatch(db);
    
    batch.update(doc(db, COLLECTIONS.CLASSROOMS, classId), {
      status: 'archived',
      updatedAt: now,
    });

    const logId = crypto.randomUUID();
    batch.set(doc(db, COLLECTIONS.LOGS, logId), {
      logId,
      action: 'ARCHIVE_CLASS',
      user: currentUser,
      time: now,
      detail: `Archived class ${classId}`
    });

    await batch.commit();
  }

  static async restoreClass(classId: string, currentUser: string = 'system'): Promise<void> {
    const now = new Date().toISOString();
    const batch = writeBatch(db);
    
    batch.update(doc(db, COLLECTIONS.CLASSROOMS, classId), {
      status: 'active',
      updatedAt: now,
    });

    const logId = crypto.randomUUID();
    batch.set(doc(db, COLLECTIONS.LOGS, logId), {
      logId,
      action: 'RESTORE_CLASS',
      user: currentUser,
      time: now,
      detail: `Restored class ${classId}`
    });

    await batch.commit();
  }

  static async transferStudent(studentId: string, fromClassId: string, toClassId: string, reason: string, currentUser: string = 'system'): Promise<void> {
    const now = new Date().toISOString();
    const transferId = crypto.randomUUID();
    
    await runTransaction(db, async (transaction) => {
      const studentRef = doc(db, COLLECTIONS.STUDENTS, studentId);
      const fromClassRef = doc(db, COLLECTIONS.CLASSROOMS, fromClassId);
      const toClassRef = doc(db, COLLECTIONS.CLASSROOMS, toClassId);
      
      const [studentDoc, fromClassDoc, toClassDoc] = await Promise.all([
        transaction.get(studentRef),
        transaction.get(fromClassRef),
        transaction.get(toClassRef)
      ]);

      if (!studentDoc.exists() || !fromClassDoc.exists() || !toClassDoc.exists()) {
        throw new Error('Data not found');
      }

      const fromClassData = fromClassDoc.data() as Classroom;
      const toClassData = toClassDoc.data() as Classroom;

      if (toClassData.studentCount >= toClassData.maxCapacity) {
        throw new Error('Class is full');
      }

      // Update student classId
      transaction.update(studentRef, { classId: toClassId, updatedAt: now });

      // Update class counts
      transaction.update(fromClassRef, { studentCount: Math.max(0, fromClassData.studentCount - 1), updatedAt: now });
      transaction.update(toClassRef, { studentCount: toClassData.studentCount + 1, updatedAt: now });

      // Save transfer history
      const historyRef = doc(collection(db, 'studentTransferHistory'), transferId);
      transaction.set(historyRef, {
        transferId,
        studentId,
        fromClassId,
        toClassId,
        date: now,
        performedBy: currentUser,
        reason
      });

      // Audit log
      const logId = crypto.randomUUID();
      const logRef = doc(db, COLLECTIONS.LOGS, logId);
      transaction.set(logRef, {
        logId,
        action: 'TRANSFER_STUDENT',
        user: currentUser,
        time: now,
        detail: `Transferred student ${studentId} from ${fromClassId} to ${toClassId}`
      });
    });
  }
}
