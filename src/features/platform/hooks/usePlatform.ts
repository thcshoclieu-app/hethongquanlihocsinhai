import { useState, useEffect } from 'react';
import { tenantService } from '../services/TenantService';
import { monitoringService } from '../services/MonitoringService';
import { alertService } from '../services/AlertService';
import { auditService } from '../services/AuditService';
import { capacityService } from '../services/CapacityService';
import { releaseService } from '../services/ReleaseService';
import { maintenanceService } from '../services/MaintenanceService';
import { TenantInfo, SystemMetric, SystemAlert, AuditLog, ReleaseVersion } from '@/types';

export function usePlatform() {
  const [tenants, setTenants] = useState<TenantInfo[]>([]);
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [releases, setReleases] = useState<ReleaseVersion[]>([]);
  const [capacity, setCapacity] = useState<any>(null);
  const [maintenance, setMaintenance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadAll = async () => {
    setIsLoading(true);
    const [t, m, a, l, r, c, main] = await Promise.all([
      tenantService.getTenants(),
      monitoringService.getMetrics(),
      alertService.getAlerts(),
      auditService.getLogs(),
      releaseService.getReleases(),
      capacityService.getForecasts(),
      maintenanceService.getStatus()
    ]);
    setTenants(t);
    setMetrics(m);
    setAlerts(a);
    setLogs(l);
    setReleases(r);
    setCapacity(c);
    setMaintenance(main);
    setIsLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  return {
    tenants,
    metrics,
    alerts,
    logs,
    releases,
    capacity,
    maintenance,
    isLoading,
    reload: loadAll
  };
}
