import { BaseRepository } from './BaseRepository';
import { Teacher } from '../types';
import { COLLECTIONS } from '../constants/collections';

class TeacherRepositoryClass extends BaseRepository<Teacher> {
  constructor() {
    super(COLLECTIONS.TEACHERS, 'teacherId');
  }
}

export const TeacherRepository = new TeacherRepositoryClass();
