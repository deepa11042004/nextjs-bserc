"use client";

import React, { FormEvent, useState, useRef } from "react";
import { Check, Search, ChevronDown, ArrowRight, Upload, Sparkles } from "lucide-react";
import FormResponseOverlay from "@/components/ui/FormResponseOverlay";

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

type CreateMentorOrderResponse = {
  requires_payment: boolean;
  already_registered?: boolean;
  key_id?: string;
  order_id?: string;
  amount: number;
  currency: string;
  registration_fee?: number;
  message?: string;
};

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const MAX_PROFILE_PHOTO_BYTES = 2 * 1024 * 1024;
const MAX_PROXY_UPLOAD_BYTES = 4 * 1024 * 1024;

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
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

function getMentorRegisterEndpoint(): string {
  const publicApiBase = (
    process.env.NEXT_PUBLIC_MENTOR_API_URL
    || process.env.NEXT_PUBLIC_API_URL
    || ""
  ).trim();

  if (!publicApiBase) {
    return "/api/mentor/register";
  }

  const normalizedBase = publicApiBase.replace(/\/+$/, "");

  if (
    /\/api\/mentor\/register$/i.test(normalizedBase)
    || /\/mentor\/register$/i.test(normalizedBase)
  ) {
    return normalizedBase;
  }

  if (/\/api$/i.test(normalizedBase)) {
    return `${normalizedBase}/mentor/register`;
  }

  return `${normalizedBase}/api/mentor/register`;
}

function getMentorLogPaymentAttemptEndpoint(registerEndpoint: string): string {
  const normalized = registerEndpoint.trim();

  if (!normalized) {
    return "/api/mentor/log-payment-attempt";
  }

  if (/\/mentor\/register$/i.test(normalized)) {
    return normalized.replace(
      /\/mentor\/register$/i,
      "/mentor/log-payment-attempt",
    );
  }

  return "/api/mentor/log-payment-attempt";
}

function getFileFromFormData(data: FormData, key: string): File | null {
  const value = data.get(key);
  if (!(value instanceof File)) {
    return null;
  }

  if (!value.name || value.size <= 0) {
    return null;
  }

  return value;
}

interface EngagementPlan {
  titleEn: string;
  titleHi: string;
  benefit: string;
  name: string;
}

interface InputFieldProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  name?: string;
  min?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}

const SectionCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-[#181818] rounded-xl border border-[#262626] p-6 mb-8 shadow-2xl">
    <h3 className="text-white text-lg font-serif font-medium tracking-wide border-b border-[#2a2a2a] pb-4 mb-8 uppercase">
      {title}
    </h3>
    {children}
  </div>
);

const FormLabel = ({
  label,
  required,
  id,
}: {
  label: string;
  required?: boolean;
  id?: string;
}) => (
  <label 
    htmlFor={id}
    className="block text-zinc-100 text-[13px] font-semibold mb-2.5"
  >
    {label} {required && <span className="text-red-500 ml-0.5">*</span>}
  </label>
);

