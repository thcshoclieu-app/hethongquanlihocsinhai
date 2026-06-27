import { useEffect, useRef, useState, useCallback } from 'react';
import { FaceDetectionResult } from '../models/AITypes';
import { FaceAIProvider } from '../providers/FaceAIProvider';

export function useAIProvider() {
  const providerRef = useRef<FaceAIProvider | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    providerRef.current = new FaceAIProvider();
    return () => {
      providerRef.current?.terminate();
    };
  }, []);

  const init = useCallback(async () => {
    if (!providerRef.current) return;
    try {
      await providerRef.current.initialize();
      setIsInitialized(true);
    } catch (err: any) {
      setIsError(err.message);
      throw err;
    }
  }, []);

  const detectFace = useCallback(async (imageData: ImageData): Promise<FaceDetectionResult | null> => {
    if (!providerRef.current || !isInitialized) return null;
    return providerRef.current.detectFace(imageData, true);
  }, [isInitialized]);

  return { init, detectFace, isInitialized, isError };
}
