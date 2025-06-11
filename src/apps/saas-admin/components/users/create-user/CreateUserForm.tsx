import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { createUserSchema, CreateUserForm as CreateUserFormType } from "./createUserSchema";

interface CreateUserFormProps {
  onSubmit: (data: CreateUserFormType) => void;
  isSubmitting: boolean;
  onCancel: () => void;
}

export function CreateUserForm({ onSubmit, isSubmitting, onCancel }: CreateUserFormProps) {
  const form = useForm<CreateUserFormType>({
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

  return (
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
          <Select value={form.watch("systemRole")} onValueChange={(value: CreateUserFormType["systemRole"]) => form.setValue("systemRole", value)}>
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

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create User"}
        </Button>
      </div>
    </form>
  );
}
