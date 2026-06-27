import { BaseRepository } from './BaseRepository';
import { Classroom } from '../types';
import { COLLECTIONS } from '../constants/collections';

class ClassroomRepositoryClass extends BaseRepository<Classroom> {
  constructor() {
    super(COLLECTIONS.CLASSROOMS, 'classId');
  }
}

export const ClassroomRepository = new ClassroomRepositoryClass();
