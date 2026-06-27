import { BaseRepository } from './BaseRepository';
import { ClassSession } from '@/types';
import { query, where, getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';

class SessionRepositoryClass extends BaseRepository<ClassSession> {
  constructor() {
    super('classSessions', 'sessionId');
  }

  async getSessionsBetween(startDate: Date, endDate: Date): Promise<ClassSession[]> {
    const q = query(
      collection(db, 'classSessions'),
      where('date', '>=', startDate.toISOString().split('T')[0]),
      where('date', '<=', endDate.toISOString().split('T')[0])
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ sessionId: doc.id, ...doc.data() } as ClassSession)
    );
  }
}

export const SessionRepository = new SessionRepositoryClass();
