import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Procedures from "./Procedures";
import WorkOrders from "./WorkOrders";
import Index from "./Index";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/supplymantix" element={<Dashboard />} />
        <Route path="/supplymantix/procedures" element={<Procedures />} />
        <Route path="/supplymantix/workorders" element={<WorkOrders />} />
        <Route path="/" element={<Index />} />
        {/* Optionally add a catch-all route for 404s */}
      </Routes>
    </BrowserRouter>
  );
} 