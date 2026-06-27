import { WebhookRepository } from '@/repositories/WebhookRepository';
import { Webhook } from '@/types';

export class WebhookService {
  private repo = new WebhookRepository();

  async getWebhooks(organizationId: string): Promise<Webhook[]> {
    const all = await this.repo.getAll();
    return all.filter(w => w.organizationId === organizationId);
  }

  async createWebhook(data: Partial<Webhook>): Promise<Webhook> {
    const id = `wh_${Date.now()}`;
    const newWebhook: Webhook = {
      ...data,
      id,
      status: 'ACTIVE',
      retryCount: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as Webhook;
    await this.repo.create(id, newWebhook);
    return newWebhook;
  }

  async toggleWebhook(id: string, status: 'ACTIVE' | 'INACTIVE'): Promise<void> {
    await this.repo.update(id, { status, updatedAt: new Date().toISOString() });
  }

  async deleteWebhook(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}

export const webhookService = new WebhookService();
