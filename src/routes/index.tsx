import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@/constants';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import { ProtectedRoute, GuestRoute } from './ProtectedRoute';
import { Spinner } from '@/components/ui/spinner';

// Lazy Pages
const Login = lazy(() => import('@/pages/Login'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Schedule = lazy(() => import('@/pages/Schedule'));
const Students = lazy(() => import('@/pages/Students'));
const Classes = lazy(() => import('@/pages/Classes'));
const ClassDetail = lazy(() => import('@/pages/ClassDetail'));
const Attendance = lazy(() => import('@/pages/Attendance'));
const Camera = lazy(() => import('@/pages/Camera'));
const Tuition = lazy(() => import('@/pages/Tuition'));
const Payments = lazy(() => import('@/pages/Payments'));
const Reports = lazy(() => import('@/pages/Reports'));
const Settings = lazy(() => import('@/pages/Settings'));
const About = lazy(() => import('@/pages/About'));
const Profile = lazy(() => import('@/pages/Profile'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Terms = lazy(() => import('@/pages/Terms'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Health = lazy(() => import('@/pages/Health'));

// Parent Pages
const ParentDashboard = lazy(() => import('@/features/parent/pages/ParentDashboard'));
const ParentAttendance = lazy(() => import('@/features/parent/pages/ParentAttendance'));
const ParentSchedule = lazy(() => import('@/features/parent/pages/ParentSchedule'));
const ParentTuition = lazy(() => import('@/features/parent/pages/ParentTuition'));
const ParentLeave = lazy(() => import('@/features/parent/pages/ParentLeave'));
const ParentNotifications = lazy(() => import('@/features/parent/pages/ParentNotifications'));
const ParentSettings = lazy(() => import('@/features/parent/pages/ParentSettings'));

// Communication Pages
const CommunicationHub = lazy(() => import('@/features/communication/pages/CommunicationHub'));
const TemplateManager = lazy(() => import('@/features/communication/pages/TemplateManager'));
const CampaignManager = lazy(() => import('@/features/communication/pages/CampaignManager'));

// AI Insights Pages
const InsightDashboard = lazy(() => import('@/features/insights/pages/InsightDashboard'));
const AiConfigurationPage = lazy(() => import('@/features/insights/pages/AiConfigurationPage'));

// Developer Portal Pages
const DeveloperDashboard = lazy(() => import('@/features/developer/pages/DeveloperDashboard'));
const ApiKeyManager = lazy(() => import('@/features/developer/pages/ApiKeyManager'));
const WebhookManager = lazy(() => import('@/features/developer/pages/WebhookManager'));
const PluginMarketplace = lazy(() => import('@/features/developer/pages/PluginMarketplace'));
const ApiDocumentationViewer = lazy(() => import('@/features/developer/pages/ApiDocumentationViewer'));

// Platform Operations Pages
const PlatformDashboard = lazy(() => import('@/features/platform/pages/PlatformDashboard'));
const TenantManager = lazy(() => import('@/features/platform/pages/TenantManager'));
const MonitoringDashboard = lazy(() => import('@/features/platform/pages/MonitoringDashboard'));
const AlertCenter = lazy(() => import('@/features/platform/pages/AlertCenter'));
const AuditViewer = lazy(() => import('@/features/platform/pages/AuditViewer'));
const CapacityDashboard = lazy(() => import('@/features/platform/pages/CapacityDashboard'));
const ReleaseManager = lazy(() => import('@/features/platform/pages/ReleaseManager'));
const MaintenancePanel = lazy(() => import('@/features/platform/pages/MaintenancePanel'));

const SuspenseFallback = () => (
  <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-900">
    <Spinner size="lg" className="text-blue-600" />
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={<SuspenseFallback />}><AuthLayout /></Suspense>,
    children: [
      { path: ROUTES.HOME, element: <GuestRoute><Login /></GuestRoute> }, // Default to login
      { path: ROUTES.LOGIN, element: <GuestRoute><Login /></GuestRoute> },
      { path: '/terms', element: <Terms /> },
      { path: '/privacy', element: <Privacy /> },
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Suspense fallback={<SuspenseFallback />}><MainLayout /></Suspense>,
        children: [
          { path: ROUTES.DASHBOARD, element: <Dashboard /> },
          { path: ROUTES.SCHEDULE, element: <Schedule /> },
          { path: ROUTES.STUDENTS, element: <Students /> },
          { path: ROUTES.CLASSES, element: <Classes /> },
          { path: ROUTES.CLASS_DETAIL, element: <ClassDetail /> },
          { path: ROUTES.ATTENDANCE, element: <Attendance /> },
          { path: ROUTES.CAMERA, element: <Camera /> },
          { path: ROUTES.TUITION, element: <Tuition /> },
          { path: ROUTES.PAYMENTS, element: <Payments /> },
          { path: ROUTES.REPORTS, element: <Reports /> },
          { path: ROUTES.SETTINGS, element: <Settings /> },
          { path: ROUTES.ABOUT, element: <About /> },
          { path: ROUTES.PROFILE, element: <Profile /> },
          { path: '/health', element: <Health /> },
          
          // Parent Portal Routes
          { path: ROUTES.PARENT_DASHBOARD, element: <ParentDashboard /> },
          { path: ROUTES.PARENT_ATTENDANCE, element: <ParentAttendance /> },
          { path: ROUTES.PARENT_SCHEDULE, element: <ParentSchedule /> },
          { path: ROUTES.PARENT_TUITION, element: <ParentTuition /> },
          { path: ROUTES.PARENT_LEAVE, element: <ParentLeave /> },
          { path: ROUTES.PARENT_NOTIFICATIONS, element: <ParentNotifications /> },
          { path: ROUTES.PARENT_SETTINGS, element: <ParentSettings /> },
          
          // Communication Center
          { path: ROUTES.COMMUNICATION, element: <CommunicationHub /> },
          { path: ROUTES.COMMUNICATION_TEMPLATES, element: <TemplateManager /> },
          { path: ROUTES.COMMUNICATION_CAMPAIGNS, element: <CampaignManager /> },

          // AI Insights
          { path: ROUTES.INSIGHTS, element: <InsightDashboard /> },
          { path: ROUTES.INSIGHTS_CONFIG, element: <AiConfigurationPage /> },

          // Developer Portal
          { path: ROUTES.DEVELOPER_PORTAL, element: <DeveloperDashboard /> },
          { path: ROUTES.DEVELOPER_KEYS, element: <ApiKeyManager /> },
          { path: ROUTES.DEVELOPER_WEBHOOKS, element: <WebhookManager /> },
          { path: ROUTES.DEVELOPER_PLUGINS, element: <PluginMarketplace /> },
          { path: ROUTES.DEVELOPER_DOCS, element: <ApiDocumentationViewer /> },

          // Platform Operations
          { path: ROUTES.PLATFORM_DASHBOARD, element: <PlatformDashboard /> },
          { path: ROUTES.PLATFORM_TENANTS, element: <TenantManager /> },
          { path: ROUTES.PLATFORM_MONITORING, element: <MonitoringDashboard /> },
          { path: ROUTES.PLATFORM_ALERTS, element: <AlertCenter /> },
          { path: ROUTES.PLATFORM_AUDIT, element: <AuditViewer /> },
          { path: ROUTES.PLATFORM_CAPACITY, element: <CapacityDashboard /> },
          { path: ROUTES.PLATFORM_RELEASES, element: <ReleaseManager /> },
          { path: ROUTES.PLATFORM_MAINTENANCE, element: <MaintenancePanel /> },
        ]
      }
    ]
  },
  { path: '*', element: <Suspense fallback={<SuspenseFallback />}><NotFound /></Suspense> }
]);
