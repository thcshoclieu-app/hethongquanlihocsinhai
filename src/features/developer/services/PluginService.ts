import { PluginRepository } from '@/repositories/PluginRepository';
import { Plugin, MarketplacePlugin } from '@/types';

export class PluginService {
  private repo = new PluginRepository();

  async getInstalledPlugins(organizationId: string): Promise<Plugin[]> {
    const all = await this.repo.getAll();
    return all.filter(p => p.organizationId === organizationId);
  }

  async installPlugin(organizationId: string, marketplacePlugin: MarketplacePlugin): Promise<Plugin> {
    const id = `plugin_${Date.now()}`;
    const newPlugin: Plugin = {
      id: marketplacePlugin.id, // reference to marketplace
      organizationId,
      name: marketplacePlugin.name,
      version: marketplacePlugin.version,
      author: marketplacePlugin.author,
      description: marketplacePlugin.description,
      permissions: marketplacePlugin.permissions,
      status: 'INSTALLED',
      installedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await this.repo.create(id, newPlugin);
    return newPlugin;
  }

  async togglePlugin(id: string, status: 'ENABLED' | 'DISABLED'): Promise<void> {
    await this.repo.update(id, { status, updatedAt: new Date().toISOString() });
  }

  // Mock fetching from marketplace
  async getMarketplacePlugins(): Promise<MarketplacePlugin[]> {
    return [
      {
        id: 'mp_1',
        name: 'Momo Payment Gateway',
        version: '1.2.0',
        author: 'Momo Inc.',
        description: 'Tích hợp thanh toán Momo cho hệ thống hóa đơn',
        category: 'PAYMENT',
        permissions: ['READ_INVOICE', 'UPDATE_PAYMENT'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'mp_2',
        name: 'Google Classroom Sync',
        version: '2.0.1',
        author: 'EdTech Solutions',
        description: 'Đồng bộ lớp học và học sinh với Google Classroom',
        category: 'LMS',
        permissions: ['READ_CLASS', 'READ_STUDENT', 'WRITE_STUDENT'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }
}

export const pluginService = new PluginService();
