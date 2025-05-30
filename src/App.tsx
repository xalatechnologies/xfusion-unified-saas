
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
                path="/work-orders"
                element={
                  <ProtectedRoute>
                    <WorkOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organization"
                element={
                  <ProtectedRoute>
                    <Organization />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/procedures"
                element={
                  <ProtectedRoute>
                    <Procedures />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/translations"
                element={
                  <ProtectedRoute>
                    <TranslationManagement />
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
