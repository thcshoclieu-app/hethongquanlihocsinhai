import { get, set } from 'idb-keyval';
import { useState, useEffect } from 'react';

export interface AttendanceSettings {
  confidenceThreshold: number; // 0-100%
  cooldownSeconds: number;
  soundEnabled: boolean;
  mirrorCamera: boolean;
  autoCapture: boolean;
  savePhoto: boolean;
  countdown: number;
}

const DEFAULT_SETTINGS: AttendanceSettings = {
  confidenceThreshold: 60,
  cooldownSeconds: 30,
  soundEnabled: true,
  mirrorCamera: true,
  autoCapture: true,
  savePhoto: false,
  countdown: 3,
};

const SETTINGS_KEY = 'attendance_settings';

export function useAttendanceSettings() {
  const [settings, setSettingsState] = useState<AttendanceSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const stored = await get<AttendanceSettings>(SETTINGS_KEY);
      if (stored) {
        setSettingsState({ ...DEFAULT_SETTINGS, ...stored });
      }
      setIsLoaded(true);
    }
    loadSettings();
  }, []);

  const updateSettings = async (updates: Partial<AttendanceSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettingsState(newSettings);
    await set(SETTINGS_KEY, newSettings);
  };

  return { settings, updateSettings, isLoaded };
}
