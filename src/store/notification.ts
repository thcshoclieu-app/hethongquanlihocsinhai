import { create } from 'zustand';
import { Notification } from '@/types';

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'notificationId' | 'createdAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notification) => set((state) => ({
    notifications: [
      {
        ...notification,
        notificationId: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        read: false,
      },
      ...state.notifications,
    ]
  })),
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) => 
      n.notificationId === id ? { ...n, read: true } : n
    )
  })),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map((n) => ({ ...n, read: true }))
  })),
  clearNotifications: () => set({ notifications: [] }),
}));
