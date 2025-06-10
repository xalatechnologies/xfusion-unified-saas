
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface ChangeAvatarDialogProps {
  user: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangeAvatarDialog({ user, open, onOpenChange }: ChangeAvatarDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a preview URL
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Mock API call - implement actual avatar upload logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Avatar updated",
        description: `Avatar has been updated for ${user.email}.`
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update avatar.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Avatar for {user?.email}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarUrl} alt={user?.email} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl">
                {user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar">Upload New Avatar</Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatarUrl">Or Enter Image URL</Label>
            <Input
              id="avatarUrl"
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Avatar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
