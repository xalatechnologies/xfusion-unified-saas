
import React from "react";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  iconClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  className?: string;
}

export const PageHeader = ({
  icon: Icon,
  title,
  subtitle,
  iconClassName = "w-5 h-5 text-blue-600",
  titleClassName = "text-xl font-semibold text-gray-900",
  subtitleClassName = "text-sm text-gray-600",
  className = "flex items-center space-x-3 mb-6"
}: PageHeaderProps) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
        <Icon className={iconClassName} />
      </div>
      <div className="text-left">
        <h2 className={titleClassName}>{title}</h2>
        {subtitle && (
          <p className={subtitleClassName}>{subtitle}</p>
        )}
      </div>
    </div>
  );
};
