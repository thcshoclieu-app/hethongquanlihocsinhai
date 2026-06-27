import { db } from '@/lib/firebase';
import { collection, doc, setDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { FaceEmbeddingRecord } from '../models';
import { COLLECTIONS } from '@/constants/collections';

export class FaceEnrollmentService {
  static async saveEmbeddings(
    studentId: string, 
    embeddings: Float32Array[], 
    performedBy: string,
    overallQuality: 'Excellent' | 'Good' | 'Normal' | 'Bad'
  ): Promise<void> {
    const now = new Date().toISOString();
    
    // Average embeddings or just store the best one. We will store the first one for simplicity,
    // or average them. For face-api, averaging descriptors of same person is common.
    const avgDescriptor = new Float32Array(128);
    embeddings.forEach(emb => {
      for (let i = 0; i < 128; i++) avgDescriptor[i] += emb[i];
    });
    for (let i = 0; i < 128; i++) avgDescriptor[i] /= embeddings.length;

    // Check version
    const q = query(collection(db, 'faceEmbeddings'), where('studentId', '==', studentId));
    const snapshot = await getDocs(q);
    const version = snapshot.size + 1;

    const recordId = crypto.randomUUID();
    const record: FaceEmbeddingRecord = {
      id: recordId,
      studentId,
      embedding: Array.from(avgDescriptor),
      version,
      createdAt: now,
      quality: overallQuality,
      modelVersion: 'face-api-ssd-v1',
      performedBy
    };

    await setDoc(doc(db, 'faceEmbeddings', recordId), record);

    // Update student flag
    const studentRef = doc(db, COLLECTIONS.STUDENTS, studentId);
    await updateDoc(studentRef, { faceRegistered: true, updatedAt: now });

    // Log
    const logRef = doc(db, COLLECTIONS.LOGS, crypto.randomUUID());
    await setDoc(logRef, {
      logId: logRef.id,
      action: 'ENROLL_FACE',
      user: performedBy,
      time: now,
      detail: `Enrolled face for student ${studentId} (Version ${version})`
    });
  }
}
