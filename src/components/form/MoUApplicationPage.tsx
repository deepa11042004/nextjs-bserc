"use client";

import { useState, FormEvent, useRef } from "react";
import {
  Check,
  ArrowRight,
  AlertCircle,
  Building2,
  User,
  FileText,
  Upload,
  Shield,
  Sparkles,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────

function getApiMessage(payload: unknown): string {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  const typedPayload = payload as {
    message?: unknown;
    error?: unknown;
  };

  if (typeof typedPayload.message === "string" && typedPayload.message.trim()) {
    return typedPayload.message.trim();
  }

  if (typeof typedPayload.error === "string" && typedPayload.error.trim()) {
    return typedPayload.error.trim();
  }

  return "";
}

// ─────────────────────────────────────────────────────────────
// UI Components - Def-Space Design System (Responsive)
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
  helperText?: string;
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
  helperText,
}: InputProps) {
  return (
    <div className="mb-5 w-full">
      <label
        htmlFor={id}
        className="block text-zinc-100 text-[13px] font-semibold mb-2.5"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
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
          w-full px-4 py-3 rounded-md bg-[#111111] border text-zinc-100 
          placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 
          transition-colors text-sm touch-manipulation
          ${
            error
              ? "border-red-500 focus:border-red-500/50"
              : "border-[#2a2a2a] hover:border-[#3a3a3a]"
          }
        `}
      />
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-zinc-500 break-words">{helperText}</p>
      )}
      {error && (
        <p
          className="mt-2 text-xs text-red-400 flex items-start gap-1.5"
          role="alert"
        >
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span className="break-words">{error}</span>
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
  helperText?: string;
  maxLength?: number;
}

function FormTextarea({
  id,
  name,
  label,
  placeholder,
  rows = 4,
  required = false,
  value,
  onChange,
  error,
  helperText,
  maxLength,
}: TextareaProps) {
  return (
    <div className="mb-5 w-full">
      <label
        htmlFor={id}
        className="block text-zinc-100 text-[13px] font-semibold mb-2.5"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        className={`
          w-full px-4 py-3 rounded-md bg-[#111111] border text-zinc-100 
          placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 
          transition-colors text-sm resize-y touch-manipulation
          ${
            error
              ? "border-red-500 focus:border-red-500/50"
              : "border-[#2a2a2a] hover:border-[#3a3a3a]"
          }
        `}
      />
      {(helperText || maxLength) && (
        <div className="flex justify-between items-center mt-1.5">
          {helperText && !error && (
            <p className="text-xs text-zinc-500 break-words">{helperText}</p>
          )}
          {maxLength && (
            <p className="text-xs text-zinc-600 ml-auto flex-shrink-0">
              {value?.length || 0}/{maxLength}
            </p>
          )}
        </div>
      )}
      {error && (
        <p
          className="mt-2 text-xs text-red-400 flex items-start gap-1.5"
          role="alert"
        >
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span className="break-words">{error}</span>
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────

const SectionCard = ({
  title,
  children,
  subtitle,
  id,
  icon: Icon,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  id?: string;
  icon?: React.ElementType;
}) => (
  <div
    id={id}
    className="bg-[#181818] rounded-xl border border-[#262626] p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 shadow-2xl"
  >
    <div className="mb-5 sm:mb-6 flex items-start gap-3">
      {Icon && (
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
        </div>
      )}
      <div className="min-w-0">
        <h3 className="text-white text-base sm:text-lg font-serif font-medium tracking-wide uppercase break-words">
          {title}
        </h3>
        {subtitle && (
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 break-words">
            {subtitle}
          </p>
        )}
      </div>
    </div>
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────────

function SubmitButton({
  isSubmitting = false,
  label = "Submit",
  variant = "primary",
}: {
  isSubmitting?: boolean;
  label?: string;
  variant?: "primary" | "secondary";
}) {
  const baseStyles =
    "flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold transition-all active:scale-95 touch-manipulation min-h-[48px]";
  const variants = {
    primary:
      "bg-orange-500 hover:bg-orange-600 text-black shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 disabled:bg-zinc-800 disabled:text-zinc-500",
    secondary:
      "bg-[#111111] border border-[#2a2a2a] hover:border-orange-500/50 text-zinc-100 disabled:opacity-50",
  };

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`${baseStyles} ${variants[variant]} w-full sm:w-auto`}
    >
      {isSubmitting ? (
        <>
          <svg
            className="animate-spin h-5 w-5 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span className="truncate">Processing...</span>
        </>
      ) : (
        <>
          <span className="truncate">{label}</span>
          <ArrowRight className="w-5 h-5 flex-shrink-0" />
        </>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// File Upload Component (Responsive)
// ─────────────────────────────────────────────────────────────

interface FileUploadProps {
  id: string;
  name: string;
  label: string;
  accept: string;
  maxSizeMB: number;
  helperText?: string;
  onFileSelect?: (file: File | null) => void;
  error?: string;
}

function FileUpload({
  id,
  name,
  label,
  accept,
  maxSizeMB,
  helperText,
  onFileSelect,
  error,
}: FileUploadProps) {
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file?.name || "");
    onFileSelect?.(file);
  };

  return (
    <div className="mb-5 w-full">
      <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5">
        {label}
      </label>
      <label
        htmlFor={id}
        className={`
          relative border-2 border-dashed rounded-xl py-8 sm:py-10 px-4 
          flex flex-col items-center justify-center cursor-pointer 
          transition-all text-center min-h-[140px] touch-manipulation
          ${
            error
              ? "border-red-500/50 bg-red-500/5"
              : "border-[#333] bg-[#111111]/50 hover:border-orange-500/40 hover:bg-[#161616]"
          }
        `}
      >
        <input
          type="file"
          id={id}
          name={name}
          accept={accept}
          ref={fileInputRef}
          onChange={handleFileChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <div className="mb-3 text-zinc-500 group-hover:text-orange-500 transition-colors">
          <Upload className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <p className="text-zinc-400 text-sm font-medium mb-1 px-2">
          Click to upload or drag & drop
        </p>
        <p className="text-zinc-600 text-xs px-2 break-words">
          {accept
            .replace(/\./g, "")
            .replace(/,/g, " • ")
            .toUpperCase()}{" "}
          • Max {maxSizeMB}MB
        </p>
        {fileName && (
          <p className="mt-3 text-xs text-orange-400 font-medium break-all px-2">
            Selected: {fileName}
          </p>
        )}
        {helperText && !error && !fileName && (
          <p className="mt-3 text-xs text-zinc-500 px-2 break-words">
            {helperText}
          </p>
        )}
      </label>
      {error && (
        <p
          className="mt-2 text-xs text-red-400 flex items-start gap-1.5"
          role="alert"
        >
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span className="break-words">{error}</span>
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────

type MoUFormData = {
  institutionName: string;
  registeredAddress: string;
  signatoryName: string;
  designation: string;
  officialEmail: string;
  officialPhone: string;
  alternativeEmail: string;
  proposalPurpose: string;
};

function createInitialFormData(): MoUFormData {
  return {
    institutionName: "",
    registeredAddress: "",
    signatoryName: "",
    designation: "",
    officialEmail: "",
    officialPhone: "",
    alternativeEmail: "",
    proposalPurpose: "",
  };
}

export default function MoUApplicationPage() {
  const [formData, setFormData] = useState<MoUFormData>(createInitialFormData());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | null>(null);
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const [successSnapshot, setSuccessSnapshot] = useState<{
    institutionName: string;
    signatoryName: string;
  } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const closeSuccessNotification = () => {
    setSubmitStatus(null);
    setSuccessSnapshot(null);
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (submitStatus === "success") {
      setSubmitStatus(null);
      setSuccessSnapshot(null);
    }

    if (submitStatus === "error" && submitErrorMessage) {
      setSubmitErrorMessage("");
    }

    if (errors[name]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[name];
        return n;
      });
    }
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    if (errors.supportingDocument) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n.supportingDocument;
        return n;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.institutionName.trim()) {
      newErrors.institutionName = "Institution/Organization name is required";
    }

    if (!formData.registeredAddress.trim()) {
      newErrors.registeredAddress = "Registered address is required";
    }

    if (!formData.signatoryName.trim()) {
      newErrors.signatoryName = "Full name of authorized signatory is required";
    }

    if (!formData.designation.trim()) {
      newErrors.designation = "Designation/Position is required";
    }

    if (!formData.officialEmail.trim()) {
      newErrors.officialEmail = "Official email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.officialEmail)) {
      newErrors.officialEmail = "Please enter a valid email address";
    }

    if (!formData.officialPhone.trim()) {
      newErrors.officialPhone = "Official phone number is required";
    } else if (!/^[+]?[0-9\s\-()]{10,20}$/.test(formData.officialPhone)) {
      newErrors.officialPhone = "Please enter a valid phone number with country code";
    }

    if (!formData.alternativeEmail.trim()) {
      newErrors.alternativeEmail = "Alternative contact email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.alternativeEmail)) {
      newErrors.alternativeEmail = "Please enter a valid alternative email address";
    }

    if (!formData.proposalPurpose.trim()) {
      newErrors.proposalPurpose = "Purpose and scope of proposed MoU is required";
    } else if (formData.proposalPurpose.length < 100) {
      newErrors.proposalPurpose = "Please provide a detailed proposal (minimum 100 characters)";
    }

    if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
      newErrors.supportingDocument = `File size exceeds maximum limit of 10MB`;
    }

    if (selectedFile) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        newErrors.supportingDocument = "Only PDF, DOC, or DOCX files are accepted";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitStatus("error");
      setSuccessSnapshot(null);
      setSubmitErrorMessage("Please fix the highlighted errors before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSuccessSnapshot(null);
    setSubmitErrorMessage("");
    setErrors({});

    try {
      const formDataObj = new FormData();
      
      // Append text fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });

      // Append file if selected
      if (selectedFile) {
        formDataObj.append("supportingDocument", selectedFile);
      }

      // Append metadata
      formDataObj.append("submissionType", "mou_proposal");
      formDataObj.append("timestamp", new Date().toISOString());

      const response = await fetch("/api/mou-application", {
        method: "POST",
        body: formDataObj,
      });

      const payload = (await response.json().catch(() => ({}))) as unknown;

      if (!response.ok) {
        throw new Error(
          getApiMessage(payload)
            || "Unable to submit MoU proposal. Please try again."
        );
      }

      setSuccessSnapshot({
        institutionName: formData.institutionName,
        signatoryName: formData.signatoryName,
      });
      setFormData(createInitialFormData());
      setSelectedFile(null);
      setErrors({});
      setSubmitStatus("success");
    } catch (err) {
      setSubmitStatus("error");
      setSuccessSnapshot(null);
      setSubmitErrorMessage(
        err instanceof Error && err.message
          ? err.message
          : "Unable to submit MoU proposal. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-300 py-8 sm:py-12 md:py-16 px-4 sm:px-6 selection:bg-orange-500 selection:text-black">
      {/* Success Notification - Responsive */}
      {submitStatus === "success" && successSnapshot && (
        <div className="fixed left-1/2 top-4 sm:top-5 z-[80] w-[calc(100%-2rem)] sm:w-auto sm:max-w-2xl -translate-x-1/2">
          <div className="rounded-xl border border-[#2d3023] bg-[#111111] p-4 shadow-2xl shadow-black/50 flex items-start justify-between gap-3 sm:gap-4">
            <div className="flex items-start gap-3 sm:gap-4 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                <Check className="text-orange-500 w-5 h-5" strokeWidth={2.5} />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-white truncate">MoU Proposal Submitted!</p>
                <p className="text-zinc-400 text-sm mt-1 break-words">
                  Thank you, {successSnapshot.signatoryName}. We have received your 
                  MoU proposal from{" "}
                  <span className="text-zinc-200">{successSnapshot.institutionName}</span>. 
                  Our partnerships team will review your submission and respond via email within one month.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeSuccessNotification}
              className="ml-auto rounded-full p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors flex-shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Close notification"
            >
              <span className="text-lg leading-none">×</span>
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto w-full">
        {/* Page Header - Responsive Typography & Spacing */}
        <div className="mb-8 sm:mb-12 md:mb-16 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 mb-4">
            <span className="text-orange-500 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap">
             MOU form
            </span>
            <div className="h-px w-12 sm:w-16 bg-orange-500 flex-shrink-0"></div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-white mb-4 sm:mb-5 leading-tight break-words">
          Memorandum of Understanding (MoU)
            <br className="hidden sm:block" />
            <span className="text-orange-500">Proposal Submission</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-7xl mx-auto md:mx-0 leading-relaxed break-words">
            <span className="text-orange-500 font-bold">Bharat Space Education Research Centre (BSERC) :</span>{" "}
            Propose strategic collaborations in Defence & Space Education, defence technology, rocketry, drones, robotics, AI, and Innovation programs.
          </p>
        </div>

        
        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-6">
          {/* Error Status - Responsive */}
          {submitStatus === "error" && (
            <div className="mb-4 sm:mb-6 p-4 bg-[#111111] border border-red-900/30 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300 break-words">
                {submitErrorMessage || "Please fix the highlighted errors before submitting."}
              </p>
            </div>
          )}

          {/* Section I: Institution Details */}
          <SectionCard
            title="1. Institution/Organization Details"
            icon={Building2}
          >
            <div className="space-y-4">
              <FormInput
                id="institutionName"
                name="institutionName"
                label="Name of Institution/Organization"
                placeholder="Example: ABC Institute of Technology"
                required
                value={formData.institutionName}
                onChange={(e) => handleChange("institutionName", e.target.value)}
                error={errors.institutionName}
              />
              <FormTextarea
                id="registeredAddress"
                name="registeredAddress"
                label="Registered Address"
                placeholder="Include full address with city, state, PIN code, and website URL"
                rows={3}
                required
                maxLength={500}
                value={formData.registeredAddress}
                onChange={(e) => handleChange("registeredAddress", e.target.value)}
                error={errors.registeredAddress}
                helperText="Example: 123 Innovation Park, Bengaluru, Karnataka 560001 • www.example.edu.in"
              />
            </div>
          </SectionCard>

          {/* Section II: Authorized Signatory */}
          <SectionCard
            title="2. Authorized Signatory Details"
            subtitle="Details of the official authorized to execute this MoU on behalf of your organization"
            icon={User}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                id="signatoryName"
                name="signatoryName"
                label="Full Name"
                placeholder="Dr./Prof./Mr./Ms. Full Name"
                required
                value={formData.signatoryName}
                onChange={(e) => handleChange("signatoryName", e.target.value)}
                error={errors.signatoryName}
              />
              <FormInput
                id="designation"
                name="designation"
                label="Designation/Position"
                placeholder="Examples: Director, Principal, Registrar, CEO"
                required
                value={formData.designation}
                onChange={(e) => handleChange("designation", e.target.value)}
                error={errors.designation}
              />
              <FormInput
                id="officialEmail"
                name="officialEmail"
                label="Official Email Address"
                type="email"
                placeholder="official@institution.edu.in"
                required
                value={formData.officialEmail}
                onChange={(e) => handleChange("officialEmail", e.target.value)}
                error={errors.officialEmail}
              />
              <FormInput
                id="officialPhone"
                name="officialPhone"
                label="Official Phone (with Country Code)"
                type="tel"
                placeholder="+91-XXXXXXXXXX"
                required
                value={formData.officialPhone}
                onChange={(e) => handleChange("officialPhone", e.target.value)}
                error={errors.officialPhone}
              />
              <div className="sm:col-span-2">
                <FormInput
                  id="alternativeEmail"
                  name="alternativeEmail"
                  label="Alternative Contact Email"
                  type="email"
                  placeholder="secondary@institution.edu.in"
                  required
                  value={formData.alternativeEmail}
                  onChange={(e) => handleChange("alternativeEmail", e.target.value)}
                  error={errors.alternativeEmail}
                  helperText="This email will be used for secondary coordination and confirmation updates."
                />
              </div>
            </div>
          </SectionCard>

          {/* Section III: Proposal Details */}
          <SectionCard
            title="3. Proposal Details"
            subtitle="Outline your vision for strategic collaboration with BSERC"
            icon={FileText}
          >
            <FormTextarea
              id="proposalPurpose"
              name="proposalPurpose"
              label="Purpose and Scope of Proposed MoU"
              placeholder={`Outline objectives, collaboration areas (e.g., joint rocketry/drone workshops, student exchanges, research projects), duration, and mutual benefits. 

Reference BSERC initiatives such as:
• Def-Space Corridor
• Summer School Programs
• Faculty Development Initiatives
• Industry-Academia Bridge Programs
• Innovation & Incubation Support`}
              rows={8}
              required
              maxLength={2000}
              value={formData.proposalPurpose}
              onChange={(e) => handleChange("proposalPurpose", e.target.value)}
              error={errors.proposalPurpose}
              helperText="Minimum 100 characters. Be specific about expected outcomes and timelines."
            />
          </SectionCard>

          {/* Section IV: Supporting Documents */}
          <SectionCard
            title="4. Supporting Documents"
            subtitle="Optional: Attach draft MoU, institutional profile, or project proposal"
            icon={Upload}
          >
            <FileUpload
              id="supportingDocument"
              name="supportingDocument"
              label="Upload Supporting Document"
              accept=".pdf,.doc,.docx"
              maxSizeMB={10}
              helperText="Examples: Draft MoU, Institutional profile brochure, Detailed project proposal"
              onFileSelect={handleFileSelect}
              error={errors.supportingDocument}
            />
          </SectionCard>

          {/* Declaration & Submit - Responsive Layout */}
          <div className="bg-[#181818] border border-[#262626] rounded-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
            <div className="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-6">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              </div>
              <div className="min-w-0">
                <h4 className="text-zinc-100 font-semibold mb-2 text-sm sm:text-base">Declaration</h4>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed break-words">
                  By submitting this proposal, I confirm that I am authorized to represent 
                  the institution/organization named above and that the information provided 
                  is accurate to the best of my knowledge. I understand that this submission 
                  initiates a review process and does not guarantee MoU execution.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 pt-4 sm:pt-6 border-t border-[#2a2a2a]">
              <SubmitButton
                isSubmitting={isSubmitting}
                label="Submit MoU Proposal"
              />
              <p className="text-xs text-zinc-500 text-center max-w-sm">
                By clicking submit, you agree to our{" "}
                <a href="/privacy" className="text-orange-400 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </form>

        {/* Privacy & Process Notice - Mobile-First Stack */}
        <div className="bg-[#111111] border border-[#262626] rounded-xl p-4 sm:p-6 mt-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-xs sm:text-sm text-zinc-400 leading-relaxed break-words text-center sm:text-left">
              <span className="text-zinc-300 font-semibold">Privacy & Process Notice:</span>{" "}
              Your submission is secure (encrypted, rate-limited, data protection compliant). 
              Proposals are reviewed within one month. Response will be sent via the official 
              email provided. For queries:{" "}
              <a 
                href="mailto:outreach@bserc.org" 
                className="text-orange-400 hover:text-orange-300 underline underline-offset-2 break-all"
              >
                outreach@bserc.org
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}