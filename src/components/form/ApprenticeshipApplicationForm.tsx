"use client";

import { useState, FormEvent, useRef } from "react";
import {
  Check,
  ArrowRight,
  AlertCircle,
  Info,
  Star,
  Send,
  Mail,
  GraduationCap,
  Users,
  Upload,
  Calendar,
  MapPin,
  Briefcase,
  Shield,
  FileText,
  Hash,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// UI Components - Def-Space Design System
// ─────────────────────────────────────────────────────────────

interface FormInputProps {
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
}: FormInputProps) {
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
          transition-colors text-sm
          ${
            error
              ? "border-red-500 focus:border-red-500/50"
              : "border-[#2a2a2a] hover:border-[#3a3a3a]"
          }
        `}
      />
      {error && (
        <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

interface FormSelectProps {
  id: string;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
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
  placeholder = "--Select--",
  required = false,
  value,
  onChange,
  error,
}: FormSelectProps) {
  return (
    <div className="mb-5 w-full">
      <label
        htmlFor={id}
        className="block text-zinc-100 text-[13px] font-semibold mb-2.5"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            w-full px-4 py-3 rounded-md bg-[#111111] border text-zinc-100 
            focus:outline-none focus:border-orange-500/50 transition-colors text-sm appearance-none
            ${
              error
                ? "border-red-500 focus:border-red-500/50"
                : "border-[#2a2a2a] hover:border-[#3a3a3a]"
            }
          `}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

