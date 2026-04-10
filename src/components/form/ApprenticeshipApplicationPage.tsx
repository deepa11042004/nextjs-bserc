"use client";

import { useState, FormEvent, useRef } from "react";
import {
  Check,
  ArrowRight,
  AlertCircle,
  User,
  GraduationCap,
  Briefcase,
  FileSignature,
  Upload,
  Shield,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Link as LinkIcon,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────

function getApiMessage(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "";
  const typedPayload = payload as { message?: unknown; error?: unknown };
  if (typeof typedPayload.message === "string" && typedPayload.message.trim()) {
    return typedPayload.message.trim();
  }
  if (typeof typedPayload.error === "string" && typedPayload.error.trim()) {
    return typedPayload.error.trim();
  }
  return "";
}

// ─────────────────────────────────────────────────────────────
// UI Components - Def-Space Design System
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
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
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
  className = "",
  icon,
}: InputProps) {
  return (
    <div className={`mb-5 w-full ${className}`}>
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
          transition-colors text-sm uppercase tracking-wide
          ${
            error
              ? "border-red-500 focus:border-red-500/50"
              : "border-[#2a2a2a] hover:border-[#3a3a3a]"
          }
        `}
      />
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-zinc-500">{helperText}</p>
      )}
      {error && (
        <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5" role="alert">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
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
  className?: string;
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
  className = "",
}: TextareaProps) {
  return (
    <div className={`mb-5 w-full ${className}`}>
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
          transition-colors text-sm resize-none
          ${
            error
              ? "border-red-500 focus:border-red-500/50"
              : "border-[#2a2a2a] hover:border-[#3a3a3a]"
          }
        `}
      />
      {(helperText || maxLength) && (
        <div className="flex justify-between items-center mt-1.5">
          {helperText && !error && <p className="text-xs text-zinc-500">{helperText}</p>}
          {maxLength && (
            <p className="text-xs text-zinc-600 ml-auto">
              {value?.length || 0}/{maxLength} characters
            </p>
          )}
        </div>
      )}
      {error && (
        <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5" role="alert">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
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
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  className?: string;
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
  className = "",
}: SelectProps) {
  return (
    <div className={`mb-5 w-full ${className}`}>
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
          <option value="" disabled>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5" role="alert">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
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
  reference,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  id?: string;
  icon?: React.ElementType;
  reference?: string;
}) => (
  <div
    id={id}
    className="bg-[#181818] rounded-xl border border-[#262626] p-6 md:p-8 mb-8 shadow-2xl"
  >
    <div className="mb-6 flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 text-orange-500" />
          </div>
        )}
        <div>
          <h3 className="text-white text-lg font-serif font-medium tracking-wide uppercase">
            {title}
          </h3>
          {subtitle && <p className="text-zinc-400 text-sm mt-1">{subtitle}</p>}
        </div>
      </div>
      {reference && (
        <span className="text-xs text-zinc-500 font-mono bg-[#111111] px-2 py-1 rounded border border-[#2a2a2a]">
          {reference}
        </span>
      )}
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
  const baseStyles = "flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold transition-all active:scale-95";
  const variants = {
    primary: "bg-orange-500 hover:bg-orange-600 text-black shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 disabled:bg-zinc-800 disabled:text-zinc-500",
    secondary: "bg-[#111111] border border-[#2a2a2a] hover:border-orange-500/50 text-zinc-100 disabled:opacity-50",
  };

  return (
    <button type="submit" disabled={isSubmitting} className={`${baseStyles} ${variants[variant]}`}>
      {isSubmitting ? (
        <>
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
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
}

// ─────────────────────────────────────────────────────────────

interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function FormCheckbox({ id, name, label, checked, onChange }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer group">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-zinc-600 bg-transparent checked:bg-orange-500 checked:border-orange-500 transition-all"
        />
        <Check className="absolute h-4 w-4 text-black opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5" strokeWidth={4} />
      </div>
      <span className="text-zinc-300 text-sm group-hover:text-white transition-colors">{label}</span>
    </label>
  );
}

// ─────────────────────────────────────────────────────────────
// Education Row Component
// ─────────────────────────────────────────────────────────────

interface EducationEntry {
  examination: string;
  board: string;
  year: string;
  marks: string;
  division: string;
}

interface EducationRowProps {
  index: number;
  value: EducationEntry;
  onChange: (index: number, field: keyof EducationEntry, value: string) => void;
  errors?: Record<string, string>;
}

function EducationRow({ index, value, onChange, errors }: EducationRowProps) {
  const prefix = `education_${index}`;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 bg-[#111111] rounded-lg border border-[#2a2a2a]">
      <div>
        <input
          type="text"
          name={`${prefix}_examination`}
          placeholder="Examination"
          value={value.examination}
          onChange={(e) => onChange(index, "examination", e.target.value)}
          className="w-full px-3 py-2 rounded bg-[#0d0d0d] border border-[#2a2a2a] text-zinc-100 text-xs placeholder-zinc-600 focus:outline-none focus:border-orange-500/50"
        />
        {errors?.[`${prefix}_examination`] && (
          <p className="text-red-400 text-[10px] mt-1">{errors[`${prefix}_examination`]}</p>
        )}
      </div>
      <div>
        <input
          type="text"
          name={`${prefix}_board`}
          placeholder="Board/University"
          value={value.board}
          onChange={(e) => onChange(index, "board", e.target.value)}
          className="w-full px-3 py-2 rounded bg-[#0d0d0d] border border-[#2a2a2a] text-zinc-100 text-xs placeholder-zinc-600 focus:outline-none focus:border-orange-500/50"
        />
      </div>
      <div>
        <input
          type="text"
          name={`${prefix}_year`}
          placeholder="Year"
          value={value.year}
          onChange={(e) => onChange(index, "year", e.target.value)}
          className="w-full px-3 py-2 rounded bg-[#0d0d0d] border border-[#2a2a2a] text-zinc-100 text-xs placeholder-zinc-600 focus:outline-none focus:border-orange-500/50"
        />
      </div>
      <div>
        <input
          type="text"
          name={`${prefix}_marks`}
          placeholder="% / CGPA"
          value={value.marks}
          onChange={(e) => onChange(index, "marks", e.target.value)}
          className="w-full px-3 py-2 rounded bg-[#0d0d0d] border border-[#2a2a2a] text-zinc-100 text-xs placeholder-zinc-600 focus:outline-none focus:border-orange-500/50"
        />
      </div>
      <div>
        <input
          type="text"
          name={`${prefix}_division`}
          placeholder="Division/Grade"
          value={value.division}
          onChange={(e) => onChange(index, "division", e.target.value)}
          className="w-full px-3 py-2 rounded bg-[#0d0d0d] border border-[#2a2a2a] text-zinc-100 text-xs placeholder-zinc-600 focus:outline-none focus:border-orange-500/50"
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// File Upload Component
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
  multiple?: boolean;
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
  multiple = false,
}: FileUploadProps) {
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = multiple ? e.target.files?.[0] || null : e.target.files?.[0] || null;
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
          relative border-2 border-dashed rounded-xl py-8 px-4 
          flex flex-col items-center justify-center cursor-pointer 
          transition-all text-center
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
          multiple={multiple}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <div className="mb-3 text-zinc-500">
          <Upload className="w-6 h-6" />
        </div>
        <p className="text-zinc-400 text-sm font-medium mb-1">
          Click to upload or drag & drop
        </p>
        <p className="text-zinc-600 text-xs">
          {accept.replace(/\./g, "").replace(/,/g, " • ").toUpperCase()} • Max {maxSizeMB}MB
        </p>
        {fileName && (
          <p className="mt-3 text-xs text-orange-400 font-medium">Selected: {fileName}</p>
        )}
        {helperText && !error && !fileName && (
          <p className="mt-3 text-xs text-zinc-500">{helperText}</p>
        )}
      </label>
      {error && (
        <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5" role="alert">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────

type ApprenticeshipFormData = {
  // Section I
  fullName: string;
  fatherName: string;
  motherName: string;
  dob: string;
  ageYears: string;
  ageMonths: string;
  gender: string;
  correspondenceAddress: string;
  city: string;
  state: string;
  pinCode: string;
  permanentAddress: string;
  mobileNumber: string;
  alternateNumber: string;
  email: string;
  aadhaarNumber: string;
  panNumber: string;
  linkedinProfile: string;
  
  // Section III
  preferredDomains: string[];
  programmeDuration: string;
  proposedStartDate: string;
  presentOccupation: string;
  motivationStatement: string;
  
  // Section IV
  declarationName: string;
  declarationPlace: string;
  declarationDate: string;
  signatureName: string;
};

const DOMAIN_OPTIONS = [
  { value: "defence_drone", label: "Defence Drone Technology" },
  { value: "rocketry_propulsion", label: "Rocketry & Propulsion Systems" },
  { value: "ai_robotics", label: "AI & Space Robotics" },
  { value: "satellite_systems", label: "Satellite Systems Engineering" },
  { value: "technical_dev", label: "Technical (Hardware / Software Development)" },
  { value: "research_dev", label: "Research & Development" },
  { value: "academics_training", label: "Academics & Training" },
  { value: "admin_operations", label: "Administration & Operations" },
  { value: "social_media", label: "Social Media Management & Content Creation" },
  { value: "web_digital", label: "Website Development & Digital Marketing" },
  { value: "others", label: "Others" },
];

const DURATION_OPTIONS = [
  { value: "6_months", label: "6 Months" },
  { value: "12_months", label: "12 Months" },
];

function createInitialFormData(): ApprenticeshipFormData {
  return {
    fullName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    ageYears: "",
    ageMonths: "",
    gender: "",
    correspondenceAddress: "",
    city: "",
    state: "",
    pinCode: "",
    permanentAddress: "",
    mobileNumber: "",
    alternateNumber: "",
    email: "",
    aadhaarNumber: "",
    panNumber: "",
    linkedinProfile: "",
    preferredDomains: [],
    programmeDuration: "",
    proposedStartDate: "",
    presentOccupation: "",
    motivationStatement: "",
    declarationName: "",
    declarationPlace: "",
    declarationDate: "",
    signatureName: "",
  };
}

export default function ApprenticeshipApplicationPage() {
  const [formData, setFormData] = useState<ApprenticeshipFormData>(createInitialFormData());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | null>(null);
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const [successSnapshot, setSuccessSnapshot] = useState<{ fullName: string; applicationRef: string } | null>(null);
  
  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([
    { examination: "Class X (Matriculation)", board: "", year: "", marks: "", division: "" },
    { examination: "Class XII (Senior Secondary)", board: "", year: "", marks: "", division: "" },
    { examination: "Diploma / Graduation", board: "", year: "", marks: "", division: "" },
    { examination: "Post Graduation", board: "", year: "", marks: "", division: "" },
    { examination: "Any Other Qualification", board: "", year: "", marks: "", division: "" },
  ]);

  const [selectedFiles, setSelectedFiles] = useState<{
    resume: File | null;
    certificates: File | null;
    aadhaar: File | null;
    photo: File | null;
  }>({ resume: null, certificates: null, aadhaar: null, photo: null });

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB per file

  const closeSuccessNotification = () => {
    setSubmitStatus(null);
    setSuccessSnapshot(null);
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitStatus === "success") { setSubmitStatus(null); setSuccessSnapshot(null); }
    if (submitStatus === "error" && submitErrorMessage) { setSubmitErrorMessage(""); }
    if (errors[name]) {
      setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
    }
  };

  const handleDomainToggle = (domainValue: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredDomains: prev.preferredDomains.includes(domainValue)
        ? prev.preferredDomains.filter((d) => d !== domainValue)
        : [...prev.preferredDomains, domainValue],
    }));
    if (errors.preferredDomains) {
      setErrors((prev) => { const n = { ...prev }; delete n.preferredDomains; return n; });
    }
  };

  const handleEducationChange = (index: number, field: keyof EducationEntry, value: string) => {
    setEducationEntries((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleFileSelect = (key: keyof typeof selectedFiles, file: File | null) => {
    setSelectedFiles((prev) => ({ ...prev, [key]: file }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Section I Validations
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required (in Block Letters)";
    if (!formData.fatherName.trim()) newErrors.fatherName = "Father's name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Please select gender";
    if (!formData.correspondenceAddress.trim()) newErrors.correspondenceAddress = "Correspondence address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pinCode.trim()) newErrors.pinCode = "PIN code is required";
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^[+]?[0-9\s\-()]{10,15}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid mobile number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email ID is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Section III Validations
    if (formData.preferredDomains.length === 0) {
      newErrors.preferredDomains = "Please select at least one preferred domain";
    }
    if (!formData.programmeDuration) newErrors.programmeDuration = "Please select programme duration";
    if (!formData.proposedStartDate) newErrors.proposedStartDate = "Proposed start date is required";
    if (!formData.presentOccupation.trim()) newErrors.presentOccupation = "Present occupation/status is required";
    if (!formData.motivationStatement.trim()) {
      newErrors.motivationStatement = "This field is required";
    } else if (formData.motivationStatement.length < 100) {
      newErrors.motivationStatement = "Please write at least 100 characters";
    } else if (formData.motivationStatement.length > 150) {
      newErrors.motivationStatement = "Please keep within 150 words";
    }

    // Section IV Validations
    if (!formData.declarationName.trim()) newErrors.declarationName = "Please enter your full name";
    if (!formData.declarationPlace.trim()) newErrors.declarationPlace = "Place is required";
    if (!formData.declarationDate) newErrors.declarationDate = "Date is required";
    if (!formData.signatureName.trim()) newErrors.signatureName = "Signature name is required";

    // File Validations
    const fileKeys: (keyof typeof selectedFiles)[] = ["resume", "certificates", "aadhaar", "photo"];
    fileKeys.forEach((key) => {
      const file = selectedFiles[key];
      if (file && file.size > MAX_FILE_SIZE) {
        newErrors[key] = `File size exceeds 5MB limit`;
      }
    });

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
      
      // Append all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => formDataObj.append(key, v));
        } else {
          formDataObj.append(key, value);
        }
      });

      // Append education entries
      educationEntries.forEach((entry, index) => {
        Object.entries(entry).forEach(([field, val]) => {
          formDataObj.append(`education[${index}][${field}]`, val);
        });
      });

      // Append files
      Object.entries(selectedFiles).forEach(([key, file]) => {
        if (file) formDataObj.append(`attachments[${key}]`, file);
      });

      // Append metadata
      formDataObj.append("formReference", "BSERC/ND/APP/2026/0010");
      formDataObj.append("submissionType", "apprenticeship_application");
      formDataObj.append("timestamp", new Date().toISOString());

      const response = await fetch("/api/apprenticeship-application", {
        method: "POST",
        body: formDataObj,
      });

      const payload = (await response.json().catch(() => ({}))) as unknown;

      if (!response.ok) {
        throw new Error(getApiMessage(payload) || "Unable to submit apprenticeship application. Please try again.");
      }

      const appRef = `BSERC/APP/${Date.now().toString().slice(-6)}`;
      setSuccessSnapshot({ fullName: formData.fullName, applicationRef: appRef });
      setFormData(createInitialFormData());
      setEducationEntries([
        { examination: "Class X (Matriculation)", board: "", year: "", marks: "", division: "" },
        { examination: "Class XII (Senior Secondary)", board: "", year: "", marks: "", division: "" },
        { examination: "Diploma / Graduation", board: "", year: "", marks: "", division: "" },
        { examination: "Post Graduation", board: "", year: "", marks: "", division: "" },
        { examination: "Any Other Qualification", board: "", year: "", marks: "", division: "" },
      ]);
      setSelectedFiles({ resume: null, certificates: null, aadhaar: null, photo: null });
      setErrors({});
      setSubmitStatus("success");
    } catch (err) {
      setSubmitStatus("error");
      setSuccessSnapshot(null);
      setSubmitErrorMessage(
        err instanceof Error && err.message ? err.message : "Unable to submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-300 py-12 md:py-16 px-4 selection:bg-orange-500 selection:text-black">
      {/* Success Notification */}
      {submitStatus === "success" && successSnapshot && (
        <div className="fixed left-1/2 top-5 z-[80] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2">
          <div className="rounded-xl border border-[#2d3023] bg-[#111111] p-4 shadow-2xl shadow-black/50 flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                <Check className="text-orange-500 w-5 h-5" strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-semibold text-white">Application Submitted Successfully!</p>
                <p className="text-zinc-400 text-sm mt-1">
                  Thank you, {successSnapshot.fullName}. Your apprenticeship application (Ref:{" "}
                  <span className="text-orange-400 font-mono">{successSnapshot.applicationRef}</span>) 
                  has been received. Shortlisted candidates will be contacted via email for a virtual interview.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeSuccessNotification}
              className="ml-auto rounded-full p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 md:mb-14 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-orange-500 text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase">
              Viksit Bharat @2047
            </span>
            <div className="h-px w-12 md:w-16 bg-orange-500"></div>
          </div>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-white mb-3 leading-tight">
            Apprenticeship Application Form
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm max-w-3xl mx-auto leading-relaxed">
            <span className="text-orange-500 font-bold">Bharat Space Education Research Centre (BSERC)</span>
            <br />
            Advancing <span className="text-orange-400">Viksit Bharat @2047 Vision</span> through Space & Defence Education Excellence
          </p>
          
          {/* Document Reference */}
          <div className="mt-6 inline-flex items-center gap-3 bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-2">
            <FileSignature className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-mono text-zinc-400">
              FORM A-1 • Ref: BSERC/ND/APP/2026/0010 • Location: Remote / Hybrid (Pan-India)
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-2">
          {/* Error Status */}
          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-[#111111] border border-red-900/30 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{submitErrorMessage || "Please fix the highlighted errors before submitting."}</p>
            </div>
          )}

          {/* SECTION I: Applicant Particulars */}
          <SectionCard title="SECTION I: APPLICANT PARTICULARS" icon={User} reference="Form A-1">
            <div className="grid md:grid-cols-2 gap-4">
              <FormInput
                id="fullName"
                name="fullName"
                label="Full Name (in Block Letters)"
                placeholder="EXAMPLE: RAJESH KUMAR SHARMA"
                required
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value.toUpperCase())}
                error={errors.fullName}
                className="md:col-span-2"
              />
              <FormInput
                id="fatherName"
                name="fatherName"
                label="Father's Name"
                placeholder="In Block Letters"
                required
                value={formData.fatherName}
                onChange={(e) => handleChange("fatherName", e.target.value.toUpperCase())}
                error={errors.fatherName}
              />
              <FormInput
                id="motherName"
                name="motherName"
                label="Mother's Name"
                placeholder="In Block Letters"
                required
                value={formData.motherName}
                onChange={(e) => handleChange("motherName", e.target.value.toUpperCase())}
                error={errors.motherName}
              />
              
              {/* DOB & Age */}
              <div className="grid grid-cols-2 gap-3 md:col-span-2">
                <FormInput
                  id="dob"
                  name="dob"
                  label="Date of Birth"
                  type="date"
                  required
                  value={formData.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  error={errors.dob}
                />
                <div className="grid grid-cols-2 gap-3">
                  <FormInput
                    id="ageYears"
                    name="ageYears"
                    label="Age (Years)"
                    type="number"
                    placeholder="YY"
                    value={formData.ageYears}
                    onChange={(e) => handleChange("ageYears", e.target.value)}
                  />
                  <FormInput
                    id="ageMonths"
                    name="ageMonths"
                    label="(Months)"
                    type="number"
                    placeholder="MM"
                    value={formData.ageMonths}
                    onChange={(e) => handleChange("ageMonths", e.target.value)}
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="mb-5 md:col-span-2">
                <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5">
                  Gender <span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="flex flex-wrap gap-4">
                  {["Male", "Female", "Others"].map((g) => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={g.toLowerCase()}
                        checked={formData.gender === g.toLowerCase()}
                        onChange={(e) => handleChange("gender", e.target.value)}
                        className="w-4 h-4 text-orange-500 bg-[#111111] border-[#2a2a2a] focus:ring-orange-500"
                      />
                      <span className="text-zinc-300 text-sm">{g}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && <p className="mt-2 text-xs text-red-400">{errors.gender}</p>}
              </div>

              {/* Address */}
              <FormTextarea
                id="correspondenceAddress"
                name="correspondenceAddress"
                label="Correspondence Address"
                rows={3}
                required
                placeholder="House/Flat No., Street, Locality"
                value={formData.correspondenceAddress}
                onChange={(e) => handleChange("correspondenceAddress", e.target.value)}
                error={errors.correspondenceAddress}
                className="md:col-span-2"
              />
              <FormInput
                id="city"
                name="city"
                label="City"
                icon={MapPin}
                required
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value.toUpperCase())}
                error={errors.city}
              />
              <FormInput
                id="state"
                name="state"
                label="State"
                required
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value.toUpperCase())}
                error={errors.state}
              />
              <FormInput
                id="pinCode"
                name="pinCode"
                label="PIN Code"
                type="text"
                placeholder="XXXXXX"
                required
                value={formData.pinCode}
                onChange={(e) => handleChange("pinCode", e.target.value)}
                error={errors.pinCode}
              />
              <FormTextarea
                id="permanentAddress"
                name="permanentAddress"
                label="Permanent Address (if different)"
                rows={2}
                placeholder="Leave blank if same as correspondence address"
                value={formData.permanentAddress}
                onChange={(e) => handleChange("permanentAddress", e.target.value)}
                className="md:col-span-2"
              />

              {/* Contact */}
              <FormInput
                id="mobileNumber"
                name="mobileNumber"
                label="Mobile Number"
                type="tel"
                placeholder="+91-XXXXXXXXXX"
                required
                value={formData.mobileNumber}
                onChange={(e) => handleChange("mobileNumber", e.target.value)}
                error={errors.mobileNumber}
              />
              <FormInput
                id="alternateNumber"
                name="alternateNumber"
                label="Alternate Number"
                type="tel"
                placeholder="+91-XXXXXXXXXX"
                value={formData.alternateNumber}
                onChange={(e) => handleChange("alternateNumber", e.target.value)}
              />
              <FormInput
                id="email"
                name="email"
                label="Email ID"
                type="email"
                placeholder="your.email@domain.com"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value.toLowerCase())}
                error={errors.email}
                className="md:col-span-2"
              />

              {/* Optional IDs */}
              <FormInput
                id="aadhaarNumber"
                name="aadhaarNumber"
                label="Aadhaar Number (Optional)"
                type="text"
                placeholder="XXXX-XXXX-XXXX"
                value={formData.aadhaarNumber}
                onChange={(e) => handleChange("aadhaarNumber", e.target.value)}
              />
              <FormInput
                id="panNumber"
                name="panNumber"
                label="PAN Number (Optional)"
                type="text"
                placeholder="ABCDE1234F"
                value={formData.panNumber}
                onChange={(e) => handleChange("panNumber", e.target.value.toUpperCase())}
              />
              <FormInput
                id="linkedinProfile"
                name="linkedinProfile"
                label="LinkedIn Profile (Optional)"
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                icon={LinkIcon}
                value={formData.linkedinProfile}
                onChange={(e) => handleChange("linkedinProfile", e.target.value)}
                className="md:col-span-2"
              />
            </div>
          </SectionCard>

          {/* SECTION II: Educational Qualifications */}
          <SectionCard
            title="SECTION II: EDUCATIONAL QUALIFICATIONS"
            subtitle="Please attach self-attested copies of all certificates/mark sheets"
            icon={GraduationCap}
          >
            <div className="overflow-x-auto">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-5 gap-3 mb-3 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                <div>Examination</div>
                <div>Board / University</div>
                <div>Year</div>
                <div>% / CGPA</div>
                <div>Division / Grade</div>
              </div>
              
              {/* Education Rows */}
              <div className="space-y-3">
                {educationEntries.map((entry, index) => (
                  <EducationRow
                    key={index}
                    index={index}
                    value={entry}
                    onChange={handleEducationChange}
                    errors={errors}
                  />
                ))}
              </div>
            </div>
            <p className="mt-4 text-xs text-zinc-500 flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5" />
              Upload self-attested copies in Section IV
            </p>
          </SectionCard>

          {/* SECTION III: Apprenticeship Programme Details */}
          <SectionCard title="SECTION III: APPRENTICESHIP PROGRAMME DETAILS" icon={Briefcase}>
            {/* Preferred Domains */}
            <div className="mb-6">
              <label className="block text-zinc-100 text-[13px] font-semibold mb-3">
                1. Preferred Roles / Domains <span className="text-red-500">*</span>
                <span className="text-zinc-500 font-normal ml-2">(Select one or more)</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DOMAIN_OPTIONS.map((domain) => (
                  <FormCheckbox
                    key={domain.value}
                    id={`domain_${domain.value}`}
                    name="preferredDomains"
                    label={domain.label}
                    checked={formData.preferredDomains.includes(domain.value)}
                    onChange={() => handleDomainToggle(domain.value)}
                  />
                ))}
              </div>
              {errors.preferredDomains && (
                <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5" role="alert">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {errors.preferredDomains}
                </p>
              )}
            </div>

            {/* Duration & Start Date */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <FormSelect
                id="programmeDuration"
                name="programmeDuration"
                label="2. Programme Duration"
                options={DURATION_OPTIONS}
                placeholder="--Select Duration--"
                required
                value={formData.programmeDuration}
                onChange={(e) => handleChange("programmeDuration", e.target.value)}
                error={errors.programmeDuration}
              />
              <FormInput
                id="proposedStartDate"
                name="proposedStartDate"
                label="3. Proposed Start Date"
                type="date"
                icon={Calendar}
                required
                value={formData.proposedStartDate}
                onChange={(e) => handleChange("proposedStartDate", e.target.value)}
                error={errors.proposedStartDate}
              />
            </div>

            {/* Occupation & Motivation */}
            <FormInput
              id="presentOccupation"
              name="presentOccupation"
              label="4. Present Occupation / Status"
              placeholder="e.g., Student / Fresher / Working Professional / Pursuing Higher Studies"
              required
              value={formData.presentOccupation}
              onChange={(e) => handleChange("presentOccupation", e.target.value)}
              error={errors.presentOccupation}
            />
            <FormTextarea
              id="motivationStatement"
              name="motivationStatement"
              label="5. Why do you want to join BSERC Apprenticeship Programme?"
              placeholder="Briefly describe your motivation, career goals, and how this programme aligns with your aspirations (100–150 words)..."
              rows={5}
              required
              maxLength={800}
              value={formData.motivationStatement}
              onChange={(e) => handleChange("motivationStatement", e.target.value)}
              error={errors.motivationStatement}
              helperText="Focus on your passion for space/defence technology and contribution to Viksit Bharat @2047"
            />
          </SectionCard>

          {/* SECTION IV: Supporting Documents */}
          <SectionCard title="SECTION IV: SUPPORTING DOCUMENTS" subtitle="Upload self-attested copies (PDF/JPG/PNG - Max 5MB each)" icon={Upload}>
            <div className="grid md:grid-cols-2 gap-4">
              <FileUpload
                id="resumeUpload"
                name="resume"
                label="Updated Resume / CV"
                accept=".pdf,.doc,.docx"
                maxSizeMB={5}
                helperText="Required • PDF, DOC, DOCX"
                onFileSelect={(file) => handleFileSelect("resume", file)}
                error={errors.resume}
              />
              <FileUpload
                id="certificatesUpload"
                name="certificates"
                label="Educational Certificates"
                accept=".pdf,.jpg,.jpeg,.png"
                maxSizeMB={5}
                helperText="Combine into single PDF if possible"
                onFileSelect={(file) => handleFileSelect("certificates", file)}
                error={errors.certificates}
              />
              <FileUpload
                id="aadhaarUpload"
                name="aadhaar"
                label="Aadhaar Copy"
                accept=".pdf,.jpg,.jpeg,.png"
                maxSizeMB={5}
                helperText="Optional but recommended"
                onFileSelect={(file) => handleFileSelect("aadhaar", file)}
                error={errors.aadhaar}
              />
              <FileUpload
                id="photoUpload"
                name="photo"
                label="Passport-size Photograph"
                accept=".jpg,.jpeg,.png"
                maxSizeMB={5}
                helperText="Recent photo, plain background"
                onFileSelect={(file) => handleFileSelect("photo", file)}
                error={errors.photo}
              />
            </div>
          </SectionCard>

          {/* SECTION V: Declaration */}
          <SectionCard title="SECTION IV: DECLARATION" icon={FileSignature}>
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-5 mb-6">
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                I, <span className="text-orange-400 font-semibold">{formData.declarationName || "________________"}</span>,
                Son / Daughter of <span className="text-orange-400 font-semibold">{formData.fatherName || "________________"}</span>,
              </p>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                do hereby solemnly declare that all the information furnished in this application is true, complete, and correct to the best of my knowledge and belief. I understand that if any information is found false or suppressed at any stage, my candidature shall be liable to be rejected or terminated without any prior notice.
              </p>
              <p className="text-zinc-300 text-sm leading-relaxed">
                I further undertake to abide by all the rules, regulations, and code of conduct of Bharat Space Education Research Centre (BSERC) and contribute sincerely towards the vision of <span className="text-orange-400 font-semibold">Viksit Bharat @2047</span>.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <FormInput
                id="declarationName"
                name="declarationName"
                label="Declarant Full Name"
                placeholder="As in application"
                required
                value={formData.declarationName}
                onChange={(e) => handleChange("declarationName", e.target.value.toUpperCase())}
                error={errors.declarationName}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  id="declarationPlace"
                  name="declarationPlace"
                  label="Place"
                  placeholder="City"
                  required
                  value={formData.declarationPlace}
                  onChange={(e) => handleChange("declarationPlace", e.target.value.toUpperCase())}
                  error={errors.declarationPlace}
                />
                <FormInput
                  id="declarationDate"
                  name="declarationDate"
                  label="Date"
                  type="date"
                  required
                  value={formData.declarationDate}
                  onChange={(e) => handleChange("declarationDate", e.target.value)}
                  error={errors.declarationDate}
                />
              </div>
              <FormInput
                id="signatureName"
                name="signatureName"
                label="Signature of Applicant (Type Full Name)"
                placeholder="Digital signature equivalent"
                required
                value={formData.signatureName}
                onChange={(e) => handleChange("signatureName", e.target.value.toUpperCase())}
                error={errors.signatureName}
                className="md:col-span-2"
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col items-center pt-6 border-t border-[#2a2a2a]">
              <SubmitButton isSubmitting={isSubmitting} label="Submit Apprenticeship Application" />
              <p className="mt-4 text-xs text-zinc-500 text-center max-w-md">
                By submitting, you agree to BSERC's data protection policy. Applications are reviewed on a rolling basis.
              </p>
            </div>
          </SectionCard>
        </form>

        {/* Submission Guidelines Footer */}
        <div className="mt-10 bg-[#111111] border border-[#262626] rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-sm text-zinc-400 leading-relaxed">
              <p className="text-zinc-300 font-semibold mb-2">Submission Guidelines:</p>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>Submit this form along with your updated Resume, Educational Certificates, Aadhaar Copy, and recent passport-size photograph</li>
                <li>Email complete application to: <a href="mailto:outreach@bserc.org" className="text-orange-400 hover:underline">outreach@bserc.org</a></li>
                <li>Subject Line: <code className="bg-[#0d0d0d] px-1.5 py-0.5 rounded text-orange-300">Apprenticeship Application – [Your Full Name] – BSERC/2026</code></li>
                <li>Shortlisted candidates will be informed via email for a virtual interview</li>
                <li>Selected apprentices receive a formal Certificate of Completion and industry exposure in Space & Defence Education</li>
              </ul>
              <p className="mt-4 pt-4 border-t border-[#2a2a2a] text-xs">
                <span className="text-zinc-500">Queries:</span>{" "}
                <a href="mailto:outreach@bserc.org" className="text-orange-400 hover:text-orange-300">outreach@bserc.org</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}