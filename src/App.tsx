
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import WorkOrders from "@/pages/WorkOrders";
import Organization from "@/pages/Organization";
import Procedures from "@/pages/Procedures";
import TranslationManagement from "@/pages/TranslationManagement";
import InviteAccept from "@/pages/InviteAccept";
import NotFound from "@/pages/NotFound";
import SaasDashboard from "@/pages/SaasDashboard";
import SaasOrganizations from "@/pages/SaasOrganizations";
import SaasUsers from "@/pages/SaasUsers";
import SaasSubscriptions from "@/pages/SaasSubscriptions";
import SaasBilling from "@/pages/SaasBilling";
import SaasAnalytics from "@/pages/SaasAnalytics";
import SaasSettings from "@/pages/SaasSettings";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/invite/:token" element={<InviteAccept />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/work-orders"
                element={
                  <ProtectedRoute>
                    <WorkOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/procedures"
                element={
                  <ProtectedRoute>
                    <Procedures />
                  </ProtectedRoute>
                }
              />
              {/* SAAS Dashboard Routes */}
              <Route
                path="/saas"
                element={
                  <ProtectedRoute>
                    <SaasDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saas/organizations"
                element={
                  <ProtectedRoute>
                    <SaasOrganizations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saas/users"
                element={
                  <ProtectedRoute>
                    <SaasUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saas/subscriptions"
                element={
                  <ProtectedRoute>
                    <SaasSubscriptions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saas/billing"
                element={
                  <ProtectedRoute>
                    <SaasBilling />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saas/analytics"
                element={
                  <ProtectedRoute>
                    <SaasAnalytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saas/translations"
                element={
                  <ProtectedRoute>
                    <TranslationManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saas/settings"
                element={
                  <ProtectedRoute>
                    <SaasSettings />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
