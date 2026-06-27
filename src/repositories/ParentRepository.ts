import { Parent, Student, StudentParent } from '@/types';
import { BaseRepository } from '@/repositories/BaseRepository';
import { where } from 'firebase/firestore';

export class ParentRepository extends BaseRepository<Parent> {
  constructor() {
    super('parents', 'parentId');
  }
}

export class FamilyRepository extends BaseRepository<StudentParent> {
  constructor() {
    super('studentParents', 'id');
  }

  async getChildrenIds(parentId: string): Promise<string[]> {
    const records = await this.getAll([where('parentId', '==', parentId)]);
    return records.map(r => r.studentId);
  }

  async getParentIds(studentId: string): Promise<string[]> {
    const records = await this.getAll([where('studentId', '==', studentId)]);
    return records.map(r => r.parentId);
  }
}
