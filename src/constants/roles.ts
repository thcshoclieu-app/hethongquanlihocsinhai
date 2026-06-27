export const ROLES = {
  SUPER_ADMIN: 'OWNER',
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  ASSISTANT: 'ASSISTANT',
  VIEWER: 'VIEWER',
  OWNER: 'OWNER',
  MANAGER: 'MANAGER',
  ACCOUNTANT: 'ACCOUNTANT',
  PARENT: 'PARENT',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
