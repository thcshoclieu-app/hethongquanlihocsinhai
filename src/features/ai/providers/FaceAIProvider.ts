import { FaceDetectionResult } from '../models/AITypes';

export class FaceAIProvider {
  private worker: Worker;
  private initialized = false;
  private resolveInit?: () => void;
  private resolveDetect?: (result: FaceDetectionResult | null) => void;

  constructor() {
    this.worker = new Worker(new URL('../workers/faceWorker.ts', import.meta.url), { type: 'module' });
    this.worker.onmessage = this.handleMessage.bind(this);
  }

  private handleMessage(e: MessageEvent) {
    const { type, result, error } = e.data;
    if (type === 'INITIALIZED') {
      this.initialized = true;
      if (this.resolveInit) {
        this.resolveInit();
        this.resolveInit = undefined;
      }
    } else if (type === 'ERROR') {
      console.error('AI Error:', error);
    } else if (type === 'DETECT_RESULT') {
      if (this.resolveDetect) {
        this.resolveDetect(result);
        this.resolveDetect = undefined;
      }
    }
  }

  public async initialize(): Promise<void> {
    if (this.initialized) return Promise.resolve();
    return new Promise((resolve) => {
      this.resolveInit = resolve;
      this.worker.postMessage({ type: 'INIT' });
    });
  }

  public async detectFace(imageData: ImageData, needEmbedding = false): Promise<FaceDetectionResult | null> {
    if (!this.initialized) throw new Error('AI not initialized');
    return new Promise((resolve) => {
      this.resolveDetect = resolve;
      // We send the imageData to worker. ImageData is transferable? No, but we can pass it.
      // Better to just pass it directly.
      this.worker.postMessage({ type: 'DETECT', imageData, needEmbedding });
    });
  }

  public terminate() {
    this.worker.terminate();
  }
}
