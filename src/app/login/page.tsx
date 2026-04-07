"use client";

import { FormEvent, ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { AuthShell } from "@/components/auth/AuthShell";
import { FormField } from "@/components/auth/FormField";
import { StatusAlert } from "@/components/auth/StatusAlert";
import { loginUser } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";
import {
  getRoleFromToken,
  isAdminRole,
  normalizeRole,
  normalizeUser,
} from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key: keyof typeof form) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
      setStatus(null);
    };

  const validate = () => {
    const next: Partial<typeof form> = {};

    if (!form.email) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email.";
    }

    if (!form.password) {
      next.password = "Password is required.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting || !validate()) {
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await loginUser(form);
      const token = response.token;
      if (!token) {
        throw new Error("Token missing from server response.");
      }

      const derivedRole =
        normalizeRole(response.user?.role) ||
        normalizeRole(getRoleFromToken(token)) ||
        "user";

      if (isAdminRole(derivedRole)) {
        setStatus({
          type: "error",
          message: "Admin accounts must use the admin login portal.",
        });
        return;
      }

      const user = normalizeUser(response.user, { role: "user" });

      login(token, "user", user, { scope: "user" });

      setStatus({ type: "success", message: "Signed in! Redirecting..." });

      setTimeout(() => router.push("/"), 600);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Unable to sign in.";
      setStatus({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage your programs and profile"
      actionLink={{
        href: "/register",
        label: "Create an account",
      }}
    >
      {status && <StatusAlert type={status.type} message={status.message} />}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange("email")}
          required
          error={errors.email}
          autoComplete="username"
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-200" htmlFor="password">
            Password
            <span className="ml-1 text-pink-400">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange("password")}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full rounded-2xl border px-4 py-3 bg-slate-900/60 text-sm text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 border-slate-800 focus:border-sky-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-rose-400 mt-1" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-500 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition duration-200 disabled:opacity-60"
        >
          {isSubmitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthShell>
  );
}
