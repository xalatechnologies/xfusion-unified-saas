
import { Crown, Shield, Users, Wrench, Eye, UserCheck, Settings, FileText } from "lucide-react";

export const getRoleIcon = (role: string) => {
  switch (role) {
    case "owner":
      return Crown;
    case "admin":
      return Shield;
    case "operations_manager":
      return UserCheck;
    case "maintenance_manager":
      return Wrench;
    case "engineer":
      return Settings;
    case "technician":
      return Wrench;
    case "requester":
      return FileText;
    case "client":
      return Users;
    case "viewer":
      return Eye;
    default:
      return Users;
  }
};

export const getRoleIconColor = (role: string) => {
  switch (role) {
    case "owner":
      return "text-yellow-600";
    case "admin":
      return "text-red-600";
    case "operations_manager":
      return "text-blue-600";
    case "maintenance_manager":
      return "text-purple-600";
    case "engineer":
      return "text-green-600";
    case "technician":
      return "text-orange-600";
    case "requester":
      return "text-teal-600";
    case "client":
      return "text-pink-600";
    case "viewer":
      return "text-gray-600";
    default:
      return "text-gray-600";
  }
};

export const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "owner":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "admin":
      return "bg-red-100 text-red-800 border-red-200";
    case "operations_manager":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "maintenance_manager":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "engineer":
      return "bg-green-100 text-green-800 border-green-200";
    case "technician":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "requester":
      return "bg-teal-100 text-teal-800 border-teal-200";
    case "client":
      return "bg-pink-100 text-pink-800 border-pink-200";
    case "viewer":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

export const formatRoleName = (role: string) => {
  const roleNames: Record<string, string> = {
    owner: "Owner",
    admin: "Admin",
    operations_manager: "Operations Manager",
    maintenance_manager: "Maintenance Manager",
    engineer: "Engineer",
    technician: "Technician",
    requester: "Requester",
    client: "Client",
    viewer: "Viewer"
  };
  
  return roleNames[role] || role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};
