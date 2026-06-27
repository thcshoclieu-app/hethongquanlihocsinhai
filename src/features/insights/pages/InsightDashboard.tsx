import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BrainCircuit, AlertTriangle, Lightbulb, TrendingUp, TrendingDown, Users, DollarSign, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { useRecommendations, useTrends, useRiskScores } from '../hooks/useInsights';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useTenantStore } from '@/store/tenantStore';

export default function InsightDashboard() {
  const { campusId } = useTenantStore();
  const { recommendations, isLoading: loadingRecs } = useRecommendations();
  const { scores, isLoading: loadingScores } = useRiskScores(campusId);
  
  // Mock data for charts
  const attendanceData = [
    { name: 'T2', value: 95 },
    { name: 'T3', value: 92 },
    { name: 'T4', value: 88 },
    { name: 'T5', value: 85 },
    { name: 'T6', value: 90 },
    { name: 'T7', value: 94 },
    { name: 'CN', value: 96 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BrainCircuit className="text-blue-600" /> AI Insights & Decision Support
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Phân tích rủi ro, dự báo xu hướng và gợi ý hành động</p>
        </div>
        <div className="flex gap-2">
          <Link to={ROUTES.INSIGHTS_CONFIG}>
            <Button variant="outline">Cấu hình AI</Button>
          </Link>
          <Button className="gap-2">
            <Activity size={16} /> Chạy phân tích ngay
          </Button>
        </div>
      </div>

      {/* System Health / Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Tỷ lệ chuyên cần (7 ngày)</p>
                <h3 className="text-2xl font-bold mt-1">92.5%</h3>
              </div>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-full"><Users size={20} /></div>
            </div>
            <div className="mt-4 flex items-center text-sm text-rose-500 font-medium">
              <TrendingDown size={16} className="mr-1" /> Giảm 2.1%
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Thu hồi công nợ</p>
                <h3 className="text-2xl font-bold mt-1">85%</h3>
              </div>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-full"><DollarSign size={20} /></div>
            </div>
            <div className="mt-4 flex items-center text-sm text-emerald-500 font-medium">
              <TrendingUp size={16} className="mr-1" /> Tăng 5%
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Học sinh rủi ro cao</p>
                <h3 className="text-2xl font-bold mt-1">12</h3>
              </div>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-full"><AlertTriangle size={20} /></div>
            </div>
            <div className="mt-4 flex items-center text-sm text-rose-500 font-medium">
              <TrendingUp size={16} className="mr-1" /> Tăng 3 em
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Gợi ý hành động</p>
                <h3 className="text-2xl font-bold mt-1">{recommendations.length}</h3>
              </div>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-full"><Lightbulb size={20} /></div>
            </div>
            <div className="mt-4 flex items-center text-sm text-slate-500">
              Cần xử lý: {recommendations.filter(r => r.status === 'NEW').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lightbulb className="text-amber-500" /> Gợi ý hành động (Recommendations)</CardTitle>
              <CardDescription>Các đề xuất dựa trên phân tích dữ liệu gần đây</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingRecs ? (
                <div className="py-8 text-center text-slate-500">Đang phân tích dữ liệu...</div>
              ) : recommendations.length === 0 ? (
                <div className="py-8 text-center text-slate-500">Không có gợi ý nào cần xử lý.</div>
              ) : (
                <div className="space-y-4">
                  {recommendations.map(rec => (
                    <div key={rec.id} className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {rec.priority === 'CRITICAL' || rec.priority === 'HIGH' ? 
                            <AlertTriangle size={18} className="text-rose-500" /> : 
                            <Lightbulb size={18} className="text-amber-500" />
                          }
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100">{rec.title}</h4>
                        </div>
                        <Badge variant={rec.priority === 'CRITICAL' ? 'destructive' : 'outline'}>{rec.priority}</Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{rec.description}</p>
                      
                      {/* Explainable AI block */}
                      <div className="bg-white dark:bg-slate-950 p-3 rounded border border-slate-100 dark:border-slate-800 mb-4 text-xs">
                        <p className="font-medium text-slate-700 dark:text-slate-300 mb-1">Cơ sở dữ liệu (Độ tin cậy: {rec.confidenceScore}%):</p>
                        <ul className="list-disc pl-5 text-slate-500 space-y-1">
                          {rec.reasoning.map((reason, idx) => (
                            <li key={idx}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {rec.suggestedActions.map((action, idx) => (
                          <Button key={idx} size="sm" variant={idx === 0 ? 'default' : 'outline'}>
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Trend Charts */}
          <Card>
            <CardHeader>
              <CardTitle>Xu hướng chuyên cần (7 ngày)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Risk Scores */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><AlertTriangle className="text-rose-500" /> Học sinh rủi ro cao</CardTitle>
              <CardDescription>Cần chú ý đặc biệt</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mock Risk List */}
                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Nguyễn Văn A</p>
                    <p className="text-xs text-slate-500">Lớp Math-01</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive" className="mb-1">CRITICAL</Badge>
                    <p className="text-xs text-rose-500 font-medium">85/100 Điểm rủi ro</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Trần Thị B</p>
                    <p className="text-xs text-slate-500">Lớp Eng-02</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-rose-600 border-rose-200 bg-rose-50 mb-1">HIGH</Badge>
                    <p className="text-xs text-rose-500 font-medium">75/100 Điểm rủi ro</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Lê Văn C</p>
                    <p className="text-xs text-slate-500">Lớp Math-01</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 mb-1">MEDIUM</Badge>
                    <p className="text-xs text-amber-600 font-medium">50/100 Điểm rủi ro</p>
                  </div>
                </div>
              </div>
              
              <Button variant="link" className="w-full mt-4 text-blue-600">Xem tất cả</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cảnh báo Hệ thống</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-3 text-sm">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-amber-500 shrink-0"></div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Tỷ lệ đi muộn lớp Eng-02 tăng</p>
                    <p className="text-slate-500">Tăng 15% trong tuần qua.</p>
                  </div>
                </div>
                <div className="flex gap-3 text-sm">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-rose-500 shrink-0"></div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Công nợ quá hạn tăng mạnh</p>
                    <p className="text-slate-500">Tổng dư nợ đạt ngưỡng cảnh báo.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
