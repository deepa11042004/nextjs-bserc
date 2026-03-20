// components/forms/Number.tsx

"use client";

import { UseFormRegister, FieldError } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  form: {
    register: UseFormRegister<any>;
    errors: Record<string, FieldError | undefined>;
  };
}

export default function FormFieldTextarea({
  name,
  label,
  placeholder,
  rows = 4,
  required = false,
  disabled = false,
  form: { register, errors },
}: Props) {
  const error = errors[name];

  return (
    <div className="flex flex-col">
      <label 
        htmlFor={name} 
        className="text-slate-300 text-sm font-medium mb-2"
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-4 py-3 rounded-lg bg-slate-800 border text-slate-100 
          placeholder-slate-500 focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:border-transparent transition-all duration-200
          resize-vertical
          ${error 
            ? "border-red-500 focus:ring-red-500" 
            : "border-slate-700"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        {...register(name)}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
          <span>⚠️</span> {error.message}
        </p>
      )}
    </div>
  );
}