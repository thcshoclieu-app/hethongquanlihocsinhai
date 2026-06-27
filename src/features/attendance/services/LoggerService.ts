import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export type LogLevel = 'info' | 'warning' | 'error';
export type LogCategory = 'recognition' | 'matching' | 'attendance' | 'camera' | 'firebase';

export interface AppLog {
  level: LogLevel;
  category: LogCategory;
  message: string;
  metadata?: any;
  timestamp: Timestamp;
  userId?: string;
}

export class LoggerService {
  static async log(level: LogLevel, category: LogCategory, message: string, metadata?: any, userId?: string) {
    try {
      const logEntry: AppLog = {
        level,
        category,
        message,
        metadata: metadata || {},
        timestamp: Timestamp.now(),
        userId: userId || 'system',
      };
      
      // We don't await this to avoid blocking the main flow
      addDoc(collection(db, 'logs'), logEntry).catch(e => {
        console.warn('Failed to write log to Firestore', e);
      });
      
      if (level === 'error') {
        console.error(`[${category.toUpperCase()}] ${message}`, metadata);
      } else if (level === 'warning') {
        console.warn(`[${category.toUpperCase()}] ${message}`, metadata);
      } else {
        console.log(`[${category.toUpperCase()}] ${message}`, metadata);
      }
    } catch (err) {
      console.error('Logger failed', err);
    }
  }
}
