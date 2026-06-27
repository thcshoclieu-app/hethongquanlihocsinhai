import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuthStore } from '../store/auth';
import { AuthRepository } from '../repositories/AuthRepository';

export function useAuthInitializer() {
  const { setFirebaseUser, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          const profile = await AuthRepository.getUserProfile(firebaseUser.uid);
          setUser(profile);
        } catch (error) {
          console.error("Failed to fetch user profile", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setFirebaseUser, setUser, setLoading]);
}
