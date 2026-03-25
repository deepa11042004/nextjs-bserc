"use client";

import { useState } from "react";

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

export default function ContactPage() {
  // UI-only state for demo purposes
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock validation
    const newErrors: Record<string, string> = {};
    if (!formData.organization_name)
      newErrors.organization_name = "Organization name is required";
    if (!formData.contact_person)
      newErrors.contact_person = "Contact person is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.subject_name)
      newErrors.subject_name = "Subject name is required";
    if (!formData.message)
      newErrors.message = "Please tell us about your proposal";

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
    <section className="w-full bg-slate-950 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-3 inline-block border-b-2 border-blue-500 pb-2">
            Get in Touch
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have questions about our missions or workshops? We'd love to hear
            from you.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 shadow-2xl border border-slate-800">
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

            {/* Row 1: Organization + Contact Person */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="organization_name"
                name="organization_name"
                label="Name"
                placeholder="Your Name"
                required
                value={formData.organization_name}
                onChange={(e) =>
                  handleChange("organization_name", e.target.value)
                }
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

            {/* Row 2: Email + Phone */}
             
              <FormInput
                id="subject_name"
                name="subject_name"
                label="Subject"
                placeholder="Your Subject"
                required
                value={formData.subject_name}
                onChange={(e) =>
                  handleChange("subject_name", e.target.value)
                }
                error={errors.subject_name}
              />
            

            {/* Message Textarea */}
            <FormTextarea
              id="message"
              name="message"
              label="Message / Proposal"
              placeholder="Tell us how you would like to collaborate..."
              rows={5}
              required
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
