import { useState, useEffect, useRef, useCallback } from 'react';
import { useCamera } from './useCamera';
import { useAIProvider } from './useAIProvider';
import { FaceDetectionResult } from '../models/AITypes';

export type EnrollmentStep = 'CONSENT' | 'LOADING' | 'DETECTING' | 'COUNTDOWN' | 'CAPTURED' | 'QUALITY_CHECK' | 'SUCCESS' | 'ERROR';

export function useFaceEnrollment(onSuccess?: (embeddings: Float32Array[], quality: string) => void) {
  const [step, setStep] = useState<EnrollmentStep>('CONSENT');
  const { videoRef, startCamera, stopCamera, isReady: cameraReady, error: cameraError } = useCamera();
  const { init, detectFace, isInitialized, isError: aiError } = useAIProvider();
  
  const [countdown, setCountdown] = useState(3);
  const [photosCollected, setPhotosCollected] = useState<Float32Array[]>([]);
  const [currentQuality, setCurrentQuality] = useState<FaceDetectionResult['quality'] | null>(null);
  const [feedback, setFeedback] = useState<string>('Vui lòng đồng ý để bắt đầu');
  const [retryCount, setRetryCount] = useState(0);
  
  const requiredPhotos = 5;
  const loopRef = useRef<number>();

  useEffect(() => {
    if (cameraError) {
      setStep('ERROR');
      setFeedback('Lỗi camera: ' + cameraError);
    }
  }, [cameraError]);

  useEffect(() => {
    if (aiError) {
      setStep('ERROR');
      setFeedback('Lỗi tải AI: ' + aiError);
    }
  }, [aiError]);

  const agreeConsent = async () => {
    setStep('LOADING');
    setFeedback('Đang khởi động Camera và AI...');
    try {
      await startCamera();
      await init();
      setStep('DETECTING');
      setFeedback('Đưa khuôn mặt vào giữa khung hình');
    } catch (err) {
      setStep('ERROR');
    }
  };

  const captureFrame = useCallback(() => {
    if (!videoRef.current) return null;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(videoRef.current, 0, 0);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }, [videoRef]);

  const processFrame = useCallback(async () => {
    if (step !== 'DETECTING') return;
    
    const imageData = captureFrame();
    if (!imageData) {
      loopRef.current = requestAnimationFrame(processFrame);
      return;
    }

    try {
      const result = await detectFace(imageData);
      if (!result || !result.quality) {
        setFeedback('Không tìm thấy khuôn mặt');
        setCurrentQuality(null);
      } else {
        setCurrentQuality(result.quality);
        if (result.quality === 'Bad') {
          setFeedback(result.qualityFeedback[0] || 'Vui lòng điều chỉnh khuôn mặt');
        } else {
          setFeedback('Giữ yên...');
          setStep('COUNTDOWN');
          return; // stop detection loop while countdown
        }
      }
    } catch (err) {
      console.error(err);
    }

    loopRef.current = requestAnimationFrame(processFrame);
  }, [step, captureFrame, detectFace]);

  useEffect(() => {
    if (step === 'DETECTING') {
      loopRef.current = requestAnimationFrame(processFrame);
    }
    return () => {
      if (loopRef.current) cancelAnimationFrame(loopRef.current);
    };
  }, [step, processFrame]);

  // Countdown logic
  useEffect(() => {
    if (step === 'COUNTDOWN') {
      let count = 3;
      setCountdown(count);
      const interval = setInterval(async () => {
        count -= 1;
        if (count > 0) {
          setCountdown(count);
        } else {
          clearInterval(interval);
          // Capture
          const img = captureFrame();
          if (img) {
            const result = await detectFace(img);
            if (result && result.quality !== 'Bad' && result.embedding) {
              setPhotosCollected(prev => {
                const newPhotos = [...prev, result.embedding! as Float32Array];
                if (newPhotos.length >= requiredPhotos) {
                  setStep('SUCCESS');
                  onSuccess?.(newPhotos, result.quality);
                } else {
                  setStep('DETECTING');
                  setFeedback(`Đã chụp ${newPhotos.length}/${requiredPhotos}. Đổi góc mặt nhẹ...`);
                }
                return newPhotos;
              });
            } else {
              setFeedback('Ảnh chưa đạt, thử lại...');
              setRetryCount(r => r + 1);
              setTimeout(() => setStep('DETECTING'), 1500);
            }
          } else {
             setStep('DETECTING');
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, captureFrame, detectFace, onSuccess]);

  const retry = () => {
    setPhotosCollected([]);
    setRetryCount(0);
    setStep('DETECTING');
  };

  const cancel = () => {
    stopCamera();
    setStep('CONSENT');
  };

  return {
    videoRef,
    step,
    feedback,
    countdown,
    photosCollected,
    requiredPhotos,
    currentQuality,
    agreeConsent,
    retry,
    cancel
  };
}
