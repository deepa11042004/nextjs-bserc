// schemas/formSchemas.ts
import { z } from "zod";

// MOU FORM SCHEMA
export const MouFormSchema = z.object({
  organization_name: z
    .string()
    .min(2, "Organization name must be at least 2 characters")
    .max(200, "Organization name is too long"),
  
  authorized_person_name: z
    .string()
    .min(2, "Person name must be at least 2 characters")
    .max(100, "Person name is too long"),
  
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),
  
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number")
    .min(10, "Phone number is too short")
    .max(20, "Phone number is too long"),
  
  purpose: z
    .string()
    .min(20, "Please describe your purpose (min 20 characters)")
    .max(2000, "Purpose is too long"),
  
  document: z
     .custom<File | undefined>((val) => {
    if (!val) return true; // Optional field
    return val instanceof File;
  }, "Invalid file upload")
  .optional()
  .refine((file) => {
    if (!file) return true;
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    return validTypes.includes(file.type);
  }, "Only PDF, DOC, or DOCX files are allowed")
  .refine((file) => {
    if (!file) return true;
    return file.size <= 10 * 1024 * 1024;
  }, "File size must be less than 10MB"),
  
  terms_accepted: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms and conditions"),
});

export type MouFormData = z.infer<typeof MouFormSchema>;

 