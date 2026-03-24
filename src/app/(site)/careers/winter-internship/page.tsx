"use client";

import { useState, useRef } from "react";

// ─────────────────────────────────────────────────────────────
// UI Components (Inline for single-file demo — extract to /components/forms)
// ─────────────────────────────────────────────────────────────

interface InputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
}

function FormInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
  error,
  disabled = false,
}: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-slate-200 font-medium mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`
          w-full px-4 py-3 rounded-lg bg-slate-800 border text-slate-100 
          placeholder-slate-500 focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:border-transparent transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${
            error
              ? "border-red-500 focus:ring-red-500 animate-pulse"
              : "border-slate-700 hover:border-slate-600"
          }
        `}
      />
      {error && (
        <p
          className="mt-1 text-sm text-red-400 flex items-center gap-1"
          role="alert"
        >
          <span aria-hidden="true">⚠️</span> {error}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────

interface TextareaProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
}

function FormTextarea({
  id,
  name,
  label,
  placeholder,
  rows = 5,
  required = false,
  value,
  onChange,
  error,
  disabled = false,
}: TextareaProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-slate-200 font-medium mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`
          w-full px-4 py-3 rounded-lg bg-slate-800 border text-slate-100 
          placeholder-slate-500 focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:border-transparent transition-all duration-200
          resize-vertical disabled:opacity-50 disabled:cursor-not-allowed
          ${
            error
              ? "border-red-500 focus:ring-red-500 animate-pulse"
              : "border-slate-700 hover:border-slate-600"
          }
        `}
      />
      {error && (
        <p
          className="mt-1 text-sm text-red-400 flex items-center gap-1"
          role="alert"
        >
          <span aria-hidden="true">⚠️</span> {error}
        </p>
      )}
      <p className="mt-1 text-xs text-slate-500 text-right">
        {value?.length || 0}/2000 characters
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────

interface FileUploadProps {
  id: string;
  name: string;
  label: string;
  accept?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  fileName?: string;
  onFileSelect?: (file: File | null) => void;
}

function FormFileUpload({
  id,
  name,
  label,
  accept,
  helperText,
  required = false,
  disabled = false,
  error,
  fileName,
  onFileSelect,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileSelect?.(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = e.dataTransfer.files;
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelect?.(file);
  };

  return (
    <div className="mb-4">
      <label className="block text-slate-200 font-medium mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled)
            e.currentTarget.classList.add("border-blue-500", "bg-blue-900/10");
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove("border-blue-500", "bg-blue-900/10");
        }}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-lg p-5 text-center
          transition-all duration-200 cursor-pointer group
          ${
            error
              ? "border-red-500 bg-red-900/10 animate-pulse"
              : disabled
                ? "border-slate-700 bg-slate-800/30 cursor-not-allowed opacity-50"
                : "border-slate-600 bg-slate-800/50 hover:border-blue-500 hover:bg-slate-800"
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          id={id}
          name={name}
          accept={accept}
          disabled={disabled}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-describedby={helperText ? `${id}-help` : undefined}
        />

        <div className="flex flex-col items-center gap-3 pointer-events-none">
          <svg
            className={`w-10 h-10 transition-colors ${error ? "text-red-400" : "text-slate-400 group-hover:text-blue-400"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>

          <div>
            <p className="text-slate-300 font-medium">
              {fileName || "Click to upload or drag & drop"}
            </p>
            <p className="text-slate-500 text-sm mt-1">
              PDF, DOC, DOCX • Max 10MB
            </p>
          </div>
        </div>
      </div>

      {/* Selected file preview */}
      {fileName && !error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-green-400 bg-green-900/20 px-3 py-2 rounded-lg border border-green-800/50">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="truncate font-medium">{fileName}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onFileSelect?.(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            className="ml-auto text-green-400 hover:text-green-300 transition-colors"
            aria-label="Remove file"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {helperText && (
        <p id={`${id}-help`} className="mt-2 text-xs text-slate-500">
          {helperText}
        </p>
      )}

      {error && (
        <p
          className="mt-2 text-sm text-red-400 flex items-center gap-1"
          role="alert"
        >
          <span aria-hidden="true">⚠️</span> {error}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────

function SubmitButton({
  isSubmitting = false,
  label = "Submit Request",
  submittingLabel = "Processing...",
  successLabel = "✓ Submitted!",
}: {
  isSubmitting?: boolean;
  label?: string;
  submittingLabel?: string;
  successLabel?: string;
}) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`
        w-full py-3 px-6 rounded-lg font-semibold text-white
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-offset-slate-950 transition-all duration-200 
        flex items-center justify-center gap-2
        ${
          isSubmitting
            ? "bg-slate-700 cursor-wait"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500 shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50"
        }
      `}
    >
      {isSubmitting ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>{submittingLabel}</span>
        </>
      ) : (
        <>
          <span>{label}</span>
          <svg
            className="w-4 h-4 opacity-80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────

export default function WinterInternshipPage() {
  // UI-only state for demo purposes
  const [formData, setFormData] = useState({
    organization_name: "",
    authorized_person_name: "",
    email: "",
    phone: "",
    purpose: "",
    winter_internship_name: "",
    "College_ University_name": "",
    "Batch_Major": "",
    "year_of_study": "",
  });
  const [fileName, setFileName] = useState<string>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error" | null
  >(null);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[name];
        return n;
      });
    }
  };

  const handleFileSelect = (file: File | null) => {
    if (file) {
      // Mock file validation (UI only)
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const validExts = [".pdf", ".doc", ".docx"];
      const ext = "." + file.name.split(".").pop()?.toLowerCase();

      if (!validExts.includes(ext)) {
        setErrors((prev) => ({
          ...prev,
          document: "Only PDF, DOC, or DOCX files are allowed",
        }));
        setFileName(undefined);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          document: "File size must be less than 10MB",
        }));
        setFileName(undefined);
        return;
      }

      setErrors((prev) => {
        const n = { ...prev };
        delete n.document;
        return n;
      });
      setFileName(file.name);
    } else {
      setFileName(undefined);
      setErrors((prev) => {
        const n = { ...prev };
        delete n.document;
        return n;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock validation
    const newErrors: Record<string, string> = {};
    if (!formData.organization_name.trim())
      newErrors.organization_name = "Organization name is required";
    if (!formData.authorized_person_name.trim())
      newErrors.authorized_person_name = "Authorized person is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.purpose.trim())
      newErrors.purpose = "Please describe your purpose";
    if (formData.purpose.length < 20)
      newErrors.purpose = "Purpose must be at least 20 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitStatus("error");
      return;
    }

    // Mock submission flow
    setIsSubmitting(true);
    setSubmitStatus(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");

      // Reset form after success (UI only)
      setTimeout(() => {
        setFormData({
          organization_name: "",
          authorized_person_name: "",
          email: "",
          phone: "",
          purpose: "",
          winter_internship_name: "",
          "College_ University_name": "",
          "Batch_Major": "",
          "year_of_study": "",             
        });
        setFileName(undefined);
        setSubmitStatus("idle");
      }, 4000);
    }, 1500);
  };

  return (
    <section className="w-full bg-slate-950 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-3 inline-block border-b-2 border-blue-500 pb-2">
           Winter Internship

          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
           Apply for our Winter Internship program.


          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 shadow-2xl border border-slate-800">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            noValidate
            className="space-y-2"
          >
            {/* Status Messages */}
            {submitStatus === "success" && (
              <div
                className="mb-6 p-4 bg-green-900/20 border border-green-800 rounded-lg text-green-300 flex items-start gap-3 animate-in slide-in-from-top-2"
                role="alert"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="font-medium">Request Submitted!</p>
                  <p className="text-green-400/90 text-sm mt-1">
                    Thank you! Your MoU request has been received. We'll contact
                    you within 48 hours.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === "error" && Object.keys(errors).length > 0 && (
              <div
                className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-300 flex items-start gap-3 animate-in slide-in-from-top-2"
                role="alert"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p>Please fix the highlighted errors before submitting.</p>
              </div>
            )}

            {/* Row 1: name + email*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="Winter_internship_name"
                name="Winter_internship_name"
                label="Name"
                placeholder="Name"
                required
                value={formData.winter_internship_name}
                onChange={(e) =>
                  handleChange("Winter_internship_name", e.target.value)
                }
                error={errors.Winter_internship_name}
                disabled={isSubmitting || submitStatus === "success"}
              />

              <FormInput
                id="email"
                name="email"
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={errors.email}
                disabled={isSubmitting || submitStatus === "success"}
              />
            </div>

            {/* Row 2:   Phone + college name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="phone"
                name="phone"
                label="Phone Number"
                type="tel"
                placeholder="Your phone number"
                required
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                error={errors.phone}
                disabled={isSubmitting || submitStatus === "success"}
              />

              <FormInput
                id="College_University_name"
                name="College_University_name"
                label="College/University"
                placeholder="College/University Name"               
                value={formData["College_ University_name"]}
                onChange={(e) =>
                  handleChange("College_ University_name", e.target.value)
                }
                error={errors["College_ University_name"]}
                disabled={isSubmitting || submitStatus === "success"}
              />
            </div>

             {/* Row 3: branch + year of study*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <FormInput
                id="Batch_Major"
                name="Batch_Major"
                label="Batch/Major"
                placeholder="Batch/Major"                 
                value={formData["Batch_Major"]}
                onChange={(e) =>
                  handleChange("Batch_Major", e.target.value)
                }
                error={errors["Batch_Major"]}
                disabled={isSubmitting || submitStatus === "success"}
              />

              <FormInput
                id="year_of_study"
                name="year_of_study"
                label="Year of Study"
                type="tel"
                placeholder="year of study"
              
                value={formData.year_of_study}
                onChange={(e) => handleChange("year_of_study", e.target.value)}
                error={errors.year_of_study}
                disabled={isSubmitting || submitStatus === "success"}
              />
            </div>

            {/* Purpose Textarea */}
            <FormTextarea
              id="purpose"
              name="purpose"
              label="Message / Cover Letter"
              placeholder="Leave your message for us here..."
              rows={5}
              required
              value={formData.purpose}
              onChange={(e) => handleChange("purpose", e.target.value)}
              error={errors.purpose}
              disabled={isSubmitting || submitStatus === "success"}
            />

            {/* Document Upload */}
            <FormFileUpload
              id="document"
              name="document"
              label="Upload Resume/CV (PDF/DOCs, Max 5MB) "
              required
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              helperText="Accepted formats: PDF, DOC, DOCX. Max size: 5MB."
              fileName={fileName}
              onFileSelect={handleFileSelect}
              error={errors.document}
              disabled={isSubmitting || submitStatus === "success"}
            />

            {/* Security Notice */}
            <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg text-blue-300 text-sm flex items-start gap-3 mb-4">
              <svg
                className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <div>
                <p className="font-medium">Your data is protected</p>
                <p className="text-blue-400/80 mt-1">
                  All submissions are encrypted, rate-limited, and transmitted
                  securely.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <SubmitButton
                isSubmitting={isSubmitting}
                label="Submit Request"
                submittingLabel="Submitting..."
                successLabel="✓ Request Submitted!"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
