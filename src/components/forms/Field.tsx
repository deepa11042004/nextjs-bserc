// components/forms/Field.tsx
"use client";

import { UseFormRegister, FieldError } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  form: {
    register: UseFormRegister<any>;
    errors: Record<string, FieldError | undefined>;
  };
}

export default function FormFieldSelect({
  name,
  label,
  options,
  placeholder = "Select an option",
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
      <select
        id={name}
        disabled={disabled}
        className={`
          w-full px-4 py-3 rounded-lg bg-slate-800 border text-slate-100 
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:border-transparent transition-all duration-200
          ${error 
            ? "border-red-500 focus:ring-red-500" 
            : "border-slate-700"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        {...register(name)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
          <span>⚠️</span> {error.message}
        </p>
      )}
    </div>
  );
}