import { BrowserRouter, Routes, Route } from "react-router-dom";
import SaasDashboard from "./SaasDashboard";
import SaasUsers from "./SaasUsers";
import SaasOrganizations from "./SaasOrganizations";
import SaasSubscriptions from "./SaasSubscriptions";
import SaasBilling from "./SaasBilling";
import SaasAnalytics from "./SaasAnalytics";
import SaasThemes from "./SaasThemes";
import SaasTranslations from "./SaasTranslations";
import SaasDocumentation from "./SaasDocumentation";
import SaasSettings from "./SaasSettings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/saas-admin" element={<SaasDashboard />} />
        <Route path="/saas-admin/users" element={<SaasUsers />} />
        <Route path="/saas-admin/organizations" element={<SaasOrganizations />} />
        <Route path="/saas-admin/subscriptions" element={<SaasSubscriptions />} />
        <Route path="/saas-admin/billing" element={<SaasBilling />} />
        <Route path="/saas-admin/analytics" element={<SaasAnalytics />} />
        <Route path="/saas-admin/themes" element={<SaasThemes />} />
        <Route path="/saas-admin/translations" element={<SaasTranslations />} />
        <Route path="/saas-admin/documentation" element={<SaasDocumentation />} />
        <Route path="/saas-admin/settings" element={<SaasSettings />} />
        {/* Optionally add a catch-all route for 404s */}
      </Routes>
    </BrowserRouter>
  );
} 