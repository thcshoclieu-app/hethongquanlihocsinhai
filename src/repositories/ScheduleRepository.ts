import { BaseRepository } from './BaseRepository';
import { ClassSchedule } from '@/types';

class ScheduleRepositoryClass extends BaseRepository<ClassSchedule> {
  constructor() {
    super('classSchedules', 'scheduleId');
  }
}

export const ScheduleRepository = new ScheduleRepositoryClass();
