import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useFaceEnrollment } from '../hooks/useFaceEnrollment';
import { FaceFrame, FaceGuide, FaceProgress, FaceCountdown } from './FaceUIComponents';
import { FaceEnrollmentService } from '../services/FaceEnrollmentService';
import { Spinner } from '@/components/ui/spinner';
import { CheckCircle, AlertTriangle, XCircle, Camera } from 'lucide-react';
import { useAuthStore } from '@/store';
import { motion } from 'motion/react';

interface FaceEnrollmentDialogProps {
  studentId: string;
  studentName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccessCallback?: () => void;
}

export function FaceEnrollmentDialog({ studentId, studentName, open, onOpenChange, onSuccessCallback }: FaceEnrollmentDialogProps) {
  const { user } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSuccess = async (embeddings: Float32Array[], quality: string) => {
    setIsSaving(true);
    try {
      await FaceEnrollmentService.saveEmbeddings(
        studentId, 
        embeddings, 
        user?.uid || 'system',
        quality as any
      );
      onSuccessCallback?.();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const {
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
  } = useFaceEnrollment(handleSuccess);

  const handleClose = () => {
    cancel();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!val) handleClose();
    }}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-black border-slate-800">
        
        {step === 'CONSENT' && (
          <div className="p-6 bg-white dark:bg-slate-950 h-full">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Camera className="text-blue-600" /> Đăng ký khuôn mặt AI
              </DialogTitle>
              <DialogDescription className="pt-4 text-base">
                Bạn đang chuẩn bị đăng ký khuôn mặt cho học sinh <strong>{studentName}</strong>.
              </DialogDescription>
            </DialogHeader>
            <div className="my-6 space-y-4">
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-900 dark:text-amber-500 flex items-center gap-2 mb-2">
                  <AlertTriangle size={18} /> Lưu ý quan trọng
                </h4>
                <ul className="list-disc list-inside text-sm text-amber-800 dark:text-amber-400 space-y-1">
                  <li>Xác nhận đã có sự đồng ý của phụ huynh/người giám hộ hợp pháp.</li>
                  <li>Khuôn mặt phải đủ sáng, không đeo khẩu trang, kính đen.</li>
                  <li>Dữ liệu sinh trắc học sẽ được mã hóa (Face Embedding) và bảo mật.</li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>Hủy bỏ</Button>
              <Button onClick={agreeConsent} className="gap-2">
                Tôi xác nhận và Bắt đầu
              </Button>
            </DialogFooter>
          </div>
        )}

        {(step === 'LOADING' || isSaving) && (
          <div className="h-[500px] flex flex-col items-center justify-center text-white space-y-4">
            <Spinner />
            <p className="text-lg font-medium">{isSaving ? 'Đang lưu dữ liệu...' : feedback}</p>
          </div>
        )}

        {(step === 'DETECTING' || step === 'COUNTDOWN' || step === 'CAPTURED' || step === 'QUALITY_CHECK') && (
          <div className="relative h-[500px] w-full bg-slate-900 overflow-hidden flex items-center justify-center">
            <video 
              ref={videoRef} 
              className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]" 
              playsInline 
              muted 
            />
            
            <FaceFrame quality={currentQuality} step={step} />
            <FaceGuide feedback={feedback} />
            
            {step === 'COUNTDOWN' && <FaceCountdown count={countdown} />}
            
            <FaceProgress current={photosCollected.length} total={requiredPhotos} />

            <Button 
              variant="destructive" 
              size="sm" 
              className="absolute top-4 right-4 z-40 opacity-50 hover:opacity-100 transition-opacity"
              onClick={handleClose}
            >
              Hủy
            </Button>
          </div>
        )}

        {step === 'SUCCESS' && !isSaving && (
          <div className="h-[500px] flex flex-col items-center justify-center bg-white dark:bg-slate-950 p-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <CheckCircle className="w-24 h-24 text-green-500 mb-6 mx-auto" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">Đăng ký thành công!</h3>
            <p className="text-slate-500 mb-8 max-w-sm">
              Dữ liệu khuôn mặt của {studentName} đã được lưu trữ an toàn dưới dạng mã hóa (Embedding).
            </p>
            <Button size="lg" onClick={handleClose} className="w-full sm:w-auto">
              Hoàn tất
            </Button>
          </div>
        )}

        {step === 'ERROR' && (
          <div className="h-[500px] flex flex-col items-center justify-center bg-white dark:bg-slate-950 p-6 text-center">
            <XCircle className="w-20 h-20 text-red-500 mb-6 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Đã xảy ra lỗi</h3>
            <p className="text-slate-500 mb-8 max-w-sm">{feedback}</p>
            <div className="flex gap-4">
              <Button variant="outline" onClick={handleClose}>Đóng</Button>
              <Button onClick={retry}>Thử lại</Button>
            </div>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}
