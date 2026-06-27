import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCamera } from '@/features/ai/hooks/useCamera';
import { useRecognition } from '../hooks/useRecognition';
import { useAutoCapture } from '../hooks/useAutoCapture';
import { useAttendanceSettings } from '../hooks/useAttendanceSettings';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { X, Settings, Camera as CameraIcon } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { COLLECTIONS } from '@/constants/collections';
import { AttendanceSettingsPanel } from './AttendanceSettingsPanel';

interface AttendanceCameraProps {
  classId: string;
  onClose: () => void;
}

export function AttendanceCamera({ classId, onClose }: AttendanceCameraProps) {
  const { settings, isLoaded } = useAttendanceSettings();
  const { videoRef, startCamera, stopCamera, error: camError } = useCamera();
  const { state, initialize, processFrame, feedback, lastMatch, errorMsg, countdown } = useRecognition(settings, classId);
  const [studentInfo, setStudentInfo] = useState<{name: string, classId: string} | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  useEffect(() => {
    if (isLoaded) {
      initialize();
    }
  }, [isLoaded, initialize]);

  useAutoCapture(videoRef, state, processFrame);

  // Load student info when matched
  useEffect(() => {
    if (lastMatch && lastMatch.studentId) {
      const loadStudentInfo = async () => {
        try {
          const docSnap = await getDoc(doc(db, COLLECTIONS.STUDENTS, lastMatch.studentId));
          if (docSnap.exists()) {
            const data = docSnap.data();
            setStudentInfo({
              name: data.fullName,
              classId: data.classId
            });
          }
        } catch (e) {
          console.error('Lỗi lấy thông tin học sinh', e);
        }
      };
      loadStudentInfo();
    } else {
      setStudentInfo(null);
    }
  }, [lastMatch]);

  if (!isLoaded || state === 'LOADING_MODEL' || state === 'LOADING_DATA') {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center text-white">
        <Spinner />
        <p className="mt-4 text-lg font-medium animate-pulse">{feedback}</p>
      </div>
    );
  }

  if (camError || state === 'ERROR') {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center text-white p-6 text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
          <X className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold mb-2">Đã xảy ra lỗi</h2>
        <p className="text-slate-400 mb-6">{camError || errorMsg}</p>
        <Button onClick={onClose} variant="outline">Đóng Camera</Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
        <div className="bg-black/50 backdrop-blur px-4 py-2 rounded-full pointer-events-auto">
          <span className="text-white font-medium flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${state === 'READY' || state === 'DETECTING' ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
            {state === 'READY' || state === 'DETECTING' ? 'Đang theo dõi' : 'Đang xử lý'}
          </span>
        </div>
        <div className="flex gap-2 pointer-events-auto">
          <Button variant="outline" size="icon" onClick={() => setShowSettings(true)} className="rounded-full bg-black/50 backdrop-blur border-none text-white hover:bg-black/70">
            <Settings size={20} />
          </Button>
          <Button variant="outline" size="icon" onClick={onClose} className="rounded-full bg-black/50 backdrop-blur border-none text-white hover:bg-red-500/80">
            <X size={20} />
          </Button>
        </div>
      </div>

      {showSettings && (
        <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
            <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => setShowSettings(false)}>
              <X size={20} />
            </Button>
            <AttendanceSettingsPanel />
          </div>
        </div>
      )}

      {/* Status Dashboard overlay */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-md rounded-lg p-3 text-xs text-slate-300 flex flex-col gap-1 border border-white/10 font-mono shadow-lg">
          <div className="flex justify-between gap-6">
            <span>Camera:</span>
            <span className="text-green-400">ACTIVE</span>
          </div>
          <div className="flex justify-between gap-6">
            <span>AI Status:</span>
            <span className={state === 'ERROR' ? 'text-red-400' : 'text-blue-400'}>{state}</span>
          </div>
          <div className="flex justify-between gap-6">
            <span>Model:</span>
            <span>SSD_MobileNetV1</span>
          </div>
          <div className="flex justify-between gap-6">
            <span>Confidence Threshold:</span>
            <span>{settings.confidenceThreshold}%</span>
          </div>
          <div className="flex justify-between gap-6">
            <span>Network:</span>
            <span className={navigator.onLine ? 'text-green-400' : 'text-amber-400'}>{navigator.onLine ? 'ONLINE' : 'OFFLINE'}</span>
          </div>
        </div>
      </div>
      
      <div className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center">
        <video 
          ref={videoRef} 
          className={`absolute min-w-full min-h-full object-cover transition-transform ${settings.mirrorCamera ? 'scale-x-[1]' : 'scale-x-[-1]'}`} 
          playsInline 
          muted 
        />
        
        {/* Overlay Khung nhận diện */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
           <motion.div 
             animate={{
                scale: state === 'MATCHED' ? 1.1 : state === 'COUNTDOWN' ? 1.05 : 1,
                borderColor: state === 'MATCHED' ? 'rgb(34 197 94)' : state === 'COUNTDOWN' ? 'rgb(59 130 246)' : 'rgba(255, 255, 255, 0.2)'
             }}
             className="w-64 h-64 sm:w-96 sm:h-96 rounded-full border-4 border-dashed relative flex items-center justify-center bg-transparent transition-colors"
           >
              {/* Scan line effect */}
              {state === 'DETECTING' && (
                <motion.div 
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.8)]"
                />
              )}

              <AnimatePresence>
                {state === 'COUNTDOWN' && (
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    className="absolute text-7xl font-bold text-white drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                  >
                    {countdown}
                  </motion.div>
                )}
              </AnimatePresence>
           </motion.div>
        </div>

        {/* Feedback text */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none w-full px-4">
          <AnimatePresence mode="wait">
            {state === 'MATCHED' ? (
              <motion.div 
                key="matched"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-green-600/90 backdrop-blur-md text-white p-6 rounded-2xl shadow-2xl inline-block"
              >
                 <h3 className="text-2xl font-bold mb-1">Xin chào, {studentInfo?.name || lastMatch?.studentId}</h3>
                 <p className="text-green-100 mb-2">Điểm danh thành công lúc {new Date().toLocaleTimeString('vi-VN')}</p>
                 <div className="flex justify-center gap-4 text-sm font-medium bg-green-900/40 py-2 px-4 rounded-lg">
                    <span>Độ tin cậy: {lastMatch?.confidence}%</span>
                 </div>
              </motion.div>
            ) : (
              <motion.div 
                key="feedback"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-black/60 backdrop-blur-sm text-white px-6 py-3 rounded-full inline-block font-medium text-lg"
              >
                 {feedback}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