interface FormTextareaProps {
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
  rows = 4,
  required = false,
  value,
  onChange,
  error,
}: FormTextareaProps) {
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
        className={`
          w-full px-4 py-3 rounded-md bg-[#111111] border text-zinc-100 
          placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 
          transition-colors text-sm resize-none
          ${
            error
              ? "border-red-500 focus:border-red-500/50"
              : "border-[#2a2a2a] hover:border-[#3a3a3a]"
          }
        `}
      />
      {error && (
        <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

interface FileUploadProps {
  id: string;
  name: string;
  label: string;
  accept?: string;
  required?: boolean;
  onFileChange?: (file: File | null) => void;
  error?: string;
}

function FileUpload({
  id,
  name,
  label,
  accept = ".pdf,.doc,.docx",
  required = false,
  onFileChange,
  error,
}: FileUploadProps) {
  const [fileName, setFileName] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file?.name || "");
    if (onFileChange) onFileChange(file);
  };

  return (
    <div className="mb-5 w-full">
      <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <label className="relative border border-dashed border-[#333] rounded-xl py-8 flex flex-col items-center justify-center bg-[#111111]/50 hover:bg-[#161616] cursor-pointer group transition-colors">
        <input
          type="file"
          id={id}
          name={name}
          accept={accept}
          required={required}
          onChange={handleChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <Upload className="w-8 h-8 text-zinc-500 mb-2 group-hover:text-zinc-300 transition-colors" />
        <p className="text-zinc-500 text-xs font-medium">
          Click to upload or drag file
        </p>
        {fileName && (
          <p className="mt-2 text-xs text-orange-500">Selected: {fileName}</p>
        )}
      </label>
      {error && (
        <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

const SectionCard = ({
  title,
  children,
  icon: Icon,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ElementType;
}) => (
  <div className="bg-[#181818] rounded-xl border border-[#262626] p-6 md:p-8 mb-8 shadow-2xl">
    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#2a2a2a]">
      {Icon && <Icon className="w-5 h-5 text-orange-500" />}
      <h3 className="text-white text-lg font-serif font-medium tracking-wide uppercase">
        {title}
      </h3>
    </div>
    {children}
  </div>
);

const SubmitButton = ({
  isSubmitting = false,
  label = "Submit Application",
}: {
  isSubmitting?: boolean;
  label?: string;
}) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className="flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold transition-all active:scale-95 bg-orange-500 hover:bg-orange-600 text-black shadow-lg shadow-orange-500/20 disabled:bg-zinc-800 disabled:text-zinc-500 w-full md:w-auto"
  >
    {isSubmitting ? (
      <>
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
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
        <span>Processing...</span>
      </>
    ) : (
      <>
        <span>{label}</span>
        <ArrowRight className="w-5 h-5" />
      </>
    )}
  </button>
);

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface EducationEntry {
  examination: string;
  board: string;
  year: string;
  percentage: string;
  division: string;
}

interface ApprenticeshipFormData {
  // Section I
  fullName: string;
  fatherName: string;
  motherName: string;
  dob: string;
  gender: "male" | "female" | "others" | "";
  address: string;
  city: string;
  state: string;
  pinCode: string;
  permanentAddress: string;
  mobile: string;
  altMobile: string;
  email: string;
  aadhaar: string;
  pan: string;
  linkedin: string;

  // Section II
  education: EducationEntry[];

  // Section III
  preferredRoles: string[];
  otherRoleSpecify: string;
  duration: "6 Months" | "12 Months" | "";
  startDate: string;
  occupation: string;
  motivation: string;

  // Section IV
  declarationPlace: string;
  declarationDate: string;
  signature: string;
}

const initialFormData: ApprenticeshipFormData = {
  fullName: "",
  fatherName: "",
  motherName: "",
  dob: "",
  gender: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
  permanentAddress: "",
  mobile: "",
  altMobile: "",
  email: "",
  aadhaar: "",
  pan: "",
  linkedin: "",
  education: [
    {
      examination: "Class X (Matriculation)",
      board: "",
      year: "",
      percentage: "",
      division: "",
    },
    {
      examination: "Class XII (Senior Secondary)",
      board: "",
      year: "",
      percentage: "",
      division: "",
    },
    {
      examination: "Diploma / Graduation",
      board: "",
      year: "",
      percentage: "",
      division: "",
    },
    {
      examination: "Post Graduation",
      board: "",
      year: "",
      percentage: "",
      division: "",
    },
    {
      examination: "Any Other Qualification",
      board: "",
      year: "",
      percentage: "",
      division: "",
    },
  ],
  preferredRoles: [],
  otherRoleSpecify: "",
  duration: "",
  startDate: "",
  occupation: "",
  motivation: "",
  declarationPlace: "",
  declarationDate: "",
  signature: "",
};

const roleOptions = [
  "Defence Drone Technology",
  "Rocketry & Propulsion Systems",
  "AI & Space Robotics",
  "Satellite Systems Engineering",
  "Technical (Hardware / Software Development)",
  "Research & Development",
  "Academics & Training",
  "Administration & Operations",
  "Social Media Management & Content Creation",
  "Website Development & Digital Marketing",
];

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "others", label: "Others" },
];

const durationOptions = [
  { value: "6 Months", label: "6 Months" },
  { value: "12 Months", label: "12 Months" },
];

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export default function ApprenticeshipApplicationForm() {
  const [formData, setFormData] =
    useState<ApprenticeshipFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  // File refs
  const resumeRef = useRef<File | null>(null);
  const certificatesRef = useRef<File | null>(null);
  const aadhaarRef = useRef<File | null>(null);
  const photoRef = useRef<File | null>(null);

  const handleInputChange = (
    field: keyof ApprenticeshipFormData,
    value: string | string[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleEducationChange = (
    index: number,
    field: keyof EducationEntry,
    value: string,
  ) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index][field] = value;
    setFormData((prev) => ({ ...prev, education: updatedEducation }));
  };

  const handleRoleToggle = (role: string) => {
    const currentRoles = [...formData.preferredRoles];
    if (currentRoles.includes(role)) {
      setFormData((prev) => ({
        ...prev,
        preferredRoles: currentRoles.filter((r) => r !== role),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        preferredRoles: [...currentRoles, role],
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.fatherName.trim())
      newErrors.fatherName = "Father's name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pinCode.trim()) newErrors.pinCode = "PIN code is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (formData.preferredRoles.length === 0) {
      newErrors.preferredRoles = "Select at least one preferred role";
    }
    if (!formData.duration)
      newErrors.duration = "Programme duration is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.occupation.trim())
      newErrors.occupation = "Occupation is required";
    if (!formData.motivation.trim())
      newErrors.motivation = "Motivation statement is required";
    if (formData.motivation.trim().split(/\s+/).length > 200) {
      newErrors.motivation = "Please keep within 200 words";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus("error");
      setSubmitMessage("Please fix the highlighted errors before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Here you would actually submit to your API endpoint
    // const submitData = new FormData();
    // submitData.append("formData", JSON.stringify(formData));
    // if (resumeRef.current) submitData.append("resume", resumeRef.current);
    // ...

    setSubmitStatus("success");
    setSubmitMessage(
      "Application submitted successfully! Shortlisted candidates will be contacted for a virtual interview.",
    );
    setIsSubmitting(false);

    // Reset form
    setFormData(initialFormData);
    resumeRef.current = null;
    certificatesRef.current = null;
    aadhaarRef.current = null;
    photoRef.current = null;
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-300 py-12 md:py-16 px-4 selection:bg-orange-500 selection:text-black">
      {/* Success/Error Toast */}
      {(submitStatus === "success" || submitStatus === "error") && (
        <div className="fixed left-1/2 top-5 z-[80] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 animate-in fade-in slide-in-from-top-2 duration-300">
          <div
            className={`rounded-xl border p-4 shadow-2xl shadow-black/50 flex items-start justify-between gap-4 ${
              submitStatus === "success"
                ? "border-[#2d3023] bg-[#111111]"
                : "border-red-900/30 bg-[#111111]"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  submitStatus === "success"
                    ? "bg-orange-500/20"
                    : "bg-red-500/20"
                }`}
              >
                {submitStatus === "success" ? (
                  <Check
                    className="text-orange-500 w-5 h-5"
                    strokeWidth={2.5}
                  />
                ) : (
                  <AlertCircle className="text-red-400 w-5 h-5" />
                )}
              </div>
              <div>
                <p
                  className={`font-semibold ${submitStatus === "success" ? "text-white" : "text-red-300"}`}
                >
                  {submitStatus === "success"
                    ? "Application Submitted!"
                    : "Submission Error"}
                </p>
                <p className="text-zinc-400 text-sm mt-1">{submitMessage}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSubmitStatus("idle")}
              className="ml-auto rounded-full p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-orange-500 text-xs font-bold tracking-[0.2em] uppercase">
              BSERC Apprenticeship
            </span>
            <div className="h-px w-16 bg-orange-500"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-5 leading-tight">
            Apprenticeship Application Form
          </h1>

          <p className="text-zinc-400 text-sm md:text-base max-w-7xl leading-relaxed">
            Advancing{" "}
            <span className="text-orange-500 font-bold uppercase">
              {" "}
              Viksit Bharat @2047
            </span>{" "}
            Vision through Space & Defence Education Excellence
          </p>

          <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4 bg-[#111111] border border-[#262626] rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <FileText className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="font-medium">
                FORM A-1: APPRENTICESHIP PROGRAMME APPLICATION
              </span>
            </div>

            <span className="hidden sm:block text-orange-500">|</span>

            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Hash className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="font-medium">BSERC/ND/APP/2026/0010</span>
            </div>

            <span className="hidden sm:block text-orange-500">|</span>

            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Remote / Hybrid (Pan-India)</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section I: Applicant Particulars */}
          <SectionCard title="SECTION I: APPLICANT PARTICULARS" icon={Users}>
            <div className="grid md:grid-cols-2 gap-4">
              <FormInput
                id="fullName"
                name="fullName"
                label="Full Name (in Block Letters)"
                placeholder="e.g., ANURAG SINGH RATHORE"
                required
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                error={errors.fullName}
              />
              <FormInput
                id="fatherName"
                name="fatherName"
                label="Father's Name"
                placeholder="Father's full name"
                required
                value={formData.fatherName}
                onChange={(e) =>
                  handleInputChange("fatherName", e.target.value)
                }
                error={errors.fatherName}
              />
              <FormInput
                id="motherName"
                name="motherName"
                label="Mother's Name"
                placeholder="Mother's full name"
                value={formData.motherName}
                onChange={(e) =>
                  handleInputChange("motherName", e.target.value)
                }
              />
              <FormInput
                id="dob"
                name="dob"
                label="Date of Birth"
                type="date"
                required
                value={formData.dob}
                onChange={(e) => handleInputChange("dob", e.target.value)}
                error={errors.dob}
              />
              <FormSelect
                id="gender"
                name="gender"
                label="Gender"
                options={genderOptions}
                placeholder="Select Gender"
                required
                value={formData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                error={errors.gender}
              />
            </div>

            <FormInput
              id="address"
              name="address"
              label="Correspondence Address"
              placeholder="House No., Street, Area"
              required
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              error={errors.address}
            />

            <div className="grid md:grid-cols-3 gap-4">
              <FormInput
                id="city"
                name="city"
                label="City"
                required
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                error={errors.city}
              />
              <FormInput
                id="state"
                name="state"
                label="State"
                required
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                error={errors.state}
              />
              <FormInput
                id="pinCode"
                name="pinCode"
                label="PIN Code"
                required
                value={formData.pinCode}
                onChange={(e) => handleInputChange("pinCode", e.target.value)}
                error={errors.pinCode}
              />
            </div>

            <FormInput
              id="permanentAddress"
              name="permanentAddress"
              label="Permanent Address (if different)"
              placeholder="Full permanent address"
              value={formData.permanentAddress}
              onChange={(e) =>
                handleInputChange("permanentAddress", e.target.value)
              }
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormInput
                id="mobile"
                name="mobile"
                label="Mobile Number"
                type="tel"
                placeholder="+91 XXXXXXXXXX"
                required
                value={formData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                error={errors.mobile}
              />
              <FormInput
                id="altMobile"
                name="altMobile"
                label="Alternate Number"
                type="tel"
                placeholder="Optional"
                value={formData.altMobile}
                onChange={(e) => handleInputChange("altMobile", e.target.value)}
              />
              <FormInput
                id="email"
                name="email"
                label="Email ID"
                type="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                error={errors.email}
              />
              <FormInput
                id="aadhaar"
                name="aadhaar"
                label="Aadhaar Number (Optional)"
                placeholder="XXXX XXXX XXXX"
                value={formData.aadhaar}
                onChange={(e) => handleInputChange("aadhaar", e.target.value)}
              />
              <FormInput
                id="pan"
                name="pan"
                label="PAN Number (Optional)"
                placeholder="ABCDE1234F"
                value={formData.pan}
                onChange={(e) => handleInputChange("pan", e.target.value)}
              />
              <FormInput
                id="linkedin"
                name="linkedin"
                label="LinkedIn Profile (Optional)"
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedin}
                onChange={(e) => handleInputChange("linkedin", e.target.value)}
              />
            </div>
          </SectionCard>

          {/* Section II: Educational Qualifications */}
          <SectionCard
            title="SECTION II: EDUCATIONAL QUALIFICATIONS"
            icon={GraduationCap}
          >
            {/* Note */}
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-orange-500/20 bg-orange-500/10 p-4">
              <GraduationCap className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                Please attach self-attested copies of all certificates / mark
                sheets (upload at the end).
              </p>
            </div>

            {/* Table Wrapper */}
            <div className="overflow-x-auto rounded-2xl border border-[#262626] bg-[#111111] shadow-lg">
              <table className="w-full min-w-[700px] text-sm">
                <thead className="bg-gradient-to-r from-orange-500/20 to-orange-500/5 border-b border-[#2a2a2a]">
                  <tr className="text-left text-zinc-200 text-xs sm:text-sm">
                    <th className="p-4 font-semibold">Examination Passed</th>
                    <th className="p-4 font-semibold">Board / University</th>
                    <th className="p-4 font-semibold">Year</th>
                    <th className="p-4 font-semibold">% / CGPA</th>
                    <th className="p-4 font-semibold">Division</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#262626]">
                  {formData.education.map((edu, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-orange-500/5 transition-colors duration-200"
                    >
                      <td className="p-4 text-zinc-300 text-xs sm:text-sm font-medium whitespace-nowrap">
                        {edu.examination}
                      </td>

                      <td className="p-3">
                        <input
                          type="text"
                          value={edu.board}
                          onChange={(e) =>
                            handleEducationChange(idx, "board", e.target.value)
                          }
                          className="w-full rounded-lg border border-transparent bg-[#1a1a1a] px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                          placeholder="Board / University"
                        />
                      </td>

                      <td className="p-3">
                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) =>
                            handleEducationChange(idx, "year", e.target.value)
                          }
                          className="w-full min-w-[90px] rounded-lg border border-transparent bg-[#1a1a1a] px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                          placeholder="Year"
                        />
                      </td>

                      <td className="p-3">
                        <input
                          type="text"
                          value={edu.percentage}
                          onChange={(e) =>
                            handleEducationChange(
                              idx,
                              "percentage",
                              e.target.value,
                            )
                          }
                          className="w-full min-w-[110px] rounded-lg border border-transparent bg-[#1a1a1a] px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                          placeholder="% / CGPA"
                        />
                      </td>

                      <td className="p-3">
                        <input
                          type="text"
                          value={edu.division}
                          onChange={(e) =>
                            handleEducationChange(
                              idx,
                              "division",
                              e.target.value,
                            )
                          }
                          className="w-full min-w-[120px] rounded-lg border border-transparent bg-[#1a1a1a] px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                          placeholder="Division"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          {/* Section III: Apprenticeship Programme Details */}
          <SectionCard
            title="SECTION III: APPRENTICESHIP PROGRAMME DETAILS"
            icon={Briefcase}
          >
            <div className="mb-6">
              <label className="block text-zinc-100 text-[13px] font-semibold mb-3">
                Preferred Roles / Domains (Select one or more){" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {roleOptions.map((role) => (
                  <label
                    key={role}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={formData.preferredRoles.includes(role)}
                      onChange={() => handleRoleToggle(role)}
                      className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-zinc-600 bg-transparent checked:bg-orange-500 checked:border-orange-500 transition-all"
                    />
                    <Check
                      className="absolute h-3 w-3 text-black opacity-0 peer-checked:opacity-100 pointer-events-none"
                      strokeWidth={4}
                    />
                    <span className="text-zinc-300 text-sm group-hover:text-white transition-colors">
                      {role}
                    </span>
                  </label>
                ))}
              </div>
              {errors.preferredRoles && (
                <p className="mt-2 text-xs text-red-400">
                  {errors.preferredRoles}
                </p>
              )}
            </div>

            <div className="mb-5">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.preferredRoles.includes("Others")}
                  onChange={() => handleRoleToggle("Others")}
                  className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-zinc-600 bg-transparent checked:bg-orange-500 checked:border-orange-500"
                />
                <Check
                  className="absolute h-3 w-3 text-black opacity-0 peer-checked:opacity-100 pointer-events-none"
                  strokeWidth={4}
                />
                <span className="text-zinc-300 text-sm">
                  Others (Please specify):
                </span>
              </label>
              {formData.preferredRoles.includes("Others") && (
                <FormInput
                  id="otherRoleSpecify"
                  name="otherRoleSpecify"
                  label=""
                  placeholder="Specify your role"
                  value={formData.otherRoleSpecify}
                  onChange={(e) =>
                    handleInputChange("otherRoleSpecify", e.target.value)
                  }
                />
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormSelect
                id="duration"
                name="duration"
                label="Programme Duration"
                options={durationOptions}
                placeholder="Select Duration"
                required
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                error={errors.duration}
              />
              <FormInput
                id="startDate"
                name="startDate"
                label="Proposed Start Date"
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                error={errors.startDate}
              />
            </div>

            <FormInput
              id="occupation"
              name="occupation"
              label="Present Occupation / Status"
              placeholder="Student / Fresher / Working Professional / Pursuing Higher Studies"
              required
              value={formData.occupation}
              onChange={(e) => handleInputChange("occupation", e.target.value)}
              error={errors.occupation}
            />

            <FormTextarea
              id="motivation"
              name="motivation"
              label="Why do you want to join BSERC Apprenticeship Programme? (100–150 words)"
              placeholder="Briefly describe your passion, alignment with Viksit Bharat @2047 vision, and how BSERC apprenticeship fits your career goals..."
              rows={5}
              required
              value={formData.motivation}
              onChange={(e) => handleInputChange("motivation", e.target.value)}
              error={errors.motivation}
            />
          </SectionCard>

          {/* Section IV: Declaration */}
          <SectionCard title="SECTION IV: DECLARATION" icon={Shield}>
            <div className="space-y-4 text-sm">
              <p className="text-zinc-300 leading-relaxed">
                I,{" "}
                <span className="text-orange-400 font-semibold">
                  {formData.fullName || "______(Full Name)"}
                </span>
                , Son/Daughter of{" "}
                <span className="text-orange-400 font-semibold">
                  {formData.fatherName || "______(Father's Name)"}
                </span>
                , do hereby solemnly declare that all the information furnished
                in this application is true, complete, and correct to the best
                of my knowledge and belief. I understand that if any information
                is found false or suppressed at any stage, my candidature shall
                be liable to be rejected or terminated without any prior notice.
              </p>
              <p className="text-zinc-300 leading-relaxed">
                I further undertake to abide by all the rules, regulations, and
                code of conduct of Bharat Space Education Research Centre
                (BSERC) and contribute sincerely towards the vision of Viksit
                Bharat @2047.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-[#2a2a2a]">
                <FormInput
                  id="declarationPlace"
                  name="declarationPlace"
                  label="Place"
                  placeholder="City / Location"
                  value={formData.declarationPlace}
                  onChange={(e) =>
                    handleInputChange("declarationPlace", e.target.value)
                  }
                />
                <FormInput
                  id="declarationDate"
                  name="declarationDate"
                  label="Date"
                  type="date"
                  value={formData.declarationDate}
                  onChange={(e) =>
                    handleInputChange("declarationDate", e.target.value)
                  }
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormInput
                  id="signature"
                  name="signature"
                  label="Signature of Applicant"
                  placeholder="Type full name as digital signature"
                  value={formData.signature}
                  onChange={(e) =>
                    handleInputChange("signature", e.target.value)
                  }
                />
              </div>
            </div>
          </SectionCard>

          {/* File Uploads Section */}
          <div className="bg-[#181818] rounded-xl border border-[#262626] p-6 md:p-8 mb-8">
            <h3 className="text-white text-lg font-serif font-medium tracking-wide border-b border-[#2a2a2a] pb-4 mb-6 uppercase flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-500" />
              Required Attachments
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <FileUpload
                id="resume"
                name="resume"
                label="Updated Resume/CV"
                accept=".pdf,.doc,.docx"
                required
                onFileChange={(file) => {
                  resumeRef.current = file;
                }}
              />
              <FileUpload
                id="certificates"
                name="certificates"
                label="Educational Certificates"
                accept=".pdf,.zip,.jpg,.png"
                required
                onFileChange={(file) => {
                  certificatesRef.current = file;
                }}
              />
              <FileUpload
                id="aadhaarCopy"
                name="aadhaarCopy"
                label="Aadhaar Copy (Optional)"
                accept=".pdf,.jpg,.png"
                onFileChange={(file) => {
                  aadhaarRef.current = file;
                }}
              />
              <FileUpload
                id="photo"
                name="photo"
                label="Recent Passport-size Photograph"
                accept="image/jpeg,image/png"
                required
                onFileChange={(file) => {
                  photoRef.current = file;
                }}
              />
            </div>

            <div className="mt-6 p-4 sm:p-5 bg-[#0a0a0a] border border-[#262626] rounded-xl shadow-md space-y-4">
              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-orange-500">
                    Submission Email
                  </p>
                  <p className="text-sm text-zinc-300 break-all">
                    outreach@bserc.org
                  </p>
                </div>
              </div>

              {/* Subject */}
              <div className="flex items-start gap-3">
                <Send className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-orange-500">
                    Subject Line
                  </p>
                  <p className="text-sm text-zinc-300">
                    Apprenticeship Application – [Your Full Name] – BSERC/2026
                  </p>
                </div>
              </div>

              {/* Note */}
              <div className="flex items-start gap-3 border-t border-[#262626] pt-4">
                <Info className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Shortlisted candidates will be informed via email for a
                  virtual interview after application review.
                </p>
              </div>

              {/* Highlight */}
              <div className="flex items-start gap-3 bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                <Star className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Selected apprentices will receive a formal Certificate of
                  Completion and valuable industry exposure in the Space &
                  Defence Education sector.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4 pb-8">
            <SubmitButton
              isSubmitting={isSubmitting}
              label="Submit Application"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
