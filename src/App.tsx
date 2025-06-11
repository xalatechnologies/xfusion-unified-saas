import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./apps/supplymantix/pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./apps/supplymantix/pages/Dashboard";
import WorkOrders from "./apps/supplymantix/pages/WorkOrders";
import Procedures from "./apps/supplymantix/pages/Procedures";
import Organization from "./pages/Organization";
import OrganizationAdmin from "./apps/organization-admin/pages/OrganizationAdmin";
import OrganizationAdminSettings from "./apps/organization-admin/pages/OrganizationAdminSettings";
import OrganizationAdminMembers from "./apps/organization-admin/pages/OrganizationAdminMembers";
import OrganizationAdminSubscription from "./apps/organization-admin/pages/OrganizationAdminSubscription";
import OrganizationAdminBranding from "./apps/organization-admin/pages/OrganizationAdminBranding";
import SaasDashboard from "./apps/saas-admin/pages/SaasDashboard";
import SaasUsers from "./apps/saas-admin/pages/SaasUsers";
import SaasOrganizations from "./apps/saas-admin/pages/SaasOrganizations";
import SaasSubscriptions from "./apps/saas-admin/pages/SaasSubscriptions";
import SaasBilling from "./apps/saas-admin/pages/SaasBilling";
import SaasAnalytics from "./apps/saas-admin/pages/SaasAnalytics";
import SaasSettings from "./apps/saas-admin/pages/SaasSettings";
import SaasThemes from "./apps/saas-admin/pages/SaasThemes";
import SaasTranslations from "./apps/saas-admin/pages/SaasTranslations";
import SaasDocumentation from "./apps/saas-admin/pages/SaasDocumentation";
import TranslationManagement from "./pages/TranslationManagement";
import InviteAccept from "./pages/InviteAccept";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <LanguageProvider>
              <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/invite/:token" element={<InviteAccept />} />
                  
                  {/* Protected Routes */}
                  <Route path="/supplymantix" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard" element={<Navigate to="/supplymantix" replace />} />
                  <Route path="/work-orders" element={
                    <ProtectedRoute>
                      <WorkOrders />
                    </ProtectedRoute>
                  } />
                  <Route path="/procedures" element={
                    <ProtectedRoute>
                      <Procedures />
                    </ProtectedRoute>
                  } />
                  <Route path="/organization" element={
                    <ProtectedRoute>
                      <Organization />
                    </ProtectedRoute>
                  } />
                  
                  {/* Organization Admin Routes */}
                  <Route path="/org-admin" element={
                    <ProtectedRoute>
                      <OrganizationAdmin />
                    </ProtectedRoute>
                  } />
                  <Route path="/org-admin/settings" element={
                    <ProtectedRoute>
                      <OrganizationAdminSettings />
                    </ProtectedRoute>
                  } />
                  <Route path="/org-admin/members" element={
                    <ProtectedRoute>
                      <OrganizationAdminMembers />
                    </ProtectedRoute>
                  } />
                  <Route path="/org-admin/subscription" element={
                    <ProtectedRoute>
                      <OrganizationAdminSubscription />
                    </ProtectedRoute>
                  } />
                  <Route path="/org-admin/branding" element={
                    <ProtectedRoute>
                      <OrganizationAdminBranding />
                    </ProtectedRoute>
                  } />
                  
                  {/* SAAS Admin Routes */}
                  <Route path="/saas-admin" element={
                    <ProtectedRoute>
                      <SaasDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/saas-admin/users" element={
                    <ProtectedRoute>
                      <SaasUsers />
                    </ProtectedRoute>
                  } />
                  <Route path="/saas-admin/organizations" element={
                    <ProtectedRoute>
                      <SaasOrganizations />
                    </ProtectedRoute>
                  } />
                  <Route path="/saas-admin/subscriptions" element={
                    <ProtectedRoute>
                      <SaasSubscriptions />
                    </ProtectedRoute>
                  } />
                  <Route path="/saas-admin/billing" element={
                    <ProtectedRoute>
                      <SaasBilling />
                    </ProtectedRoute>
                  } />
                  <Route path="/saas-admin/analytics" element={
                    <ProtectedRoute>
                      <SaasAnalytics />
                    </ProtectedRoute>
                  } />
                  <Route path="/saas-admin/settings" element={
                    <ProtectedRoute>
                      <SaasSettings />
                    </ProtectedRoute>
                  } />
                  <Route path="/saas-admin/themes" element={
                    <ProtectedRoute>
                      <SaasThemes />
                    </ProtectedRoute>
                  } />
                  <Route path="/saas-admin/translations" element={
                    <ProtectedRoute>
                      <SaasTranslations />
                    </ProtectedRoute>
                  } />
                  <Route path="/saas-admin/documentation" element={
                    <ProtectedRoute>
                      <SaasDocumentation />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/translations" element={
                    <ProtectedRoute>
                      <TranslationManagement />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
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
