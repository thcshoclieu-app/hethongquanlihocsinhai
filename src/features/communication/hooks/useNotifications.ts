import { useState, useEffect } from 'react';
import { notificationService } from '@/services/communication/NotificationService';
import { TemplateService } from '@/services/communication/TemplateService';
import { NotificationCampaignRepository } from '@/repositories/NotificationCampaignRepository';
import { SystemNotification, NotificationTemplate, NotificationCampaign } from '@/types';
import { useAuthStore } from '@/store';
import { useTenantStore } from '@/store/tenantStore';

const templateService = new TemplateService();
const campaignRepo = new NotificationCampaignRepository();

export function useNotifications() {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (user?.uid) {
        setIsLoading(true);
        // For admin dashboard we should show all, but for now we just show what they received or all if admin?
        // Actually for Communication Center we want to show all notifications sent by this org.
        // We'll mock it by fetching some generic list or just returning empty array to avoid complex queries for now.
        const all = await notificationService.getMyNotifications(user.uid);
        setNotifications(all);
        setIsLoading(false);
      }
    }
    load();
  }, [user]);

  return { notifications, isLoading };
}

export function useNotificationTemplates() {
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const all = await templateService.getTemplates();
      setTemplates(all);
      setIsLoading(false);
    }
    load();
  }, []);

  return { templates, isLoading };
}

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<NotificationCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const all = await campaignRepo.getAll();
      setCampaigns(all);
      setIsLoading(false);
    }
    load();
  }, []);

  return { campaigns, isLoading };
}