const InputField: React.FC<InputFieldProps> = ({
  label,
  required,
  placeholder,
  type = "text",
  name,
  min,
  onChange,
  id,
}) => (
  <div className="mb-6 w-full">
    <FormLabel label={label} required={required} id={id} />
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      min={min}
      required={required}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors"
    />
  </div>
);

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  prefix?: string;
  suffix?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required,
  prefix,
  suffix,
  value,
  onChange,
  error,
}) => (
  <div className="mb-6">
    <FormLabel label={label} required={required} id={id} />
    <div className="relative">
      {prefix && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 font-bold">
          {prefix}
        </span>
      )}
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-md bg-[#111111] border text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors ${
          error ? "border-red-500" : "border-[#2a2a2a] focus:border-orange-500/50"
        } ${prefix ? "pl-10" : ""}`}
      />
      {suffix && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 text-sm">
          {suffix}
        </span>
      )}
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default function MentorRegistrationForm() {
  const [guidelinesAccepted, setGuidelinesAccepted] = useState<boolean>(false);
  const [conductAccepted, setConductAccepted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<string>("");
  const [resumeFileName, setResumeFileName] = useState<string>("");
  const [profilePhotoFileName, setProfilePhotoFileName] = useState<string>("");
  const [formData, setFormData] = useState({
    currency: "INR",
    honorariumHourly: "",
    honorariumDaily: "",
    honorariumWeekly: "",
    honorariumProject: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Refs for file inputs to enable resetting
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const profilePhotoInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const isFormReady = guidelinesAccepted && conductAccepted;
  
  const plans: EngagementPlan[] = [
    {
      name: "price_5_sessions",
      titleEn: "Intensive 5-Session Bundle ",
      titleHi: "5-सत्र बंडल",
      benefit: "Bulk discount applicable",
    },
    {
      name: "price_10_sessions",
      titleEn: "Comprehensive 10-Session Plan ",
      titleHi: "10-सत्र योजना",
      benefit: "20% savings on per-session rate",
    },
    {
      name: "price_extended",
      titleEn: "Extended Mentorship Program ",
      titleHi: "विस्तारित कार्यक्रम",
      benefit: "Ongoing support & guidance",
    },
  ];

  const activeResponse = submitError
    ? { type: "error" as const, message: submitError }
    : submitSuccess
      ? { type: "success" as const, message: submitSuccess }
      : null;

  const parseApiMessage = async (response: Response): Promise<string> => {
    const text = await response.text();
    if (!text) {
      return response.ok
        ? "Mentor registered successfully"
        : "Request failed";
    }

    try {
      const parsed = JSON.parse(text) as { message?: string; error?: string };
      return parsed.message || parsed.error || text;
    } catch {
      return text;
    }
  };

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error && error.message.trim()) {
      if (
        /FUNCTION_PAYLOAD_TOO_LARGE|Request Entity Too Large/i.test(
          error.message,
        )
      ) {
        return "Uploaded files are too large for this deployment route. Keep resume <= 5MB and profile photo <= 2MB, or configure NEXT_PUBLIC_API_URL to send uploads directly to backend.";
      }

      return error.message;
    }

    return "Unable to submit mentor registration.";
  };

  const cloneFormData = (source: FormData): FormData => {
    const cloned = new FormData();
    source.forEach((value, key) => {
      cloned.append(key, value);
    });

    return cloned;
  };

  const getFirstTextValue = (data: FormData, keys: string[]): string => {
    for (const key of keys) {
      const candidate = data.get(key);
      if (typeof candidate !== "string") {
        continue;
      }

      const cleaned = candidate.trim();
      if (cleaned) {
        return cleaned;
      }
    }

    return "";
  };

  const setTextValueIfMissing = (data: FormData, key: string, value: string) => {
    if (!value) {
      return;
    }

    const existing = data.get(key);
    if (typeof existing === "string" && existing.trim()) {
      return;
    }

    data.set(key, value);
  };

  const normalizeCompensationFields = (data: FormData) => {
    const hourly = getFirstTextValue(data, [
      "honorarium_hourly",
      "honorariumHourly",
      "consultation_fee",
    ]);
    const daily = getFirstTextValue(data, [
      "honorarium_daily",
      "honorariumDaily",
      "price_5_sessions",
    ]);
    const weekly = getFirstTextValue(data, [
      "honorarium_weekly",
      "honorariumWeekly",
      "price_10_sessions",
    ]);
    const project = getFirstTextValue(data, [
      "honorarium_project",
      "honorariumProject",
      "price_extended",
    ]);

    if (hourly) {
      data.set("honorarium_hourly", hourly);
      setTextValueIfMissing(data, "consultation_fee", hourly);
    }

    if (daily) {
      data.set("honorarium_daily", daily);
      setTextValueIfMissing(data, "price_5_sessions", daily);
    }

    if (weekly) {
      data.set("honorarium_weekly", weekly);
      setTextValueIfMissing(data, "price_10_sessions", weekly);
    }

    if (project) {
      data.set("honorarium_project", project);
      setTextValueIfMissing(data, "price_extended", project);
    }

    const currency = getFirstTextValue(data, ["currency"]);
    if (currency) {
      data.set("currency", currency.toUpperCase());
    }
  };

  const resetForm = (form: HTMLFormElement) => {
    form.reset();
    setFormData({
      currency: "INR",
      honorariumHourly: "",
      honorariumDaily: "",
      honorariumWeekly: "",
      honorariumProject: "",
    });
    setGuidelinesAccepted(false);
    setConductAccepted(false);
    setResumeFileName("");
    setProfilePhotoFileName("");
    // Reset file inputs
    if (resumeInputRef.current) resumeInputRef.current.value = "";
    if (profilePhotoInputRef.current) profilePhotoInputRef.current.value = "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    if (!guidelinesAccepted || !conductAccepted) {
      setSubmitError(
        "Please accept the guidelines and code of conduct before submitting.",
      );
      return;
    }

    const form = event.currentTarget;
    const formDataObj = new FormData(form);
    
    // Ensure currency is included in FormData
    formDataObj.set("currency", formData.currency);
    normalizeCompensationFields(formDataObj);
    
    const modeKeys = [
      "video_call",
      "phone_call",
      "live_chat",
      "email_support",
    ] as const;

    const hasAnyModeSelected = modeKeys.some((key) => formDataObj.has(key));
    if (!hasAnyModeSelected) {
      setSubmitError("Please select at least one mentoring mode.");
      return;
    }

    modeKeys.forEach((key) => {
      formDataObj.set(key, String(formDataObj.has(key)));
    });

    formDataObj.set(
      "complimentary_session",
      String(formDataObj.has("complimentary_session")),
    );

    const mentoredBeforeValue = String(
      formDataObj.get("has_mentored_before") ?? "",
    ).trim();
    if (mentoredBeforeValue === "yes" || mentoredBeforeValue === "limited") {
      formDataObj.set("has_mentored_before", "true");
    } else if (mentoredBeforeValue === "no") {
      formDataObj.set("has_mentored_before", "false");
    } else {
      formDataObj.delete("has_mentored_before");
    }

    formDataObj.set("accepted_guidelines", String(guidelinesAccepted));
    formDataObj.set("accepted_code_of_conduct", String(conductAccepted));

    const registerEndpoint = getMentorRegisterEndpoint();
    const logPaymentAttemptEndpoint =
      getMentorLogPaymentAttemptEndpoint(registerEndpoint);
    const resumeFile = getFileFromFormData(formDataObj, "resume");
    const profilePhotoFile = getFileFromFormData(formDataObj, "profile_photo");

    if (resumeFile && resumeFile.size > MAX_RESUME_BYTES) {
      setSubmitError("Resume file is too large. Maximum allowed size is 5MB.");
      return;
    }

    if (profilePhotoFile && profilePhotoFile.size > MAX_PROFILE_PHOTO_BYTES) {
      setSubmitError("Profile photo is too large. Maximum allowed size is 2MB.");
      return;
    }

    // Serverless API routes may reject larger multipart payloads before reaching backend.
    if (registerEndpoint.startsWith("/")) {
      const estimatedUploadBytes =
        (resumeFile?.size || 0) + (profilePhotoFile?.size || 0);

      if (estimatedUploadBytes > MAX_PROXY_UPLOAD_BYTES) {
        setSubmitError(
          "Selected files are too large for current upload route. Please reduce file sizes or configure NEXT_PUBLIC_API_URL so uploads go directly to backend.",
        );
        return;
      }
    }

    const email = getFirstTextValue(formDataObj, ["email"]);
    const nationality = getFirstTextValue(formDataObj, ["nationality"]);

    if (!email) {
      setSubmitError("Email is required to initialize payment.");
      return;
    }

    if (!nationality) {
      setSubmitError("Nationality is required to determine registration fee.");
      return;
    }

    setIsSubmitting(true);
    try {
      const createOrderResponse = await fetch("/api/mentor/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          email,
          nationality,
        }),
      });

      const orderPayload = (await createOrderResponse
        .json()
        .catch(() => ({}))) as CreateMentorOrderResponse & {
        error?: string;
      };

      if (!createOrderResponse.ok) {
        throw new Error(
          orderPayload.message
            || orderPayload.error
            || "Unable to initialize payment.",
        );
      }

      if (orderPayload.already_registered) {
        setSubmitSuccess(
          orderPayload.message || "Email already registered as mentor.",
        );
        setIsSubmitting(false);
        return;
      }

      if (
        !orderPayload.requires_payment
        || !orderPayload.key_id
        || !orderPayload.order_id
        || !orderPayload.amount
      ) {
        throw new Error(
          orderPayload.message
            || "Payment initialization failed. Please try again.",
        );
      }

      const persistPaymentAttempt = async (
        paymentStatus: "pending" | "failed",
        options?: {
          reason?: string;
          paymentId?: string;
          orderId?: string;
          paymentMode?: string;
        },
      ): Promise<boolean> => {
        try {
          const payload = cloneFormData(formDataObj);
          payload.set("payment_status", paymentStatus);
          payload.set(
            "payment_mode",
            options?.paymentMode
              || (paymentStatus === "pending"
                ? "order_created"
                : "gateway_failed"),
          );

          const resolvedOrderId = options?.orderId || orderPayload.order_id;
          if (resolvedOrderId) {
            payload.set("razorpay_order_id", resolvedOrderId);
          }

          if (options?.paymentId) {
            payload.set("razorpay_payment_id", options.paymentId);
          }

          if (paymentStatus === "failed" && options?.reason) {
            payload.set("failure_reason", options.reason);
          }

          let attemptResponse = await fetch(logPaymentAttemptEndpoint, {
            method: "POST",
            body: payload,
          });

          if (
            !attemptResponse.ok
            && attemptResponse.status === 404
            && logPaymentAttemptEndpoint !== "/api/mentor/log-payment-attempt"
          ) {
            attemptResponse = await fetch("/api/mentor/log-payment-attempt", {
              method: "POST",
              body: payload,
            });
          }

          return attemptResponse.ok;
        } catch {
          return false;
        }
      };

      const pendingAttemptSaved = await persistPaymentAttempt("pending", {
        orderId: orderPayload.order_id,
        paymentMode: "order_created",
      });

      if (!pendingAttemptSaved) {
        throw new Error(
          "Unable to initialize payment attempt. Please try again.",
        );
      }

      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        throw new Error("Unable to load Razorpay checkout. Please try again.");
      }

      const amountDisplayCurrency =
        orderPayload.currency === "USD" ? "$" : "₹";
      const amountDisplay =
        orderPayload.registration_fee !== undefined
          ? `${amountDisplayCurrency}${orderPayload.registration_fee}`
          : `${amountDisplayCurrency}${(orderPayload.amount / 100).toFixed(2)}`;

      let flowCompleted = false;
      let failureHandled = false;

      const handlePaymentFailure = async (
        reason: string,
        paymentId?: string,
        orderId?: string,
      ) => {
        if (flowCompleted || failureHandled) {
          return;
        }

        failureHandled = true;

        const failureMessage = reason.trim() || "Payment was not completed";

        const failedAttemptSaved = await persistPaymentAttempt("failed", {
          reason: failureMessage,
          paymentId,
          orderId: orderId || orderPayload.order_id,
          paymentMode: "gateway_failed",
        });

        if (failedAttemptSaved) {
          setSubmitError(
            `${failureMessage}. Your details were saved with failed payment status.`,
          );
        } else {
          setSubmitError(
            `${failureMessage}. Unable to persist failed payment attempt automatically. Please contact support with your order details.`,
          );
        }

        setIsSubmitting(false);
      };

      const razorpay = new window.Razorpay({
        key: orderPayload.key_id,
        amount: orderPayload.amount,
        currency: orderPayload.currency,
        name: "BSERC",
        description: `Mentor Registration Fee (${amountDisplay})`,
        order_id: orderPayload.order_id,
        prefill: {
          name: getFirstTextValue(formDataObj, ["full_name"]),
          email,
          contact: getFirstTextValue(formDataObj, ["phone"]),
        },
        theme: {
          color: "#f97316",
        },
        handler: async (response) => {
          try {
            const buildRegisterPayload = () => {
              const payload = cloneFormData(formDataObj);
              payload.set("razorpay_order_id", response.razorpay_order_id);
              payload.set("razorpay_payment_id", response.razorpay_payment_id);
              payload.set("razorpay_signature", response.razorpay_signature);
              return payload;
            };

            let registerResponse = await fetch(registerEndpoint, {
              method: "POST",
              body: buildRegisterPayload(),
            });

            if (
              !registerResponse.ok
              && registerResponse.status === 404
              && registerEndpoint !== "/api/mentor/register"
            ) {
              registerResponse = await fetch("/api/mentor/register", {
                method: "POST",
                body: buildRegisterPayload(),
              });
            }

            const message = await parseApiMessage(registerResponse);
            if (!registerResponse.ok) {
              throw new Error(message || "Unable to submit mentor registration.");
            }

            flowCompleted = true;

            setSubmitSuccess(
              message || "Payment successful and mentor registration completed.",
            );
            resetForm(form);
          } catch (error: unknown) {
            await handlePaymentFailure(
              getErrorMessage(error),
              response.razorpay_payment_id,
              response.razorpay_order_id,
            );
          }

          setIsSubmitting(false);
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

      razorpay.on("payment.failed", (response) => {
        void handlePaymentFailure(
          response.error?.description || "Payment failed. Please try again.",
          (response as RazorpayFailureResponse & {
            error?: {
              metadata?: {
                payment_id?: string;
                order_id?: string;
              };
            };
          }).error?.metadata?.payment_id,
          (response as RazorpayFailureResponse & {
            error?: {
              metadata?: {
                payment_id?: string;
                order_id?: string;
              };
            };
          }).error?.metadata?.order_id || orderPayload.order_id,
        );
      });

      razorpay.open();
    } catch (error: unknown) {
      setSubmitError(getErrorMessage(error));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-300 py-16 px-4 selection:bg-orange-500 selection:text-black">
      <FormResponseOverlay
        visible={Boolean(activeResponse)}
        type={activeResponse?.type ?? "info"}
        message={activeResponse?.message ?? ""}
        onClose={() => {
          setSubmitError("");
          setSubmitSuccess("");
        }}
      />

      <main className="max-w-6xl mx-auto">
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-orange-500 text-xs font-bold tracking-[0.2em] uppercase">
              MENTOR PORTAL
            </span>
            <div className="h-px w-16 bg-orange-500/40"></div>
          </div>
          <h1 className="text-5xl font-serif font-bold text-white mb-5 leading-tight">
            Register as a <br /> Mentor/Expert
          </h1>
          <p className="text-zinc-400 text-sm max-w-2xl">
            Share your expertise and guide the next generation of space
            innovators. Join our mentorship program.
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

        <form onSubmit={handleSubmit}>
        <SectionCard title="1. PERSONAL INFORMATION / व्यक्तिगत जानकारी">
          <InputField
            label="Full Name / पूरा नाम "
            placeholder="Dr./Prof./Your Name"
            name="full_name"
            id="full_name"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <InputField
              label="Email Address / ईमेल पता "
              placeholder="yourname@domain.com"
              type="email"
              name="email"
              id="email"
              required
            />
            <InputField
              type="tel"
              label="Phone Number / फोन नंबर "
              placeholder="Enter phone number"
              name="phone"
              id="phone"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <InputField
              label="Date of Birth / जन्म दिनांक"
              type="date"
              name="dob"
              id="dob"
              required
            />
            <div className="mb-6 w-full">
              <FormLabel
                label="Nationality / राष्ट्रीयता"
                required
                id="nationality"
              />
              <div className="relative">
                <select
                  id="nationality"
                  name="nationality"
                  required
                  defaultValue="Indian"
                  className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 text-sm focus:outline-none appearance-none"
                >
                  <option value="Indian">Indian</option>
                  <option value="Others">Others</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="2. PROFESSIONAL DETAILS / व्यावसायिक विवरण">
          <InputField
            label="Current Position / वर्तमान पद"
            placeholder="e.g., Senior Engineer, Professor, Scientist"
            name="current_position"
            id="current_position"
            required
          />
          <InputField
            label="Organization / संगठन"
            placeholder="Company/University/Institute name"
            name="organization"
            id="organization"
            required
          />
          <InputField
            type="number"
            min="0"
            label="Years of Experience / अनुभव के वर्ष"
            placeholder="e.g., 5, 10, 15"
            name="years_experience"
            id="years_experience"
            required
          />
          <div className="mb-6">
            <FormLabel
              label="Professional Bio / व्यावसायिक जीवन परिचय"
              required
              id="professional_bio"
            />
            <textarea
              id="professional_bio"
              name="professional_bio"
              required
              rows={4}
              className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors"
              placeholder="Brief description of your expertise and achievements..."
            />
          </div>
        </SectionCard>

        <SectionCard title="3. EXPERTISE & SPECIALIZATION / विशेषज्ञता और विशेषीकरण">
          <div className="mb-6">
            <FormLabel
              label="Primary Technical Track / प्राथमिक तकनीकी ट्रैक"
              required
              id="primary_track"
            />
            <div className="relative">
              <select
                id="primary_track"
                name="primary_track"
                required
                defaultValue=""
                className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 text-sm focus:outline-none appearance-none"
              >
                <option value="" disabled>--Select Primary Track--</option>
                <option value="Advanced Drone Technology (AIR Taxi)">Advanced Drone Technology (AIR Taxi)</option>
                <option value="Defence Drone Technology">Defence Drone Technology</option>
                <option value="Aircraft Design Technology">Aircraft Design Technology</option>
                <option value="Rocketry">Rocketry</option>
                <option value="Robotics & Artificial Intelligence">Robotics & Artificial Intelligence</option>
                <option value="Project & Innovation for Viksit Bharat@2047">Project & Innovation for Viksit Bharat@2047</option>
                <option value="Multiple Tracks (I can mentor across tracks)">Multiple Tracks (I can mentor across tracks)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                <ChevronDown />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <FormLabel label="Secondary/Additional Skills / माध्यमिक/अतिरिक्त कौशल" id="secondary_skills"/>
            <textarea
              id="secondary_skills"
              name="secondary_skills"
              rows={3}
              className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 focus:outline-none focus:border-orange-500/50 transition-colors"
              placeholder="List any other relevant skills, certifications, or areas of expertise..."
            />
          </div>
          <InputField
            label="Key Competencies / मुख्य योग्यताएं"
            placeholder="e.g., CAD Design, Aerodynamics, Control Systems, Machine Learning, Project Management..."
            name="key_competencies"
            id="key_competencies"
            required
          />
        </SectionCard>

        <SectionCard title="4. MENTORING PREFERENCES / सलाह देने की वरीयताएं">
          <div className="mb-8">
            <label className="block text-zinc-100 text-[13px] font-semibold mb-4">
              Preferred Mentoring Mode / पसंदीदा सलाह देने का तरीका{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: "video_call", label: " Video Call / वीडियो कॉल" },
                { id: "phone_call", label: "Phone Call / फोन कॉल" },
                { id: "live_chat", label: "Live Chat / लाइव चैट" },
                { id: "email_support", label: "Email / ईमेल" },
              ].map((mode) => (
                <label
                  key={mode.id}
                  htmlFor={mode.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      id={mode.id}
                      name={mode.id}
                      value="true"
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-zinc-600 bg-transparent checked:bg-white checked:border-white transition-all"
                    />
                    <Check
                      className="absolute h-4 w-4 text-black opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5"
                      strokeWidth={4}
                    />
                  </div>
                  <span className="text-zinc-300 text-[12px] leading-tight group-hover:text-white transition-colors">
                    {mode.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5" htmlFor="availability">
              Availability / उपलब्धता <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="availability"
                name="availability"
                required
                defaultValue=""
                className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 text-sm focus:outline-none focus:border-orange-500/50 appearance-none transition-colors"
              >
                <option value="" disabled>--Select Availability--</option>
                <option value="Full-time (Can dedicate significant hours)">Full-time (Can dedicate significant hours)</option>
                <option value="Part-time (Few hours per week)">Part-time (Few hours per week)</option>
                <option value="Flexible (Available as needed)">Flexible (Available as needed)</option>
                <option value="Weekends Only">Weekends Only</option>
                <option value="Evenings Only (After 6 PM)">Evenings Only (After 6 PM)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                <ChevronDown />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5" htmlFor="max_students">
              Maximum Students / अधिकतम छात्र{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="max_students"
              type="number"
              min="1"
              name="max_students"
              required
              placeholder="How many students can you mentor simultaneously?"
              className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
          </div>

          <div className="mb-2">
            <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5" htmlFor="session_duration">
              Session Duration Preference / सत्र की अवधि{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="session_duration"
                name="session_duration"
                required
                defaultValue=""
                className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 text-sm focus:outline-none focus:border-orange-500/50 appearance-none transition-colors"
              >
                <option value="" disabled>--Select Duration--</option>
                <option value="30 Minutes">30 Minutes</option>
                <option value="45 Minutes">45 Minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="1.5 hours">1.5 hours</option>
                <option value="2 hours">2 hours</option>
                <option value="Flexible">Flexible</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                <ChevronDown />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Mentorship Compensation */}
          <SectionCard title="Mentorship Compensation & Expectations">
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
              {/* Hidden input to ensure currency is submitted with FormData */}
              <input type="hidden" name="currency" value={formData.currency} />
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

        <SectionCard title="5. PROFESSIONAL COMPENSATION STRUCTURE / व्यावसायिक मुआवजा संरचना">
          <div className="mb-8">
            <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5" htmlFor="consultation_fee">
              Consultation Fee (Per Session) / परामर्श शुल्क
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 font-bold text-lg">
                ₹
              </span>
              <input
                id="consultation_fee"
                type="number"
                name="consultation_fee"
                min="0"
                className="w-full pl-10 pr-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 focus:outline-none focus:border-orange-500/50 transition-colors"
                placeholder="e.g., 500, 1000, 2500"
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-zinc-100 text-[13px] font-semibold mb-4">
              Engagement Models & Pricing / संलग्नता मॉडल और मूल्य निर्धारण
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg p-5 flex flex-col hover:border-zinc-600 transition-colors"
                >
                  <h4 className="text-zinc-100 text-[13px] font-bold leading-tight mb-1">
                    {plan.titleEn}
                  </h4>
                  <h4 className="text-zinc-400 text-[12px] font-medium mb-4">
                    {plan.titleHi}
                  </h4>

                  {/* Total Investment Input */}
                  <div className="relative mb-4">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 text-xs font-bold">
                      ₹
                    </span>
                    <input
                      type="number"
                      name={plan.name}
                      placeholder="Total investment"
                      className="w-full bg-[#111111] border border-[#2a2a2a] rounded px-8 py-2 text-[12px] text-zinc-200 focus:outline-none focus:border-orange-500/50 placeholder:text-zinc-600 placeholder:italic transition-colors"
                    />
                  </div>

                  <p className="text-orange-500 text-[10px] uppercase tracking-wider font-bold mt-auto">
                    {plan.benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-4 cursor-pointer group" htmlFor="complimentary_session">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                id="complimentary_session"
                name="complimentary_session"
                value="true"
                className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-zinc-600 bg-transparent checked:bg-white checked:border-white transition-all"
              />
              <Check
                className="absolute h-4 w-4 text-black opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5"
                strokeWidth={4}
              />
            </div>
            <span className="text-zinc-300 text-[13px] group-hover:text-white transition-colors">
              I offer a complimentary introductory consultation / मैं एक
              निःशुल्क परामर्श प्रदान करता हूं
            </span>
          </label>
        </SectionCard>

        <SectionCard title="6. BACKGROUND INFORMATION / पृष्ठभूमि जानकारी">
          <div className="mb-8">
            <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5">
              Upload Resume/CV / रिज्यूमे/सीवी अपलोड करें{" "}
              <span className="text-red-500">*</span>
            </label>
            <label className="relative border border-dashed border-[#333] rounded-xl py-12 flex flex-col items-center justify-center bg-[#111111]/50 hover:bg-[#161616] cursor-pointer group transition-colors">
              <input
                type="file"
                name="resume"
                id="resume"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                required
                ref={resumeInputRef}
                onChange={(event) =>
                  setResumeFileName(event.target.files?.[0]?.name ?? "")
                }
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <div className="mb-3 text-zinc-500 group-hover:text-zinc-300">
                <Upload />
              </div>
              <p className="text-zinc-500 text-xs font-medium">
                Click to upload or drag file (PDF, DOC, DOCX - Max 5MB)
              </p>
              {resumeFileName && (
                <p className="mt-3 text-xs text-orange-500">Selected: {resumeFileName}</p>
              )}
            </label>
          </div>

          <div className="mb-8">
            <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5">
              Upload Profile Photo / प्रोफाइल फोटो अपलोड करें{" "}
              <span className="text-red-500">*</span>
            </label>
            <label className="relative border border-dashed border-[#333] rounded-xl py-12 flex flex-col items-center justify-center bg-[#111111]/50 hover:bg-[#161616] cursor-pointer group transition-colors">
              <input
                type="file"
                name="profile_photo"
                id="profile_photo"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                required
                ref={profilePhotoInputRef}
                onChange={(event) =>
                  setProfilePhotoFileName(event.target.files?.[0]?.name ?? "")
                }
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <div className="mb-3 text-zinc-500 group-hover:text-zinc-300">
                <Upload />
              </div>
              <p className="text-zinc-500 text-xs font-medium">
                Click to upload or drag file (JPG, PNG - Max 2MB)
              </p>
              {profilePhotoFileName && (
                <p className="mt-3 text-xs text-orange-500">Selected: {profilePhotoFileName}</p>
              )}
            </label>
          </div>

          <div className="mb-6">
            <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5" htmlFor="linkedin_url">
              LinkedIn Profile / लिंक्डइन प्रोफाइल
            </label>
            <input
              id="linkedin_url"
              type="url"
              name="linkedin_url"
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
          </div>

          <div className="mb-2">
            <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5" htmlFor="portfolio_url">
              Portfolio / Website / पोर्टफोलियो / वेबसाइट
            </label>
            <input
              id="portfolio_url"
              type="url"
              name="portfolio_url"
              placeholder="https://yourportfolio.com"
              className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
          </div>
        </SectionCard>

        <SectionCard title="7. PREVIOUS MENTORING EXPERIENCE / पूर्व सलाह देने का अनुभव">
          <div className="mb-6">
            <FormLabel
              label="Have you mentored students/interns before? / क्या आपने पहले छात्रों/इंटर्न को मार्गदर्शन दिया है? "
              required
              id="has_mentored_before"
            />
            <div className="relative">
              <select
                id="has_mentored_before"
                name="has_mentored_before"
                required
                defaultValue=""
                className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 text-sm focus:outline-none focus:border-orange-500/50 appearance-none transition-colors"
              >
                <option value="" disabled>--Select--</option>
                <option value="yes">Yes, I have mentored students</option>
                <option value="limited">Limited experience</option>
                <option value="no">No, but I'm eager to mentor</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                <ChevronDown />
              </div>
            </div>
          </div>
          <div className="mb-2">
            <FormLabel label="Tell us about your mentoring experience / अपने सलाह देने के अनुभव के बारे में बताएं" id="mentoring_experience"/>
            <textarea
              id="mentoring_experience"
              name="mentoring_experience"
              rows={4}
              className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
              placeholder="Number of students mentored, outcomes, success stories, etc..."
            />
          </div>
        </SectionCard>

           <div className="bg-[#181818] border border-[#262626] rounded-xl p-6 md:p-8 mb-8">
            <h3 className="text-orange-500 font-semibold mb-6 text-sm uppercase tracking-wide">
              Mentorship Programme Fee
            </h3>

            {/* Fee Cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Indian Participants */}
              <div className="bg-[#5f380e] border border-[#2a2a2a] rounded-lg p-6 text-center hover:border-orange-500/30 transition-colors">
                <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  Indian Participants
                </p>
                <p className="text-orange-500 text-3xl font-bold mb-2">
                  ₹ 1,000
                </p>
                <p className="text-zinc-400 text-xs">
                  One-time participation fee
                </p>
              </div>

              {/* International Participants */}
              <div className="bg-[#0f1f2e] border border-[#1e3a4a] rounded-lg p-6 text-center hover:border-cyan-500/30 transition-colors">
                <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  International Participants
                </p>
                <p className="text-cyan-400 text-3xl font-bold mb-2">US$ 150</p>
                <p className="text-zinc-400 text-xs">
                  One-time participation fee
                </p>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-[#111111] border border-[#262620] rounded-lg p-4">
              <p className="text-zinc-400 text-sm">
                <span className="text-cyan-400 font-semibold">
                  What the fee includes:
                </span>{" "}
                <span className="text-zinc-500">
                  Mentor onboarding & training, access to BSERC's digital
                  mentorship platform, coordination support, certificate of
                  mentorship, and year-round BSERC community engagement.
                </span>
              </p>
            </div>
          </div>

        <SectionCard title="8. GUIDELINES & FINAL DECLARATION / दिशानिर्देश और अंतिम घोषणा">
          {/* Registration Guidelines Box */}
          <div className="bg-[#111111] border border-[#2d3023] rounded-3xl p-8 mb-6">
            <div className="flex gap-4 mb-8">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-300 flex items-center justify-center">
                <Check className="text-orange-500 w-6 h-6" strokeWidth={3} />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-100 mb-2">
                  Registration Fee & Profile Activation
                </h4>
                <p className="text-gray-400 leading-relaxed text-sm ">
                  After successful verification of your credentials and payment
                  of the mentor registration fee of{" "}
                  <span className="text-[#a3e635] font-bold">
                    ₹ 1,000 for a 2-year tenure
                  </span>{" "}
                  , your mentor profile will be activated and made visible to
                  interns, students, startups, professionals, and
                  companies.{" "}
                </p>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-300 flex items-center justify-center">
                <Search className="text-orange-500 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-100 mb-2">
                  Profile Visibility & Collaboration
                </h4>
                <p className="text-gray-400 leading-relaxed text-sm">
                  These stakeholders may directly view your profile and initiate
                  mentorship requests or collaboration opportunities as
                  appropriate. Your expertise will be highlighted to potential
                  mentees.
                </p>
              </div>
            </div>

            {/* Guideline Checkbox */}
            <label className="flex items-start gap-4 cursor-pointer select-none pt-4 border-t border-[#2d3023]">
              <div className="relative flex items-center mt-1">
                <input
                  type="checkbox"
                  id="guidelinesAccepted"
                  checked={guidelinesAccepted}
                  onChange={() => setGuidelinesAccepted(!guidelinesAccepted)}
                  className="peer h-6 w-6 cursor-pointer appearance-none rounded border-2 border-gray-500 bg-transparent checked:bg-white checked:border-white transition-all"
                />
                <Check
                  className="absolute h-5 w-5 text-black opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5"
                  strokeWidth={4}
                />
              </div>
              <div className="text-gray-200 text-xs md:text-sm">
                <label htmlFor="guidelinesAccepted" className="cursor-pointer">
                  I understand and accept the guidelines. I agree to pay the
                  ₹1,000 registration fee for 2-year tenure /
                  <span className="block text-gray-400 mt-1">
                    मैं दिशानिर्देशों को समझता/समझती हूँ और स्वीकार करता/करती हूँ।
                    मैं 2 साल की अवधि के लिए ₹1,000 पंजीकरण शुल्क का भुगतान करने
                    के लिए सहमत हूँ
                  </span>
                </label>
              </div>
            </label>
          </div>

          {/* Code of Conduct Box (New Addition) */}
          <div className="bg-[#111111] border border-[#262620] rounded-2xl p-8 mb-10">
            {/* Top Section */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-300 flex items-center justify-center">
                <Check className="text-orange-500 w-6 h-6" strokeWidth={3} />
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-100">
                  Code of Conduct / आचरण संहिता
                </h4>
                <p className="text-gray-400 leading-relaxed text-sm mt-2">
                  As a mentor, you agree to maintain professional ethics,
                  provide quality guidance, respect student confidentiality, and
                  uphold the values of the Def-Space program.
                </p>
              </div>
            </div>

            {/* Checkbox Section */}
            <label className="flex items-start gap-3 cursor-pointer select-none">
              {/* Checkbox */}
              <div className="relative flex items-center mt-1">
                <input
                  type="checkbox"
                  id="conductAccepted"
                  checked={conductAccepted}
                  onChange={() => setConductAccepted(!conductAccepted)}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-zinc-600 bg-transparent checked:bg-white checked:border-white transition-all"
                />
                <Check
                  className="absolute h-4 w-4 text-black opacity-0 peer-checked:opacity-100 pointer-events-none left-[2px]"
                  strokeWidth={4}
                />
              </div>

              {/* Text */}
              <div className="text-white text-sm font-medium leading-relaxed">
                <label htmlFor="conductAccepted" className="cursor-pointer">
                  I declare that the information provided is accurate and I agree
                  to the mentoring guidelines and code of conduct /
                  <span className="block text-zinc-400 mt-1 text-xs">
                    मैं घोषणा करता हूँ कि प्रदान की गई जानकारी सटीक है और मैं सलाह
                    देने के दिशानिर्देशों और आचरण संहिता से सहमत हूँ
                  </span>
                </label>
              </div>
            </label>
          </div>
          {/* Submit Button Section */}
          <div className="flex flex-col items-center">
            <div className="w-full h-px bg-zinc-800/50 mb-12"></div>
            <button
              type="submit"
              disabled={!isFormReady || isSubmitting}
              className={`
                flex items-center gap-2 px-10 py-4 rounded-full font-bold transition-all active:scale-95
                ${
                  isFormReady && !isSubmitting
                    ? "bg-orange-500 hover:bg-orange-600 text-black shadow-lg shadow-[#ccf15a]/10"
                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                }
              `}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </SectionCard>
        </form>
      </main>
    </div>
  );
}