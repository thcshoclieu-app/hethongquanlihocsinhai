import { BaseRepository } from './BaseRepository';
import { Student } from '../types';
import { COLLECTIONS } from '../constants/collections';

class StudentRepositoryClass extends BaseRepository<Student> {
  constructor() {
    super(COLLECTIONS.STUDENTS, 'studentId');
  }
}

export const StudentRepository = new StudentRepositoryClass();
