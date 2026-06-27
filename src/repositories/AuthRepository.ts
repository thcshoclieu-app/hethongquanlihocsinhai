import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User } from '../types';
import { COLLECTIONS } from '../constants/collections';

export class AuthRepository {
  static async getUserProfile(uid: string): Promise<User | null> {
    const docRef = doc(db, COLLECTIONS.USERS, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { uid: docSnap.id, ...docSnap.data() } as User;
    }
    return null;
  }

  static async createUserProfile(user: User): Promise<void> {
    const docRef = doc(db, COLLECTIONS.USERS, user.uid);
    await setDoc(docRef, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: user.role,
      lastLogin: user.lastLogin,
      status: user.status,
    });
  }

  static async updateUserLoginTime(uid: string, lastLogin: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.USERS, uid);
    await updateDoc(docRef, { lastLogin });
  }
}
