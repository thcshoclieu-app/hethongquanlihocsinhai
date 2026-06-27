import { useState, useCallback, useEffect, useRef } from 'react';
import { useAIProvider } from '@/features/ai/hooks/useAIProvider';
import { FaceDetectionResult } from '@/features/ai/models/AITypes';
import { RecognitionService } from '@/features/ai/services/RecognitionService';
import { AutoAttendanceService } from '../services/AutoAttendanceService';
import { useAuthStore } from '@/store';
import { LoggerService } from '../services/LoggerService';

export type RecognitionState = 'IDLE' | 'LOADING_MODEL' | 'LOADING_DATA' | 'READY' | 'DETECTING' | 'COUNTDOWN' | 'MATCHED' | 'ERROR';

export function useRecognition(settings: any, currentClassId: string) {
  const { init, detectFace, isInitialized, isError: aiError } = useAIProvider();
  const [state, setState] = useState<RecognitionState>('IDLE');
  const [feedback, setFeedback] = useState<string>('Sẵn sàng');
  const [lastMatch, setLastMatch] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(0);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const targetEmbedding = useRef<Float32Array | null>(null);
  const { user } = useAuthStore();
  
  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (settings.soundEnabled) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, [settings.soundEnabled]);

  const playBeep = useCallback((type: 'success' | 'error') => {
    if (!settings.soundEnabled || !audioContext.current) return;
    try {
      const osc = audioContext.current.createOscillator();
      const gainNode = audioContext.current.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioContext.current.destination);
      
      if (type === 'success') {
        osc.frequency.value = 880; // A5
        osc.type = 'sine';
        gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);
        osc.start();
        osc.stop(audioContext.current.currentTime + 0.15);
      } else {
        osc.frequency.value = 300;
        osc.type = 'square';
        gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);
        osc.start();
        osc.stop(audioContext.current.currentTime + 0.3);
      }
    } catch (e) {
      console.warn('Audio playback failed', e);
    }
  }, [settings.soundEnabled]);

  const initialize = useCallback(async () => {
    setState('LOADING_MODEL');
    setFeedback('Đang tải mô hình AI...');
    try {
      await init();
      setState('LOADING_DATA');
      setFeedback('Đang tải dữ liệu nhận diện...');
      await RecognitionService.loadEmbeddings();
      setState('READY');
      setFeedback('Sẵn sàng quét khuôn mặt');
    } catch (err: any) {
      setState('ERROR');
      setErrorMsg(err.message || 'Lỗi khởi tạo');
      setFeedback('Khởi tạo thất bại');
      LoggerService.log('error', 'recognition', 'Failed to initialize AI', { error: err.message }, user?.uid);
    }
  }, [init]);

  const performMatch = useCallback(async (embedding: Float32Array) => {
    const startTime = performance.now();
    const threshold = 1 - (settings.confidenceThreshold / 100);
    const match = RecognitionService.recognizeFace(embedding, threshold, settings.cooldownSeconds);
    const endTime = performance.now();
    const recognitionTime = endTime - startTime;
    
    if (match) {
      if (match.isCooldown) {
        setFeedback('Vui lòng chờ một lát...');
        setState('READY');
        return;
      }
      
      setState('MATCHED');
      setLastMatch(match);
      RecognitionService.markRecognized(match.studentId);
      
      LoggerService.log('info', 'matching', 'Face matched successfully', {
        studentId: match.studentId,
        confidence: match.confidence,
        recognitionTimeMs: recognitionTime
      }, user?.uid);

      const now = new Date();
      const attResult = await AutoAttendanceService.recordAttendance({
        studentId: match.studentId,
        classId: currentClassId || 'unknown',
        teacherId: user?.uid || 'system',
        date: now.toISOString().split('T')[0],
        time: now.toTimeString().split(' ')[0],
        status: 'present',
        confidence: match.confidence,
        device: navigator.userAgent
      });

      if (attResult.success && !attResult.duplicate) {
        playBeep('success');
        setFeedback(`Điểm danh thành công`);
        LoggerService.log('info', 'attendance', 'Attendance recorded', { studentId: match.studentId }, user?.uid);
      } else if (attResult.duplicate) {
        playBeep('error');
        setFeedback('Học sinh đã điểm danh hôm nay');
        LoggerService.log('info', 'attendance', 'Duplicate attendance rejected', { studentId: match.studentId }, user?.uid);
      } else {
        LoggerService.log('error', 'attendance', 'Failed to record attendance', { error: attResult.message }, user?.uid);
      }

      setTimeout(() => {
        setLastMatch(null);
        setState('READY');
        setFeedback('Tiếp tục quét...');
      }, 3000);
      
    } else {
      setFeedback('Không tìm thấy học sinh. Vui lòng thử lại.');
      setState('READY');
      playBeep('error');
      LoggerService.log('warning', 'matching', 'No match found for embedding', { recognitionTimeMs: recognitionTime }, user?.uid);
      setTimeout(() => {
        setFeedback('Tiếp tục quét...');
      }, 2000);
    }
  }, [settings, currentClassId, user, playBeep]);

  const processFrame = useCallback(async (imageData: ImageData) => {
    if (state !== 'READY' && state !== 'DETECTING') return;
    
    setState('DETECTING');
    
    try {
      const result = await detectFace(imageData);
      if (!result) {
        setFeedback('Đưa khuôn mặt vào khung hình');
        return;
      }
      
      if (result.quality === 'Bad') {
        setFeedback(result.qualityFeedback[0] || 'Vui lòng chỉnh lại tư thế');
        return;
      }

      if (result.embedding) {
        setState('COUNTDOWN');
        setCountdown(settings.countdown);
        
        let currentCount = settings.countdown;
        setFeedback(`Giữ yên: ${currentCount}`);
        
        countdownRef.current = setInterval(() => {
          currentCount -= 1;
          if (currentCount > 0) {
            setCountdown(currentCount);
            setFeedback(`Giữ yên: ${currentCount}`);
          } else {
            clearInterval(countdownRef.current!);
            setFeedback('Đang phân tích...');
            performMatch(result.embedding as Float32Array);
          }
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setState('READY');
    }
  }, [state, detectFace, settings, performMatch]);

  return { state, initialize, processFrame, feedback, lastMatch, errorMsg, countdown };
}
