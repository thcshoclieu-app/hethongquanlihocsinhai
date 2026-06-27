import { db } from '@/lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { FaceEmbeddingRecord } from '../models';
import { MatchingService } from './MatchingService';

export class RecognitionService {
  private static embeddingsDB: { studentId: string; embedding: number[] }[] = [];
  private static isLoaded = false;
  private static cooldowns: Map<string, number> = new Map();

  /**
   * Tải dữ liệu Face Embeddings từ Firestore để dùng cho so khớp
   */
  static async loadEmbeddings() {
    try {
      const q = query(collection(db, 'faceEmbeddings'));
      const snapshot = await getDocs(q);
      const dbEmbeddings: { studentId: string; embedding: number[] }[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data() as FaceEmbeddingRecord;
        if (data.embedding && data.studentId) {
          dbEmbeddings.push({
            studentId: data.studentId,
            embedding: data.embedding
          });
        }
      });
      
      this.embeddingsDB = dbEmbeddings;
      this.isLoaded = true;
      console.log(`Loaded ${dbEmbeddings.length} face embeddings.`);
    } catch (error) {
      console.error('Error loading face embeddings:', error);
      throw error;
    }
  }

  /**
   * So khớp embedding hiện tại với Database.
   * Cần kiểm tra thời gian cooldown (ví dụ: không nhận diện lại cùng 1 học sinh trong vòng 10 giây).
   */
  static recognizeFace(embedding: Float32Array | number[], threshold: number, cooldownSeconds: number = 30) {
    if (!this.isLoaded) {
      console.warn('Embeddings not loaded yet. Call loadEmbeddings() first.');
      return null;
    }

    const match = MatchingService.findBestMatch(embedding, this.embeddingsDB, threshold);
    
    if (match) {
      const now = Date.now();
      const lastRecognized = this.cooldowns.get(match.studentId);
      
      // Nếu vẫn trong thời gian cooldown
      if (lastRecognized && (now - lastRecognized) < cooldownSeconds * 1000) {
        return {
          ...match,
          isCooldown: true
        };
      }
      
      return {
        ...match,
        isCooldown: false
      };
    }

    return null;
  }

  static markRecognized(studentId: string) {
    this.cooldowns.set(studentId, Date.now());
  }

  static getLoadedCount() {
    return this.embeddingsDB.length;
  }
}
