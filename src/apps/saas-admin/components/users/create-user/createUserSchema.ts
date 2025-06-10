
import * as z from "zod";

export const createUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  systemRole: z.enum(["super_admin", "organization_admin", "user"]),
  sendWelcomeEmail: z.boolean(),
  temporaryPassword: z.string().min(8, "Password must be at least 8 characters"),
  notes: z.string().optional()
});

export type CreateUserForm = z.infer<typeof createUserSchema>;
