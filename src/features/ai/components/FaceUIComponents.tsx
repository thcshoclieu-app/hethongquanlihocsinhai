import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaceQuality } from '../models/AITypes';
import { CheckCircle, XCircle } from 'lucide-react';

export function FaceFrame({ 
  quality, 
  step 
}: { 
  quality: FaceQuality | null, 
  step: string 
}) {
  let borderColor = 'border-red-500';
  let boxShadow = 'shadow-red-500/50';
  
  if (step === 'COUNTDOWN') {
    borderColor = 'border-green-500';
    boxShadow = 'shadow-green-500/50';
  } else if (quality) {
    if (quality === 'Bad') {
      borderColor = 'border-amber-500';
      boxShadow = 'shadow-amber-500/50';
    } else {
      borderColor = 'border-green-500';
      boxShadow = 'shadow-green-500/50';
    }
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <motion.div 
        animate={{ scale: step === 'COUNTDOWN' ? 1.05 : 1 }}
        className={`w-64 h-64 sm:w-80 sm:h-80 rounded-full border-4 ${borderColor} ${boxShadow} shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-transparent transition-colors duration-300 relative`}
      >
        <div className="absolute inset-0 rounded-full shadow-[0_0_0_9999px_rgba(0,0,0,0.7)]"></div>
      </motion.div>
    </div>
  );
}

export function FaceGuide({ feedback }: { feedback: string }) {
  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full text-lg font-medium whitespace-nowrap z-20 backdrop-blur-sm">
      {feedback}
    </div>
  );
}

export function FaceProgress({ current, total }: { current: number, total: number }) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 z-20 bg-black/50 p-4 rounded-xl backdrop-blur-sm">
      <div className="flex justify-between text-white text-sm mb-2 font-medium">
        <span>Tiến trình</span>
        <span>{current} / {total}</span>
      </div>
      <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(current / total) * 100}%` }}
          className="h-full bg-blue-500"
        />
      </div>
    </div>
  );
}

export function FaceCountdown({ count }: { count: number }) {
  return (
    <AnimatePresence>
      <motion.div 
        key={count}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.5 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
      >
        <span className="text-8xl font-bold text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          {count}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}
