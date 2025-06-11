import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrganizationAdmin from "./OrganizationAdmin";
import OrganizationAdminSettings from "./OrganizationAdminSettings";
import OrganizationAdminMembers from "./OrganizationAdminMembers";
import OrganizationAdminBranding from "./OrganizationAdminBranding";
import OrganizationAdminSubscription from "./OrganizationAdminSubscription";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/org-admin" element={<OrganizationAdmin />} />
        <Route path="/org-admin/settings" element={<OrganizationAdminSettings />} />
        <Route path="/org-admin/members" element={<OrganizationAdminMembers />} />
        <Route path="/org-admin/branding" element={<OrganizationAdminBranding />} />
        <Route path="/org-admin/subscription" element={<OrganizationAdminSubscription />} />
        {/* Optionally add a catch-all route for 404s */}
      </Routes>
    </BrowserRouter>
  );
} 