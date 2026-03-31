"use client";

import { ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  required?: boolean;
}

export function FormField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  error,
  required,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-200" htmlFor={id}>
        {label}
        {required && <span className="ml-1 text-pink-400">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={cn(
          "w-full rounded-2xl border px-4 py-3 bg-slate-900/60 text-sm text-white",
          "transition duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500",
          error
            ? "border-rose-500 focus:ring-rose-500"
            : "border-slate-800 focus:border-sky-400",
        )}
      />
      {error && (
        <p className="text-xs text-rose-400 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
