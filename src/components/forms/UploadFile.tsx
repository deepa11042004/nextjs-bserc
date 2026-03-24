// components/forms/UploadFile.tsx
"use client";

interface Props {
  name: string;
  label: string;
  accept?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  fileName?: string;
  onFileSelect?: (file: File | null) => void;
}

export default function FormFieldFile({
  name,
  label,
  accept,
  helperText,
  required = false,
  disabled = false,
  error,
  fileName,
  onFileSelect,
}: Props) {
  return (
    <div className="flex flex-col">
      <label className="text-slate-300 text-sm font-medium mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      
      <div className={`
        relative border-2 border-dashed rounded-lg p-6 text-center
        transition-all duration-200 cursor-pointer group
        ${error 
          ? "border-red-500 bg-red-900/10" 
          : "border-slate-600 bg-slate-800/50 hover:border-blue-500 hover:bg-slate-800"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}>
        <input
          type="file"
          id={name}
          name={name}
          accept={accept}
          disabled={disabled}
          onChange={(e) => onFileSelect?.(e.target.files?.[0] || null)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center gap-3">
          <svg 
            className={`w-10 h-10 ${error ? "text-red-400" : "text-slate-400 group-hover:text-blue-400"} transition-colors`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          
          <div>
            <p className="text-slate-300 font-medium">
              {fileName || "Click to upload or drag and drop"}
            </p>
            <p className="text-slate-500 text-sm mt-1">
              PDF, DOC, DOCX • Max 10MB
            </p>
          </div>
        </div>
      </div>
      
      {fileName && !error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-green-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="truncate">{fileName}</span>
        </div>
      )}
      
      {helperText && <p className="mt-2 text-xs text-slate-500">{helperText}</p>}
      
      {error && (
        <p className="mt-2 text-sm text-red-400 flex items-center gap-1" role="alert">
          <span aria-hidden="true">⚠️</span> {error}
        </p>
      )}
    </div>
  );
}