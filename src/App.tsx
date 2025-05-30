
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import WorkOrders from "./pages/WorkOrders";
import Procedures from "./pages/Procedures";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/work-orders" element={<WorkOrders />} />
          <Route path="/dashboard/procedures" element={<Procedures />} />
          
          {/* Placeholder routes for other modules */}
          <Route path="/dashboard/users" element={<Dashboard />} />
          <Route path="/dashboard/organization" element={<Dashboard />} />
          <Route path="/dashboard/subscriptions" element={<Dashboard />} />
          <Route path="/dashboard/purchase-orders" element={<Dashboard />} />
          <Route path="/dashboard/requests" element={<Dashboard />} />
          <Route path="/dashboard/assets" element={<Dashboard />} />
          <Route path="/dashboard/inventory" element={<Dashboard />} />
          <Route path="/dashboard/meters" element={<Dashboard />} />
          <Route path="/dashboard/locations" element={<Dashboard />} />
          <Route path="/dashboard/reporting" element={<Dashboard />} />
          <Route path="/dashboard/messages" element={<Dashboard />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
