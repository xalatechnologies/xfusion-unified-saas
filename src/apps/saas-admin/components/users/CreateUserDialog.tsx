
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useCreateUser } from "@/hooks/useUsers";
import { useToast } from "@/hooks/use-toast";

const createUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  systemRole: z.enum(["super_admin", "organization_admin", "user"]),
  sendWelcomeEmail: z.boolean(),
  temporaryPassword: z.string().min(8, "Password must be at least 8 characters"),
  notes: z.string().optional()
});

type CreateUserForm = z.infer<typeof createUserSchema>;

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateUserDialog({ open, onOpenChange }: CreateUserDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createUserMutation = useCreateUser();
  const { toast } = useToast();

  const form = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      systemRole: "user",
      sendWelcomeEmail: true,
      temporaryPassword: "",
      notes: ""
    }
  });

  const onSubmit = async (data: CreateUserForm) => {
    setIsSubmitting(true);
    try {
      // Here you would integrate with your user creation API
      console.log("Creating user:", data);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "User created successfully",
        description: `${data.firstName} ${data.lastName} has been created and will receive a welcome email.`
      });
      
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error creating user",
        description: "There was an error creating the user. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                {...form.register("firstName")}
                placeholder="Enter first name"
              />
              {form.formState.errors.firstName && (
                <p className="text-sm text-red-600">{form.formState.errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...form.register("lastName")}
                placeholder="Enter last name"
              />
              {form.formState.errors.lastName && (
                <p className="text-sm text-red-600">{form.formState.errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="Enter email address"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>System Role</Label>
              <Select value={form.watch("systemRole")} onValueChange={(value: any) => form.setValue("systemRole", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="organization_admin">Organization Admin</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="temporaryPassword">Temporary Password</Label>
              <Input
                id="temporaryPassword"
                type="password"
                {...form.register("temporaryPassword")}
                placeholder="Enter temporary password"
              />
              {form.formState.errors.temporaryPassword && (
                <p className="text-sm text-red-600">{form.formState.errors.temporaryPassword.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              {...form.register("notes")}
              placeholder="Add any notes about this user..."
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="sendWelcomeEmail"
              checked={form.watch("sendWelcomeEmail")}
              onCheckedChange={(checked) => form.setValue("sendWelcomeEmail", checked)}
            />
            <Label htmlFor="sendWelcomeEmail">Send welcome email with login instructions</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
