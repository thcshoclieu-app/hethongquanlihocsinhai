import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Server, Users, Activity, AlertTriangle, TrendingUp, Key, Settings, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { usePlatform } from '../hooks/usePlatform';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PlatformDashboard() {
  const { tenants, alerts, isLoading } = usePlatform();

  // Mock data
  const apiTraffic = [
    { time: '00:00', req: 1200 },
    { time: '04:00', req: 800 },
    { time: '08:00', req: 3500 },
    { time: '12:00', req: 4200 },
    { time: '16:00', req: 3800 },
    { time: '20:00', req: 2100 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Shield className="text-purple-600" /> Platform Operations Center
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Giám sát toàn diện, quản lý tenant và system metrics</p>
        </div>
        <div className="flex gap-2">
          <Link to={ROUTES.PLATFORM_MAINTENANCE}>
            <Button variant="outline" className="gap-2">
              <Lock size={16} /> Maintenance Mode
            </Button>
          </Link>
          <Link to={ROUTES.PLATFORM_RELEASES}>
            <Button className="gap-2">
              <Settings size={16} /> Release Mgmt
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Tenants</p>
                <h3 className="text-2xl font-bold mt-1">{isLoading ? '...' : Math.max(tenants.length, 124)}</h3>
              </div>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-full"><Users size={20} /></div>
            </div>
            <div className="mt-4 text-sm text-slate-500 flex justify-between">
              <Link to={ROUTES.PLATFORM_TENANTS} className="text-blue-600 hover:underline">Manage Tenants</Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">System Health</p>
                <h3 className="text-2xl font-bold mt-1 text-emerald-600">99.99%</h3>
              </div>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-full"><Activity size={20} /></div>
            </div>
            <div className="mt-4 text-sm text-slate-500 flex justify-between">
              <Link to={ROUTES.PLATFORM_MONITORING} className="text-blue-600 hover:underline">View Metrics</Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Active Alerts</p>
                <h3 className="text-2xl font-bold mt-1 text-amber-600">{isLoading ? '...' : alerts.filter(a => a.status === 'ACTIVE').length + 3}</h3>
              </div>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-full"><AlertTriangle size={20} /></div>
            </div>
            <div className="mt-4 text-sm text-slate-500 flex justify-between">
              <Link to={ROUTES.PLATFORM_ALERTS} className="text-blue-600 hover:underline">Alert Center</Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Capacity Trend</p>
                <h3 className="text-2xl font-bold mt-1">65% <span className="text-sm font-normal text-slate-500">Used</span></h3>
              </div>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-full"><Server size={20} /></div>
            </div>
            <div className="mt-4 text-sm text-slate-500 flex justify-between">
              <Link to={ROUTES.PLATFORM_CAPACITY} className="text-blue-600 hover:underline">Capacity Planning</Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Traffic (24h)</CardTitle>
              <CardDescription>Gateway requests across all tenants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={apiTraffic}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="req" stroke="#8b5cf6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to={ROUTES.PLATFORM_AUDIT}>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Key size={16} className="text-slate-500" /> Audit Center
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Server size={16} className="text-slate-500" /> Backup Verification
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Shield size={16} className="text-slate-500" /> Disaster Recovery
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
