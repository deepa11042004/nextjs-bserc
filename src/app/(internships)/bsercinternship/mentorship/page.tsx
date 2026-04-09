 
"use client";

import { useState, FormEvent } from "react";
import {
  Check,
  ArrowRight,
  AlertCircle,
  User,
  Target,
  FileText,
  Lightbulb,
  HeartHandshake,
  Sparkles,
  Globe
} from "lucide-react";
import OurMentors from "@/components/SummerSchool/OurMentors";
 
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
  prefix?: string;
  suffix?: string;
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
  prefix,
  suffix,
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
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 text-sm">
            {prefix}
          </span>
        )}
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
            ${prefix ? "pl-10 " : ""} ${suffix ? "pr-12" : ""}
            ${
              error
                ? "border-red-500 focus:border-red-500/50"
                : "border-[#2a2a2a] hover:border-[#3a3a3a]"
            }
          `}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 text-sm">
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <p
          className="mt-2 text-xs text-red-400 flex items-center gap-1.5"
          role="alert"
        >
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
}: SelectProps) {
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
        <p
          className="mt-2 text-xs text-red-400 flex items-center gap-1.5"
          role="alert"
        >
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
  maxLength?: number;
  minLength?: number;
}

function FormTextarea({
  id,
  name,
  label,
  placeholder,
  rows = 4,
  required = false,
  value = "",
  onChange,
  error,
  maxLength = 500,
  minLength = 100,
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
        minLength={minLength}
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
      <div className="flex justify-between items-center mt-2">
        <p
          className={`text-xs ${value.length < minLength ? "text-orange-400" : "text-zinc-600"}`}
        >
          Min {minLength} chars
        </p>
        <p className="text-xs text-zinc-600">
          {value?.length || 0}/{maxLength} characters
        </p>
      </div>
      {error && (
        <p
          className="mt-2 text-xs text-red-400 flex items-center gap-1.5"
          role="alert"
        >
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────

interface CheckboxProps {
  id: string;
  name: string;
  label: string | React.ReactNode;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  error?: string;
}

function FormCheckbox({
  id,
  name,
  label,
  description,
  checked,
  onChange,
  required,
  error,
}: CheckboxProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-start gap-3 cursor-pointer select-none group"
      >
        <div className="relative flex items-center mt-0.5">
          <input
            type="checkbox"
            id={id}
            name={name}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            required={required}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-zinc-600 bg-[#111111] checked:bg-orange-500 checked:border-orange-500 transition-all"
          />
          <Check
            className="absolute h-4 w-4 text-black opacity-0 peer-checked:opacity-100 pointer-events-none left-[2px] top-[2px]"
            strokeWidth={4}
          />
        </div>
        <div>
          <span className="text-zinc-100 text-sm font-medium group-hover:text-zinc-50 transition-colors">
            {label}
          </span>
          {required && <span className="text-red-500 ml-0.5">*</span>}
          {description && (
            <p className="text-zinc-500 text-xs mt-0.5">{description}</p>
          )}
        </div>
      </label>
      {error && (
        <p
          className="mt-2 text-xs text-red-400 flex items-center gap-1.5"
          role="alert"
        >
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────

function SubmitButton({
  isSubmitting = false,
  label = "Submit",
}: {
  isSubmitting?: boolean;
  label?: string;
}) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`
        flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold 
        transition-all active:scale-95 w-full md:w-auto
        ${
          isSubmitting
            ? "bg-zinc-800 text-zinc-500 cursor-wait"
            : "bg-orange-500 hover:bg-orange-600 text-black shadow-lg shadow-[#ccf15a]/10 hover:shadow-[#ccf15a]/20"
        }
      `}
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
}

// ─────────────────────────────────────────────────────────────

const SectionCard = ({
  title,
  children,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  icon?: React.ElementType;
}) => (
  <div className="bg-[#181818] rounded-xl border border-[#262626] p-6 md:p-8 mb-8 shadow-2xl">
    <div className="mb-6 flex items-start gap-3">
      {Icon && (
        <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-orange-500" />
        </div>
      )}
      <div>
        <h3 className="text-white text-lg font-serif font-medium tracking-wide uppercase">
          {title}
        </h3>
        {subtitle && <p className="text-zinc-400 text-sm mt-2">{subtitle}</p>}
      </div>
    </div>
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────────

interface ContributionTier {
  id: string;
  label: string;
  amountINR: string;
  amountUSD: string;
  description: string;
  popular?: boolean;
}

const contributionTiers: ContributionTier[] = [
  {
    id: "standard-inr",
    label: "Standard Support",
    amountINR: "₹ 500",
    amountUSD: "US$ 10",
    description: "Basic mentorship session coordination",
  },
  {
    id: "enhanced-inr",
    label: "Enhanced Support",
    amountINR: "₹ 750",
    amountUSD: "US$ 15",
    description: "Priority matching + extended session time",
    popular: true,
  },
  {
    id: "custom-inr",
    label: "Custom Amount",
    amountINR: "Other",
    amountUSD: "Other",
    description: "Enter your preferred contribution",
  },
];

// ─────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────

export default function RequestMentorshipPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    class: "",
    school: "",
    city: "",
    state: "",
    email: "",
    phone: "",
    domain: "",
    guidanceType: [] as string[],
    description: "",
    timeSlot: "",
    contributionTier: "",
    customAmount: "",
    codeOfConduct: false,
    shareProject: false,
    requestCertificate: false,
    declaration: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error" | null
  >(null);
  const [participantType, setParticipantType] = useState<
    "indian" | "international"
  >("indian");

  // Options data
  const classOptions = [
    { value: "6", label: "Class VI" },
    { value: "7", label: "Class VII" },
    { value: "8", label: "Class VIII" },
    { value: "9", label: "Class IX" },
    { value: "10", label: "Class X" },
    { value: "11", label: "Class XI" },
    { value: "12", label: "Class XII" },
  ];

  const domainOptions = [
    { value: "Rocketry & Launch Systems", label: "Rocketry & Launch Systems" },
    {
      value: "Aerodynamics & Aircraft Design",
      label: "Aerodynamics & Aircraft Design",
    },
    { value: "Defence Drone Technology", label: "Defence Drone Technology" },
    { value: "UAVs & Next-Gen Drones", label: "UAVs & Next-Gen Drones" },
    { value: "Robotics & Automation", label: "Robotics & Automation" },
    { value: "Artificial Intelligence", label: "Artificial Intelligence" },
    {
      value: "Computing & Software Engineering",
      label: "Computing & Software Engineering",
    },
    { value: "Space Science", label: "Space Science" },

    { value: "other", label: "Other (specify in description)" },
  ];

  const guidanceOptions = [
    { value: "one-to-one", label: "One-to-one mentorship" },
    { value: "group-project", label: "Small group / project-based mentorship" },
    { value: "project-review", label: "Project or idea review" },
    {
      value: "career-guidance",
      label: "Career guidance in Defence & Space / Technology",
    },
  ];

  const timeSlotOptions = [
    {
      value: "Weekday Evenings (as per summer school schedule)",
      label: "Weekday Evenings (as per summer school schedule)",
    },
    {
      value: "Weekends (Saturdays & Sundays)",
      label: "Weekends (Saturdays & Sundays)",
    },
    {
      value: "Daytime (as per summer school schedule)",
      label: "Daytime (as per summer school schedule)",
    },

    {
      value: "Flexible / To be discussed",
      label: "Flexible / To be discussed",
    },
  ];

  // Handlers
  const handleChange = (name: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[name];
        return n;
      });
    }
  };

  // Add helper for multi-select checkboxes
  const handleGuidanceToggle = (value: string) => {
    setFormData((prev) => {
      const current = prev.guidanceType;
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, guidanceType: updated };
    });
    if (errors.guidanceType) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n.guidanceType;
        return n;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.class) newErrors.class = "Please select your class";
    if (!formData.school.trim()) newErrors.school = "School name is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State/Country is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile number is required";
    } else if (!/^[+]?[0-9\s\-()]{10,20}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number with country code";
    }

    if (!formData.domain)
      newErrors.domain = "Please select your preferred domain";
    if (!formData.guidanceType || formData.guidanceType.length === 0) {
      newErrors.guidanceType = "Please select at least one type of guidance";
    }
    if (!formData.description.trim()) {
      newErrors.description =
        "Please describe your project or area of interest";
    } else if (formData.description.length < 100) {
      newErrors.description =
        "Please provide more detail (minimum 100 characters)";
    } else if (formData.description.length > 500) {
      newErrors.description = "Description exceeds 500 character limit";
    }

    if (!formData.timeSlot)
      newErrors.timeSlot = "Please select preferred time slot";
    if (!formData.contributionTier)
      newErrors.contributionTier = "Please select a contribution level";

    if (
      formData.contributionTier === "custom-inr" &&
      !formData.customAmount.trim()
    ) {
      newErrors.customAmount = "Please enter a custom amount";
    }

    if (!formData.codeOfConduct) {
      newErrors.codeOfConduct = "You must agree to the code of conduct";
    }
    if (!formData.declaration) {
      newErrors.declaration = "You must confirm your interest to submit";
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrors({});

    try {
      // TODO: Replace with actual API call
      // await api.post('/mentorship/requests', { ...formData, participantType });

      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus("success");
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      setErrors({ submit: "Failed to submit request. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDisplayAmount = (tier: ContributionTier) => {
    return participantType === "indian" ? tier.amountINR : tier.amountUSD;
  };

  return (

    

     

 
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-300   selection:bg-orange-500 selection:text-black">
      
      <div className="max-w-6xl mx-auto">

         <OurMentors/>
        {/* Page Header */}
        <div className="mb-12 md:mb-16">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
            Request Mentorship Form
          </h1>

          {/* Card */}
          <div className="bg-gradient-to-br from-[#111111] via-[#0f0f0f] to-[#0b0b0b] border border-[#2a2a2a] rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
            {/* Sub Heading */}
            <h2 className="text-base font-semibold text-blue-400 mb-4 leading-snug">
              Def-Space Summer School 2026 – Request Mentorship / Guidance Form
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Bharat Space Education Research Centre (BSERC) invites students of
              the Def-Space Summer School 2026 to request personalised
              mentorship and project guidance from experienced professionals in
              Defence, Space Science, Engineering, Computing, and Emerging
              Technologies.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="mb-8 p-5 bg-[#111111] border border-[#2d3023] rounded-xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                <Check className="text-orange-500 w-5 h-5" strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-semibold text-white">Request Submitted!</p>
                <p className="text-zinc-400 text-sm mt-1">
                  Thank you, {formData.fullName}. Your mentorship request has
                  been received. Our team will match you with a suitable mentor
                  and share payment instructions and schedule details within 3-5
                  working days.
                </p>
              </div>
            </div>
          )}

          {submitStatus === "error" && Object.keys(errors).length > 0 && (
            <div className="mb-8 p-5 bg-[#111111] border border-red-900/30 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">
                Please fix the highlighted errors before submitting.
              </p>
            </div>
          )}

          {/* Student Details */}
          <SectionCard
            title="Student Details"
            icon={User}
            subtitle="fill in your personal details  please"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <FormInput
                id="fullName"
                name="fullName"
                label="Full Name"
                placeholder="Enter your full name"
                required
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                error={errors.fullName}
              />
              <FormSelect
                id="class"
                name="class"
                label="Class (VI–XII)"
                options={classOptions}
                placeholder="Select Class"
                required
                value={formData.class}
                onChange={(e) => handleChange("class", e.target.value)}
                error={errors.class}
              />
              <div className="md:col-span-2">
                <FormInput
                  id="school"
                  name="school"
                  label="School / Institution Name"
                  placeholder="Enter school name"
                  required
                  value={formData.school}
                  onChange={(e) => handleChange("school", e.target.value)}
                  error={errors.school}
                />
              </div>
              <FormInput
                id="city"
                name="city"
                label="City"
                placeholder="Enter city"
                required
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                error={errors.city}
              />
              <FormInput
                id="state"
                name="state"
                label="State / Country"
                placeholder="State or Country"
                required
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
                error={errors.state}
              />
              <FormInput
                id="email"
                name="email"
                label="Email Address"
                type="email"
                placeholder="your@email.com"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={errors.email}
              />
              <FormInput
                id="phone"
                name="phone"
                label="Mobile Number (with country code)"
                type="tel"
                placeholder="+91 XXXXX XXXXX or +1-XXXXX"
                required
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                error={errors.phone}
              />
            </div>
          </SectionCard>

          {/* Mentorship Request Details */}
          <SectionCard
            title="Mentorship Request Details"
            icon={Target}
            subtitle="Help us match you with the right mentor"
          >
            <div className="flex flex-col gap-4">
              <FormSelect
                id="domain"
                name="domain"
                label="Preferred Domain"
                options={domainOptions}
                placeholder="Select Domain"
                required
                value={formData.domain}
                onChange={(e) => handleChange("domain", e.target.value)}
                error={errors.domain}
              />
              {/* Replace the FormSelect for guidanceType with this: */}
              <div className="mb-5 w-full">
                <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5">
                  Type of Guidance Requested{" "}
                  <span className="text-red-500 ml-0.5">*</span>
                </label>

                {errors.guidanceType && (
                  <p
                    className="mb-3 text-xs text-red-400 flex items-center gap-1.5"
                    role="alert"
                  >
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    {errors.guidanceType}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {guidanceOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`
          flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all
          ${
            formData.guidanceType.includes(option.value)
              ? "border-orange-500  bg-orange-500/5"
              : "border-[#2a2a2a] hover:border-[#3a3a3a] bg-[#111111]"
          }
        `}
                    >
                      <div className="relative flex items-center mt-0.5">
                        <input
                          type="checkbox"
                          checked={formData.guidanceType.includes(option.value)}
                          onChange={() => handleGuidanceToggle(option.value)}
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-zinc-600 bg-[#111111] checked:bg-orange-500 checked:border-orange-500 transition-all"
                        />
                        <Check
                          className="absolute h-4 w-4 text-black opacity-0 peer-checked:opacity-100 pointer-events-none left-[2px] top-[2px]"
                          strokeWidth={4}
                        />
                      </div>
                      <span className="text-zinc-100 text-sm">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <FormTextarea
                  id="description"
                  name="description"
                  label="Brief Description of Your Project / Area of Interest"
                  placeholder="Describe your project or area of interest (100–200 words)..."
                  rows={5}
                  required
                  minLength={100}
                  maxLength={500}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  error={errors.description}
                />
              </div>
              <FormSelect
                id="timeSlot"
                name="timeSlot"
                label="Preferred Time Slot"
                options={timeSlotOptions}
                placeholder="Select Preference"
                required
                value={formData.timeSlot}
                onChange={(e) => handleChange("timeSlot", e.target.value)}
                error={errors.timeSlot}
              />
            </div>
          </SectionCard>

          {/* Mentorship Support Contribution */}
          <SectionCard
            title="Mentorship Support Contribution"
            icon={HeartHandshake}
            subtitle="Choose the level of contribution that best suits your circumstances"
          >
            {/* Participant Type Toggle */}
            <div className="mb-6 p-4 bg-[#111111] border border-[#262626] rounded-lg">
              <p className="text-zinc-400 text-sm mb-3">I am a:</p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setParticipantType("indian")}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2
                    ${
                      participantType === "indian"
                        ? "bg-orange-500 text-black"
                        : "bg-[#1a1a1a] text-zinc-400 hover:text-zinc-200 border border-[#2a2a2a]"
                    }
                  `}
                >
                  <Globe className="w-4 h-4" />
                  Indian Student
                </button>
                <button
                  type="button"
                  onClick={() => setParticipantType("international")}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2
                    ${
                      participantType === "international"
                        ? "bg-orange-500 text-black"
                        : "bg-[#1a1a1a] text-zinc-400 hover:text-zinc-200 border border-[#2a2a2a]"
                    }
                  `}
                >
                  <Globe className="w-4 h-4" />
                  International Student
                </button>
              </div>
            </div>

            {/* Contribution Tiers */}
            {errors.contributionTier && (
              <p
                className="mb-4 text-xs text-red-400 flex items-center gap-1.5"
                role="alert"
              >
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {errors.contributionTier}
              </p>
            )}

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {contributionTiers.map((tier) => (
                <label
                  key={tier.id}
                  className={`
                    relative bg-[#111111] border rounded-xl p-4 cursor-pointer transition-all
                    hover:border-orange-500/40 group
                    ${
                      formData.contributionTier === tier.id
                        ? "border-orange-500 ring-2 ring-orange-500/20"
                        : "border-[#2a2a2a]"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="contributionTier"
                    value={tier.id}
                    checked={formData.contributionTier === tier.id}
                    onChange={(e) =>
                      handleChange("contributionTier", e.target.value)
                    }
                    className="sr-only"
                  />
                  {tier.popular && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                      ${
                        formData.contributionTier === tier.id
                          ? "border-orange-500 bg-orange-500"
                          : "border-zinc-600 group-hover:border-zinc-400"
                      }
                    `}
                    >
                      {formData.contributionTier === tier.id && (
                        <Check className="w-3 h-3 text-black" strokeWidth={4} />
                      )}
                    </div>
                    <span className="text-zinc-100 font-medium text-sm">
                      {tier.label}
                    </span>
                  </div>
                  <p className="text-xl font-bold text-white mb-1">
                    {getDisplayAmount(tier)}
                  </p>
                  <p className="text-zinc-500 text-xs">{tier.description}</p>
                </label>
              ))}
            </div>

            {/* Custom Amount Input */}
            {formData.contributionTier === "custom-inr" && (
              <div className="mt-4">
                <FormInput
                  id="customAmount"
                  name="customAmount"
                  label="Enter Custom Amount"
                  type="number"
                  placeholder={
                    participantType === "indian" ? "e.g., 600" : "e.g., 12"
                  }
                  prefix={participantType === "indian" ? "₹" : "$"}
                  suffix={participantType === "indian" ? "INR" : "USD"}
                  value={formData.customAmount}
                  onChange={(e) => handleChange("customAmount", e.target.value)}
                  error={errors.customAmount}
                />
              </div>
            )}

            {/* What This Supports */}
            <div className="mt-6 p-4 bg-[#111111] border border-[#262620] rounded-lg">
              <div className="flex items-start gap-2 text-zinc-400 text-xs">
                <Sparkles className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-zinc-300 mb-1">
                    💡 What This Supports
                  </p>
                  <p>
                    Your contribution supports expert mentor time, session
                    coordination, and access to the BSERC mentorship platform.
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Consent & Additional Information */}
          <SectionCard title="Consent & Additional Information" icon={FileText}>
            <div className="bg-[#111111] border border-[#262620] rounded-xl p-5 space-y-1">
              <FormCheckbox
                id="codeOfConduct"
                name="codeOfConduct"
                label="I agree to adhere to BSERC's code of conduct and academic integrity guidelines during mentorship. "
                checked={formData.codeOfConduct}
                onChange={(checked) => handleChange("codeOfConduct", checked)}
                required
                error={errors.codeOfConduct}
              />
              <FormCheckbox
                id="shareProject"
                name="shareProject"
                label="I am willing to share a brief project summary or report with the assigned mentor for review."
                checked={formData.shareProject}
                onChange={(checked) => handleChange("shareProject", checked)}
              />
              <FormCheckbox
                id="requestCertificate"
                name="requestCertificate"
                label="I would like to receive a Mentorship Participation Certificate from BSERC upon satisfactory completion of the sessions."
                checked={formData.requestCertificate}
                onChange={(checked) =>
                  handleChange("requestCertificate", checked)
                }
              />
            </div>
          </SectionCard>

          <div className="bg-[#111111] border border-[#262620] rounded-xl p-5">
            <FormCheckbox
              id="declaration"
              name="declaration"
              label=" By submitting this form, I confirm my interest in availing
                      mentorship under the Def-Space Summer School 2026. I
                      understand that the BSERC team will match me with a
                      suitable mentor and share payment instructions and
                      schedule details."
              checked={formData.declaration}
              onChange={(checked) => handleChange("declaration", checked)}
              required
              error={errors.declaration}
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 py-7">
            <SubmitButton
              isSubmitting={isSubmitting}
              label={
                submitStatus === "success"
                  ? "Request Submitted"
                  : "Submit Mentorship Request"
              }
            />
          </div>
        </form>

         
        
      </div>
    </div>

       
  );
}
