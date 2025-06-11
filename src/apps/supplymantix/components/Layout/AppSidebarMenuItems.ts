import { LayoutDashboard, FileText, ClipboardList } from "lucide-react";
import React from "react";

export interface AppMenuItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

export const appSidebarMenuItems = [
  {
    title: "Dashboard",
    url: "/supplymantix",
    icon: LayoutDashboard,
  },
  {
    title: "Procedures",
    url: "/supplymantix/procedures",
    icon: FileText,
  },
  {
    title: "Work Orders",
    url: "/supplymantix/workorders",
    icon: ClipboardList,
  },
];

export const appMenuItems = appSidebarMenuItems;

export const appgroupedItems = {
  Platform: [
    {
      title: "Dashboard",
      url: "/supplymantix",
      icon: LayoutDashboard,
    },
    {
      title: "Procedures",
      url: "/supplymantix/procedures",
      icon: FileText,
    },
    {
      title: "Work Orders",
      url: "/supplymantix/workorders",
      icon: ClipboardList,
    },
  ],
}; 