
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface UserExportProps {
  users: any[];
  selectedUsers?: string[];
}

export function UserExport({ users, selectedUsers }: UserExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const getUserDisplayName = (user: any) => {
    if (user?.first_name || user?.last_name) {
      return `${user.first_name || ''} ${user.last_name || ''}`.trim();
    }
    return user?.email || "User";
  };

  const exportToCSV = async (data: any[], filename: string) => {
    setIsExporting(true);
    try {
      const headers = ['Name', 'Email', 'First Name', 'Last Name', 'Created At', 'Status', 'System Role'];
      const csvContent = [
        headers.join(','),
        ...data.map(user => [
          `"${getUserDisplayName(user)}"`,
          `"${user.email}"`,
          `"${user.first_name || ''}"`,
          `"${user.last_name || ''}"`,
          `"${new Date(user.created_at).toLocaleDateString()}"`,
          '"Active"', // Mock status
          '"User"' // Mock role
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Export successful",
        description: `Exported ${data.length} users to ${filename}`
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export users.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportAll = () => {
    exportToCSV(users, 'all-users.csv');
  };

  const handleExportSelected = () => {
    if (!selectedUsers || selectedUsers.length === 0) {
      toast({
        title: "No users selected",
        description: "Please select users to export.",
        variant: "destructive"
      });
      return;
    }
    
    const selectedData = users.filter(user => selectedUsers.includes(user.id));
    exportToCSV(selectedData, 'selected-users.csv');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isExporting}>
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? "Exporting..." : "Export"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleExportAll}>
          Export All Users ({users.length})
        </DropdownMenuItem>
        {selectedUsers && selectedUsers.length > 0 && (
          <DropdownMenuItem onClick={handleExportSelected}>
            Export Selected ({selectedUsers.length})
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
