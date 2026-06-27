import { TeacherRepository } from '../repositories/TeacherRepository';
import { Teacher } from '../types';

export class TeacherService {
  static async getTeachers(): Promise<Teacher[]> {
    return TeacherRepository.getAll();
  }

  static async getTeacher(id: string): Promise<Teacher | null> {
    return TeacherRepository.getById(id);
  }

  static async createTeacher(data: Partial<Teacher>): Promise<void> {
    const id = data.teacherId || crypto.randomUUID();
    await TeacherRepository.create(id, { ...data, teacherId: id, createdAt: new Date().toISOString() });
  }

  static async updateTeacher(id: string, data: Partial<Teacher>): Promise<void> {
    await TeacherRepository.update(id, { ...data, updatedAt: new Date().toISOString() });
  }

  static async deleteTeacher(id: string): Promise<void> {
    await TeacherRepository.delete(id);
  }
}
