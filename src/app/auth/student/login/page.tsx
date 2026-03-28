"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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

function SecurityNotice() {
  return (
    <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg text-blue-300 text-sm flex items-start gap-3">
      <svg
        className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
      <div>
        <p className="font-medium">Your data is protected</p>
        <p className="text-blue-400/80 mt-1">
          All submissions are encrypted, rate-limited, and transmitted securely.
          We never share your information without consent.
        </p>
      </div>
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

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const router = useRouter();

  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email address.";
    if (!password) e.password = "Password is required.";
    else if (password.length < 6)
      e.password = "Password must be at least 6 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMsg("");

    try {
      const res = await fetch("#", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      let data = null;

      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Invalid credentials");
      }

      setSubmitStatus("success");
      setStatusMsg("Welcome back! Redirecting...");

      setTimeout(() => {
        router.push("/student");
        router.refresh();
      }, 1000);
    } catch (error: any) {
      console.error("Login error:", error);

      setSubmitStatus("error");
      setStatusMsg(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Derived button state
  const buttonLabel = isSubmitting
    ? "Authenticating…"
    : submitStatus === "success"
      ? "✓ Access Granted"
      : submitStatus === "error"
        ? "Try Again"
        : "Sign In ";

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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight  ">
            candidate Portal
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Restricted access — authorised personnel only
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
            {/* Email */}
            <FormFieldInput
              name="email"
              label="Email address"
              type="email"
              placeholder="admin@example.com"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((p) => ({ ...p, email: undefined }));
              }}
              error={errors.email}
            />

            {/* Password */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-slate-300 text-sm font-medium mb-2"
              >
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((p) => ({ ...p, password: undefined }));
                  }}
                  className={[
                    "w-full px-4 py-3 pr-12 rounded-lg bg-slate-800 border text-slate-100",
                    "placeholder-slate-500 focus:outline-none focus:ring-2",
                    "focus:ring-blue-500 focus:border-transparent transition-all duration-200",
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-700 hover:border-slate-600",
                  ].join(" ")}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? (
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
              {errors.password && (
                <p
                  className="mt-1 text-sm text-red-400 flex items-center gap-1"
                  role="alert"
                >
                  <span aria-hidden="true">⚠</span> {errors.password}
                </p>
              )}
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-800 accent-blue-600 cursor-pointer"
                />
                <span className="text-slate-300 text-sm">
                  Remember me for 30 days
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap shrink-0"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit button */}
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

          {/* Registration button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => router.push("/auth/student/register")} // Change to your registration route
              className="w-full py-3 px-6 rounded-lg font-semibold text-blue-600 text-sm 
               border border-blue-500 hover:bg-blue-600 hover:text-white 
               transition-all duration-200 flex items-center justify-center gap-2"
            >
              Create Account
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
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-slate-900 text-slate-500 text-xs uppercase tracking-widest">
                Security
              </span>
            </div>
          </div>

          <SecurityNotice />
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Unauthorised access attempts are logged and may be prosecuted.
        </p>
      </div>
    </div>
  );
}
