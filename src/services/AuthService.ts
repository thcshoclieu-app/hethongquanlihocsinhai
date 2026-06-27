import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { AuthRepository } from '../repositories/AuthRepository';
import { ROLES } from '../constants/roles';

export class AuthService {
  static async setRememberMe(remember: boolean) {
    await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
  }

  static async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    
    // Check if user profile exists
    let profile = await AuthRepository.getUserProfile(user.uid);
    if (!profile) {
      profile = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Unknown User',
        photoURL: user.photoURL || '',
        role: ROLES.VIEWER, // Default role
        lastLogin: new Date().toISOString(),
        status: 'active',
      };
      await AuthRepository.createUserProfile(profile);
    } else {
      await AuthRepository.updateUserLoginTime(user.uid, new Date().toISOString());
    }
    
    return { firebaseUser: user, profile };
  }

  static async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const { user } = userCredential;
    
    let profile = await AuthRepository.getUserProfile(user.uid);
    if (!profile) {
      profile = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Unknown User',
        photoURL: user.photoURL || '',
        role: ROLES.VIEWER,
        lastLogin: new Date().toISOString(),
        status: 'active',
      };
      await AuthRepository.createUserProfile(profile);
    } else {
      await AuthRepository.updateUserLoginTime(user.uid, new Date().toISOString());
    }
    
    return { firebaseUser: user, profile };
  }

  static async logout() {
    await signOut(auth);
  }

  static async resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  }
}
