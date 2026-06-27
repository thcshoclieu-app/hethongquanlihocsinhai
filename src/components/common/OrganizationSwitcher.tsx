import React from 'react';
import { useOrganization, useCampus } from '@/hooks/useTenantHooks';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building } from 'lucide-react';

export function OrganizationSwitcher() {
  const { currentOrganization } = useOrganization();
  const { campuses, currentCampus, setCurrentCampus } = useCampus();

  if (!currentOrganization) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-md">
        <Building size={16} className="text-blue-600" />
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{currentOrganization.shortName}</span>
      </div>
      
      {campuses.length > 0 && currentCampus && (
        <Select value={currentCampus.id} onValueChange={(val) => {
          const c = campuses.find(c => c.id === val);
          if (c) setCurrentCampus(c);
        }}>
          <SelectTrigger className="w-[180px] h-9 bg-slate-50 dark:bg-slate-900 border-none focus:ring-1">
            <SelectValue placeholder="Chọn cơ sở" />
          </SelectTrigger>
          <SelectContent>
            {campuses.map(c => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
