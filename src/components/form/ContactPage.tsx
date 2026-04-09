"use client";

import { useState, FormEvent } from "react";
import { Check, ArrowRight, AlertCircle } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// UI Components - Themed for Def-Space Design System
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
    <div className="mb-6 w-full">
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
              ? "border-red-500 focus:border-red-500/50 animate-pulse"
              : "border-[#2a2a2a] hover:border-[#3a3a3a]"
          }
        `}
      />
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
    <div className="mb-6 w-full">
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
        maxLength={1000}
        className={`
          w-full px-4 py-3 rounded-md bg-[#111111] border text-zinc-100 
          placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 
          transition-colors text-sm resize-none
          ${
            error
              ? "border-red-500 focus:border-red-500/50 animate-pulse"
              : "border-[#2a2a2a] hover:border-[#3a3a3a]"
          }
        `}
      />
      <div className="flex justify-between items-center mt-2">
        {error && (
          <p className="text-xs text-red-400 flex items-center gap-1.5" role="alert">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            {error}
          </p>
        )}
        <p className="text-xs text-zinc-600 ml-auto">
          {value?.length || 0}/1000 characters
        </p>
      </div>
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
        flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold 
        transition-all active:scale-95 w-full md:w-auto mx-auto md:mx-0
        ${
          isSubmitting
            ? "bg-zinc-800 text-zinc-500 cursor-wait"
            : "bg-orange-500 hover:bg-orange-600 text-black shadow-lg shadow-[#ccf15a]/10 hover:shadow-[#ccf15a]/20"
        }
      `}
    >
      {isSubmitting ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-black"
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
          <ArrowRight className="w-5 h-5" />
        </>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Section Card Component (Matching Registration Form)
// ─────────────────────────────────────────────────────────────

const SectionCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-[#181818] rounded-xl border border-[#262626] p-6 mb-8 shadow-2xl">
    <h3 className="text-white text-lg font-serif font-medium tracking-wide border-b border-[#2a2a2a] pb-4 mb-6 uppercase">
      {title}
    </h3>
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [formData, setFormData] = useState({
    organization_name: "",
    contact_person: "",
    email: "",
    phone: "",
    subject_name: "",
    message: "",
  });
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.organization_name.trim())
      newErrors.organization_name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.subject_name.trim())
      newErrors.subject_name = "Subject is required";
    if (!formData.message.trim())
      newErrors.message = "Please tell us about your proposal";
    
    return newErrors;
  };

  const handleSubmit = (e: FormEvent) => {
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

    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      
      // Reset form after success message
      setTimeout(() => {
        setFormData({
          organization_name: "",
          contact_person: "",
          email: "",
          phone: "",
          subject_name: "",
          message: "",
        });
        setSubmitStatus("idle");
      }, 4000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-300 py-16 px-4 selection:bg-orange-500 selection:text-black">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-orange-500 text-xs font-bold tracking-[0.2em] uppercase">
             CONTACT US
            </span>
            <div className="h-px w-16 bg-orange-500/40"></div>
          </div>
          <h1 className="text-5xl font-serif font-bold text-white mb-5 leading-tight">
            Get in Touch
          </h1>
          <p className="text-zinc-400 text-sm max-w-2xl">
            Have questions about our missions or workshops? We'd love to hear
            from you. Fill out the form below and our partnerships team will 
            reach out within 48 hours.
          </p>
        </div>

        {/* Form Card */}
        <SectionCard title="Send Us a Message / संदेश भेजें">
          <form onSubmit={handleSubmit} noValidate className="space-y-2">
            
            {/* Success Message */}
            {submitStatus === "success" && (
              <div
                className="mb-6 p-4 bg-[#111111] border border-[#2d3023] rounded-xl text-zinc-100 flex items-start gap-4"
                role="alert"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Check className="text-orange-500 w-5 h-5" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="font-semibold text-white">Request Submitted!</p>
                  <p className="text-zinc-400 text-sm mt-1">
                    Thank you for reaching out. Our partnerships team will
                    contact you within 48 hours at <span className="text-zinc-300">{formData.email}</span>.
                  </p>
                </div>
              </div>
            )}

            {/* Error Summary */}
            {submitStatus === "error" && Object.keys(errors).length > 0 && (
              <div
                className="mb-6 p-4 bg-[#111111] border border-red-900/30 rounded-xl text-red-300 flex items-start gap-3"
                role="alert"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">Please fix the highlighted errors before submitting.</p>
              </div>
            )}

            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                id="organization_name"
                name="organization_name"
                label="Full Name"
                placeholder="Dr./Prof./Your Name"
                required
                value={formData.organization_name}
                onChange={(e) => handleChange("organization_name", e.target.value)}
                error={errors.organization_name}
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
              />
            </div>

            {/* Row 2: Phone + Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                id="phone"
                name="phone"
                label="Phone Number (Optional)"
                type="tel"
                placeholder="+91-XXXXXXXXXX"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              <FormInput
                id="subject_name"
                name="subject_name"
                label="Subject"
                placeholder="Partnership Inquiry"
                required
                value={formData.subject_name}
                onChange={(e) => handleChange("subject_name", e.target.value)}
                error={errors.subject_name}
              />
            </div>

            {/* Message Textarea */}
            <FormTextarea
              id="message"
              name="message"
              label="Message / Proposal"
              placeholder="Tell us how you would like to collaborate with Def-Space..."
              rows={6}
              required
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              error={errors.message}
            />

            {/* Submit Button */}
            <div className="pt-6 flex flex-col md:flex-row items-center justify-center  gap-6">
                
              <SubmitButton isSubmitting={isSubmitting} label="Send Message" />
            </div>
          </form>
        </SectionCard>

        </div>
    </div>
  );
}