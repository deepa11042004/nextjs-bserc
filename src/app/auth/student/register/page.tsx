"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
// ─── Sub-components ──────────────────────────────────────────────────────────

function FormFieldInput({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  error,
  value,
  onChange,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "password" | "url";
  required?: boolean;
  disabled?: boolean;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-slate-300 text-sm font-medium mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={[
          "w-full px-4 py-3 rounded-lg bg-slate-800 border text-slate-100",
          "placeholder-slate-500 focus:outline-none focus:ring-2",
          "focus:ring-blue-500 focus:border-transparent transition-all duration-200",
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-slate-700 hover:border-slate-600",
          disabled ? "opacity-50 cursor-not-allowed" : "",
        ].join(" ")}
      />
      {error && (
        <p
          className="mt-1 text-sm text-red-400 flex items-center gap-1"
          role="alert"
        >
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
    </div>
  );
}

function PasswordInput({
  name,
  label,
  placeholder,
  required = false,
  error,
  value,
  onChange,
}: {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-slate-300 text-sm font-medium mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={[
            "w-full px-4 py-3 pr-12 rounded-lg bg-slate-800 border text-slate-100",
            "placeholder-slate-500 focus:outline-none focus:ring-2",
            "focus:ring-blue-500 focus:border-transparent transition-all duration-200",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-slate-700 hover:border-slate-600",
          ].join(" ")}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
      </div>
      {error && (
        <p
          className="mt-1 text-sm text-red-400 flex items-center gap-1"
          role="alert"
        >
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
    </div>
  );
}

function StatusMessage({
  type,
  message,
  onDismiss,
}: {
  type: "success" | "error";
  message: string;
  onDismiss?: () => void;
}) {
  const styles = {
    success: {
      bg: "bg-green-900/20",
      border: "border-green-800",
      text: "text-green-300",
    },
    error: {
      bg: "bg-red-900/20",
      border: "border-red-800",
      text: "text-red-300",
    },
  };
  const s = styles[type];
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border ${s.bg} ${s.border} ${s.text}`}
      role="alert"
    >
      <p className="text-sm flex-1">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="p-1 rounded hover:bg-white/10 transition-colors"
          aria-label="Dismiss"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [fields, setFields] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Partial<typeof fields>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const set =
    (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields((p) => ({ ...p, [key]: e.target.value }));
      setErrors((p) => ({ ...p, [key]: undefined }));
    };

  const validate = () => {
    const e: Partial<typeof fields> = {};
    if (!fields.fullName.trim()) e.fullName = "Full name is required.";
    if (!fields.email) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      e.email = "Enter a valid email address.";
    if (!fields.password) e.password = "Password is required.";
    else if (fields.password.length < 6)
      e.password = "Password must be at least 6 characters.";
    if (!fields.confirm) e.confirm = "Please confirm your password.";
    else if (fields.confirm !== fields.password)
      e.confirm = "Passwords do not match.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMsg("");

    try {
      const AUTH_API = process.env.NEXT_PUBLIC_AUTH_API_URL;
      if (!AUTH_API) throw new Error("API URL not configured");

      const base = AUTH_API.replace(/\/$/, "");

      const res = await fetch(`${base}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fields.fullName,
          email: fields.email,
          password: fields.password,
        }),
      });

      const data = await res.json().catch(() => {
        throw new Error("Invalid server response");
      });

      if (!res.ok) throw new Error(data?.message || "Registration failed");

      // ✅ Only login if success
      login(data.token || "dummy-token", "student", {
        name: data.user?.full_name || fields.fullName,
        email: data.user?.email || fields.email,
      });
      setSubmitStatus("success");
      setStatusMsg("Account created! Redirecting to login…");
      setTimeout(() => router.push("/auth/student/login"), 1500);
    } catch (err: unknown) {
      setSubmitStatus("error");
      setStatusMsg(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonLabel = isSubmitting
    ? "Creating account…"
    : submitStatus === "success"
      ? "✓ Account Created"
      : submitStatus === "error"
        ? "Try Again"
        : "Create Account";

  const buttonClass = [
    "w-full py-3 px-6 rounded-lg font-semibold text-white text-sm",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900",
    "transition-all duration-200 flex items-center justify-center gap-2",
    "disabled:cursor-not-allowed",
    isSubmitting
      ? "bg-slate-700 cursor-wait"
      : submitStatus === "success"
        ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
        : submitStatus === "error"
          ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
          : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 shadow-lg shadow-blue-900/30",
  ].join(" ");

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, #0f172a 0%, #020617 100%)",
      }}
    >
      {/* Grid texture */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 mb-4 shadow-lg shadow-blue-900/30">
            <svg
              className="w-7 h-7 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Create Account
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Join us — it only takes a minute
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-800">
          {statusMsg && (
            <div className="mb-6">
              <StatusMessage
                type={submitStatus === "success" ? "success" : "error"}
                message={statusMsg}
                onDismiss={() => {
                  setStatusMsg("");
                  setSubmitStatus("idle");
                }}
              />
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <FormFieldInput
              name="fullName"
              label="Full Name"
              placeholder="Jane Doe"
              required
              value={fields.fullName}
              onChange={set("fullName")}
              error={errors.fullName}
            />

            <FormFieldInput
              name="email"
              label="Email address"
              type="email"
              placeholder="jane@example.com"
              required
              value={fields.email}
              onChange={set("email")}
              error={errors.email}
            />

            <PasswordInput
              name="password"
              label="Password"
              placeholder="Min. 6 characters"
              required
              value={fields.password}
              onChange={set("password")}
              error={errors.password}
            />

            <PasswordInput
              name="confirm"
              label="Confirm Password"
              placeholder="••••••••"
              required
              value={fields.confirm}
              onChange={set("confirm")}
              error={errors.confirm}
            />

            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className={buttonClass}
              >
                {isSubmitting && (
                  <svg
                    className="animate-spin h-4 w-4"
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                {buttonLabel}
                {!isSubmitting && submitStatus === "idle" && (
                  <svg
                    className="w-4 h-4 opacity-70"
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
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-slate-900 text-slate-500 text-xs uppercase tracking-widest">
                Already have an account ?
              </span>
            </div>
          </div>

          <Link
            href="/auth/student/login"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg border border-slate-700 text-slate-300 text-sm font-medium hover:bg-slate-800 hover:border-slate-600 transition-all duration-200"
          >
            Sign in instead
          </Link>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </div>
  );
}
