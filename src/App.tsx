import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Organization from "./pages/Organization";
import TranslationManagement from "./pages/TranslationManagement";
import InviteAccept from "./pages/InviteAccept";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Suspense, lazy } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

const Index = lazy(() => import("./apps/supplymantix/pages/Index"));
const Dashboard = lazy(() => import("./apps/supplymantix/pages/Dashboard"));
const Procedures = lazy(() => import("./apps/supplymantix/pages/Procedures"));
const WorkOrders = lazy(() => import("./apps/supplymantix/pages/WorkOrders"));

const OrganizationAdmin = lazy(() => import("./apps/organization-admin/pages/OrganizationAdmin"));
const OrganizationAdminSettings = lazy(() => import("./apps/organization-admin/pages/OrganizationAdminSettings"));
const OrganizationAdminMembers = lazy(() => import("./apps/organization-admin/pages/OrganizationAdminMembers"));
const OrganizationAdminSubscription = lazy(() => import("./apps/organization-admin/pages/OrganizationAdminSubscription"));
const OrganizationAdminBranding = lazy(() => import("./apps/organization-admin/pages/OrganizationAdminBranding"));

const SaasDashboard = lazy(() => import("./apps/saas-admin/pages/SaasDashboard"));
const SaasUsers = lazy(() => import("./apps/saas-admin/pages/SaasUsers"));
const SaasOrganizations = lazy(() => import("./apps/saas-admin/pages/SaasOrganizations"));
const SaasSubscriptions = lazy(() => import("./apps/saas-admin/pages/SaasSubscriptions"));
const SaasBilling = lazy(() => import("./apps/saas-admin/pages/SaasBilling"));
const SaasAnalytics = lazy(() => import("./apps/saas-admin/pages/SaasAnalytics"));
const SaasSettings = lazy(() => import("./apps/saas-admin/pages/SaasSettings"));
const SaasThemes = lazy(() => import("./apps/saas-admin/pages/SaasThemes"));
const SaasTranslations = lazy(() => import("./apps/saas-admin/pages/SaasTranslations"));
const SaasDocumentation = lazy(() => import("./apps/saas-admin/pages/SaasDocumentation"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <LanguageProvider>
              <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900">
                <ErrorBoundary>
                  <Suspense fallback={<Spinner />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/invite/:token" element={<InviteAccept />} />
                      {/* Protected Routes */}
                      <Route path="/supplymantix" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                      <Route path="/dashboard" element={<Navigate to="/supplymantix" replace />} />
                      <Route path="/work-orders" element={<ProtectedRoute><WorkOrders /></ProtectedRoute>} />
                      <Route path="/supplymantix/procedures" element={<ProtectedRoute><Procedures /></ProtectedRoute>} />
                      <Route path="/organization" element={<ProtectedRoute><Organization /></ProtectedRoute>} />
                      {/* Organization Admin Routes */}
                      <Route path="/org-admin" element={<ProtectedRoute><OrganizationAdmin /></ProtectedRoute>} />
                      <Route path="/org-admin/settings" element={<ProtectedRoute><OrganizationAdminSettings /></ProtectedRoute>} />
                      <Route path="/org-admin/members" element={<ProtectedRoute><OrganizationAdminMembers /></ProtectedRoute>} />
                      <Route path="/org-admin/subscription" element={<ProtectedRoute><OrganizationAdminSubscription /></ProtectedRoute>} />
                      <Route path="/org-admin/branding" element={<ProtectedRoute><OrganizationAdminBranding /></ProtectedRoute>} />
                      {/* SAAS Admin Routes */}
                      <Route path="/saas-admin" element={<ProtectedRoute><SaasDashboard /></ProtectedRoute>} />
                      <Route path="/saas-admin/users" element={<ProtectedRoute><SaasUsers /></ProtectedRoute>} />
                      <Route path="/saas-admin/organizations" element={<ProtectedRoute><SaasOrganizations /></ProtectedRoute>} />
                      <Route path="/saas-admin/subscriptions" element={<ProtectedRoute><SaasSubscriptions /></ProtectedRoute>} />
                      <Route path="/saas-admin/billing" element={<ProtectedRoute><SaasBilling /></ProtectedRoute>} />
                      <Route path="/saas-admin/analytics" element={<ProtectedRoute><SaasAnalytics /></ProtectedRoute>} />
                      <Route path="/saas-admin/settings" element={<ProtectedRoute><SaasSettings /></ProtectedRoute>} />
                      <Route path="/saas-admin/themes" element={<ProtectedRoute><SaasThemes /></ProtectedRoute>} />
                      <Route path="/saas-admin/translations" element={<ProtectedRoute><SaasTranslations /></ProtectedRoute>} />
                      <Route path="/saas-admin/documentation" element={<ProtectedRoute><SaasDocumentation /></ProtectedRoute>} />
                      <Route path="/translations" element={<ProtectedRoute><TranslationManagement /></ProtectedRoute>} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </div>
              <Toaster />
              <Sonner />
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
