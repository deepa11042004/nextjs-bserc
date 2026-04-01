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
        className={`
          w-full px-4 py-3 rounded-lg bg-slate-800 border text-slate-100 
          placeholder-slate-500 focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:border-transparent transition-all duration-200
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

interface SelectProps {
  id: string;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

function FormSelect({
  id,
  name,
  label,
  options,
  required = false,
  value,
  onChange,
  error,
}: SelectProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-slate-200 font-medium mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`
          w-full px-4 py-3 rounded-lg bg-slate-800 border text-slate-100 
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:border-transparent transition-all duration-200 appearance-none
          cursor-pointer
          ${
            error
              ? "border-red-500 focus:ring-red-500 animate-pulse"
              : "border-slate-700 hover:border-slate-600"
          }
        `}
      >
        <option disabled value="">
          Select Document Type
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
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
        onDragOver={(e) => { e.preventDefault(); if (!disabled) e.currentTarget.classList.add("border-blue-500", "bg-blue-900/10"); }}
        onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove("border-blue-500", "bg-blue-900/10"); }}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-lg p-5 text-center
          transition-all duration-200 cursor-pointer group
          ${error 
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
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
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="truncate font-medium">{fileName}</span>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onFileSelect?.(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
            className="ml-auto text-green-400 hover:text-green-300 transition-colors"
            aria-label="Remove file"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
        <p className="mt-2 text-sm text-red-400 flex items-center gap-1" role="alert">
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
        className={`
          w-full px-4 py-3 rounded-lg bg-slate-800 border text-slate-100 
          placeholder-slate-500 focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:border-transparent transition-all duration-200
          resize-vertical
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
        {value?.length || 0}/1000 characters
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────

function SubmitButton({
  isSubmitting = false,
  label = "Submit Request",
}: {
  isSubmitting?: boolean;
  label?: string;
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
          <span>Processing...</span>
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

export default function PostInternship() {
  const [formData, setFormData] = useState({
    roll_no: "",
    email: "",
    document_type: "",
    message: "",
  });
  
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

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
      const validExts = [".pdf", ".doc", ".docx"];
      const ext = "." + file.name.split(".").pop()?.toLowerCase();
      
      if (!validExts.includes(ext)) {
        setErrors(prev => ({ ...prev, document: "Only PDF, DOC, or DOCX files are allowed" }));
        setFileName(undefined);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, document: "File size must be less than 10MB" }));
        setFileName(undefined);
        return;
      }
      
      setErrors(prev => { const n = { ...prev }; delete n.document; return n; });
      setFileName(file.name);
    } else {
      setFileName(undefined);
      setErrors(prev => { const n = { ...prev }; delete n.document; return n; });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Added validation for required file upload
    const newErrors: Record<string, string> = {};
    if (!formData.roll_no) newErrors.roll_no = "Roll number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.document_type)
      newErrors.document_type = "Please select a document type";
    if (!fileName) // ✅ New: Check if file is uploaded
      newErrors.document = "File upload is required"; // ✅ Error key matches form field

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitStatus("error");
      return;
    }

    // Mock submission flow
    setIsSubmitting(true);
    setSubmitStatus("idle");

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setTimeout(() => {
        setFormData({
          roll_no: "",
          email: "",
          document_type: "",
          message: "",
        });
        setFileName(undefined);
        setErrors({});
        setSubmitStatus("idle");
      }, 4000);
    }, 1500);
  };

  const document_options = [
    { value: "Assignment Submission", label: "Assignment Submission" },
    { value: "Project Report", label: "Project Report" },
    { value: "Event Certificate Request", label: "Event Certificate Request" },
    { value: "Feedback Form", label: "Feedback Form" },
    { value: "Other", label: "Other" },
  ];

  return (
    <section className="w-full min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 py-3">
            <div className="w-1 h-3 bg-orange-400"></div>
            <p className="text-sm font-medium uppercase tracking-widest text-orange-400">
              Program Completion
            </p>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-3 inline-block border-b-2 border-blue-500 pb-2">
            Post-Internship Milestones
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Important steps to complete your internship and earn your
            certificate.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10 rounded-2xl p-6 md:p-8 shadow-2xl border border-slate-800">
          <form onSubmit={handleSubmit} noValidate className="space-y-2">
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
                    Thank you for reaching out. Our partnerships team will
                    contact you within 48 hours.
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

            {/* Email + Roll Number Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="email"
                name="email"
                label="Email Address / ईमेल पता *"
                type="email"
                placeholder="name@example.com"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={errors.email}
              />
              <FormInput
                id="roll_no"
                name="roll_no"
                label="Roll Number / रोल नंबर *"
                placeholder="Enter your roll number"
                required
                value={formData.roll_no}
                onChange={(e) => handleChange("roll_no", e.target.value)}
                error={errors.roll_no}
              />
            </div>

            {/* Document Type Select */}
            <FormSelect
              id="document_type"
              name="document_type"
              label="Document Type / दस्तावेज़ का प्रकार *"
              options={document_options}
              required
              value={formData.document_type}
              onChange={(e) => handleChange("document_type", e.target.value)}
              error={errors.document_type}
            />

            {/* ✅ File Upload - Updated: Required + Hindi Label */}
            <FormFileUpload
              id="document"
              name="document"
              label="Upload File / फाइल अपलोड करें *"  // ✅ Changed label + added asterisk
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              helperText="Accepted formats: PDF, DOC, DOCX. Max size: 10MB."
              fileName={fileName}
              onFileSelect={handleFileSelect}
              error={errors.document}              // ✅ Error key matches validation
              required={true}                       // ✅ Marked as required
              disabled={isSubmitting || submitStatus === "success"}
            />

            {/* Message Textarea */}
            <FormTextarea
              id="message"
              name="message"
              label="Additional Notes / अतिरिक्त नोट्स (Optional)"
              placeholder="Add any relevant information..."
              rows={5}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              error={errors.message}
            />

            {/* Submit Button */}
            <div className="pt-4">
              <SubmitButton isSubmitting={isSubmitting} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}