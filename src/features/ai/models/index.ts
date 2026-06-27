export interface FaceQualityMetrics {
  lighting: number; // 0-1
  blur: number; // 0-1, higher is less blur
  tilt: number; // up/down
  yaw: number; // left/right
  roll: number; // tilt head side
  isCentered: boolean;
  distanceOk: boolean;
  overall: 'Excellent' | 'Good' | 'Normal' | 'Bad';
  issues: string[];
}

export interface FaceDetectionResult {
  hasFace: boolean;
  box?: { x: number; y: number; width: number; height: number };
  landmarks?: { x: number; y: number }[];
  quality?: FaceQualityMetrics;
  embedding?: Float32Array;
}

export interface IAIProvider {
  init(modelsPath: string): Promise<void>;
  detectFace(imageData: ImageData): Promise<FaceDetectionResult | null>;
}

export interface FaceEmbeddingRecord {
  id: string;
  studentId: string;
  embedding: number[];
  version: number;
  createdAt: string;
  quality: 'Excellent' | 'Good' | 'Normal' | 'Bad';
  modelVersion: string;
  performedBy: string;
}
