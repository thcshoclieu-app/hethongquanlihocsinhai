import { Student } from '@/types';
import { FamilyRepository } from '@/repositories/ParentRepository';
import { StudentRepository } from '@/repositories/StudentRepository';

export class FamilyService {
  private familyRepo = new FamilyRepository();

  async getChildrenByParent(parentId: string): Promise<Student[]> {
    const studentIds = await this.familyRepo.getChildrenIds(parentId);
    if (studentIds.length === 0) return [];

    const students = await Promise.all(
      studentIds.map(id => StudentRepository.getById(id))
    );

    return students.filter((s): s is Student => s !== null);
  }
}

