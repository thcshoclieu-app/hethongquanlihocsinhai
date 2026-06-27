import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

export default function Health() {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => {
      setStatus({
        api: 'OK',
        database: 'OK',
        storage: 'OK',
        ai: 'OK',
      });
    }, 1000);
  }, []);

  if (!status) {
    return <div className="flex h-screen items-center justify-center"><Spinner /></div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">System Health</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(status).map(([key, val]) => (
          <Card key={key}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg capitalize">{key} Service</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {val === 'OK' ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />}
                <span className="font-medium text-slate-700 dark:text-slate-200">{val as string}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
