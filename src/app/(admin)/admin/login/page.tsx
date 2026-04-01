"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { AuthShell } from "@/components/auth/AuthShell";
import { FormField } from "@/components/auth/FormField";
import { StatusAlert } from "@/components/auth/StatusAlert";
import { AdminToast } from "@/components/admin/AdminToast";
import { loginUser } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";
import { getRoleFromToken, normalizeRole, normalizeUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

const ADMIN_ROLES = new Set(["admin", "super_admin"]);

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

    if (!form.email) {
      next.email = "Email is required.";
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

      if (!ADMIN_ROLES.has(derivedRole)) {
        setStatus({ type: "error", message: "Unauthorized access" });
        return;
      }

      const user = normalizeUser(response.user, { role: derivedRole });
      login(token, derivedRole, user, { scope: "admin" });

      setStatus({ type: "success", message: "Redirecting to admin console..." });
      setTimeout(() => router.push("/admin"), 600);
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
      title="Admin access"
      subtitle="Secure sign in for authorized staff"
      actionLink={{
        href: "/login",
        label: "Student login"
      }}
    >
      <div className="rounded-2xl border border-sky-500/30 bg-slate-900/90 px-4 py-3 text-xs text-sky-100">
        Admin Portal: use your official organization credentials.
      </div>

      <AdminToast
        open={status?.type === "success"}
        message={status?.type === "success" ? status.message : ""}
        variant="success"
        durationMs={1200}
        onClose={() =>
          setStatus((previous) =>
            previous?.type === "success" ? null : previous,
          )
        }
      />

      {status?.type === "error" && (
        <StatusAlert type="error" message={status.message} />
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormField
          id="admin-email"
          label="Email"
          type="email"
          placeholder="admin@domain.com"
          value={form.email}
          onChange={handleChange("email")}
          required
          error={errors.email}
          autoComplete="username"
        />

        <FormField
          id="admin-password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange("password")}
          required
          error={errors.password}
          autoComplete="current-password"
        />

        <div className="-mt-2 flex justify-end">
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium",
              "text-sky-300 hover:bg-slate-800 hover:text-sky-200 transition-colors",
            )}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
          >
            {showPassword ? (
              <>
                <EyeOff className="h-4 w-4" />
                Hide password
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                Show password
              </>
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl border border-sky-400/50 bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition duration-200 hover:brightness-110 disabled:opacity-60"
        >
          {isSubmitting ? "Signing in…" : "Sign in as admin"}
        </button>
      </form>
    </AuthShell>
  );
}
