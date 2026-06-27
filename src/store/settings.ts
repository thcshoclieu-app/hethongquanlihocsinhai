import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Settings } from '@/types';
import { CONFIG } from '@/constants';

interface SettingsState {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  settingsId: 'default',
  schoolName: CONFIG.APP_NAME,
  teacherName: 'Admin',
  logo: '',
  theme: 'system',
  language: 'vi',
  camera: {},
  attendance: {}
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),
    }),
    {
      name: 'app-settings',
    }
  )
);
