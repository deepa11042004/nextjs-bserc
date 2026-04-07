"use client";

import { Check, Search, ChevronDown, ArrowRight, Upload } from "lucide-react";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  createInternshipPaymentOrder,
  registerInternshipWithoutPayment,
  verifyInternshipPaymentAndRegister,
} from "@/services/internshipRegistration";

type RazorpaySuccessResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayFailureResponse = {
  error?: {
    description?: string;
  };
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: RazorpaySuccessResponse) => void | Promise<void>;
  modal?: {
    ondismiss?: () => void;
  };
};

type RazorpayInstance = {
  open: () => void;
  on: (
    event: "payment.failed",
    handler: (response: RazorpayFailureResponse) => void,
  ) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

type SubmitStatus = {
  type: "success" | "info" | "error";
  message: string;
};

const MAX_PASSPORT_PHOTO_BYTES = 800 * 1024;
const ALLOWED_PASSPORT_PHOTO_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

function isAlreadyRegisteredMessage(message: string): boolean {
  return message.toLowerCase().includes("already applied");
}

function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === "undefined") {
    return Promise.resolve(false);
  }

  if (window.Razorpay) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const existing = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );

    if (existing) {
      existing.addEventListener("load", () => resolve(true), { once: true });
      existing.addEventListener("error", () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// ─────────────────────────────────────────────────────────────
// Reusable UI Components
// ─────────────────────────────────────────────────────────────

interface InputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  disabled?: boolean;
  isTextarea?: boolean;
}

function FormField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
  disabled = false,
  isTextarea = false,
}: InputProps) {
  const baseClasses =
    "w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors";

  return (
    <div className="mb-6 w-full">
      <label
        htmlFor={id}
        className="block text-zinc-100 text-[13px] font-semibold mb-2"
      >
        {label} {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          rows={3}
          className={`${baseClasses} resize-none `}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={baseClasses}
        />
      )}
    </div>
  );
}

