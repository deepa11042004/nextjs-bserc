// components/forms/FormCard.tsx
"use client";

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function FormCard({ title, subtitle, children, footer }: Props) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 md:p-8 shadow-2xl border border-slate-800">
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-8 pb-6 border-b border-slate-800">
          {title && (
            <h2 className="text-2xl font-bold text-white">{title}</h2>
          )}
          {subtitle && (
            <p className="text-slate-400 mt-2">{subtitle}</p>
          )}
        </div>
      )}
      
      {/* Form Content */}
      <div className="space-y-6">
        {children}
      </div>
      
      {/* Footer */}
      {footer && (
        <div className="mt-8 pt-6 border-t border-slate-800">
          {footer}
        </div>
      )}
    </div>
  );
}