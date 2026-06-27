import { BaseRepository } from '@/repositories/BaseRepository';
import { Webhook } from '@/types';

export class WebhookRepository extends BaseRepository<Webhook> {
  constructor() {
    super('webhooks', 'id');
  }
}
