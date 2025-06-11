import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, X } from "lucide-react";
import { FilterPopover } from "@/components/shared/FilterPopover";
import { useEffect, useState } from "react";

export type UserFilters = {
  status: string;
  role: string;
  organization: string;
  dateRange: string;
};

interface UserFiltersProps {
  filters: UserFilters;
  onFiltersChange: (filters: UserFilters) => void;
}

export function UserFilters({ filters, onFiltersChange }: UserFiltersProps) {
  const hasActiveFilters = Object.values(filters).some(value => value !== "all");
  // Mock organizations for now; replace with backend data if available
  const [organizations, setOrganizations] = useState([
    { id: "all", name: "All Organizations" },
    { id: "org1", name: "Acme Corp" },
    { id: "org2", name: "Globex Inc." },
    { id: "org3", name: "Umbrella LLC" },
  ]);

  const clearFilters = () => {
    onFiltersChange({
      status: "all",
      role: "all",
      organization: "all",
      dateRange: "all"
    });
  };

  const updateFilter = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="flex items-center gap-2">
      <FilterPopover
        trigger={
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded">
                {Object.values(filters).filter(v => v !== "all").length}
              </span>
            )}
          </Button>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Filter Users</h4>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select value={filters.status} onValueChange={(value) => updateFilter("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">System Role</label>
              <Select value={filters.role} onValueChange={(value) => updateFilter("role", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="organization_admin">Organization Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Organization</label>
              <Select value={filters.organization} onValueChange={(value) => updateFilter("organization", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map(org => (
                    <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Date Range</label>
              <Select value={filters.dateRange} onValueChange={(value) => updateFilter("dateRange", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </FilterPopover>
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-2">
          <X className="w-4 h-4 mr-1" />
          Reset Filters
        </Button>
      )}
    </div>
  );
}
