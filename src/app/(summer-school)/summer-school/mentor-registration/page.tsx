// File: app/mentor-registration/page.tsx
"use client";

import { useState, FormEvent } from "react";
import {
  Check,
  ArrowRight,
  AlertCircle,
  User,
  Mail,
  Phone,
  Briefcase,
  Building2,
  Clock,
  Calendar,
  DollarSign,
  Sparkles,
  GraduationCap,
  MessageSquare,
  Globe,
  Shield,
  FileText,
} from "lucide-react";

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
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
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
            placeholder-zinc-600 focus:outline-none focus:border-[#a4cc22]/50 
            transition-colors text-sm
            ${prefix ? "pl-10" : ""} ${suffix ? "pr-12" : ""}
            ${
              error
                ? "border-red-500 focus:border-red-500/50"
                : "border-[#2a2a2a] hover:border-[#3a3a3a]"
            }
          `}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
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
            focus:outline-none focus:border-[#a4cc22]/50 transition-colors text-sm appearance-none
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
  maxLength = 500,
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
          placeholder-zinc-600 focus:outline-none focus:border-[#a4cc22]/50 
          transition-colors text-sm resize-none
          ${
            error
              ? "border-red-500 focus:border-red-500/50"
              : "border-[#2a2a2a] hover:border-[#3a3a3a]"
          }
        `}
      />
      <div className="flex justify-end mt-2">
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
  label: React.ReactNode;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function FormCheckbox({
  id,
  name,
  label,
  description,
  checked,
  onChange,
}: CheckboxProps) {
  return (
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
        {description && (
          <p className="text-zinc-500 text-xs mt-0.5">{description}</p>
        )}
      </div>
    </label>
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
        <div className="w-10 h-10 rounded-lg bg-[#a4cc22]/10 flex items-center justify-center flex-shrink-0">
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
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────

export default function MentorRegistrationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    designation: "",
    organization: "",
    experienceYears: "",
    expertiseDomain: "",
    relevantExperience: "",
    liveSessions: false,
    projectGuidance: false,
    careerCounselling: false,
    guestLectures: false,
    preferredBatch: "",
    timeSlots: "",
    availableDays: "",
    currency: "INR",
    honorariumHourly: "",
    honorariumDaily: "",
    honorariumWeekly: "",
    honorariumProject: "",
    guestSpeakerInterest: false,
    bioConsent: false,
    declaration: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error" | null
  >(null);

  // Options data
  const experienceOptions = [
    { value: "1–3", label: "1–3 years" },
    { value: "4–7", label: "4–7 years" },
    { value: "8-15", label: "8–15 years" },
    { value: "15+", label: "15+ years" },
  ];

  const domainOptions = [
    { value: "Rocketry & Launch Systems", label: "Rocketry & Launch Systems" },
    { value: "Defence Drone Technology", label: "Defence Drone Technology" },
    { value: "Air Taxi & Next-Gen UAVs", label: "Air Taxi & Next-Gen UAVs" },
    {
      value: "Aircraft Design & Aerodynamics",
      label: "Aircraft Design & Aerodynamics",
    },
    { value: "Robotics & Automation", label: "Robotics & Automation" },
    {
      value: "Artificial Intelligence & Machine Learning",
      label: "Artificial Intelligence & Machine Learning",
    },
    {
      value: "Space Science & Satellite Systems",
      label: "Space Science & Satellite Systems",
    },
    {
      value: "Defence Technology (General)",
      label: "Defence Technology (General)",
    },
    {
      value: "Computing & Software Engineering",
      label: "Computing & Software Engineering",
    },
    { value: "Multiple Domains", label: "Multiple Domains" },
  ];

  const batchOptions = [
    { value: "batch1", label: "Batch I: 15 May – 30 June 2026" },
    { value: "batch2", label: "Batch II: 19 July – 30 August 2026" },
    { value: "both", label: "Both Batches (if applicable)" },
  ];

  const timeSlotOptions = [
    { value: "weekdays-morning", label: "Weekday Evenings (5 PM – 9 PM IST)" },
    { value: "weekdays-afternoon", label: "Weekend (Saturdays & Sundays)" },
    { value: "flexible", label: "Flexible / To be discussed" },
  ];

  // Handlers
  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[name];
        return n;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
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
    if (!formData.designation.trim())
      newErrors.designation = "Designation is required";
    if (!formData.organization.trim())
      newErrors.organization = "Organization is required";
    if (!formData.experienceYears)
      newErrors.experienceYears = "Please select experience level";
    if (!formData.expertiseDomain)
      newErrors.expertiseDomain = "Please select your primary domain";
    if (!formData.relevantExperience.trim()) {
      newErrors.relevantExperience = "Please describe your relevant experience";
    } else if (formData.relevantExperience.length < 50) {
      newErrors.relevantExperience =
        "Please provide more detail (min 50 characters)";
    }

    // At least one mentorship mode selected
    if (
      !formData.liveSessions &&
      !formData.projectGuidance &&
      !formData.careerCounselling &&
      !formData.guestLectures
    ) {
      newErrors.mentorshipMode = "Please select at least one mentorship mode";
    }

    if (!formData.preferredBatch)
      newErrors.preferredBatch = "Please select preferred batch";
    if (!formData.timeSlots)
      newErrors.timeSlots = "Please select available time slots";

    // Update the honorarium validation section:
    if (!formData.honorariumHourly.trim()) {
      newErrors.honorariumHourly = "Please specify your hourly honorarium";
    } else if (
      isNaN(Number(formData.honorariumHourly)) ||
      Number(formData.honorariumHourly) <= 0
    ) {
      newErrors.honorariumHourly = "Please enter a valid amount";
    }
    if (!formData.honorariumDaily.trim()) {
      newErrors.honorariumDaily = "Please specify your daily honorarium";
    } else if (
      isNaN(Number(formData.honorariumDaily)) ||
      Number(formData.honorariumDaily) <= 0
    ) {
      newErrors.honorariumDaily = "Please enter a valid amount";
    }
    // ... keep weekly/project validation optional as before

    if (!formData.declaration) {
      newErrors.declaration = "You must agree to the declaration to submit";
    }
    if (!formData.bioConsent) {
      newErrors.bioConsent = "Bio consent is required for mentor profile";
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
      // TODO: Replace with actual API call to your backend
      // await api.post('/mentors/application', formData);

      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus("success");

      // Optional: Reset form or redirect after success
      // router.push('/mentor-dashboard');
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      setErrors({ submit: "Failed to submit application. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-300 py-12 md:py-16 px-4 selection:bg-orange-500 selection:text-black">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-orange-500 text-xs font-bold tracking-[0.2em] uppercase">
              Mentor Network
            </span>
            <div className="h-px w-16 bg-[#a4cc22]/40"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-5 leading-tight">
            Register as Mentor
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-4xl leading-relaxed">
            Share your expertise and inspire the next generation. Join our panel
            of mentors for Def-Space Summer School 2026.
          </p>
        </div>

        <div
          className="flex flex-col justify-center bg-gradient-to-r from-[#111111] to-[#0f0f0f] border
         border-[#2a2a2a] rounded-xl p-5 mb-8"
        >
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {""}
            <span className="text-blue-400 font-semibold">
              Join BSERC's Mentor Network
            </span>
            {""} – Bharat Space Education Research Centre (BSERC) invites
            experienced professionals, educators, researchers, and practitioners
            from Defence, Space Science, Engineering, Computing, and Emerging
            Technologies to join as mentors for the {""}
            <span className="text-orange-400 font-semibold">
              Def-Space Summer School 2026.
            </span>
            {""}
          </p>
        </div>

         
        <form onSubmit={handleSubmit} noValidate>
          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="mb-8 p-5 bg-[#111111] border border-[#2d3023] rounded-xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#a4cc22]/20 flex items-center justify-center flex-shrink-0">
                <Check className="text-orange-500 w-5 h-5" strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-semibold text-white">
                  Application Submitted!
                </p>
                <p className="text-zinc-400 text-sm mt-1">
                  Thank you, {formData.fullName}. Your mentor application has
                  been received. Our team will review your profile and contact
                  you within 5-7 working days with onboarding details.
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

          {/* Personal & Professional Details */}
          <SectionCard
            title="Personal & Professional Details"
            icon={User}
            subtitle="Tell us about yourself and your professional background"
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
                placeholder="+91-XXXXXXXXXX or +1-XXXXXXXXXX"
                required
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                error={errors.phone}
              />
              <FormInput
                id="designation"
                name="designation"
                label="Designation / Current Role"
                placeholder="e.g., Scientist, Engineer, Professor, Industry Professional"
                required
                value={formData.designation}
                onChange={(e) => handleChange("designation", e.target.value)}
                error={errors.designation}
              />
              <div className="md:col-span-2">
                <FormInput
                  id="organization"
                  name="organization"
                  label="Organisation / Institution"
                  placeholder="ISRO / DRDO / HAL / IIT / University / Private Company / Research Centre"
                  required
                  value={formData.organization}
                  onChange={(e) => handleChange("organization", e.target.value)}
                  error={errors.organization}
                />
              </div>
            </div>
          </SectionCard>

          {/* Area of Expertise */}
          <SectionCard
            title="Area of Expertise & Experience"
            icon={GraduationCap}
            subtitle="Help us match your expertise with student needs"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <FormSelect
                id="experienceYears"
                name="experienceYears"
                label="Years of Experience"
                options={experienceOptions}
                placeholder="Select Experience Level"
                required
                value={formData.experienceYears}
                onChange={(e) =>
                  handleChange("experienceYears", e.target.value)
                }
                error={errors.experienceYears}
              />
              <FormSelect
                id="expertiseDomain"
                name="expertiseDomain"
                label="Primary Area of Expertise"
                options={domainOptions}
                placeholder="Select Domain"
                required
                value={formData.expertiseDomain}
                onChange={(e) =>
                  handleChange("expertiseDomain", e.target.value)
                }
                error={errors.expertiseDomain}
              />
              <div className="md:col-span-2">
                <FormTextarea
                  id="relevantExperience"
                  name="relevantExperience"
                  label="Relevant Experience (Notable Projects, Research, Publications, Teaching Background) "
                  placeholder="Describe your key projects, research contributions, publications, awards, and teaching experience..."
                  rows={5}
                  required
                  maxLength={500}
                  value={formData.relevantExperience}
                  onChange={(e) =>
                    handleChange("relevantExperience", e.target.value)
                  }
                  error={errors.relevantExperience}
                />
              </div>
            </div>
          </SectionCard>

          {/* Preferred Mode of Mentorship */}
          <SectionCard
            title="Preferred Mode of Mentorship"
            icon={MessageSquare}
            subtitle="Select all modes you're comfortable with"
          >
            {errors.mentorshipMode && (
              <p
                className="mb-4 text-xs text-red-400 flex items-center gap-1.5"
                role="alert"
              >
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {errors.mentorshipMode}
              </p>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              <FormCheckbox
                id="liveSessions"
                name="liveSessions"
                label="Live Online Interactive Sessions"
                description="Weekends / Evenings (2–3 hours per session)"
                checked={formData.liveSessions}
                onChange={(checked) => handleChange("liveSessions", checked)}
              />
              <FormCheckbox
                id="projectGuidance"
                name="projectGuidance"
                label="Project-Based Guidance to Student Groups"
                description="Guide students on hands-on projects (4–6 weeks)"
                checked={formData.projectGuidance}
                onChange={(checked) => handleChange("projectGuidance", checked)}
              />
              <FormCheckbox
                id="careerCounselling"
                name="careerCounselling"
                label="Q&A & Career-Counselling Sessions"
                description="Career guidance & pathway discussions (1–2 hours)"
                checked={formData.careerCounselling}
                onChange={(checked) =>
                  handleChange("careerCounselling", checked)
                }
              />
              <FormCheckbox
                id="guestLectures"
                name="guestLectures"
                label="Guest Lectures or Webinars"
                description="Conduct specialized webinar / keynote (1–2 hours)"
                checked={formData.guestLectures}
                onChange={(checked) => handleChange("guestLectures", checked)}
              />
            </div>
          </SectionCard>

          {/* Commitment & Availability */}
          <SectionCard
            title="Commitment & Availability"
            icon={Clock}
            subtitle="Let us know when you can mentor"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <FormSelect
                id="preferredBatch"
                name="preferredBatch"
                label="Preferred Batch"
                options={batchOptions}
                placeholder="Select Batch"
                required
                value={formData.preferredBatch}
                onChange={(e) => handleChange("preferredBatch", e.target.value)}
                error={errors.preferredBatch}
              />
              <FormSelect
                id="timeSlots"
                name="timeSlots"
                label="Available Time Slots"
                options={timeSlotOptions}
                placeholder="Select Preference"
                required
                value={formData.timeSlots}
                onChange={(e) => handleChange("timeSlots", e.target.value)}
                error={errors.timeSlots}
              />
              <div className="md:col-span-2">
                <FormInput
                  id="availableDays"
                  name="availableDays"
                  label="Specific Days & Hours Available (Optional)"
                  placeholder="e.g., Friday evenings 6–8 PM, Sundays 10 AM–12 PM, etc."
                  value={formData.availableDays}
                  onChange={(e) =>
                    handleChange("availableDays", e.target.value)
                  }
                />
              </div>
            </div>
          </SectionCard>

          {/* Mentorship Compensation */}
          <SectionCard
            title="Mentorship Compensation & Expectations"
            icon={DollarSign}
            subtitle="Specify your expected hourly amount for mentorship services. Students will be informed of these amounts during mentorship requests.

"
          >
            {/* Currency Selector */}
            <div className="mb-6">
              <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5">
                Preferred Currency{" "}
                <span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="flex gap-3">
                {["INR", "USD"].map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => handleChange("currency", curr)}
                    className={`
            flex-1 py-2.5 px-4 rounded-md border text-sm font-medium transition-all
            ${
              formData.currency === curr
                ? "bg-orange-500 border-orange-500 text-black"
                : "bg-[#111111] border-[#2a2a2a] text-zinc-400 hover:border-[#a4cc22]/50 hover:text-zinc-200"
            }
          `}
                  >
                    {curr === "INR" ? "₹ Indian Rupee" : "$ US Dollar"}
                  </button>
                ))}
              </div>
            </div>

            {/* Honorarium Guidelines */}
            <div className="bg-[#111111] border border-[#262620] rounded-xl p-5 mb-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-[#1a1a1a] p-2 rounded-lg">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-zinc-200 mb-3">
                    Honorarium Guidelines
                  </p>

                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li className="flex gap-2">
                      <span className="text-orange-500">•</span>
                      <span>
                        <strong className="text-zinc-200">
                          Honorarium per Hour:
                        </strong>{" "}
                        Your hourly consulting honorarium for one-on-one
                        mentorship sessions
                      </span>
                    </li>

                    <li className="flex gap-2">
                      <span className="text-orange-500">•</span>
                      <span>
                        <strong className="text-zinc-200">
                          Honorarium per Day:
                        </strong>{" "}
                        Full-day intensive mentorship (6 hours of guidance)
                      </span>
                    </li>

                    <li className="flex gap-2">
                      <span className="text-orange-500">•</span>
                      <span>
                        <strong className="text-zinc-200">
                          Honorarium per Week:
                        </strong>{" "}
                        Weekly recurring sessions (typically 10–25% discount
                        from hourly honorarium)
                      </span>
                    </li>

                    <li className="flex gap-2">
                      <span className="text-orange-500">•</span>
                      <span>
                        <strong className="text-zinc-200">
                          Project-Based Honorarium:
                        </strong>{" "}
                        Flat fee for complete project guidance (4–8 weeks) Flat
                        honorarium for guiding a complete student project (4–8
                        weeks)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Honorarium Inputs */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormInput
                id="honorariumHourly"
                name="honorariumHourly"
                label="Honorarium per Hour (₹ or USD) "
                type="number"
                placeholder={
                  formData.currency === "INR" ? "e.g., 500" : "e.g., 10"
                }
                required
                prefix={formData.currency === "INR" ? "₹" : "$"}
                suffix={formData.currency}
                value={formData.honorariumHourly}
                onChange={(e) =>
                  handleChange("honorariumHourly", e.target.value)
                }
                error={errors.honorariumHourly}
              />
              <FormInput
                id="honorariumDaily"
                name="honorariumDaily"
                label="Honorarium per Day (Full Day - 6 hrs)"
                type="number"
                placeholder={
                  formData.currency === "INR" ? "e.g., 2500" : "e.g., 50"
                }
                required
                prefix={formData.currency === "INR" ? "₹" : "$"}
                suffix={formData.currency}
                value={formData.honorariumDaily}
                onChange={(e) =>
                  handleChange("honorariumDaily", e.target.value)
                }
                error={errors.honorariumDaily}
              />
              <FormInput
                id="honorariumWeekly"
                name="honorariumWeekly"
                label="Honorarium per Week (5 sessions × 2 hrs) (Optional)"
                type="number"
                placeholder={
                  formData.currency === "INR" ? "e.g., 4000" : "e.g., 80"
                }
                prefix={formData.currency === "INR" ? "₹" : "$"}
                suffix={formData.currency}
                value={formData.honorariumWeekly}
                onChange={(e) =>
                  handleChange("honorariumWeekly", e.target.value)
                }
              />
              <FormInput
                id="honorariumProject"
                name="honorariumProject"
                label="Project-Based Honorarium (Optional)"
                type="number"
                placeholder={
                  formData.currency === "INR" ? "e.g., 5000" : "e.g., 100"
                }
                prefix={formData.currency === "INR" ? "₹" : "$"}
                suffix={formData.currency}
                value={formData.honorariumProject}
                onChange={(e) =>
                  handleChange("honorariumProject", e.target.value)
                }
              />
            </div>
          </SectionCard>

          {/* Additional Information */}
          <SectionCard title="Additional Information" icon={FileText}>

            <div className="bg-[#111111] border border-[#262620] rounded-xl p-5">
               <div className="space-y-4">
              <FormCheckbox
                id="guestSpeakerInterest"
                name="guestSpeakerInterest"
                label="I am interested in participating as a Guest Speaker or Workshop Instructor"
                checked={formData.guestSpeakerInterest}
                onChange={(checked) =>
                  handleChange("guestSpeakerInterest", checked)
                }
              />
              <div>
                <FormCheckbox
                  id="bioConsent"
                  name="bioConsent"
                  label="I am willing to provide a short professional profile/bio for BSERC communications and the Def-Space Summer School website"
                  checked={formData.bioConsent}
                  onChange={(checked) => handleChange("bioConsent", checked)}
                />
                {errors.bioConsent && (
                  <p
                    className="mt-2 text-xs text-red-400 flex items-center gap-1.5"
                    role="alert"
                  >
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    {errors.bioConsent}
                  </p>
                )}
              </div>
            </div>
            </div>
            
          </SectionCard>

          {/* Declaration */}
          <SectionCard title="Declaration" icon={Shield}>
            <div className="bg-[#111111] border border-[#262620] rounded-xl p-5">
              <FormCheckbox
                id="declaration"
                name="declaration"
                label={
                  <span>
                    By submitting this form, I confirm that all the information
                    provided is true and accurate. I understand that shortlisted
                    mentors will be contacted with onboarding details and a
                    formal Letter of Mentorship. I agree to abide by BSERC's
                    mentor guidelines and code of conduct. I consent to being
                    contacted via email and phone for mentorship coordination.
                  </span>
                }
                checked={formData.declaration}
                onChange={(checked) => handleChange("declaration", checked)}
              />
              {errors.declaration && (
                <p
                  className="mt-3 text-xs text-red-400 flex items-center gap-1.5"
                  role="alert"
                >
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {errors.declaration}
                </p>
              )}
            </div>
          </SectionCard>

          {/* Submit Button */}
          <div className="flex flex-col justify-center md:flex-row items-center gap-6 pt-4">
           
            <SubmitButton
              isSubmitting={isSubmitting}
              label={
                submitStatus === "success"
                  ? "Application Submitted"
                  : "Submit Mentor Application"
              }
            />
          </div>
        </form>

        {/* What Happens Next */}
        <div className="mt-12 bg-[#111111] border border-[#262626] rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#a4cc22]/10 flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">
                ℹ️ What Happens Next
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                By submitting this form, I confirm that all the information
                provided is true and accurate. I understand that shortlisted
                mentors will be contacted with onboarding details and a formal
                Letter of Mentorship. I agree to abide by BSERC's mentor
                guidelines and code of conduct. I consent to being contacted via
                email and phone for mentorship coordination.  
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
