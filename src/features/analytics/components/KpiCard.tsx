import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'motion/react';

interface KpiCardProps {
  key?: React.Key;
  title: string;
  value: string | number;
  icon: any;
  trend?: string;
  trendUp?: boolean;
  colorClass: string;
  bgClass: string;
}

export function KpiCard({ title, value, icon: Icon, trend, trendUp, colorClass, bgClass }: KpiCardProps) {
  return (
    <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }}>
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
          <div className={`p-2 rounded-lg ${bgClass} dark:bg-opacity-10`}>
            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${colorClass}`} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50">{value}</div>
          {trend && (
            <div className={`text-xs mt-1 font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {trendUp ? '+' : ''}{trend} so với tháng trước
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