function FormSelect({
  id,
  name,
  label,
  options,
  required,
  value,
  onChange,
  placeholder = "--Select--",
}: any) {
  return (
    <div className="mb-6 w-full">
      <label
        htmlFor={id}
        className="block text-zinc-100 text-[13px] font-semibold mb-2"
      >
        {label} {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-400 focus:outline-none focus:border-zinc-500 appearance-none"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {/* Custom select dropdown arrow */}
          
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
           
          <ChevronDown className="w-5 h-5 text-zinc-500"/>
        </div>
      </div>
    </div>
  );
}

function CardSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#181818] rounded-xl border border-[#262626] p-6 md:p-8 mb-6">
      <div className="border-b border-[#2a2a2a] pb-4 mb-6">
        <h3 className="text-white text-lg font-serif font-medium tracking-wide">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function StatusBanner({
  status,
  onDismiss,
}: {
  status: SubmitStatus;
  onDismiss: () => void;
}) {
  const classesByType: Record<SubmitStatus["type"], string> = {
    success: "border-emerald-500/60 bg-emerald-500/10 text-emerald-200",
    info: "border-sky-500/60 bg-sky-500/10 text-sky-200",
    error: "border-rose-500/60 bg-rose-500/10 text-rose-200",
  };

  return (
    <div
      role={status.type === "error" ? "alert" : "status"}
      className={`mb-6 flex items-start justify-between gap-4 rounded-lg border px-4 py-3 text-sm ${classesByType[status.type]}`}
    >
      <p>{status.message}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="rounded px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white/80 transition hover:text-white"
      >
        Close
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Application Form Component
// ─────────────────────────────────────────────────────────────

export default function InternshipApplicationForm() {
  const searchParams = useSearchParams();
  const internshipName = "Def-Space Summer Internship";
  const internshipDesignation = "Def-Space Tech Intern";
  const sourceParam = (
    searchParams.get("source") ||
    searchParams.get("type") ||
    ""
  ).toLowerCase();
  const isLateralRegistration =
    sourceParam === "lateral" ||
    sourceParam === "later" ||
    searchParams.get("is_lateral") === "true" ||
    searchParams.get("is_lateral") === "1";
  const registrationTypeLabel = isLateralRegistration
    ? "Lateral Registration"
    : "Regular Registration";

  const emptyFormData = {
    fullName: "",
    guardianName: "",
    gender: "",
    dob: "",
    mobile: "",
    email: "",
    altEmail: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    institution: "",
    qualification: "",
    declaration: false,
  };

  const [formData, setFormData] = useState(emptyFormData);
  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
  const [passportPhotoName, setPassportPhotoName] = useState<string>("");
  const [photoInputKey, setPhotoInputKey] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  const clearForm = () => {
    setFormData(emptyFormData);
    setPassportPhoto(null);
    setPassportPhotoName("");
    setPhotoInputKey((prev) => prev + 1);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setSubmitStatus(null);

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (!file) {
      setPassportPhoto(null);
      setPassportPhotoName("");
      return;
    }

    const mimeType = file.type.toLowerCase();

    if (!ALLOWED_PASSPORT_PHOTO_TYPES.has(mimeType)) {
      setPassportPhoto(null);
      setPassportPhotoName("");
      setSubmitStatus({
        type: "error",
        message: "Invalid photo format. Please upload JPG, PNG, WEBP, HEIC, or HEIF.",
      });
      event.target.value = "";
      return;
    }

    if (file.size > MAX_PASSPORT_PHOTO_BYTES) {
      setPassportPhoto(null);
      setPassportPhotoName("");
      setSubmitStatus({
        type: "error",
        message: "Passport photo is too large. Maximum allowed size is 800KB.",
      });
      event.target.value = "";
      return;
    }

    setPassportPhoto(file);
    setPassportPhotoName(file?.name || "");
    setSubmitStatus(null);
  };

  const buildRegistrationFormData = (paymentDetails?: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => {
    const payload = new FormData();

    payload.append("internship_name", internshipName);
    payload.append("internship_designation", internshipDesignation);
    payload.append("full_name", formData.fullName.trim());
    payload.append("guardian_name", formData.guardianName.trim());
    payload.append("gender", formData.gender.trim());
    payload.append("dob", formData.dob.trim());
    payload.append("mobile_number", formData.mobile.trim());
    payload.append("email", formData.email.trim());
    payload.append("alternative_email", formData.altEmail.trim());
    payload.append("address", formData.address.trim());
    payload.append("city", formData.city.trim());
    payload.append("state", formData.state.trim());
    payload.append("pin_code", formData.pinCode.trim());
    payload.append("institution_name", formData.institution.trim());
    payload.append("educational_qualification", formData.qualification.trim());
    payload.append("is_lateral", String(isLateralRegistration));
    payload.append("declaration_accepted", String(formData.declaration));

    if (passportPhoto) {
      payload.append("passport_photo", passportPhoto);
    }

    if (paymentDetails) {
      payload.append("razorpay_order_id", paymentDetails.razorpay_order_id);
      payload.append("razorpay_payment_id", paymentDetails.razorpay_payment_id);
      payload.append("razorpay_signature", paymentDetails.razorpay_signature);
    }

    return payload;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitStatus(null);

    if (!formData.declaration) {
      setSubmitStatus({
        type: "error",
        message: "Please accept the declaration to proceed.",
      });
      return;
    }

    if (!passportPhoto) {
      setSubmitStatus({
        type: "error",
        message: "Please upload a passport size photo before proceeding.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const order = await createInternshipPaymentOrder({
        email: formData.email.trim(),
        is_lateral: isLateralRegistration,
      });

      if (order.already_registered) {
        setSubmitStatus({
          type: "info",
          message:
            order.message || "You have already applied for this internship.",
        });
        setIsSubmitting(false);
        return;
      }

      if (!order.requires_payment || order.amount <= 0) {
        await registerInternshipWithoutPayment(buildRegistrationFormData());
        clearForm();
        setSubmitStatus({
          type: "success",
          message: "Application submitted successfully.",
        });
        setIsSubmitting(false);
        return;
      }

      if (!order.key_id || !order.order_id) {
        throw new Error("Payment initialization failed. Please try again.");
      }

      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        throw new Error("Unable to load Razorpay checkout. Please try again.");
      }

      const razorpay = new window.Razorpay({
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: "BSERC",
        description: internshipName,
        order_id: order.order_id,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: {
          color: "#f97316",
        },
        handler: async (response) => {
          try {
            await verifyInternshipPaymentAndRegister(
              buildRegistrationFormData({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            );

            clearForm();
            setSubmitStatus({
              type: "success",
              message:
                "Payment successful and internship application submitted!",
            });
          } catch (error) {
            const message = getErrorMessage(error);
            setSubmitStatus({
              type: isAlreadyRegisteredMessage(message) ? "info" : "error",
              message,
            });
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
          },
        },
      });

      razorpay.on("payment.failed", (response) => {
        setSubmitStatus({
          type: "error",
          message:
            response.error?.description ||
            "Payment failed. Please try again.",
        });
        setIsSubmitting(false);
      });

      razorpay.open();
    } catch (error) {
      const message = getErrorMessage(error);
      setSubmitStatus({
        type: isAlreadyRegisteredMessage(message) ? "info" : "error",
        message,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-300 font-sans selection:bg-[#d4ff33] selection:text-black py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-4xl mx-auto">
        {/* Header Title Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">
              APPLICATION PORTAL
            </span>
            <div className="h-px w-16 bg-orange-500/40"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-4">
            DEF-SPACE SUMMER
            <br />
            INTERNSHIP APPLICATION FORM
          </h1>

          <p className="text-zinc-400 text-sm">
            Fill out all required fields to complete your application
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
            {registrationTypeLabel}
          </p>
        </div>

        {submitStatus && (
          <StatusBanner
            status={submitStatus}
            onDismiss={() => setSubmitStatus(null)}
          />
        )}

        <form onSubmit={handleSubmit}>
          {/* Section 1 */}
          <CardSection title="1. INTERNSHIP DETAILS / इंटर्नशिप विवरण">
            <div className="space-y-2">
              <FormField
                id="internshipName"
                name="internshipName"
                label="Internship Name / इंटर्नशिप का नाम"
                value={internshipName}
                disabled
              />
              <FormField
                id="designation"
                name="designation"
                label="Designation of Internship / इंटर्नशिप का प्रकार"
                value={internshipDesignation}
                disabled
              />
              <FormField
                id="registrationType"
                name="registrationType"
                label="Registration Type / पंजीकरण प्रकार"
                value={registrationTypeLabel}
                disabled
              />
            </div>
          </CardSection>

          {/* Section 2 */}
          <CardSection title="2. APPLICANT'S PERSONAL DETAILS / आवेदक का व्यक्तिगत विवरण">
            <div className="space-y-2">
              <FormField
                id="fullName"
                name="fullName"
                label="Applicant's Full Name / आवेदक का पूरा नाम"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
              <FormField
                id="guardianName"
                name="guardianName"
                label="Guardian Name / अभिभावक का नाम"
                required
                value={formData.guardianName}
                onChange={handleChange}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <FormSelect
                  id="gender"
                  name="gender"
                  label="Gender / लिंग"
                  placeholder="--Select Gender--"
                  options={[
                    "Male / पुरुष",
                    "Female / महिला",
                    "Other / अन्य",
                    "Prefer not to say ",
                  ]}
                  required
                  value={formData.gender}
                  onChange={handleChange}
                />
                <FormField
                  id="dob"
                  name="dob"
                  type="date"
                  label="Date of Birth / जन्म दिनांक"
                  placeholder="mm/dd/yyyy"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardSection>

          {/* Section 3 */}
          <CardSection title="3. CONTACT DETAILS / संपर्क विवरण">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <FormField
                id="mobile"
                name="mobile"
                type="tel"
                label="Mobile Number / मोबाइल नंबर"
                placeholder="+91 XXXXX XXXXX"
                required
                value={formData.mobile}
                onChange={handleChange}
              />
              <FormField
                id="email"
                name="email"
                type="email"
                label="Email Address / ईमेल पता"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <FormField
              id="altEmail"
              name="altEmail"
              type="email"
              label="Alternative Email / वैकल्पिक ईमेल पता"
              value={formData.altEmail}
              onChange={handleChange}
            />
          </CardSection>

          {/* Section 4 */}
          <CardSection title="4. PERMANENT ADDRESS DETAILS / स्थायी पता विवरण">
            <FormField
              id="address"
              name="address"
              label="Address / पता"
              required
              isTextarea
              value={formData.address}
              onChange={handleChange}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
              <FormField
                id="city"
                name="city"
                label="City Name / शहर का नाम"
                required
                value={formData.city}
                onChange={handleChange}
              />
              <FormField
                id="state"
                name="state"
                label="State / राज्य"
                required
                value={formData.state}
                onChange={handleChange}
              />
              <FormField
                id="pinCode"
                name="pinCode"
                label="Pin Code / पिन कोड"
                required
                value={formData.pinCode}
                onChange={handleChange}
              />
            </div>
          </CardSection>

          {/* Section 5 */}
          <CardSection title="5. EDUCATIONAL / QUALIFICATION DETAILS / शैक्षिक / योग्यता का विवरण">
            <FormField
              id="institution"
              name="institution"
              label="Institution Name / संस्थान का नाम"
              required
              value={formData.institution}
              onChange={handleChange}
            />
            <FormSelect
              id="qualification"
              name="qualification"
              label="Educational Qualification / शैक्षिक योग्यता"
              placeholder="--Select Qualification--"
              options={["B.Tech", "M.Tech", "BCA", "MCA", "B.Sc", "Other"]}
              required
              value={formData.qualification}
              onChange={handleChange}
            />
          </CardSection>

          {/* Section 6 */}
          <CardSection title="6. IDENTIFICATION DETAILS / पहचान का विवरण">
            <label className="block text-zinc-100 text-[13px] font-semibold mb-3">
              Upload Passport Size Photo / पासपोर्ट साइज फोटो अपलोड करें{" "}
              <span className="text-red-500 ml-0.5">*</span>
            </label>
            <input
              key={photoInputKey}
              id="passport_photo"
              type="file"
              name="passport_photo"
              className="sr-only"
              accept=".jpg,.jpeg,.png,.webp,.heic,.heif"
              onChange={handlePhotoChange}
            />
            <label
              htmlFor="passport_photo"
              className="w-full border border-dashed border-[#3a402a] rounded-xl py-14 flex flex-col items-center justify-center bg-[#111111]/50 hover:bg-[#161616] transition-colors cursor-pointer group"
            >
              <Upload className="w-6 h-6 text-zinc-400 mb-3 group-hover:text-zinc-200 transition-colors" />
              <p className="text-zinc-400 text-[13px] group-hover:text-zinc-300 transition-colors">
                Click to upload photo (Max 800KB)
              </p>
              <p className="mt-1 text-[11px] text-zinc-500 group-hover:text-zinc-400 transition-colors">
                Supported: JPG, PNG, WEBP, HEIC, HEIF
              </p>
              {passportPhotoName && (
                <p className="mt-2 text-xs text-[#d4ff33]">Selected: {passportPhotoName}</p>
              )}
            </label>
          </CardSection>

         {/* Declaration Section */}
<div className="bg-[#181818] rounded-xl border border-[#2a301a] p-6 mb-12">
  <label className="flex items-start gap-4 cursor-pointer group">
    <div className="pt-1 relative flex items-center justify-center">
      <input
        type="checkbox"
        name="declaration"
        required
        checked={formData.declaration}
        onChange={handleChange}
        className="peer w-5 h-5 rounded-sm bg-white border-none appearance-none checked:bg-orange-500 cursor-pointer flex-shrink-0 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-[#181818]"
      />
      
      {/* The Checkmark Arrow */}
      <svg 
        className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="4" 
          d="M5 13l4 4L19 7"
        />
      </svg>
     
      
    </div>
    
    <p className="text-[13px] text-zinc-300 leading-relaxed text-justify group-hover:text-zinc-100 transition-colors">
      I hereby declare that the information given above and in the
      enclosed documents is true to the best of my knowledge and
      belief and nothing has been concealed therein. I understand that
      if the information given by me is proved false/not true, all the
      benefits availed by me shall be withdrawn. / मैं घोषणा करता हूँ
      कि ऊपर और संलग्न दस्तावेजों में दी गई जानकारी मेरी सर्वोत्तम
      जानकारी और विश्वास के अनुसार सत्य है और इसमें कुछ भी छिपाया नहीं
      गया है। मैं समझता हूँ कि यदि मेरे द्वारा दी गई जानकारी झूठी हुई
      तो मेरे द्वारा प्राप्त किए गए सभी लाभ वापस ले लिए जाएंगे।
    </p>
  </label>
</div>

          {/* Submit Button */}
          <div className="border-t border-[#262626] pt-8 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`text-black font-semibold text-sm px-8 py-3.5 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-[#d4ff33]/10 ${
                isSubmitting
                  ? "bg-zinc-700 text-zinc-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {isSubmitting ? "Processing..." : "Proceed to Pay"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
