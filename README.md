<<<<<<< HEAD
 
=======
app/
├── actions/
│   └── submitMouForm.ts          # Server Action (updated)
├── schemas/
│   └── mouSchema.ts              # Zod validation (unchanged)
lib/
├── rate-limit.ts                 # NEW: Simple in-memory limiter
├── security.ts                   # NEW: Security utilities
components/
├── forms/
│   ├── GenericForm.tsx           # Form hook (unchanged)
│   ├── fields/                   # All field components (unchanged)
│   │   ├── FormFieldInput.tsx
│   │   ├── FormFieldTextarea.tsx
│   │   ├── FormFieldNumber.tsx
│   │   ├── FormFieldCheckbox.tsx
│   │   ├── FormFieldFile.tsx
│   │   └── SubmitButton.tsx
│   └── StatusMessage.tsx
>>>>>>> e612356 (feat: Add form components and validation for MoU request)
