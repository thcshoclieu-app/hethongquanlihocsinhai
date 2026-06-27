import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity, Server, Cpu, HardDrive } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MonitoringDashboard() {
  const cpuData = [
    { time: '10:00', val: 20 },
    { time: '10:05', val: 35 },
    { time: '10:10', val: 45 },
    { time: '10:15', val: 30 },
    { time: '10:20', val: 25 },
    { time: '10:25', val: 60 },
    { time: '10:30', val: 40 },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Activity className="text-emerald-500" /> System Monitoring
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Giám sát tài nguyên hạ tầng và API Performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2"><Cpu size={16}/> Avg CPU Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42%</div>
            <div className="h-24 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cpuData}>
                  <Line type="monotone" dataKey="val" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2"><Server size={16}/> Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">68%</div>
            <div className="h-24 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cpuData.map(d => ({ ...d, val: d.val + 20 }))}>
                  <Line type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2"><HardDrive size={16}/> Storage I/O</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12 MB/s</div>
            <div className="h-24 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cpuData.map(d => ({ ...d, val: Math.abs(d.val - 30) }))}>
                  <Line type="monotone" dataKey="val" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Latency (p95)</CardTitle>
          <CardDescription>Thời gian phản hồi API trung bình</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cpuData.map(d => ({ time: d.time, val: d.val * 3 + 120 }))}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} domain={[0, 'auto']} />
                <Tooltip />
                <Line type="monotone" dataKey="val" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
