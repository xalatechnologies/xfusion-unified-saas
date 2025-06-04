
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Organization from "./pages/Organization";
import OrganizationAdmin from "./pages/OrganizationAdmin";
import OrganizationAdminMembers from "./pages/OrganizationAdminMembers";
import OrganizationAdminSettings from "./pages/OrganizationAdminSettings";
import OrganizationAdminBranding from "./pages/OrganizationAdminBranding";
import OrganizationAdminSubscription from "./pages/OrganizationAdminSubscription";
import WorkOrders from "./pages/WorkOrders";
import Procedures from "./pages/Procedures";
import TranslationManagement from "./pages/TranslationManagement";
import InviteAccept from "./pages/InviteAccept";
import NotFound from "./pages/NotFound";
import SaasDashboard from "./pages/SaasDashboard";
import SaasOrganizations from "./pages/SaasOrganizations";
import SaasUsers from "./pages/SaasUsers";
import SaasSubscriptions from "./pages/SaasSubscriptions";
import SaasBilling from "./pages/SaasBilling";
import SaasAnalytics from "./pages/SaasAnalytics";
import SaasSettings from "./pages/SaasSettings";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <LanguageProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/invite/:token" element={<InviteAccept />} />
                
                {/* Main App Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/organization" element={
                  <ProtectedRoute>
                    <Organization />
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
                <Route path="/translations" element={
                  <ProtectedRoute>
                    <TranslationManagement />
                  </ProtectedRoute>
                } />

                {/* Organization Admin Routes */}
                <Route path="/org-admin" element={
                  <ProtectedRoute>
                    <OrganizationAdmin />
                  </ProtectedRoute>
                } />
                <Route path="/org-admin/members" element={
                  <ProtectedRoute>
                    <OrganizationAdminMembers />
                  </ProtectedRoute>
                } />
                <Route path="/org-admin/settings" element={
                  <ProtectedRoute>
                    <OrganizationAdminSettings />
                  </ProtectedRoute>
                } />
                <Route path="/org-admin/branding" element={
                  <ProtectedRoute>
                    <OrganizationAdminBranding />
                  </ProtectedRoute>
                } />
                <Route path="/org-admin/subscription" element={
                  <ProtectedRoute>
                    <OrganizationAdminSubscription />
                  </ProtectedRoute>
                } />
                
                {/* SAAS Admin Routes */}
                <Route path="/saas" element={
                  <ProtectedRoute>
                    <SaasDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/saas/organizations" element={
                  <ProtectedRoute>
                    <SaasOrganizations />
                  </ProtectedRoute>
                } />
                <Route path="/saas/users" element={
                  <ProtectedRoute>
                    <SaasUsers />
                  </ProtectedRoute>
                } />
                <Route path="/saas/subscriptions" element={
                  <ProtectedRoute>
                    <SaasSubscriptions />
                  </ProtectedRoute>
                } />
                <Route path="/saas/billing" element={
                  <ProtectedRoute>
                    <SaasBilling />
                  </ProtectedRoute>
                } />
                <Route path="/saas/analytics" element={
                  <ProtectedRoute>
                    <SaasAnalytics />
                  </ProtectedRoute>
                } />
                <Route path="/saas/settings" element={
                  <ProtectedRoute>
                    <SaasSettings />
                  </ProtectedRoute>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </LanguageProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
