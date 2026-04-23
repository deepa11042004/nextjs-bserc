"use client";

import { useState } from "react";

// ─────────────────────────────────────────────────────────────
// UI Components
// ─────────────────────────────────────────────────────────────

interface InputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  accept?: string;
}

function FormInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
  error,
  accept,
}: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-slate-200 font-medium mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        accept={accept}
        className={`
          w-full px-4 py-3 rounded-lg bg-slate-800 border text-slate-100 
          placeholder-slate-500 focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:border-transparent transition-all duration-200
          ${error 
            ? "border-red-500 focus:ring-red-500 animate-pulse" 
            : "border-slate-700 hover:border-slate-600"
          }
          ${type === 'file' ? "file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-900 file:text-blue-200 hover:file:bg-blue-800" : ""}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400 flex items-center gap-1" role="alert">
          <span aria-hidden="true">⚠️</span> {error}
        </p>
      )}
    </div>
  );
}

interface TextareaProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  minLength?: number;
}

function FormTextarea({
  id,
  name,
  label,
  placeholder,
  rows = 5,
  required = false,
  value,
  onChange,
  error,
  minLength,
}: TextareaProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-slate-200 font-medium mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        className={`
          w-full px-4 py-3 rounded-lg bg-slate-800 border text-slate-100 
          placeholder-slate-500 focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:border-transparent transition-all duration-200
          resize-vertical
          ${error 
            ? "border-red-500 focus:ring-red-500 animate-pulse" 
            : "border-slate-700 hover:border-slate-600"
          }
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400 flex items-center gap-1" role="alert">
          <span aria-hidden="true">⚠️</span> {error}
        </p>
      )}
    </div>
  );
}

interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormCheckbox({ id, name, label, checked, onChange }: CheckboxProps) {
  return (
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 rounded focus:ring-blue-500 focus:ring-2"
      />
      <label htmlFor={id} className="ml-2 text-sm font-medium text-slate-300">
        {label}
      </label>
    </div>
  );
}

