export class MatchingService {
  /**
   * Tính toán khoảng cách Euclidean giữa hai vector
   */
  static euclideanDistance(vecA: number[] | Float32Array, vecB: number[] | Float32Array): number {
    let sum = 0;
    for (let i = 0; i < vecA.length; i++) {
      const diff = vecA[i] - vecB[i];
      sum += diff * diff;
    }
    return Math.sqrt(sum);
  }

  /**
   * Tính toán Cosine Similarity giữa hai vector
   */
  static cosineSimilarity(vecA: number[] | Float32Array, vecB: number[] | Float32Array): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * Tìm người phù hợp nhất dựa trên khoảng cách Euclidean. 
   * face-api.js model được thiết kế với Euclidean distance.
   * Ngưỡng (threshold) thông thường là khoảng 0.6 (nhỏ hơn 0.6 là cùng một người).
   */
  static findBestMatch(
    embedding: number[] | Float32Array,
    database: { studentId: string; embedding: number[] | Float32Array }[],
    threshold: number = 0.55
  ): { studentId: string; distance: number; confidence: number } | null {
    if (!database || database.length === 0) return null;

    let bestMatch = null;
    let minDistance = Infinity;

    for (const record of database) {
      if (!record.embedding) continue;
      
      const distance = this.euclideanDistance(embedding, record.embedding);
      if (distance < minDistance) {
        minDistance = distance;
        bestMatch = record.studentId;
      }
    }

    if (bestMatch && minDistance <= threshold) {
      // Chuyển đổi distance sang confidence score (0 -> 100%)
      // Distance = 0 -> 100% confidence
      // Distance = threshold -> 50% confidence (hoặc tuỳ chỉnh)
      const confidence = Math.max(0, 1 - minDistance) * 100;
      
      return {
        studentId: bestMatch,
        distance: minDistance,
        confidence: Math.round(confidence * 100) / 100
      };
    }

    return null;
  }
}
