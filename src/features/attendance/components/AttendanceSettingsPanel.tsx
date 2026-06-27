import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAttendanceSettings } from '../hooks/useAttendanceSettings';
import { Save } from 'lucide-react';

export function AttendanceSettingsPanel() {
  const { settings, updateSettings, isLoaded } = useAttendanceSettings();
  const [localSettings, setLocalSettings] = React.useState(settings);

  React.useEffect(() => {
    if (isLoaded) {
      setLocalSettings(settings);
    }
  }, [settings, isLoaded]);

  const handleSave = () => {
    updateSettings(localSettings);
    alert('Đã lưu cấu hình AI Điểm danh');
  };

  if (!isLoaded) return <div>Đang tải cài đặt...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cấu hình AI Điểm danh</CardTitle>
        <CardDescription>Tuỳ chỉnh thuật toán nhận diện và hoạt động của camera.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Ngưỡng tin cậy (Confidence Threshold)</label>
            <span className="text-sm text-slate-500">{localSettings.confidenceThreshold}%</span>
          </div>
          <input 
            type="range" 
            min="40" 
            max="95" 
            value={localSettings.confidenceThreshold} 
            onChange={(e) => setLocalSettings({...localSettings, confidenceThreshold: parseInt(e.target.value)})}
            className="w-full"
          />
          <p className="text-xs text-slate-500">Ngưỡng càng cao, nhận diện càng khắt khe nhưng giảm thiểu nhận diện sai.</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Giãn cách nhận diện lặp lại (Cooldown)</label>
            <span className="text-sm text-slate-500">{localSettings.cooldownSeconds} giây</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="120" 
            value={localSettings.cooldownSeconds} 
            onChange={(e) => setLocalSettings({...localSettings, cooldownSeconds: parseInt(e.target.value)})}
            className="w-full"
          />
          <p className="text-xs text-slate-500">Thời gian bỏ qua một học sinh sau khi đã nhận diện thành công.</p>
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-3">
            <input 
              type="checkbox" 
              checked={localSettings.soundEnabled}
              onChange={(e) => setLocalSettings({...localSettings, soundEnabled: e.target.checked})}
              className="w-4 h-4 rounded border-slate-300"
            />
            <span className="text-sm font-medium">Bật âm thanh (Sound)</span>
          </label>
          <label className="flex items-center gap-3">
            <input 
              type="checkbox" 
              checked={localSettings.mirrorCamera}
              onChange={(e) => setLocalSettings({...localSettings, mirrorCamera: e.target.checked})}
              className="w-4 h-4 rounded border-slate-300"
            />
            <span className="text-sm font-medium">Lật camera (Mirror)</span>
          </label>
          <label className="flex items-center gap-3">
            <input 
              type="checkbox" 
              checked={localSettings.savePhoto}
              onChange={(e) => setLocalSettings({...localSettings, savePhoto: e.target.checked})}
              className="w-4 h-4 rounded border-slate-300"
            />
            <span className="text-sm font-medium">Lưu ảnh chụp lúc điểm danh (Tốn dung lượng)</span>
          </label>
        </div>
        
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <Button onClick={handleSave} className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Save size={16} />
            Lưu thay đổi
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
