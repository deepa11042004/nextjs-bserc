"use client";

import { useMemo, useState } from "react";

import type { Workshop } from "@/types/workshop";
import {
  createWorkshopPaymentOrder,
  recordWorkshopFailedPaymentAttempt,
  registerWorkshopWithoutPayment,
  verifyWorkshopPaymentAndRegister,
  type WorkshopRegistrationPayload,
} from "@/services/workshopRegistration";
import FormResponseOverlay from "@/components/ui/FormResponseOverlay";

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

function normalizeDesignationForApi(value: string): string {
  const normalized = value.trim().toLowerCase();
  if (normalized === "student") {
    return "Student";
  }
  if (normalized === "faculty") {
    return "Faculty";
  }
  if (normalized === "professional") {
    return "Professional";
  }
  if (normalized === "other" || normalized === "others") {
    return "Others";
  }
  return value.trim();
}

function normalizeNationalityForApi(value: string): string {
  const normalized = value.trim().toLowerCase();
  if (normalized === "indian") {
    return "Indian";
  }
  if (normalized === "other" || normalized === "others") {
    return "Others";
  }
  return value.trim();
}

function normalizeCountryForApi(value: string): string {
  return value.trim();
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

function isAlreadyRegisteredMessage(message: string): boolean {
  return message.toLowerCase().includes("already registered");
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function isRetryableVerificationError(error: unknown): boolean {
  const message = getErrorMessage(error).toLowerCase();
  return (
    message.includes("payment is not successful yet") ||
    message.includes("unable to validate payment with razorpay")
  );
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

function formatDateLabel(value: string): string {
  if (!value) {
    return "TBA";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatTimeLabel(value?: string): string {
  if (!value) {
    return "TBA";
  }

  const match = value.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (!match) {
    return value;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (hours > 23 || minutes > 59) {
    return value;
  }

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatTimeRange(startTime: string, endTime?: string): string {
  if (!startTime && !endTime) {
    return "TBA";
  }

  const start = formatTimeLabel(startTime);
  const end = formatTimeLabel(endTime);

  if (startTime && endTime) {
    return `${start} - ${end}`;
  }

  return startTime ? start : end;
}

function formatFee(value: number): string {
  if (!Number.isFinite(value) || value <= 0) {
    return "Free";
  }

  return `Rs ${value.toLocaleString("en-IN")}`;
}

const COUNTRY_OPTIONS = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
] as const;

// Reusable Input Component
function FormInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
  inputMode,
  pattern,
  title,
  maxLength,
}: any) {
  return (
    <div>
      <label className="block text-slate-200 font-medium mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        inputMode={inputMode}
        pattern={pattern}
        title={title}
        maxLength={maxLength}
        className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

// Submit Button
function SubmitButton({
  isSubmitting,
  disabled = false,
}: {
  isSubmitting: boolean;
  disabled?: boolean;
}) {
  const isDisabled = isSubmitting || disabled;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`w-full py-3 rounded-lg font-semibold text-white transition ${
        isDisabled
          ? "bg-slate-700 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90"
      }`}
    >
      {isSubmitting ? "Submitting..." : "Submit Registration"}
    </button>
  );
}

type SubmitStatus = {
  type: "success" | "info" | "error";
  message: string;
};

type PaymentRetryPrompt = {
  message: string;
};

export default function WorkshopRegistrationPageClient({
  workshop,
}: {
  workshop: Workshop;
}) {
  // Certificate preview is temporarily disabled.
  // const certificatePreviewSrc =
  //   workshop.certificateUrl || workshop.thumbnailUrl || "/img/page-1.png";

  const emptyFormData = {
    name: "",
    email: "",
    contact: "",
    altEmail: "",
    institution: "",
    designation: "",
    workshopDate: "",
    nationality: "",
    country: "",
    content: [] as string[],
    agreeRecord: false,
    agreeTerms: false,
  };

  const [formData, setFormData] = useState(emptyFormData);

  type InfoItem = {
    label: string;
    value: string;
  };

  const infoItems: InfoItem[] = useMemo(
    () => [
      { label: "Eligibility", value: workshop.eligibility || "Open for all" },
      { label: "Mode", value: workshop.mode || "Not specified" },
      { label: "Date", value: formatDateLabel(workshop.workshopDate) },
      {
        label: "Time",
        value: formatTimeRange(workshop.startTime, workshop.endTime),
      },
      { label: "Duration", value: workshop.duration || "TBA" },
      {
        label: "Certificate",
        value: workshop.certificate ? "Provided" : "Not Provided",
      },
      { label: "Fee", value: formatFee(workshop.fee) },
    ],
    [workshop],
  );

  const overviewParagraphs = useMemo(() => {
    const raw = (workshop.description || "").replace(/\r/g, "").trim();

    if (!raw) {
      return ["Detailed workshop information will be available shortly."];
    }

    const paragraphs = raw
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);

    return paragraphs.length ? paragraphs : [raw];
  }, [workshop.description]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);
  const [paymentRetryPrompt, setPaymentRetryPrompt] =
    useState<PaymentRetryPrompt | null>(null);

  const activeResponse = submitStatus
    ? {
        type: submitStatus.type,
        message: submitStatus.message,
      }
    : null;

  const contentOptions = [
    "Drone Design Basics",
    "Aerodynamics",
    "AI in Drones",
    "Flight Simulation",
    "Air Taxi Systems",
  ];

  const workshopDates = useMemo(() => {
    const dateLabel = formatDateLabel(workshop.workshopDate);
    const timeLabel = formatTimeRange(workshop.startTime, workshop.endTime);

    if (dateLabel === "TBA" && timeLabel === "TBA") {
      return ["To be announced"];
    }

    if (timeLabel === "TBA") {
      return [dateLabel];
    }

    return [`${dateLabel} (${timeLabel})`];
  }, [workshop.workshopDate, workshop.startTime, workshop.endTime]);

  const isOtherNationalitySelected =
    normalizeNationalityForApi(formData.nationality) === "Others";

  // Keep existing form behavior unchanged.
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setSubmitStatus(null);

    if (name === "nationality") {
      const normalizedNationality = normalizeNationalityForApi(value);

      setFormData((prev) => ({
        ...prev,
        nationality: value,
        country: normalizedNationality === "Others" ? prev.country : "",
      }));
      return;
    }

    if (type === "checkbox" && name === "content") {
      setFormData((prev) => ({
        ...prev,
        content: checked
          ? [...prev.content, value]
          : prev.content.filter((c) => c !== value),
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const clearForm = () => {
    setFormData(emptyFormData);
  };

  const openPaymentRetryPrompt = (message: string) => {
    setSubmitStatus(null);
    setPaymentRetryPrompt({ message });
  };

  const startRegistrationFlow = async () => {
    setSubmitStatus(null);
    setPaymentRetryPrompt(null);
    setIsSubmitting(true);

    if (!formData.agreeRecord || !formData.agreeTerms) {
      setSubmitStatus({
        type: "error",
        message:
          "Please agree to recording & certification and terms & conditions before registering.",
      });
      setIsSubmitting(false);
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.contact.trim())) {
      setSubmitStatus({
        type: "error",
        message: "Contact number must be exactly 10 digits.",
      });
      setIsSubmitting(false);
      return;
    }

    const normalizedNationality = normalizeNationalityForApi(formData.nationality);
    if (normalizedNationality !== "Indian" && normalizedNationality !== "Others") {
      setSubmitStatus({
        type: "error",
        message: "Please select a valid nationality.",
      });
      setIsSubmitting(false);
      return;
    }

    const normalizedCountry = normalizeCountryForApi(formData.country);
    if (normalizedNationality === "Others" && !normalizedCountry) {
      setSubmitStatus({
        type: "error",
        message: "Please select your country.",
      });
      setIsSubmitting(false);
      return;
    }

    const registrationPayload: WorkshopRegistrationPayload = {
      workshop_id: workshop.id,
      full_name: formData.name.trim(),
      email: formData.email.trim(),
      contact_number: formData.contact.trim(),
      alternative_email: formData.altEmail.trim(),
      institution: formData.institution.trim(),
      designation: normalizeDesignationForApi(formData.designation),
      nationality: normalizedNationality,
      country: normalizedNationality === "Others" ? normalizedCountry : null,
      agree_recording: formData.agreeRecord,
      agree_terms: formData.agreeTerms,
    };

    try {
      const order = await createWorkshopPaymentOrder({
        workshop_id: workshop.id,
        email: formData.email,
      });

      if (order.already_registered) {
        setSubmitStatus({
          type: "info",
          message: order.message || "You are already registered for this workshop.",
        });
        setIsSubmitting(false);
        return;
      }

      if (!order.requires_payment || order.amount <= 0) {
        await registerWorkshopWithoutPayment(registrationPayload);
        clearForm();
        setSubmitStatus({
          type: "success",
          message: "Registration successful!",
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

      const paymentAttemptState = {
        completed: false,
        failureRecorded: false,
      };

      const recordFailedAttempt = async (details: {
        orderId?: string;
        paymentId?: string;
        mode?: string;
      }) => {
        if (paymentAttemptState.completed || paymentAttemptState.failureRecorded) {
          return;
        }

        paymentAttemptState.failureRecorded = true;

        try {
          await recordWorkshopFailedPaymentAttempt({
            ...registrationPayload,
            razorpay_order_id: details.orderId || order.order_id,
            razorpay_payment_id: details.paymentId,
            payment_status: "failed",
            payment_mode: details.mode || "failed",
          });
        } catch {
          // Best effort only: checkout UX should not fail if this logging call fails.
        }
      };

      const RazorpayConstructor =
        window.Razorpay as unknown as new (
          options: RazorpayOptions,
        ) => RazorpayInstance;

      const razorpay = new RazorpayConstructor({
        // Keep a best-effort record for failed/canceled payment attempts.
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: "BSERC",
        description: workshop.title || "Workshop Registration",
        order_id: order.order_id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
        },
        theme: {
          color: "#2563eb",
        },
        handler: async (response) => {
          try {
            const verificationPayload = {
              ...registrationPayload,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            let lastError: unknown = null;

            for (let attempt = 1; attempt <= 3; attempt += 1) {
              try {
                await verifyWorkshopPaymentAndRegister(verificationPayload);
                lastError = null;
                break;
              } catch (error) {
                lastError = error;

                if (!isRetryableVerificationError(error) || attempt === 3) {
                  break;
                }

                await wait(1500);
              }
            }

            if (lastError) {
              throw lastError;
            }

            paymentAttemptState.completed = true;

            clearForm();
            setSubmitStatus({
              type: "success",
              message: "Payment successful and registration completed!",
            });
          } catch (error) {
            setSubmitStatus({
              type: "error",
              message: getErrorMessage(error),
            });
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => {
            if (!paymentAttemptState.completed) {
              void recordFailedAttempt({
                orderId: order.order_id,
                mode: "cancelled",
              });

              openPaymentRetryPrompt(
                "Payment was not completed. Would you like to try again?",
              );
            }
            setIsSubmitting(false);
          },
        },
      });

      razorpay.on("payment.failed", (response) => {
        void recordFailedAttempt({
          orderId: response.error?.metadata?.order_id || order.order_id,
          paymentId: response.error?.metadata?.payment_id,
          mode: response.error?.reason || "failed",
        });

        openPaymentRetryPrompt(
          response.error?.description
            || "Payment failed or was not completed. Would you like to try again?",
        );

        setIsSubmitting(false);
      });

      razorpay.open();
    } catch (error) {
      const message = getErrorMessage(error);
      if (isAlreadyRegisteredMessage(message)) {
        setSubmitStatus({
          type: "info",
          message: "You are already registered for this workshop.",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message,
        });
      }
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await startRegistrationFlow();
  };

  const handlePaymentRetry = () => {
    if (isSubmitting) {
      return;
    }

    void startRegistrationFlow();
  };

  const handlePaymentCancel = () => {
    setPaymentRetryPrompt(null);
    clearForm();
    setSubmitStatus({
      type: "info",
      message:
        "Payment was not completed. Your details were saved as failed payment and the form has been cleared.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <FormResponseOverlay
        visible={Boolean(activeResponse)}
        type={activeResponse?.type ?? "info"}
        message={activeResponse?.message ?? ""}
        onClose={() => setSubmitStatus(null)}
      />

      {paymentRetryPrompt && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-lg rounded-xl border border-rose-400/60 bg-rose-500/10 px-5 py-4 text-rose-100 shadow-2xl"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-white/90">
              Payment Not Complete
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              {paymentRetryPrompt.message}
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={handlePaymentCancel}
                className="rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white/20"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePaymentRetry}
                className="rounded-md border border-emerald-300/40 bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-100 transition hover:bg-emerald-500/30"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-center py-16 shadow-lg">
        <h1 className="mx-auto max-w-4xl break-words px-4 text-3xl font-bold uppercase tracking-wide md:text-4xl">
          {workshop.title || "Workshop Registration"}
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <h2 className="mb-4 text-center text-3xl md:text-4xl font-bold font-serif text-blue-400">
            Workshop Overview
          </h2>

          <div className="mb-4 space-y-3 overflow-hidden text-slate-300 leading-relaxed">
            {overviewParagraphs.map((paragraph, index) => (
              <p
                key={`overview-${index}`}
                className="rounded-lg bg-slate-800/40 px-4 py-3 break-words whitespace-pre-wrap"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="space-y-2 text-gray-300">
            {infoItems.map((item) => (
              <li key={item.label}>
                <span className="font-semibold text-white">{item.label}:</span>{" "}
                {item.value}
              </li>
            ))}
          </ul>
        </div>

        {/*
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 text-center">
            Certificate Preview
          </h2>

          <div className="relative w-full md:w-[70%] mx-auto aspect-[4/3] rounded-xl overflow-hidden border border-slate-700">
            <img
              src={certificatePreviewSrc}
              alt={`${workshop.title || "Workshop"} certificate preview`}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={(event) => {
                const target = event.currentTarget;
                if (target.src.includes("/img/page-1.png")) {
                  return;
                }
                target.src = "/img/page-1.png";
              }}
            />
          </div>

          <div className="mt-4 text-center text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            <p className="font-extrabold text-white mb-2">
              Upon completion of the workshop, participants will be certified.
            </p>
            <p className="mt-1">
              The certificates will highlight the skills and knowledge gained
              through the workshop!
            </p>
          </div>
        </div>
        */}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-5"
        >
          <h2 className="text-2xl font-semibold text-blue-400">
            Participant Information
          </h2>

          {/* Row 1 */}
          <div className="grid md:grid-cols-2 gap-4">
            <FormInput
              id="name"
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
              required
              value={formData.name}
              onChange={handleChange}
            />

            <FormInput
              id="email"
              name="email"
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-2 gap-4">
            <FormInput
              id="contact"
              name="contact"
              label="Contact Number"
              type="tel"
              placeholder="Enter phone number"
              required
              value={formData.contact}
              onChange={handleChange}
              inputMode="numeric"
              pattern="[0-9]{10}"
              title="Contact number must be exactly 10 digits"
              maxLength={10}
            />

            <FormInput
              id="altEmail"
              name="altEmail"
              label="Alternative Email"
              type="email"
              placeholder="name@example.com"
              required
              value={formData.altEmail}
              onChange={handleChange}
            />
          </div>

          {/* Row 3 */}
          <div className="grid md:grid-cols-2 gap-4">
            <FormInput
              id="institution"
              name="institution"
              label="Institution"
              placeholder="College / Organization"
              required
              value={formData.institution}
              onChange={handleChange}
            />

            <div>
              <label className="block text-slate-200 font-medium mb-2">
                Designation <span className="text-red-400 ml-1">*</span>
              </label>

              <select
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select your designation</option>
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="Professional">Professional</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          {/* Workshop Date and Nationality */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-200 font-medium mb-2">
                Available Date of the Workshop{" "}
                <span className="text-red-400">*</span>
              </label>

              <select
                name="workshopDate"
                value={formData.workshopDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Workshop Date</option>
                {workshopDates.map((date) => (
                  <option key={date}>{date}</option>
                ))}
              </select>
            </div>

            <div
              className={`grid gap-4 ${
                isOtherNationalitySelected ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
              }`}
            >
              <div>
                <label className="block text-slate-200 font-medium mb-2">
                  Nationality <span className="text-red-400">*</span>
                </label>

                <select
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select your nationality</option>
                  <option value="Indian">Indian</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {isOtherNationalitySelected && (
                <div>
                  <label className="block text-slate-200 font-medium mb-2">
                    Country <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required={isOtherNationalitySelected}
                    className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select your country</option>
                    {COUNTRY_OPTIONS.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex gap-2 text-slate-300">
              <input
                type="checkbox"
                name="agreeRecord"
                checked={formData.agreeRecord}
                onChange={handleChange}
                required
              />
              <span>
                I agree to recording & certification.
                <span className="text-red-400">*</span>
              </span>
            </label>

            <label className="flex gap-2 text-slate-300">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <span>
                I agree to terms & conditions.
                <span className="text-red-400">*</span>
              </span>
            </label>
          </div>

          {/* Submit */}
          <SubmitButton
            isSubmitting={isSubmitting}
            disabled={!formData.agreeRecord || !formData.agreeTerms}
          />
        </form>
      </div>
    </div>
  );
}