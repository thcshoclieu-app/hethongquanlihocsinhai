import { useEffect, useRef, useCallback, RefObject } from 'react';
import { RecognitionState } from './useRecognition';

export function useAutoCapture(
  videoRef: RefObject<HTMLVideoElement>,
  state: RecognitionState,
  processFrame: (imageData: ImageData) => Promise<void>
) {
  const requestRef = useRef<number>();
  const isProcessingRef = useRef(false);

  const loop = useCallback(async () => {
    if (state === 'MATCHED' || state === 'ERROR' || state === 'LOADING_MODEL' || state === 'LOADING_DATA') {
      // Dừng vòng lặp nếu không trong trạng thái cần quét
      requestRef.current = requestAnimationFrame(loop);
      return;
    }

    if (!isProcessingRef.current && videoRef.current && videoRef.current.readyState === 4) {
      isProcessingRef.current = true;
      try {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          await processFrame(imageData);
        }
      } catch (err) {
        console.error('Frame capture error:', err);
      } finally {
        isProcessingRef.current = false;
      }
    }
    requestRef.current = requestAnimationFrame(loop);
  }, [state, videoRef, processFrame]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(loop);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [loop]);
}
