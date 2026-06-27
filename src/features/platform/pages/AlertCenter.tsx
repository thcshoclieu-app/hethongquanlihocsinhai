import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function AlertCenter() {
  const mockAlerts = [
    { id: 'AL-1', severity: 'CRITICAL', component: 'Database Cluster', message: 'High CPU utilization > 90% for 5 mins', status: 'ACTIVE', time: '10 mins ago' },
    { id: 'AL-2', severity: 'WARNING', component: 'AI Engine', message: 'Recognition success rate dropped below 95%', status: 'ACTIVE', time: '1 hour ago' },
    { id: 'AL-3', severity: 'INFO', component: 'Storage', message: 'Tenant ORG_1 approaching 80% quota', status: 'ACKNOWLEDGED', time: '2 hours ago' },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <AlertTriangle className="text-rose-500" /> Alert Center
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Cảnh báo hệ thống và sự cố hạ tầng</p>
        </div>
      </div>

      <div className="space-y-4">
        {mockAlerts.map(alert => (
          <Card key={alert.id} className={`border-l-4 ${alert.severity === 'CRITICAL' ? 'border-l-rose-500' : alert.severity === 'WARNING' ? 'border-l-amber-500' : 'border-l-blue-500'}`}>
            <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={alert.severity === 'CRITICAL' ? 'destructive' : alert.severity === 'WARNING' ? 'outline' : 'secondary'}
                         className={alert.severity === 'WARNING' ? 'text-amber-600 border-amber-200 bg-amber-50' : ''}>
                    {alert.severity}
                  </Badge>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{alert.component}</span>
                </div>
                <p className="text-lg font-medium text-slate-900 dark:text-slate-100">{alert.message}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock size={12} /> {alert.time}</span>
                  <span className="flex items-center gap-1"><AlertTriangle size={12} /> Status: {alert.status}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {alert.status === 'ACTIVE' && <Button variant="outline" size="sm">Acknowledge</Button>}
                <Button variant="default" size="sm" className="gap-1 bg-emerald-600 hover:bg-emerald-700 text-white"><CheckCircle size={14} /> Resolve</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
