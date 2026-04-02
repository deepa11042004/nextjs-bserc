"use client";

 
import { Check, Search, ChevronDown, ArrowRight, Upload } from "lucide-react";
import React, { useState } from "react";

// ─────────────────────────────────────────────────────────────
// Reusable UI Components
// ─────────────────────────────────────────────────────────────

interface InputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  disabled?: boolean;
  isTextarea?: boolean;
}

function FormField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
  disabled = false,
  isTextarea = false,
}: InputProps) {
  const baseClasses =
    "w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors";

  return (
    <div className="mb-6 w-full">
      <label
        htmlFor={id}
        className="block text-zinc-100 text-[13px] font-semibold mb-2"
      >
        {label} {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          rows={3}
          className={`${baseClasses} resize-none `}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={baseClasses}
        />
      )}
    </div>
  );
}

function FormSelect({
  id,
  name,
  label,
  options,
  required,
  value,
  onChange,
  placeholder = "--Select--",
}: any) {
  return (
    <div className="mb-6 w-full">
      <label
        htmlFor={id}
        className="block text-zinc-100 text-[13px] font-semibold mb-2"
      >
        {label} {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-400 focus:outline-none focus:border-zinc-500 appearance-none"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {/* Custom select dropdown arrow */}
          
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
           
          <ChevronDown className="w-5 h-5 text-zinc-500"/>
        </div>
      </div>
    </div>
  );
}

function CardSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#181818] rounded-xl border border-[#262626] p-6 md:p-8 mb-6">
      <div className="border-b border-[#2a2a2a] pb-4 mb-6">
        <h3 className="text-white text-lg font-serif font-medium tracking-wide">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Application Form Component
// ─────────────────────────────────────────────────────────────

export default function page() {
  const [formData, setFormData] = useState({
    fullName: "",
    guardianName: "",
    gender: "",
    dob: "",
    mobile: "",
    email: "",
    altEmail: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    institution: "",
    qualification: "",
    declaration: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.declaration) {
      alert("Please accept the declaration to proceed.");
      return;
    }
    console.log("Form Data Submitted:", formData);
    alert("Proceeding to payment...");
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-300 font-sans selection:bg-[#d4ff33] selection:text-black py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-4xl mx-auto">
        {/* Header Title Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">
              APPLICATION PORTAL
            </span>
            <div className="h-px w-16 bg-[#a4cc22]/40"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-4">
            DEF-SPACE SUMMER LATER
            <br />
            INTERNSHIP APPLICATION FORM
          </h1>

          <p className="text-zinc-400 text-sm">
            Fill out all required fields to complete your application
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section 1 */}
          <CardSection title="1. INTERNSHIP DETAILS / इंटर्नशिप विवरण">
            <div className="space-y-2">
              <FormField
                id="internshipName"
                name="internshipName"
                label="Internship Name / इंटर्नशिप का नाम"
                value="Def-Space Summer Internship"
                 
                disabled
              />
              <FormField
                id="designation"
                name="designation"
                label="Designation of Internship / इंटर्नशिप का प्रकार"
                value="Def-Space Tech Intern"
                disabled
              />
            </div>
          </CardSection>

          {/* Section 2 */}
          <CardSection title="2. APPLICANT'S PERSONAL DETAILS / आवेदक का व्यक्तिगत विवरण">
            <div className="space-y-2">
              <FormField
                id="fullName"
                name="fullName"
                label="Applicant's Full Name / आवेदक का पूरा नाम"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
              <FormField
                id="guardianName"
                name="guardianName"
                label="Guardian Name / अभिभावक का नाम"
                required
                value={formData.guardianName}
                onChange={handleChange}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <FormSelect
                  id="gender"
                  name="gender"
                  label="Gender / लिंग"
                  placeholder="--Select Gender--"
                  options={[
                    "Male / पुरुष",
                    "Female / महिला",
                    "Other / अन्य",
                    "Prefer not to say ",
                  ]}
                  required
                  value={formData.gender}
                  onChange={handleChange}
                />
                <FormField
                  id="dob"
                  name="dob"
                  type="date"
                  label="Date of Birth / जन्म दिनांक"
                  placeholder="mm/dd/yyyy"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardSection>

          {/* Section 3 */}
          <CardSection title="3. CONTACT DETAILS / संपर्क विवरण">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <FormField
                id="mobile"
                name="mobile"
                type="tel"
                label="Mobile Number / मोबाइल नंबर"
                placeholder="+91 XXXXX XXXXX"
                required
                value={formData.mobile}
                onChange={handleChange}
              />
              <FormField
                id="email"
                name="email"
                type="email"
                label="Email Address / ईमेल पता"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <FormField
              id="altEmail"
              name="altEmail"
              type="email"
              label="Alternative Email / वैकल्पिक ईमेल पता"
              value={formData.altEmail}
              onChange={handleChange}
            />
          </CardSection>

          {/* Section 4 */}
          <CardSection title="4. PERMANENT ADDRESS DETAILS / स्थायी पता विवरण">
            <FormField
              id="address"
              name="address"
              label="Address / पता"
              required
              isTextarea
              value={formData.address}
              onChange={handleChange}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
              <FormField
                id="city"
                name="city"
                label="City Name / शहर का नाम"
                required
                value={formData.city}
                onChange={handleChange}
              />
              <FormField
                id="state"
                name="state"
                label="State / राज्य"
                required
                value={formData.state}
                onChange={handleChange}
              />
              <FormField
                id="pinCode"
                name="pinCode"
                label="Pin Code / पिन कोड"
                required
                value={formData.pinCode}
                onChange={handleChange}
              />
            </div>
          </CardSection>

          {/* Section 5 */}
          <CardSection title="5. EDUCATIONAL / QUALIFICATION DETAILS / शैक्षिक / योग्यता का विवरण">
            <FormField
              id="institution"
              name="institution"
              label="Institution Name / संस्थान का नाम"
              required
              value={formData.institution}
              onChange={handleChange}
            />
            <FormSelect
              id="qualification"
              name="qualification"
              label="Educational Qualification / शैक्षिक योग्यता"
              placeholder="--Select Qualification--"
              options={["B.Tech", "M.Tech", "BCA", "MCA", "B.Sc", "Other"]}
              required
              value={formData.qualification}
              onChange={handleChange}
            />
          </CardSection>

          {/* Section 6 */}
          <CardSection title="6. IDENTIFICATION DETAILS / पहचान का विवरण">
            <label className="block text-zinc-100 text-[13px] font-semibold mb-3">
              Upload Passport Size Photo / पासपोर्ट साइज फोटो अपलोड करें{" "}
              <span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="relative w-full border border-dashed border-[#3a402a] rounded-xl py-14 flex flex-col items-center justify-center bg-[#111111]/50 hover:bg-[#161616] transition-colors cursor-pointer group">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                required
              />
             
              <Upload  className="w-6 h-6 text-zinc-400 mb-3 group-hover:text-zinc-200 transition-colors" />
              <p className="text-zinc-400 text-[13px] group-hover:text-zinc-300 transition-colors">
                Click to upload or drag file (Max 800KB)
              </p>
            </div>
          </CardSection>

         {/* Declaration Section */}
<div className="bg-[#181818] rounded-xl border border-[#2a301a] p-6 mb-12">
  <label className="flex items-start gap-4 cursor-pointer group">
    <div className="pt-1 relative flex items-center justify-center">
      <input
        type="checkbox"
        name="declaration"
        required
        checked={formData.declaration}
        onChange={handleChange}
        className="peer w-5 h-5 rounded-sm bg-white border-none appearance-none checked:bg-orange-500 cursor-pointer flex-shrink-0 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-[#181818]"
      />
      
      {/* The Checkmark Arrow */}
      <svg 
        className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="4" 
          d="M5 13l4 4L19 7"
        />
      </svg>
     
      
    </div>
    
    <p className="text-[13px] text-zinc-300 leading-relaxed text-justify group-hover:text-zinc-100 transition-colors">
      I hereby declare that the information given above and in the
      enclosed documents is true to the best of my knowledge and
      belief and nothing has been concealed therein. I understand that
      if the information given by me is proved false/not true, all the
      benefits availed by me shall be withdrawn. / मैं घोषणा करता हूँ
      कि ऊपर और संलग्न दस्तावेजों में दी गई जानकारी मेरी सर्वोत्तम
      जानकारी और विश्वास के अनुसार सत्य है और इसमें कुछ भी छिपाया नहीं
      गया है। मैं समझता हूँ कि यदि मेरे द्वारा दी गई जानकारी झूठी हुई
      तो मेरे द्वारा प्राप्त किए गए सभी लाभ वापस ले लिए जाएंगे।
    </p>
  </label>
</div>

          {/* Submit Button */}
          <div className="border-t border-[#262626] pt-8 flex justify-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-black font-semibold text-sm px-8 py-3.5 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-[#d4ff33]/10"
            >
              Proceed to Pay
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
