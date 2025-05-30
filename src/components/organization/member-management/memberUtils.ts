
import { Crown, Shield, Users } from "lucide-react";

export const getRoleIcon = (role: string) => {
  switch (role) {
    case "owner":
      return Crown;
    case "admin":
      return Shield;
    case "maintenance_manager":
    case "operations_manager":
      return Shield;
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
    case "maintenance_manager":
    case "operations_manager":
      return "text-blue-600";
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
    case "maintenance_manager":
    case "operations_manager":
      return "bg-blue-100 text-blue-800 border-blue-200";
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
  return role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};
