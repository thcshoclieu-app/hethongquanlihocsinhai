export interface Point {
  x: number;
  y: number;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type FaceQuality = 'Excellent' | 'Good' | 'Normal' | 'Bad';

export interface FaceDetectionResult {
  box: BoundingBox;
  score: number;
  pitch: number; // tilt up/down
  yaw: number; // turn left/right
  roll: number; // tilt head left/right
  embedding?: Float32Array | number[];
  quality: FaceQuality;
  qualityFeedback: string[];
}

export interface EnrollmentState {
  capturedImages: number;
  requiredImages: number;
  isEnrolling: boolean;
  status: 'idle' | 'checking' | 'countdown' | 'capturing' | 'success' | 'error';
  countdown: number;
  feedback: string[];
  embeddings: number[][]; // We store simple arrays
}
