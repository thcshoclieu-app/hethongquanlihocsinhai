import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ScheduleFilter } from './ScheduleFilter';

interface ScheduleToolbarProps {
  currentDate: Date;
  onChangeDate: (date: Date) => void;
  view: string;
  onChangeView: (view: string) => void;
}

export function ScheduleToolbar({ currentDate, onChangeDate, view, onChangeView }: ScheduleToolbarProps) {
  const handlePrev = () => {
    if (view === 'month') onChangeDate(subMonths(currentDate, 1));
    else if (view === 'week') onChangeDate(subWeeks(currentDate, 1));
    else onChangeDate(subDays(currentDate, 1));
  };

  const handleNext = () => {
    if (view === 'month') onChangeDate(addMonths(currentDate, 1));
    else if (view === 'week') onChangeDate(addWeeks(currentDate, 1));
    else onChangeDate(addDays(currentDate, 1));
  };

  const handleToday = () => {
    onChangeDate(new Date());
  };

  const formatTitle = () => {
    if (view === 'month') return format(currentDate, 'MMMM, yyyy', { locale: vi });
    if (view === 'week') {
      const start = format(currentDate, 'dd/MM');
      return `Tuần của ${start}`;
    }
    return format(currentDate, 'EEEE, dd/MM/yyyy', { locale: vi });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" onClick={handlePrev}>
            <ChevronLeft size={16} />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight size={16} />
          </Button>
          <Button variant="outline" className="px-4 ml-1" onClick={handleToday}>
            Hôm nay
          </Button>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 capitalize">
          {formatTitle()}
        </h3>
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <ScheduleFilter />
        <Tabs value={view} onValueChange={onChangeView} className="flex-1 sm:w-auto">
          <TabsList className="grid w-full sm:w-[300px] grid-cols-3">
            <TabsTrigger value="month">Tháng</TabsTrigger>
            <TabsTrigger value="week">Tuần</TabsTrigger>
            <TabsTrigger value="day">Ngày</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
