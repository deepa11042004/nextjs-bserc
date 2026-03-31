"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthShell } from "@/components/auth/AuthShell";
import { FormField } from "@/components/auth/FormField";
import { StatusAlert } from "@/components/auth/StatusAlert";
import { registerUser } from "@/services/api";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (key: keyof typeof form) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
      setStatus(null);
    };

  const validate = () => {
    const next: Partial<typeof form> = {};

    if (!form.full_name.trim()) {
      next.full_name = "Full name is required";
    }

    if (!form.email) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Provide a valid email";
    }

    if (!form.password) {
      next.password = "Password is required";
    } else if (form.password.length < 8) {
      next.password = "Use at least 8 characters";
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
      await registerUser(form);
      setStatus({ type: "success", message: "Account created. Redirecting to login..." });
      setTimeout(() => router.push("/login"), 1200);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Unable to register user";
      setStatus({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join the BSERC community to unlock hands-on learning"
      actionLink={{
        href: "/login",
        label: "Have an account? Log in",
      }}
    >
      {status && <StatusAlert type={status.type} message={status.message} />}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormField
          id="full_name"
          label="Full name"
          value={form.full_name}
          onChange={handleChange("full_name")}
          placeholder="Jane Doe"
          required
          error={errors.full_name}
        />

        <FormField
          id="email"
          label="Email"
          value={form.email}
          onChange={handleChange("email")}
          type="email"
          placeholder="jane@company.com"
          required
          error={errors.email}
          autoComplete="email"
        />

        <FormField
          id="password"
          label="Password"
          value={form.password}
          onChange={handleChange("password")}
          type="password"
          placeholder="Choose a strong password"
          required
          error={errors.password}
          autoComplete="new-password"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition duration-200 disabled:opacity-60"
        >
          {isSubmitting ? "Creating account…" : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
}
