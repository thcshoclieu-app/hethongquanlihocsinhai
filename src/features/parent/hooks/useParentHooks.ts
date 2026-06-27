import { useState, useEffect } from 'react';
import { useParentStore } from '../store/parentStore';
import { FamilyService } from '../services/FamilyService';
import { ParentService } from '../services/ParentService';
import { useAuthStore } from '@/store';
import { Parent } from '@/types';

const familyService = new FamilyService();
const parentService = new ParentService();

export function useChildren() {
  const { user } = useAuthStore();
  const { childrenList, selectedStudentId, setChildren, setSelectedStudent } = useParentStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadChildren() {
      if (user?.uid && childrenList.length === 0) {
        setIsLoading(true);
        try {
          const children = await familyService.getChildrenByParent(user.uid);
          setChildren(children);
        } catch (error) {
          console.error("Failed to load children", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    loadChildren();
  }, [user, setChildren, childrenList.length]);

  const selectedChild = childrenList.find(c => c.studentId === selectedStudentId) || null;

  return { childrenList, selectedStudentId, selectedChild, setSelectedStudent, isLoading };
}

export function useParent() {
  const { user } = useAuthStore();
  const [parent, setParent] = useState<Parent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadParent() {
      if (user?.uid) {
        setIsLoading(true);
        try {
          const profile = await parentService.getParentProfile(user.uid);
          setParent(profile);
        } catch (error) {
          console.error("Failed to load parent profile", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    loadParent();
  }, [user]);

  return { parent, isLoading };
}
