import { useState, useEffect } from 'react';
import { apiKeyService } from '../services/ApiKeyService';
import { webhookService } from '../services/WebhookService';
import { pluginService } from '../services/PluginService';
import { ApiKey, Webhook, Plugin, MarketplacePlugin } from '@/types';
import { useTenantStore } from '@/store/tenantStore';

export function useApiKeys() {
  const { organizationId } = useTenantStore();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    if (organizationId) {
      setIsLoading(true);
      const res = await apiKeyService.getApiKeys(organizationId);
      setKeys(res);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [organizationId]);

  return { keys, isLoading, reload: load };
}

export function useWebhooks() {
  const { organizationId } = useTenantStore();
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    if (organizationId) {
      setIsLoading(true);
      const res = await webhookService.getWebhooks(organizationId);
      setWebhooks(res);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [organizationId]);

  return { webhooks, isLoading, reload: load };
}

export function usePlugins() {
  const { organizationId } = useTenantStore();
  const [installedPlugins, setInstalledPlugins] = useState<Plugin[]>([]);
  const [marketplacePlugins, setMarketplacePlugins] = useState<MarketplacePlugin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    if (organizationId) {
      setIsLoading(true);
      const installed = await pluginService.getInstalledPlugins(organizationId);
      const market = await pluginService.getMarketplacePlugins();
      setInstalledPlugins(installed);
      setMarketplacePlugins(market);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [organizationId]);

  return { installedPlugins, marketplacePlugins, isLoading, reload: load };
}