interface RadioProps {
  id: string;
  name: string;
  label: string;
  value: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormRadio({ id, name, label, value, checked, onChange }: RadioProps) {
  return (
    <div className="flex items-center mb-2">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500 focus:ring-2"
      />
      <label htmlFor={id} className="ml-2 text-sm font-medium text-slate-300">
        {label}
      </label>
    </div>
  );
}

function SubmitButton({ 
  isSubmitting = false, 
  label = "Submit Request" 
}: { 
  isSubmitting?: boolean; 
  label?: string 
}) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`
        w-full py-3 px-6 rounded-lg font-semibold text-white
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-offset-slate-950 transition-all duration-200 
        flex items-center justify-center gap-2
        ${isSubmitting 
          ? "bg-slate-700 cursor-wait" 
          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500 shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50"
        }
      `}
    >
      {isSubmitting ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Processing...</span>
        </>
      ) : (
        <>
          <span>{label}</span>
          <svg className="w-4 h-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────

export default function PartnerWithUsPage() {
  const [formData, setFormData] = useState({
    institution_name: "",
    registered_address: "",
    website: "",
    signatory_name: "",
    signatory_designation: "",
    official_email: "",
    official_phone: "",
    alternative_email: "",
    purpose_scope: "",
    programmes: [] as string[],
    preferred_focus: "",
    preferred_start_date: "",
    duration_timings: "",
    additional_requirements: "",
    expected_participants: "",
    workshop_type: "",
    expected_outcomes: "",
    project_help: false,
    supporting_document: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | null>(null);

  const programmesOptions = [
    "Defence Drone Workshop",
    "Artificial Intelligence",
    "Rocketry",
    "Robotics",
    "Space Entrepreneurship",
    "Aircraft Design Technology"
  ];

  const handleChange = (name: string, value: string | boolean | string[] | File | null) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
    }
  };

  const handleProgrammeChange = (programme: string) => {
    setFormData(prev => {
      const isSelected = prev.programmes.includes(programme);
      const newProgrammes = isSelected 
        ? prev.programmes.filter(p => p !== programme)
        : [...prev.programmes, programme];
      return { ...prev, programmes: newProgrammes };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock validation
    const newErrors: Record<string, string> = {};
    if (!formData.institution_name) newErrors.institution_name = "Institution name is required";
    if (!formData.registered_address) newErrors.registered_address = "Registered address is required";
    if (!formData.signatory_name) newErrors.signatory_name = "Signatory name is required";
    if (!formData.signatory_designation) newErrors.signatory_designation = "Designation is required";
    if (!formData.official_email) newErrors.official_email = "Official email is required";
    if (!formData.official_phone) newErrors.official_phone = "Official phone is required";
    if (!formData.purpose_scope || formData.purpose_scope.length < 100) newErrors.purpose_scope = "Purpose and scope must be at least 100 characters";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitStatus("error");
      return;
    }
    
    // Mock submission flow
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setTimeout(() => {
        setFormData({
          institution_name: "",
          registered_address: "",
          website: "",
          signatory_name: "",
          signatory_designation: "",
          official_email: "",
          official_phone: "",
          alternative_email: "",
          purpose_scope: "",
          programmes: [],
          preferred_focus: "",
          preferred_start_date: "",
          duration_timings: "",
          additional_requirements: "",
          expected_participants: "",
          workshop_type: "",
          expected_outcomes: "",
          project_help: false,
          supporting_document: null,
        });
        setSubmitStatus("idle");
      }, 4000);
    }, 1500);
  };

  return (
    <section className="w-full bg-slate-950 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wider mb-4 border-b-2 border-blue-500 inline-block pb-2">
            Joint Collaboration Proposal Form
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-slate-300 mb-3">
            Bharat Space Education Research Centre (BSERC)
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Strategic Collaborations in Defence & Space Education, Defence Technology, Rocketry, Defence Drones, Robotics, Artificial Intelligence, and Innovation Programs
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl border border-slate-800">
          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            
            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="p-4 bg-green-900/20 border border-green-800 rounded-lg text-green-300 flex items-start gap-3 animate-in slide-in-from-top-2" role="alert">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">Proposal Submitted Successfully!</p>
                  <p className="text-green-400/90 text-sm mt-1">
                    Thank you for your proposal. Our team will review it and get back to you shortly.
                  </p>
                </div>
              </div>
            )}
            
            {submitStatus === "error" && Object.keys(errors).length > 0 && (
              <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-300 flex items-start gap-3 animate-in slide-in-from-top-2" role="alert">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Please fix the highlighted errors before submitting.</p>
              </div>
            )}

            {/* Section 1 */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-5 border-b border-slate-700 pb-2">Section 1: Institution/Organization Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                <FormInput
                  id="institution_name"
                  name="institution_name"
                  label="Name of Institution/Organization"
                  required
                  value={formData.institution_name}
                  onChange={(e) => handleChange("institution_name", e.target.value)}
                  error={errors.institution_name}
                />
                <FormInput
                  id="registered_address"
                  name="registered_address"
                  label="Registered Address"
                  required
                  value={formData.registered_address}
                  onChange={(e) => handleChange("registered_address", e.target.value)}
                  error={errors.registered_address}
                />
                <div className="md:col-span-2">
                  <FormInput
                    id="website"
                    name="website"
                    label="Website"
                    type="url"
                    placeholder="https://"
                    value={formData.website}
                    onChange={(e) => handleChange("website", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-5 border-b border-slate-700 pb-2">Section 2: Authorized Signatory Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                <FormInput
                  id="signatory_name"
                  name="signatory_name"
                  label="Full Name"
                  required
                  value={formData.signatory_name}
                  onChange={(e) => handleChange("signatory_name", e.target.value)}
                  error={errors.signatory_name}
                />
                <FormInput
                  id="signatory_designation"
                  name="signatory_designation"
                  label="Designation/Position"
                  required
                  value={formData.signatory_designation}
                  onChange={(e) => handleChange("signatory_designation", e.target.value)}
                  error={errors.signatory_designation}
                />
                <FormInput
                  id="official_email"
                  name="official_email"
                  label="Official Email Address"
                  type="email"
                  required
                  value={formData.official_email}
                  onChange={(e) => handleChange("official_email", e.target.value)}
                  error={errors.official_email}
                />
                <FormInput
                  id="official_phone"
                  name="official_phone"
                  label="Official Phone Number (with Country Code)"
                  type="tel"
                  required
                  value={formData.official_phone}
                  onChange={(e) => handleChange("official_phone", e.target.value)}
                  error={errors.official_phone}
                />
                <div className="md:col-span-2">
                  <FormInput
                    id="alternative_email"
                    name="alternative_email"
                    label="Alternative Contact Email"
                    type="email"
                    value={formData.alternative_email}
                    onChange={(e) => handleChange("alternative_email", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-5 border-b border-slate-700 pb-2">Section 3: Proposal Details</h3>
              <FormTextarea
                id="purpose_scope"
                name="purpose_scope"
                label="Purpose and Scope of Proposed Joint Collaboration"
                placeholder="Minimum 100 characters..."
                required
                minLength={100}
                value={formData.purpose_scope}
                onChange={(e) => handleChange("purpose_scope", e.target.value)}
                error={errors.purpose_scope}
              />
              <p className="text-xs text-slate-500 mt-1">
                {formData.purpose_scope.length}/100 characters minimum
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-5 border-b border-slate-700 pb-2">Section 4: Joint Programmes Interested In</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 bg-slate-800/50 p-4 rounded-lg border border-slate-800">
                {programmesOptions.map((prog) => (
                  <FormCheckbox
                    key={prog}
                    id={`prog_${prog.replace(/\s+/g, '_')}`}
                    name="programmes"
                    label={prog}
                    checked={formData.programmes.includes(prog)}
                    onChange={() => handleProgrammeChange(prog)}
                  />
                ))}
              </div>
              <FormInput
                id="preferred_focus"
                name="preferred_focus"
                label="Preferred Focus Areas"
                value={formData.preferred_focus}
                onChange={(e) => handleChange("preferred_focus", e.target.value)}
              />
            </div>

            {/* Section 5 */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-5 border-b border-slate-700 pb-2">Section 5: Proposed Date of the Workshop / Event</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  id="preferred_start_date"
                  name="preferred_start_date"
                  label="Preferred Period / Start Date"
                  type="date"
                  value={formData.preferred_start_date}
                  onChange={(e) => handleChange("preferred_start_date", e.target.value)}
                />
                <FormInput
                  id="duration_timings"
                  name="duration_timings"
                  label="Duration and Timings"
                  placeholder="e.g., 2 Days, 10 AM - 4 PM"
                  value={formData.duration_timings}
                  onChange={(e) => handleChange("duration_timings", e.target.value)}
                />
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-5 border-b border-slate-700 pb-2">Section 6: Any Additional Requirements</h3>
              <FormTextarea
                id="additional_requirements"
                name="additional_requirements"
                label="Additional Requirements"
                rows={3}
                value={formData.additional_requirements}
                onChange={(e) => handleChange("additional_requirements", e.target.value)}
              />
            </div>

            {/* Section 7 */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-5 border-b border-slate-700 pb-2">Section 7: Number of Attendees</h3>
              <FormInput
                id="expected_participants"
                name="expected_participants"
                label="Expected Number of Participants per Workshop"
                type="number"
                value={formData.expected_participants}
                onChange={(e) => handleChange("expected_participants", e.target.value)}
              />
            </div>

            {/* Section 8 */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-5 border-b border-slate-700 pb-2">Section 8: Workshop Type</h3>
              <div className="space-y-3 bg-slate-800/50 p-4 rounded-lg border border-slate-800">
                <FormRadio
                  id="wt_paid"
                  name="workshop_type"
                  label="Paid Workshop"
                  value="Paid Workshop"
                  checked={formData.workshop_type === "Paid Workshop"}
                  onChange={(e) => handleChange("workshop_type", e.target.value)}
                />
                <FormRadio
                  id="wt_granted"
                  name="workshop_type"
                  label="Granted / Sponsored by University, College or School"
                  value="Granted / Sponsored"
                  checked={formData.workshop_type === "Granted / Sponsored"}
                  onChange={(e) => handleChange("workshop_type", e.target.value)}
                />
                <FormRadio
                  id="wt_hybrid"
                  name="workshop_type"
                  label="Hybrid Model (Paid + Subsidized/Granted)"
                  value="Hybrid Model"
                  checked={formData.workshop_type === "Hybrid Model"}
                  onChange={(e) => handleChange("workshop_type", e.target.value)}
                />
              </div>
            </div>

            {/* Section 9 */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-5 border-b border-slate-700 pb-2">Section 9: Expected Outcomes</h3>
              <FormTextarea
                id="expected_outcomes"
                name="expected_outcomes"
                label="Expected Outcomes"
                rows={3}
                value={formData.expected_outcomes}
                onChange={(e) => handleChange("expected_outcomes", e.target.value)}
              />
            </div>

            {/* Section 10 */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-5 border-b border-slate-700 pb-2">Section 10: Project Help for Institution</h3>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-800">
                <FormCheckbox
                  id="project_help"
                  name="project_help"
                  label="Yes, we want to pursue Project Help for our Institution (Lab Setup, Student Projects, Mentorship, Incubation Support)"
                  checked={formData.project_help}
                  onChange={(e) => handleChange("project_help", e.target.checked)}
                />
              </div>
            </div>

            {/* Section 11 */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-5 border-b border-slate-700 pb-2">Section 11: Supporting Documents (Optional)</h3>
              <FormInput
                id="supporting_document"
                name="supporting_document"
                label="File Upload (accept: PDF, DOC, DOCX, max size 10MB)"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleChange("supporting_document", e.target.files[0]);
                  }
                }}
              />
            </div>

            {/* Section 12 */}
            <div className="bg-blue-900/20 p-5 rounded-xl border border-blue-800/50 mt-8">
              <h3 className="text-lg font-semibold text-blue-200 mb-2">Section 12: Declaration</h3>
              <p className="text-sm text-blue-100/80 leading-relaxed italic">
                "By submitting this proposal, I confirm that I am authorised to represent the institution/organisation named above and that the information provided is accurate to the best of my knowledge. I understand that this submission initiates a review process and does not guarantee Joint Programme execution."
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <SubmitButton isSubmitting={isSubmitting} label="Submit Joint Proposal" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}