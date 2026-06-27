export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  SCHEDULE: '/schedule',
  STUDENTS: '/students',
  CLASSES: '/classes',
  CLASS_DETAIL: '/classes/:id',
  ATTENDANCE: '/attendance',
  CAMERA: '/camera',
  TUITION: '/tuition',
  PAYMENTS: '/payments',
  REPORTS: '/reports',
  SETTINGS: '/settings',
  ABOUT: '/about',
  PROFILE: '/profile',
  
  // Parent Portal
  PARENT_DASHBOARD: '/parent',
  PARENT_ATTENDANCE: '/parent/attendance',
  PARENT_SCHEDULE: '/parent/schedule',
  PARENT_TUITION: '/parent/tuition',
  PARENT_LEAVE: '/parent/leave',
  PARENT_NOTIFICATIONS: '/parent/notifications',
  PARENT_SETTINGS: '/parent/settings',
  
  // Communication Center
  COMMUNICATION: '/communication',
  COMMUNICATION_TEMPLATES: '/communication/templates',
  COMMUNICATION_CAMPAIGNS: '/communication/campaigns',

  // AI Insights
  INSIGHTS: '/insights',
  INSIGHTS_CONFIG: '/insights/config',

  // Open Platform & Developer Portal
  DEVELOPER_PORTAL: '/developer',
  DEVELOPER_KEYS: '/developer/keys',
  DEVELOPER_WEBHOOKS: '/developer/webhooks',
  DEVELOPER_PLUGINS: '/developer/plugins',
  DEVELOPER_DOCS: '/developer/docs',

  // Platform Operations (Super Admin)
  PLATFORM_DASHBOARD: '/platform',
  PLATFORM_TENANTS: '/platform/tenants',
  PLATFORM_MONITORING: '/platform/monitoring',
  PLATFORM_ALERTS: '/platform/alerts',
  PLATFORM_AUDIT: '/platform/audit',
  PLATFORM_CAPACITY: '/platform/capacity',
  PLATFORM_RELEASES: '/platform/releases',
  PLATFORM_MAINTENANCE: '/platform/maintenance'
} as const;
