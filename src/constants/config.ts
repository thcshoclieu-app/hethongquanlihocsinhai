export const CONFIG = {
  APP_NAME: 'Student Management System',
  APP_VERSION: '1.0.0',
  DEFAULT_LANGUAGE: 'vi',
  SUPPORTED_LANGUAGES: ['vi', 'en'],
  API_TIMEOUT: 30000,
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    PAGE_OPTIONS: [10, 20, 50, 100],
  },
  DATE_FORMAT: {
    DISPLAY_DATE: 'dd/MM/yyyy',
    DISPLAY_DATETIME: 'dd/MM/yyyy HH:mm',
    API_DATE: 'yyyy-MM-dd',
  }
} as const;
