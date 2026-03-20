"use client";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
}

export default function FormFieldTextarea({
  name,
  label,
  placeholder,
  rows = 4,
  required = false,
  disabled = false,
  error,
  value,
  onChange,
  onBlur,
}: Props) {
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
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`
          w-full px-4 py-3 rounded-lg bg-slate-800 border text-slate-100 
          placeholder-slate-500 focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:border-transparent transition-all duration-200
          resize-vertical
          ${error 
            ? "border-red-500 focus:ring-red-500" 
            : "border-slate-700 hover:border-slate-600"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400 flex items-center gap-1" role="alert">
          <span aria-hidden="true">⚠️</span> {error}
        </p>
      )}
      <p className="mt-1 text-xs text-slate-500 text-right">
        {value?.length || 0}/2000 characters
      </p>
    </div>
  );
}