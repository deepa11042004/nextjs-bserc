"use client";

import { FormEvent, ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

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

        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange("password")}
          required
          error={errors.password}
          autoComplete="current-password"
        />

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
