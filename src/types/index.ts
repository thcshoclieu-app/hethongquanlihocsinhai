export interface Organization {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  website?: string;
  email: string;
  phone: string;
  address: string;
  province?: string;
  district?: string;
  ward?: string;
  country: string;
  timezone: string;
  currency: string;
  language: string;
  ownerId: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  createdAt: string;
  updatedAt: string;
  branding?: {
    primaryColor: string;
    appName: string;
    favicon?: string;
  };
  domain?: string;
}

export interface Campus {
  id: string;
  organizationId: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  managerId: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Subscription {
  id: string;
  organizationId: string;
  planId: string; // 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE'
  price: number;
  renewDate: string;
  expireDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELED' | 'TRIAL';
}

export interface FeatureFlag {
  id: string;
  planId: string;
  features: Record<string, boolean>;
}

export interface Quota {
  organizationId: string;
  studentLimit: number;
  teacherLimit: number;
  storageLimit: number; // in bytes
  aiRecognitionLimit: number; // per month
  currentStudents: number;
  currentTeachers: number;
  currentStorage: number;
  currentAiUsage: number;
}

// AI Insights & Decision Support
export interface RiskScore {
  id: string;
  organizationId: string;
  studentId: string;
  campusId?: string;
  attendanceRisk: number; // 0-100
  paymentRisk: number; // 0-100
  participationRisk: number; // 0-100
  overallRisk: number; // 0-100
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  factors: {
    name: string;
    impact: number; // -100 to +100
    description: string;
  }[];
  lastCalculated: string;
  version: string;
}

export interface Recommendation {
  id: string;
  organizationId: string;
  campusId?: string;
  targetId: string; // studentId, classId, teacherId
  targetType: 'STUDENT' | 'CLASS' | 'TEACHER' | 'CAMPUS';
  category: 'ATTENDANCE' | 'BILLING' | 'PERFORMANCE' | 'RESOURCE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
  confidenceScore: number; // 0-100
  reasoning: string[];
  suggestedActions: {
    type: 'SEND_NOTIFICATION' | 'CONTACT_PARENT' | 'SCHEDULE_MEETING' | 'CREATE_NOTE' | 'MARK_RESOLVED';
    label: string;
    data?: any;
  }[];
  status: 'NEW' | 'VIEWED' | 'ACTION_TAKEN' | 'DISMISSED';
  createdAt: string;
  updatedAt: string;
}

export interface AiConfiguration {
  id: string;
  organizationId: string;
  thresholds: {
    attendanceWarning: number;
    paymentWarningDays: number;
    highRiskScore: number;
  };
  weights: {
    attendance: number;
    payment: number;
    participation: number;
  };
  schedule: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  modelPreferences: {
    algorithm: string;
    version: string;
  };
  updatedAt: string;
  updatedBy: string;
}

export interface InsightSnapshot {
  id: string;
  organizationId: string;
  campusId?: string;
  type: 'ATTENDANCE_TREND' | 'REVENUE_TREND' | 'WORKLOAD_HEATMAP' | 'OVERALL_HEALTH';
  period: '7D' | '30D' | '90D' | '1Y';
  data: any;
  calculatedAt: string;
}

// Developer Portal & Open Platform
export interface ApiKey {
  id: string;
  organizationId: string;
  name: string;
  publicKey: string;
  secretKeyPreview: string; // Only first/last few chars
  permissions: string[];
  status: 'ACTIVE' | 'INACTIVE' | 'REVOKED';
  rateLimit: number; // requests per minute
  createdAt: string;
  expiredAt?: string;
  lastUsedAt?: string;
}

export interface Webhook {
  id: string;
  organizationId: string;
  name: string;
  url: string;
  events: string[];
  secret: string; // for signature verification
  status: 'ACTIVE' | 'INACTIVE' | 'FAILED';
  retryCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface WebhookLog {
  id: string;
  webhookId: string;
  organizationId: string;
  event: string;
  payload: any;
  responseStatus?: number;
  responseBody?: string;
  status: 'DELIVERED' | 'FAILED' | 'RETRYING';
  createdAt: string;
}

export interface Plugin {
  id: string; // The ID of the plugin from marketplace
  organizationId: string;
  name: string;
  version: string;
  author: string;
  description: string;
  permissions: string[];
  status: 'INSTALLED' | 'ENABLED' | 'DISABLED';
  installedAt: string;
  updatedAt: string;
}

export interface MarketplacePlugin {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  category: 'PAYMENT' | 'LMS' | 'CRM' | 'ERP' | 'BI' | 'OTHER';
  permissions: string[];
  iconUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Platform Operations & Observability
export interface SystemMetric {
  id: string;
  type: 'CPU' | 'MEMORY' | 'STORAGE' | 'API_LATENCY' | 'ERROR_RATE' | 'ACTIVE_USERS';
  value: number;
  unit: string;
  timestamp: string;
}

export interface SystemAlert {
  id: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  component: string;
  message: string;
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
  createdAt: string;
  resolvedAt?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  organizationId?: string;
  action: string;
  resource: string;
  details: any;
  ipAddress?: string;
  createdAt: string;
}

export interface ReleaseVersion {
  id: string;
  version: string;
  releaseNotes: string;
  status: 'DRAFT' | 'BETA' | 'STABLE' | 'DEPRECATED';
  rolloutPercentage: number;
  releasedAt?: string;
  createdAt: string;
}

export interface TenantInfo {
  id: string;
  name: string;
  plan: 'FREE' | 'PRO' | 'ENTERPRISE';
  status: 'ACTIVE' | 'SUSPENDED' | 'MAINTENANCE';
  userCount: number;
  studentCount: number;
  storageUsed: number; // in bytes
  createdAt: string;
}

export interface PlatformFeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number;
  organizationIds: string[];
}

export interface Parent {
  parentId: string;
  organizationId: string;
  userId: string;
  fullName: string;
  phone: string;
  email: string;
  avatar?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface StudentParent {
  id: string;
  organizationId: string;
  studentId: string;
  parentId: string;
  relationship: 'FATHER' | 'MOTHER' | 'GUARDIAN' | 'OTHER';
}

export interface LeaveRequest {
  id: string;
  organizationId: string;
  campusId: string;
  studentId: string;
  parentId: string;
  classId: string;
  date: string;
  reason: string;
  attachmentUrl?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  teacherNote?: string;
  createdAt: string;
}

export interface ParentNotification {
  id: string;
  organizationId: string;
  parentId: string;
  studentId?: string;
  type: 'ATTENDANCE' | 'BILLING' | 'SCHEDULE' | 'ANNOUNCEMENT' | 'EMERGENCY';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationTemplate {
  id: string;
  organizationId: string;
  name: string;
  category: 'ATTENDANCE' | 'BILLING' | 'INVOICE' | 'PAYMENT' | 'SCHEDULE' | 'ANNOUNCEMENT' | 'EMERGENCY' | 'SYSTEM';
  channels: ('IN_APP' | 'EMAIL' | 'SMS' | 'PUSH' | 'ZALO_OA' | 'WEBHOOK')[];
  titleTemplate: string;
  bodyTemplate: string;
  variables: string[]; // e.g. ['StudentName', 'ClassName', 'Date']
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface NotificationCampaign {
  id: string;
  organizationId: string;
  campusId?: string;
  name: string;
  templateId?: string;
  category: string;
  targetAudience: 'ALL' | 'CAMPUS' | 'CLASS' | 'STUDENT' | 'PARENT' | 'TEACHER';
  targetIds: string[];
  channels: ('IN_APP' | 'EMAIL' | 'SMS' | 'PUSH' | 'ZALO_OA' | 'WEBHOOK')[];
  title: string;
  message: string;
  status: 'DRAFT' | 'SCHEDULED' | 'SENDING' | 'COMPLETED' | 'CANCELLED';
  scheduledAt?: string;
  sentCount: number;
  readCount: number;
  failedCount: number;
  createdAt: string;
  createdBy: string;
}

export interface SystemNotification {
  id: string;
  organizationId: string;
  campusId?: string;
  campaignId?: string;
  senderId: string;
  receiverId: string;
  channel: 'IN_APP' | 'EMAIL' | 'SMS' | 'PUSH' | 'ZALO_OA' | 'WEBHOOK';
  category: 'ATTENDANCE' | 'BILLING' | 'INVOICE' | 'PAYMENT' | 'SCHEDULE' | 'ANNOUNCEMENT' | 'EMERGENCY' | 'SYSTEM';
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'CRITICAL';
  title: string;
  message: string;
  data?: Record<string, any>;
  status: 'DRAFT' | 'QUEUED' | 'SENDING' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED' | 'CANCELLED';
  scheduledAt?: string;
  sentAt?: string;
  readAt?: string;
  createdAt: string;
  errorReason?: string;
  retryCount: number;
}

export interface UserNotificationSetting {
  id: string;
  userId: string;
  organizationId: string;
  channels: {
    IN_APP: boolean;
    EMAIL: boolean;
    SMS: boolean;
    PUSH: boolean;
    ZALO_OA: boolean;
  };
  categories: Record<string, boolean>; // e.g. { 'ATTENDANCE': true, 'BILLING': true }
  updatedAt: string;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'ADMIN' | 'TEACHER' | 'ASSISTANT' | 'OWNER' | 'MANAGER' | 'ACCOUNTANT' | 'VIEWER' | 'PARENT';
  organizationId?: string;
  campusId?: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

export interface Teacher {
  teacherId: string;
  organizationId: string;
  campusId: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Classroom {
  classId: string;
  organizationId: string;
  campusId: string;
  classCode: string;
  className: string;
  shortName: string;
  description: string;
  teacherId: string;
  assistantId: string;
  schoolYear: string;
  semester: string;
  schedule: string;
  room: string;
  color: string;
  logo: string;
  maxCapacity: number;
  studentCount: number;
  startDate: string;
  endDate: string;
  tuitionFee: number;
  tuitionType: 'month' | 'session' | 'course' | 'hour';
  status: 'enrolling' | 'active' | 'paused' | 'completed' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface StudentTransferHistory {
  transferId: string;
  studentId: string;
  fromClassId: string;
  toClassId: string;
  date: string;
  performedBy: string;
  reason: string;
}

export interface Student {
  studentId: string;
  organizationId: string;
  campusId: string;
  studentCode: string;
  classId: string;
  fullName: string;
  nickname?: string;
  gender: 'male' | 'female' | 'other';
  birthday: string;
  parentName: string;
  parentRelation: string;
  phoneParent: string;
  emailParent: string;
  address: string;
  avatar: string;
  faceRegistered: boolean;
  schoolYear: string;
  enrollDate: string;
  leaveDate?: string;
  status: 'active' | 'on_leave' | 'paused' | 'dropped_out' | 'graduated' | 'archived';
  note: string;
  height?: number;
  weight?: number;
  bloodType?: string;
  allergies?: string;
  healthNotes?: string;
  hobbies?: string;
  strengths?: string;
  weaknesses?: string;
  isDeleted: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Attendance {
  attendanceId: string;
  organizationId: string;
  campusId: string;
  studentId: string;
  classId: string;
  teacherId: string;
  date: string;
  time: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: 'present' | 'absent' | 'late' | 'excused' | 'leave' | 'unknown';
  method?: 'AI' | 'Manual' | 'QR' | 'Admin';
  photo: string;
  confidence: number;
  device: string;
  gps: string;
  note: string;
  createdAt: string;
  updatedAt?: string;
  isDeleted?: boolean;
  deletedAt?: string;
}

export interface AttendanceEvent {
  eventId: string;
  studentId: string;
  classId: string;
  teacherId: string;
  time: string;
  confidence: number;
  recognitionResult: any;
  device: string;
  status: string;
  method?: 'AI' | 'Manual' | 'QR' | 'Admin';
  createdAt: string;
}

export interface AttendanceLog {
  logId: string;
  attendanceId: string;
  action: string;
  user: string;
  time: string;
  detail: string;
}

export interface TuitionPlan {
  planId: string;
  organizationId: string;
  campusId: string;
  planName: string;
  classId: string;
  type: 'session' | 'month' | 'course' | 'hour';
  price: number;
  description: string;
  status: 'active' | 'inactive';
}

export interface Payment {
  paymentId: string;
  organizationId: string;
  campusId: string;
  studentId: string;
  month: string;
  year: string;
  totalAmount: number;
  discount: number;
  paid: number;
  remaining: number;
  paymentDate: string;
  paymentMethod: 'cash' | 'transfer' | 'card' | 'momo';
  collector: string;
  note: string;
}

export interface MonthlyReport {
  reportId: string;
  month: string;
  year: string;
  classId: string;
  excelFile: string;
  pdfFile: string;
  createdAt: string;
}

export interface FaceEmbedding {
  embeddingId: string;
  studentId: string;
  vector: number[];
  version: string;
  createdAt: string;
}

export interface Notification {
  notificationId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}

export interface Log {
  logId: string;
  action: string;
  user: string;
  time: string;
  detail: string;
}

export interface Settings {
  settingsId: string;
  schoolName: string;
  teacherName: string;
  logo: string;
  theme: string;
  language: string;
  camera: any;
  attendance: any;
}

export interface ClassSchedule {
  scheduleId: string;
  classId: string;
  schoolYear: string;
  semester: string;
  repeatRule: 'weekly' | 'biweekly' | 'monthly' | 'custom';
  daysOfWeek: number[]; // 0 for Sunday, 1 for Monday, etc.
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  roomId: string;
  teacherId: string;
  assistantId?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface ClassSession {
  sessionId: string;
  classId: string;
  scheduleId?: string; // If generated from a schedule
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  roomId: string;
  teacherId: string;
  assistantId?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'holiday' | 'makeup' | 'rescheduled';
  isGenerated: boolean;
  topic?: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Holiday {
  holidayId: string;
  name: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  appliedTo: 'all' | 'specific_classes';
  classIds?: string[]; // If applied to specific classes
  createdAt: string;
  updatedAt: string;
}

export interface MakeupSession {
  makeupId: string;
  originalSessionId: string;
  makeupSessionId: string;
  classId: string;
  teacherId: string;
  roomId: string;
  reason: string;
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  roomId: string;
  name: string;
  code: string;
  capacity: number;
  location?: string;
  status: 'active' | 'inactive' | 'maintenance';
}

export interface BillingRule {
  ruleId: string;
  classId: string;
  ruleName: string;
  billingType: 'session' | 'month' | 'course' | 'hour' | 'actual_session' | 'registered_session' | 'hybrid';
  unitPrice: number;
  currency: string;
  effectiveFrom: string;
  effectiveTo?: string;
  policy: {
    chargeExcusedAbsence: boolean;
    chargeUnexcusedAbsence: boolean;
    chargeMakeup: boolean;
    chargeTrial: boolean;
    chargeOpening: boolean;
    chargeClosing: boolean;
  };
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface DiscountPolicy {
  discountId: string;
  name: string;
  type: 'percentage' | 'fixed_amount' | 'voucher' | 'sibling' | 'multi_class' | 'early_bird';
  value: number;
  maxAmount?: number;
  currency?: string;
  status: 'active' | 'inactive';
}

export interface Scholarship {
  scholarshipId: string;
  studentId: string;
  name: string;
  type: '100%' | '75%' | '50%' | '25%' | 'custom';
  customValue?: number; // %
  effectiveFrom: string;
  effectiveTo?: string;
  status: 'active' | 'inactive';
}

export interface Invoice {
  invoiceId: string;
  studentId: string;
  classId: string;
  month: number;
  year: number;
  subtotal: number;
  discount: number;
  scholarshipAmount: number;
  tax: number;
  total: number;
  paid: number;
  remaining: number;
  status: 'draft' | 'issued' | 'paid' | 'cancelled' | 'refunded';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  itemId: string;
  invoiceId: string;
  sessionId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface PaymentReceipt {
  receiptId: string;
  invoiceId: string;
  amount: number;
  method: 'cash' | 'transfer' | 'qr' | 'ewallet' | 'other';
  collector: string;
  time: string;
  note: string;
  status: 'success' | 'cancelled' | 'refunded';
  createdAt: string;
}

export interface Debt {
  debtId: string;
  studentId: string;
  totalDebt: number;
  overdueAmount: number;
  lastCalculated: string;
}

export interface BillingRun {
  runId: string;
  month: number;
  year: number;
  targetType: 'all' | 'class';
  classIds?: string[];
  totalInvoices: number;
  totalAmount: number;
  status: 'preview' | 'completed' | 'failed';
  createdAt: string;
  createdBy: string;
}

export interface BackupHistory {
  backupId: string;
  fileName: string;
  fileUrl: string;
  size: number;
  createdAt: string;
  createdBy: string;
}

export interface KPI {
  totalStudents: number;
  totalClasses: number;
  totalTeachers: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  revenueMonth: number;
  debtTotal: number;
  newStudents: number;
  activeClasses: number;
  attendanceRate: number; // percentage
  collectionRate: number; // percentage
  averageClassSize: number;
}

export interface SavedReport {
  reportId: string;
  name: string;
  description: string;
  type: 'attendance' | 'revenue' | 'student' | 'teacher' | 'class' | 'tuition' | 'debt' | 'ai';
  config: Record<string, any>;
  isFavorite: boolean;
  isScheduled: boolean;
  schedulePattern?: string; // cron or similar
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}
