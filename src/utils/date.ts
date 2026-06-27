import { format, parseISO, isValid } from 'date-fns';
import { vi } from 'date-fns/locale';

export const formatDate = (date: string | Date, formatStr: string = 'dd/MM/yyyy') => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(d)) return '';
  return format(d, formatStr, { locale: vi });
};

export const formatDateTime = (date: string | Date) => {
  return formatDate(date, 'dd/MM/yyyy HH:mm');
};
