export const PERMISSIONS = {
  VIEW_DASHBOARD: 'view_dashboard',
  MANAGE_STUDENTS: 'manage_students',
  MANAGE_CLASSES: 'manage_classes',
  TAKE_ATTENDANCE: 'take_attendance',
  VIEW_REPORTS: 'view_reports',
  MANAGE_PAYMENTS: 'manage_payments',
  MANAGE_SETTINGS: 'manage_settings',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];
