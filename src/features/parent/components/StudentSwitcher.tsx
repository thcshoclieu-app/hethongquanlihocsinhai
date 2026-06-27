import React from 'react';
import { useChildren } from '../hooks/useParentHooks';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users } from 'lucide-react';

export function StudentSwitcher() {
  const { childrenList, selectedStudentId, setSelectedStudent } = useChildren();

  if (childrenList.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <Users size={16} className="text-slate-500 hidden sm:block" />
      <Select value={selectedStudentId || undefined} onValueChange={setSelectedStudent}>
        <SelectTrigger className="w-[180px] h-9 bg-slate-50 dark:bg-slate-900 border-none focus:ring-1">
          <SelectValue placeholder="Chọn học sinh" />
        </SelectTrigger>
        <SelectContent>
          {childrenList.map(child => (
            <SelectItem key={child.studentId} value={child.studentId}>
              <div className="flex items-center gap-2">
                <Avatar className="w-5 h-5">
                  <AvatarImage src={child.avatar} />
                  <AvatarFallback>{child.fullName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="truncate">{child.fullName}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
