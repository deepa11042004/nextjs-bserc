"use client";

import { useState, FormEvent } from "react";
import {
  Check,
  ArrowRight,
  AlertCircle,
  Building2,
  GraduationCap,
  Rocket,
  Users,
  Shield,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

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

type RazorpaySuccessResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayFailureResponse = {
  error?: {
    description?: string;
    reason?: string;
    metadata?: {
      order_id?: string;
      payment_id?: string;
    };
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

type RazorpayConstructor = new (options: RazorpayOptions) => RazorpayInstance;

type InstitutionalCreateOrderResponse = {
  success?: boolean;
  requires_payment?: boolean;
  key_id?: string;
  order_id?: string;
  amount?: number;
  currency?: string;
  registration_fee?: number;
  country?: string;
  partnership_type?: string;
  message?: string;
  error?: string;
};

function getRazorpayConstructor(): RazorpayConstructor | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  return (window as unknown as { Razorpay?: RazorpayConstructor }).Razorpay;
}

function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === "undefined") {
    return Promise.resolve(false);
  }

  const razorpayConstructor = getRazorpayConstructor();
  if (razorpayConstructor) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true), {
        once: true,
      });
      existingScript.addEventListener("error", () => resolve(false), {
        once: true,
      });
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

// ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
// UI Components - Def-Space Design System
// ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

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
  containerClassName?: string;
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
  containerClassName,
}: InputProps) {
  return (
    <div className={`mb-5 w-full ${containerClassName || ""}`}>
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
          ${error
            ? "border-red-500 focus:border-red-500/50"
            : "border-[#2a2a2a] hover:border-[#3a3a3a]"
          }
        `}
      />
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

// ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

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
            ${error
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

// ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

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
  rows = 4,
  required = false,
  value,
  onChange,
  error,
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
        maxLength={500}
        className={`
          w-full px-4 py-3 rounded-md bg-[#111111] border text-zinc-100 
          placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 
          transition-colors text-sm resize-none
          ${error
            ? "border-red-500 focus:border-red-500/50"
            : "border-[#2a2a2a] hover:border-[#3a3a3a]"
          }
        `}
      />
      <div className="flex justify-end mt-2">
        <p className="text-xs text-zinc-600">
          {value?.length || 0}/500 characters
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

// ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

const SectionCard = ({
  title,
  children,
  subtitle,
  id,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  id?: string;
}) => (
  <div
    id={id}
    className="bg-[#181818] rounded-xl border border-[#262626] p-6 md:p-8 mb-8 shadow-2xl"
  >
    <div className="mb-6">
      <h3 className="text-white text-lg font-serif font-medium tracking-wide uppercase">
        {title}
      </h3>
      {subtitle && <p className="text-zinc-400 text-sm mt-2">{subtitle}</p>}
    </div>
    {children}
  </div>
);

// ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

const BenefitCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-5 hover:border-orange-500/30 transition-colors">
    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
      <Icon className="w-5 h-5 text-orange-500" />
    </div>
    <h4 className="text-zinc-100 font-semibold mb-2">{title}</h4>
    <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
  </div>
);

// ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

const PartnershipModeCard = ({
  title,
  description,
  idealFor,
  icon: Icon,
}: {
  title: string;
  description: string;
  idealFor: string[];
  icon: React.ElementType;
}) => (
  <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 hover:border-orange-500/40 transition-all group">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
        <Icon className="w-6 h-6 text-orange-500" />
      </div>
      <div>
        <h4 className="text-zinc-100 font-semibold text-lg mb-2">{title}</h4>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
          {description}
        </p>
        <div>
          <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wide mb-2">
            Ideal for:
          </p>
          <ul className="space-y-1.5">
            {idealFor.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-zinc-300 text-sm"
              >
                <Check
                  className="w-3.5 h-3.5 text-orange-500 flex-shrink-0"
                  strokeWidth={3}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

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
    "flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold transition-all active:scale-95";
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
      className={`${baseStyles} ${variants[variant]}`}
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

// ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
// NEW COMPONENTS - Partnership Options & Payment
// ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

interface PartnershipOptionCardProps {
  title: string;
  description: string;
  idealFor: string[];
  feeLabel: string;
  feeAmount: string;
}

const PartnershipOptionCard = ({
  title,
  description,
  idealFor,
  feeLabel,
  feeAmount,
}: PartnershipOptionCardProps) => (
  <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 md:p-8 hover:border-orange-500/40 transition-all">
    <h3 className="text-orange-400 font-bold text-lg mb-4">{title}</h3>
    <p className="text-zinc-300 text-sm leading-relaxed mb-6">{description}</p>

    <div className="mb-6">
      <p className="text-zinc-100 font-semibold text-sm mb-3">Ideal for:</p>
      <ul className="space-y-2">
        {idealFor.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
            <Check
              className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5"
              strokeWidth={3}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="bg-[#181818] rounded-lg p-4 border border-[#262626]">
      <p className="text-orange-400 text-xs font-semibold mb-1">{feeLabel}</p>
      <p className="text-white text-2xl font-bold">{feeAmount}</p>
    </div>
  </div>
);



// ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ



// ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
// MAIN PAGE COMPONENT
// ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

type InstitutionalFormData = {
  schoolName: string;
  board: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  contactName: string;
  designation: string;
  email: string;
  phone: string;
  studentCount: string;
  headName: string;
  headEmail: string;
  headPhone: string;
  message: string;
};

function createInitialFormData(): InstitutionalFormData {
  return {
    schoolName: "",
    board: "",
    city: "",
    state: "",
    country: "India",
    pinCode: "",
    contactName: "",
    designation: "",
    email: "",
    phone: "",
    studentCount: "",
    headName: "",
    headEmail: "",
    headPhone: "",
    message: "",
  };
}

export default function InstitutionalRegistrationPage() {
  const [formData, setFormData] = useState<InstitutionalFormData>(
    createInitialFormData(),
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error" | null
  >(null);
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const [successSnapshot, setSuccessSnapshot] = useState<{
    contactName: string;
    instituteName: string;
  } | null>(null);

  const closeSuccessNotification = () => {
    setSubmitStatus(null);
    setSuccessSnapshot(null);
  };

  const boardOptions = [
    { value: "cbse", label: "CBSE" },
    { value: "icse", label: "ICSE" },
    { value: "state", label: "State Board" },
    { value: "ib", label: "International Baccalaureate" },
    { value: "cambridge", label: "Cambridge International" },
    { value: "other", label: "Other" },
  ];

  const countryOptions = [
    { value: "India", label: "India" },
    { value: "Others", label: "Others" },
  ];

  const studentRangeOptions = [
    { value: "1-100", label: "1-100 students" },
    { value: "101-200", label: "101-200 students" },
    { value: "201-300", label: "201-300 students" },
    { value: "301-400", label: "301-400 students" },
    { value: "401-500", label: "401-500 students" },
    { value: "500+", label: "500+ students" },
  ];

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.schoolName.trim())
      newErrors.schoolName = "Institute name is required";
    if (!formData.board) newErrors.board = "Please select a board";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.contactName.trim())
      newErrors.contactName = "Contact person name is required";
    if (!formData.designation.trim())
      newErrors.designation = "Designation is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Contact number is required";
    }

    if (!formData.studentCount)
      newErrors.studentCount = "Please select student range";
    if (!formData.headName.trim())
      newErrors.headName = "Institution head name is required";

    if (!formData.headEmail.trim()) {
      newErrors.headEmail = "Head email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.headEmail)) {
      newErrors.headEmail = "Please enter a valid email";
    }

    return newErrors;
  };

  const buildRegistrationPayload = () => ({
    institute_name: formData.schoolName.trim(),
    board: formData.board,
    city: formData.city.trim(),
    state: formData.state.trim(),
    country: formData.country.trim(),
    pin_code: formData.pinCode.trim(),
    contact_name: formData.contactName.trim(),
    designation: formData.designation.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    student_count: formData.studentCount,
    head_name: formData.headName.trim(),
    head_email: formData.headEmail.trim(),
    head_phone: formData.headPhone.trim(),
    message: formData.message.trim(),
  });

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

    const registrationPayload = buildRegistrationPayload();

    try {
      const orderResponse = await fetch(
        "/api/institutional-registration/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationPayload),
        },
      );

      const orderPayload = (await orderResponse
        .json()
        .catch(() => ({}))) as InstitutionalCreateOrderResponse;

      if (!orderResponse.ok) {
        throw new Error(
          getApiMessage(orderPayload)
          || "Unable to initialize payment. Please try again.",
        );
      }

      if (
        !orderPayload.requires_payment
        || !orderPayload.key_id
        || !orderPayload.order_id
        || !orderPayload.amount
        || !orderPayload.currency
      ) {
        throw new Error(
          orderPayload.message
          || "Payment setup is incomplete. Please try again.",
        );
      }

      const razorpayLoaded = await loadRazorpayScript();
      const Razorpay = getRazorpayConstructor();

      if (!razorpayLoaded || !Razorpay) {
        throw new Error(
          "Unable to load secure payment gateway. Please try again.",
        );
      }

      let flowCompleted = false;
      let failureHandled = false;

      const persistFailedPaymentLead = async (
        reason: string,
        transactionId?: string,
        orderId?: string,
      ) => {
        try {
          await fetch("/api/institutional-registration/log-payment-attempt", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...registrationPayload,
              payment_status: "failed",
              failure_reason: reason,
              transaction_id: transactionId || undefined,
              razorpay_order_id: orderId || undefined,
            }),
          });
        } catch {
          // Intentionally ignored: primary flow should still show a clear error.
        }
      };

      const handlePaymentFailure = async (
        reason: string,
        transactionId?: string,
        orderId?: string,
      ) => {
        if (flowCompleted || failureHandled) {
          return;
        }

        failureHandled = true;

        const failureMessage = reason.trim() || "Payment was not completed";

        await persistFailedPaymentLead(failureMessage, transactionId, orderId);

        setSubmitStatus("error");
        setSuccessSnapshot(null);
        setSubmitErrorMessage(
          `${failureMessage}. Your details were saved with failed payment status.`,
        );
        setIsSubmitting(false);
      };

      const razorpay = new Razorpay({
        key: orderPayload.key_id,
        amount: orderPayload.amount,
        currency: orderPayload.currency,
        name: "BSERC",
        description:
          `${orderPayload.partnership_type || "Institutional Partnership"} Registration Fee`,
        order_id: orderPayload.order_id,
        prefill: {
          name: formData.contactName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#f97316",
        },
        handler: async (paymentResponse) => {
          try {
            const verifyResponse = await fetch(
              "/api/institutional-registration/verify-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...registrationPayload,
                  ...paymentResponse,
                  payment_status: "success",
                  transaction_id: paymentResponse.razorpay_payment_id,
                }),
              },
            );

            const verifyPayload = (await verifyResponse
              .json()
              .catch(() => ({}))) as unknown;

            if (!verifyResponse.ok) {
              throw new Error(
                getApiMessage(verifyPayload)
                || "Payment verification failed. Please contact support.",
              );
            }

            flowCompleted = true;
            setSuccessSnapshot({
              contactName: formData.contactName,
              instituteName: formData.schoolName,
            });
            setFormData(createInitialFormData());
            setErrors({});
            setSubmitErrorMessage("");
            setSubmitStatus("success");
            setIsSubmitting(false);
          } catch (err) {
            const message =
              err instanceof Error && err.message
                ? err.message
                : "Payment verification failed";

            await handlePaymentFailure(
              message,
              paymentResponse.razorpay_payment_id,
              paymentResponse.razorpay_order_id,
            );
          }
        },
        modal: {
          ondismiss: () => {
            void handlePaymentFailure(
              "Payment was cancelled before completion",
              undefined,
              orderPayload.order_id,
            );
          },
        },
      });

      razorpay.on("payment.failed", (failureResponse) => {
        const paymentFailureReason =
          failureResponse.error?.description
          || failureResponse.error?.reason
          || "Payment failed";

        const failedPaymentId = failureResponse.error?.metadata?.payment_id;
        const failedOrderId =
          failureResponse.error?.metadata?.order_id || orderPayload.order_id;

        void handlePaymentFailure(
          paymentFailureReason,
          failedPaymentId,
          failedOrderId,
        );
      });

      razorpay.open();
    } catch (err) {
      setSubmitStatus("error");
      setSuccessSnapshot(null);
      setSubmitErrorMessage(
        err instanceof Error && err.message
          ? err.message
          : "Unable to initialize institutional registration payment. Please try again.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-300 py-12 md:py-16 px-4 selection:bg-orange-500 selection:text-black">
      {submitStatus === "success" && successSnapshot && (
        <div className="fixed left-1/2 top-5 z-[80] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2">
          <div className="rounded-xl border border-[#2d3023] bg-[#111111] p-4 shadow-2xl shadow-black/50 flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                <Check
                  className="text-orange-500 w-5 h-5"
                  strokeWidth={2.5}
                />
              </div>
              <div>
                <p className="font-semibold text-white">
                  Registration Submitted!
                </p>
                <p className="text-zinc-400 text-sm mt-1">
                  Thank you, {successSnapshot.contactName}. We have received your
                  application for{" "}
                  <span className="text-zinc-200">{successSnapshot.instituteName}</span>
                  . Your registration details have been saved successfully.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeSuccessNotification}
              className="ml-auto rounded-full p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              ├ù
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-orange-500 text-xs font-bold tracking-[0.2em] uppercase">
              Institutional Partnerships
            </span>
            <div className="h-px w-16 bg-orange-500"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-5 leading-tight">
            Register Your Institution
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-7xl leading-relaxed">
            <span className="text-orange-500 font-bold uppercase">
              {" "}
              Partner with BSERC{" "}
            </span>{" "}
            to bring premium defence and space education to your institution.
            Establish your institute as a leader in emerging technology education
            while providing students with direct exposure to India's space and
            defence sector careers.
          </p>
        </div>

        {/* Partnership Options Section */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-400 font-serif mb-8">
            Partnership Options
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <PartnershipOptionCard
              title="International Partnership"
              description="Register cohorts of students from your institution. BSERC manages batch coordination, learning delivery, and certificate distribution through a designated focal teacher or coordinator."
              idealFor={[
                "Summer camps, co-curricular programmes",
                "Skill enhancement initiatives",
              ]}
              feeLabel="Registration Fee"
              feeAmount="$ 500"
            />

            <PartnershipOptionCard
              title="Institutional Partnership"
              description={` Establish formal "Def-Space Partner Institution" status with official branding rights, collaborative promotion, institutional certificate, and sustained engagement with BSERC's ecosystem.
                 `}
              idealFor={[
                "Strategic institutional positioning",
                "Long-term academic alignment",
                "Sustained visibility and engagement",
              ]}
              feeLabel="Annual Partnership Fee"
              feeAmount="Γé╣ 2,500/year"
            />
          </div>
        </div>




        {/* Why Partner Section (old version - can be removed) */}
        <SectionCard
          title="Why Partner With BSERC"
          subtitle="Elevate your institution's academic standing and provide students access to India's premier defence and space sector ecosystem"
        >
          <div className="grid md:grid-cols-3 gap-4">
            <BenefitCard
              icon={GraduationCap}
              title="Strengthen STEM Profile"
              description="Position your institute as a forward-looking institution at the forefront of innovation in defence and space technology education."
            />
            <BenefitCard
              icon={BadgeCheck}
              title="Student Achievement Visibility"
              description="Showcase student projects, merit certificates, and verified career pathways in institutional newsletters and annual reports."
            />
            <BenefitCard
              icon={Rocket}
              title="Career Ecosystem Access"
              description="Direct mentorship and guidance from ISRO, DRDO, HAL professionals and leading private space enterprises for student career planning."
            />
          </div>
        </SectionCard>

        {/* Registration Form */}
        <SectionCard
          title="Institutional Registration Form"
          subtitle="Complete the details below to initiate your partnership"
        >
          <form onSubmit={handleSubmit} noValidate className="space-y-1">
            {/* Status Messages */}
            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-[#111111] border border-red-900/30 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">
                  {submitErrorMessage || "Please fix the highlighted errors before submitting."}
                </p>
              </div>
            )}

            {/* Institute Details */}
            <div className="mb-8 pb-6 border-b border-[#2a2a2a]">
              <h4 className="text-zinc-100 font-semibold mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-orange-500" />
                Institutional Information
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <FormInput
                  id="schoolName"
                  name="schoolName"
                  label="Institute Name"
                  placeholder="Enter full institute name"
                  required
                  value={formData.schoolName}
                  onChange={(e) => handleChange("schoolName", e.target.value)}
                  error={errors.schoolName}
                />
                <FormSelect
                  id="board"
                  name="board"
                  label="University/Board Affiliation"
                  options={boardOptions}
                  placeholder="Select Board"
                  required={true}
                  value={formData.board}
                  onChange={(e) => handleChange("board", e.target.value)}
                  error={errors.board}
                />
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
                  label="State"
                  placeholder="Enter state"
                  required
                  value={formData.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  error={errors.state}
                />
                <div className="flex flex-col md:flex-row gap-4">
                  <FormInput
                    id="pinCode"
                    name="pinCode"
                    label="PIN Code"
                    type="text"
                    placeholder="Enter PIN code"
                    value={formData.pinCode}
                    onChange={(e) => handleChange("pinCode", e.target.value)}
                    error={errors.pinCode}
                  />
                  <FormSelect
                    id="country"
                    name="country"
                    label="Country"
                    options={countryOptions}
                    placeholder="Select Country"
                    required={true}
                    value={formData.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    error={errors.country}
                  />
                </div>
                <FormSelect
                  id="studentCount"
                  name="studentCount"
                  label="Estimated Number of Students"
                  options={studentRangeOptions}
                  placeholder="Select Range"
                  required={true}
                  value={formData.studentCount}
                  onChange={(e) => handleChange("studentCount", e.target.value)}
                  error={errors.studentCount}
                />
              </div>
            </div>

            {/* Contact Person */}
            <div className="mb-8 pb-6 border-b border-[#2a2a2a]">
              <h4 className="text-zinc-100 font-semibold mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-500" />
                Primary Contact Details
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <FormInput
                  id="contactName"
                  name="contactName"
                  label="Contact Person Name"
                  placeholder="Principal/Coordinator name"
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => handleChange("contactName", e.target.value)}
                  error={errors.contactName}
                />
                <FormInput
                  id="designation"
                  name="designation"
                  label="Designation"
                  placeholder="Principal/Science Coordinator..."
                  required
                  value={formData.designation}
                  onChange={(e) => handleChange("designation", e.target.value)}
                  error={errors.designation}
                />
                <FormInput
                  id="email"
                  name="email"
                  label="Official Email"
                  type="email"
                  placeholder="contact@institute.edu.in"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={errors.email}
                />
                <FormInput
                  id="phone"
                  name="phone"
                  label="Contact Number"
                  type="tel"
                  placeholder="Enter contact number"
                  required
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  error={errors.phone}
                />
              </div>
            </div>

            {/* Institution Head */}
            <div className="mb-8 pb-6 border-b border-[#2a2a2a]">
              <h4 className="text-zinc-100 font-semibold mb-4 pt-5 flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-500" />
                Institutional Head Details
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                <FormInput
                  id="headName"
                  name="headName"
                  label="Institutional Head Name"
                  placeholder="Principal/Director name"
                  required
                  value={formData.headName}
                  onChange={(e) => handleChange("headName", e.target.value)}
                  error={errors.headName}
                />
                <FormInput
                  id="headEmail"
                  name="headEmail"
                  label="Institutional Head Email"
                  type="email"
                  placeholder="principal@institute.edu.in"
                  required
                  value={formData.headEmail}
                  onChange={(e) => handleChange("headEmail", e.target.value)}
                  error={errors.headEmail}
                />
                <FormInput
                  id="headPhone"
                  name="headPhone"
                  label="Institutional Head Phone"
                  type="tel"
                  placeholder="Enter institutional head phone"
                  value={formData.headPhone}
                  onChange={(e) => handleChange("headPhone", e.target.value)}
                  error={errors.headPhone}
                />
              </div>
            </div>

            {/* Additional Message */}
            <div className="mb-8">
              <FormTextarea
                id="message"
                name="message"
                label="Additional Message"
                placeholder="Any specific requirements, questions, or notes for our partnerships team..."
                rows={4}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex flex-col md:flex-row justify-center items-center gap-6">
              <SubmitButton
                isSubmitting={isSubmitting}
                label="Proceed to Secure Payment"
              />
            </div>
          </form>
        </SectionCard>
      </div>
    </div>
  );
}
