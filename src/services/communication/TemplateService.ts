import { NotificationTemplateRepository } from '@/repositories/NotificationTemplateRepository';
import { NotificationTemplate } from '@/types';

export class TemplateService {
  private repo = new NotificationTemplateRepository();

  async getTemplates(): Promise<NotificationTemplate[]> {
    return this.repo.getAll();
  }

  async getTemplateById(id: string): Promise<NotificationTemplate | null> {
    return this.repo.getById(id);
  }

  async saveTemplate(data: Partial<NotificationTemplate>): Promise<void> {
    if (data.id) {
      await this.repo.update(data.id, data);
    } else {
      const id = `tpl_${Date.now()}`;
      await this.repo.create(id, { ...data, id } as NotificationTemplate);
    }
  }

  compile(template: string, variables: Record<string, string>): string {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, value);
    }
    return result;
  }
}
