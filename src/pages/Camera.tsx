import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera as CameraIcon, RefreshCw, Maximize, Settings2, Video, VideoOff, UserCheck, UserX } from 'lucide-react';
import { motion } from 'motion/react';

export default function Camera() {
  const [isCameraOn, setIsCameraOn] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 h-full flex flex-col"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Camera AI</h2>
          <p className="text-slate-500 dark:text-slate-400">Hệ thống nhận diện khuôn mặt tự động điểm danh.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Settings2 size={16} />
            <span>Cài đặt Camera</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 flex-1 min-h-0">
        <Card className="lg:col-span-2 flex flex-col min-h-[400px] lg:min-h-0 overflow-hidden border-0 shadow-md ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader className="bg-slate-50 dark:bg-slate-900 py-3 border-b border-slate-200 dark:border-slate-800 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isCameraOn ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`} />
              <CardTitle className="text-sm font-medium">Camera chính - Cửa ra vào</CardTitle>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                <RefreshCw size={16} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                <Maximize size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 relative bg-slate-950 flex flex-col items-center justify-center">
            {isCameraOn ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-slate-800 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+Cjwvc3ZnPg==')] pointer-events-none" />
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute top-[30%] left-[40%] w-[150px] h-[150px] border-2 border-green-500 rounded-sm"
                  >
                    <div className="absolute -top-6 left-0 bg-green-500 text-white text-[10px] px-1 font-bold">Nguyễn Văn A (98%)</div>
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-green-500" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-green-500" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-green-500" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-green-500" />
                  </motion.div>
                </div>
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <Button variant="destructive" onClick={() => setIsCameraOn(false)} className="gap-2 rounded-full px-6 shadow-lg">
                    <VideoOff size={16} />
                    Tắt Camera
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto ring-8 ring-slate-900/50">
                  <CameraIcon size={32} className="text-slate-600" />
                </div>
                <p className="text-slate-400">Camera đang tắt</p>
                <Button onClick={() => setIsCameraOn(true)} className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Video size={16} />
                  Mở Camera
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="flex flex-col min-h-[400px]">
          <CardHeader>
            <CardTitle>Lịch sử nhận diện</CardTitle>
            <CardDescription>Các sự kiện điểm danh gần nhất</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto pr-2">
            <div className="space-y-4">
              {[
                { name: 'Nguyễn Văn A', class: '10A1', time: '14:05:22', status: 'success', conf: '98%' },
                { name: 'Trần Thị B', class: '10A1', time: '14:02:15', status: 'success', conf: '95%' },
                { name: 'Lê Hoàng C', class: '11B', time: '13:55:01', status: 'success', conf: '99%' },
                { name: 'Người lạ', class: 'N/A', time: '13:40:12', status: 'warning', conf: 'N/A' },
                { name: 'Phạm Văn D', class: '12C', time: '13:30:45', status: 'success', conf: '96%' },
                { name: 'Hoàng Thị E', class: '10A2', time: '13:15:20', status: 'success', conf: '97%' },
              ].map((log, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    log.status === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                  }`}>
                    {log.status === 'success' ? <UserCheck size={18} /> : <UserX size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{log.name}</p>
                    <p className="text-xs text-slate-500 truncate">{log.class} • Độ chính xác: {log.conf}</p>
                  </div>
                  <div className="text-xs font-medium text-slate-500">{log.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
