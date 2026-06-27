import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function HeatmapCalendar() {
  // Generate random heatmap data (30 days)
  const days = Array.from({ length: 30 }, (_, i) => {
    const value = Math.floor(Math.random() * 100);
    let color = 'bg-slate-100 dark:bg-slate-800';
    if (value > 80) color = 'bg-green-500';
    else if (value > 60) color = 'bg-green-400';
    else if (value > 40) color = 'bg-green-300';
    else if (value > 20) color = 'bg-green-200';
    return { day: i + 1, value, color };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Heatmap Điểm danh (30 ngày qua)</CardTitle>
        <CardDescription>Mật độ học sinh tham gia các lớp học</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <TooltipProvider>
            {days.map((d, i) => (
              <div key={i}>
                <Tooltip>
                  <TooltipTrigger>
                    <div className={`w-8 h-8 rounded-sm ${d.color} border border-slate-200 dark:border-slate-700`} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ngày {d.day}: {d.value} học sinh</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
          <span>Ít</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 rounded-sm bg-slate-100 dark:bg-slate-800" />
            <div className="w-4 h-4 rounded-sm bg-green-200" />
            <div className="w-4 h-4 rounded-sm bg-green-300" />
            <div className="w-4 h-4 rounded-sm bg-green-400" />
            <div className="w-4 h-4 rounded-sm bg-green-500" />
          </div>
          <span>Nhiều</span>
        </div>
      </CardContent>
    </Card>
  );
}
