import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Student } from '@/types';

interface ParentState {
  childrenList: Student[];
  selectedStudentId: string | null;
  setChildren: (children: Student[]) => void;
  setSelectedStudent: (studentId: string) => void;
  clearParentState: () => void;
}

export const useParentStore = create<ParentState>()(
  persist(
    (set) => ({
      childrenList: [],
      selectedStudentId: null,
      setChildren: (childrenList) => set({ childrenList, selectedStudentId: childrenList.length > 0 ? childrenList[0].studentId : null }),
      setSelectedStudent: (selectedStudentId) => set({ selectedStudentId }),
      clearParentState: () => set({ childrenList: [], selectedStudentId: null }),
    }),
    {
      name: 'parent-storage',
    }
  )
);
