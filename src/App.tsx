
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import WorkOrders from "./pages/WorkOrders";
import Procedures from "./pages/Procedures";
import Organization from "./pages/Organization";
import OrganizationAdmin from "./pages/OrganizationAdmin";
import OrganizationAdminSettings from "./pages/OrganizationAdminSettings";
import OrganizationAdminMembers from "./pages/OrganizationAdminMembers";
import OrganizationAdminSubscription from "./pages/OrganizationAdminSubscription";
import OrganizationAdminBranding from "./pages/OrganizationAdminBranding";
import SaasDashboard from "./pages/SaasDashboard";
import SaasUsers from "./pages/SaasUsers";
import SaasOrganizations from "./pages/SaasOrganizations";
import SaasSubscriptions from "./pages/SaasSubscriptions";
import SaasBilling from "./pages/SaasBilling";
import SaasAnalytics from "./pages/SaasAnalytics";
import SaasSettings from "./pages/SaasSettings";
import SaasThemes from "./pages/SaasThemes";
import SaasTranslations from "./pages/SaasTranslations";
import SaasDocumentation from "./pages/SaasDocumentation";
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
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
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
