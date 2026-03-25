// components/forms/Checkbox.tsx

"use client";

interface Props {
  name: string;
  label: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormFieldCheckbox({
  name,
  label,
  helperText,
  required = false,
  disabled = false,
  error,
  checked,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col">
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            id={name}
            name={name}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className={`
              w-5 h-5 rounded border-2 appearance-none cursor-pointer
              bg-slate-800 border-slate-600 
              checked:bg-blue-600 checked:border-blue-600
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:ring-offset-2 focus:ring-offset-slate-900
              transition-all duration-200
              ${error ? "border-red-500 animate-pulse" : ""}
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
          />
          {error && (
            <span className="absolute -top-5 left-0 text-xs text-red-400 whitespace-nowrap animate-bounce">
              ⚠️ Required
            </span>
          )}
        </div>
        <span className="text-slate-300 text-sm leading-tight group-hover:text-slate-200 transition-colors">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </span>
      </label>
      {helperText && (
        <p className="mt-1 text-xs text-slate-500 ml-8">{helperText}</p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-400 flex items-center gap-1" role="alert">
          <span aria-hidden="true">⚠️</span> {error}
        </p>
      )}
    </div>
  );
}