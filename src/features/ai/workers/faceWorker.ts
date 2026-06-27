import * as faceapi from '@vladmandic/face-api';
import { FaceDetectionResult, FaceQuality } from '../models/AITypes';

let isInitialized = false;
let isInitializing = false;

// We will load models from unpkg / jsdelivr
const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';

async function initialize() {
  if (isInitialized) return;
  if (isInitializing) {
    // Wait until initialized
    while (isInitializing) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return;
  }
  isInitializing = true;
  try {
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    isInitialized = true;
    self.postMessage({ type: 'INITIALIZED' });
  } catch (error) {
    self.postMessage({ type: 'ERROR', error: 'Failed to load AI models' });
  } finally {
    isInitializing = false;
  }
}

function evaluateQuality(detection: any): { quality: FaceQuality; feedback: string[], pitch: number, yaw: number, roll: number } {
  const landmarks = detection.landmarks;
  const positions = landmarks.positions;
  
  // Basic heuristic for head pose (yaw, pitch, roll) from 68 points
  // 30 is nose tip, 27 is between eyes, 8 is chin
  // For roll, we can compare eyes
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();
  const dx = rightEye[0].x - leftEye[0].x;
  const dy = rightEye[0].y - leftEye[0].y;
  const roll = Math.atan2(dy, dx) * (180 / Math.PI);
  
  // Very simplified yaw and pitch estimation based on bounding box and nose
  const noseTip = positions[30];
  const box = detection.detection.box;
  
  const relNX = (noseTip.x - box.x) / box.width;
  const relNY = (noseTip.y - box.y) / box.height;
  
  // Normal centered nose is around x:0.5, y:0.5~0.6
  const yaw = (relNX - 0.5) * 100; // roughly -50 to 50
  const pitch = (relNY - 0.55) * 100;
  
  let quality: FaceQuality = 'Excellent';
  const feedback: string[] = [];
  
  if (detection.detection.score < 0.6) {
    quality = 'Bad';
    feedback.push('Khuôn mặt bị mờ hoặc không rõ');
  }
  
  if (Math.abs(yaw) > 15) {
    if (quality === 'Excellent') quality = 'Good';
    if (Math.abs(yaw) > 25) {
      quality = 'Bad';
      feedback.push('Quay mặt quá nhiều');
    }
  }
  
  if (Math.abs(pitch) > 15) {
    if (quality === 'Excellent') quality = 'Good';
    if (Math.abs(pitch) > 25) {
      quality = 'Bad';
      feedback.push('Cúi/Ngẩng quá nhiều');
    }
  }
  
  if (Math.abs(roll) > 15) {
    if (quality === 'Excellent') quality = 'Normal';
    if (Math.abs(roll) > 25) {
      quality = 'Bad';
      feedback.push('Đầu nghiêng quá mức');
    }
  }
  
  if (box.width < 100 || box.height < 100) {
    quality = 'Bad';
    feedback.push('Khuôn mặt quá xa');
  }
  
  if (feedback.length === 0) {
    feedback.push('Góc mặt tốt');
  }
  
  return { quality, feedback, pitch, yaw, roll };
}

self.onmessage = async (e: MessageEvent) => {
  const { type, imageData, needEmbedding } = e.data;
  
  if (type === 'INIT') {
    await initialize();
  }
  
  if (type === 'DETECT') {
    if (!isInitialized) return;
    
    try {
      // In web worker, faceapi needs a canvas or tf.tensor. We can pass ImageData to tf.browser.fromPixels directly.
      // face-api.js handles ImageData automatically when using node or if we monkey patch env
      
      // Let's create a tensor from ImageData
      const tensor = faceapi.tf.browser.fromPixels(imageData);
      
      let task = faceapi.detectSingleFace(tensor as any, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
      if (needEmbedding) {
        task = task.withFaceDescriptor() as any;
      }
      
      const detection = await task;
      
      tensor.dispose();
      
      if (!detection) {
        self.postMessage({ type: 'DETECT_RESULT', result: null });
        return;
      }
      
      const { quality, feedback, pitch, yaw, roll } = evaluateQuality(detection);
      
      const result: FaceDetectionResult = {
        box: {
          x: detection.detection.box.x,
          y: detection.detection.box.y,
          width: detection.detection.box.width,
          height: detection.detection.box.height
        },
        score: detection.detection.score,
        pitch,
        yaw,
        roll,
        quality,
        qualityFeedback: feedback,
        embedding: needEmbedding && 'descriptor' in detection ? Array.from((detection as any).descriptor) : undefined
      };
      
      self.postMessage({ type: 'DETECT_RESULT', result });
      
    } catch (error) {
      console.error("Detect error", error);
      self.postMessage({ type: 'DETECT_RESULT', result: null });
    }
  }
};
