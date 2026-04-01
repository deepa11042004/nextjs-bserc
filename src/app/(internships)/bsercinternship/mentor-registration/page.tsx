"use client";

import React, { useState } from 'react';

// --- Reusable Sub-components ---

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-[#181818] rounded-xl border border-[#262626] p-6 mb-6">
    <h3 className="text-white text-lg font-serif font-medium tracking-wide border-b border-[#2a2a2a] pb-4 mb-6 uppercase">
      {title}
    </h3>
    {children}
  </div>
);

const FormLabel = ({ label, required }: { label: string; required?: boolean }) => (
  <label className="block text-zinc-100 text-[13px] font-semibold mb-2">
    {label} {required && <span className="text-red-500 ml-0.5">*</span>}
  </label>
);

const InputField = ({ label, required, placeholder, type = "text", value, onChange, name }: any) => (
  <div className="mb-6 w-full">
    <FormLabel label={label} required={required} />
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
    />
  </div>
);

// --- Main Component ---

export default function MentorRegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    currentPosition: "",
    organization: "",
    experience: "",
    bio: "",
    primaryTrack: "",
    declaration: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-300 py-12 px-4 sm:px-6">
      <main className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[#a4cc22] text-xs font-bold tracking-widest uppercase">MENTOR PORTAL</span>
            <div className="h-px w-16 bg-[#a4cc22]/40"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Register as a <br /> Mentor/Expert
          </h1>
          <p className="text-zinc-400 text-sm">
            Share your expertise and guide the next generation of space innovators. Join our mentorship program.
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          
          {/* Section 1: Personal Info */}
          <SectionCard title="1. Personal Information / व्यक्तिगत जानकारी">
            <InputField 
              label="Full Name / पूरा नाम" 
              name="fullName" 
              placeholder="Dr./Prof./Your Name" 
              required 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <InputField label="Email Address / ईमेल पता" name="email" required />
              <InputField label="Phone Number / फोन नंबर" name="phone" placeholder="+91 XXXXX XXXXX" required />
            </div>
            <InputField label="Date of Birth / जन्म दिनांक" name="dob" type="date" required />
          </SectionCard>

          {/* Section 2: Professional Details */}
          <SectionCard title="2. Professional Details / व्यावसायिक विवरण">
            <InputField label="Current Position / वर्तमान पद" name="currentPosition" placeholder="e.g., Senior Engineer, Professor, Scientist" required />
            <InputField label="Organization / संगठन" name="organization" placeholder="Company/University/Institute name" required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <InputField label="Years of Experience / अनुभव के वर्ष" name="experience" placeholder="e.g., 5, 10, 15" required />
            </div>
            <div className="mb-6">
              <FormLabel label="Professional Bio / व्यावसायिक जीवन परिचय" required />
              <textarea 
                name="bio"
                rows={4}
                className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors resize-none"
                placeholder="Brief description of your expertise, achievements, and why you want to mentor..."
              />
            </div>
          </SectionCard>

          {/* Section 4: Mentoring Preferences */}
<SectionCard title="4. MENTORING PREFERENCES / सलाह देने की वरीयताएं">
  <div className="mb-6">
    <FormLabel label="Preferred Mentoring Mode / पसंदीदा सलाह देने का तरीका" required />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
      {['Video Call', 'Phone Call', 'Live Chat', 'Email'].map((mode) => (
        <label key={mode} className="flex items-center gap-3 cursor-pointer group">
          <input type="checkbox" className="w-4 h-4 rounded bg-zinc-800 border-none checked:bg-[#d4ff33]" />
          <span className="text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors">{mode}</span>
        </label>
      ))}
    </div>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
    <div className="mb-6">
      <FormLabel label="Availability / उपलब्धता" required />
      <select className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-400 text-sm focus:outline-none">
        <option>--Select Availability--</option>
        <option>Weekends</option>
        <option>Weekdays (Evenings)</option>
      </select>
    </div>
    <InputField label="Maximum Students / अधिकतम छात्र" placeholder="How many students can you mentor simultaneously?" required />
  </div>
</SectionCard>

{/* Section 5: Professional Compensation */}
<SectionCard title="5. PROFESSIONAL COMPENSATION STRUCTURE / व्यावसायिक मुआवजा संरचना">
  <div className="mb-8">
    <FormLabel label="Consultation Fee (Per Session) / परामर्श शुल्क" required />
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a4cc22] font-bold">₹</span>
      <input 
        type="text" 
        placeholder="e.g., 500, 1000, 2500"
        className="w-full pl-10 pr-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
      />
    </div>
    <p className="text-[10px] text-zinc-500 mt-2 italic">Standard rate for individual consultation sessions</p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {[
      { title: "Intensive 5-Session Bundle", desc: "Bulk discount applicable" },
      { title: "Comprehensive 10-Session Plan", desc: "20% savings on per-session rate" },
      { title: "Extended Mentorship Program", desc: "Ongoing support & guidance" }
    ].map((plan, i) => (
      <div key={i} className="p-4 rounded-xl border border-[#2a2a2a] bg-[#141414] hover:border-[#d4ff33]/30 transition-colors">
        <h4 className="text-zinc-100 text-[13px] font-bold mb-3">{plan.title}</h4>
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-md py-2 px-3 text-[11px] text-zinc-500 mb-2">
          Total investment (optional)
        </div>
        <p className="text-[10px] text-zinc-500">{plan.desc}</p>
      </div>
    ))}
  </div>
</SectionCard>

{/* Section 7: Previous Experience */}
<SectionCard title="7. PREVIOUS MENTORING EXPERIENCE / पूर्व सलाह देने का अनुभव">
  <div className="mb-6">
    <FormLabel label="Have you mentored students/interns before? / क्या आपने पहले छात्रों/इंटर्न को मार्गदर्शन दिया है?" required />
    <select className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-400 text-sm focus:outline-none">
      <option>--Select--</option>
      <option>Yes</option>
      <option>No</option>
    </select>
  </div>
  <div className="mb-2">
    <FormLabel label="Tell us about your mentoring experience / अपने सलाह देने के अनुभव के बारे में बताएं" />
    <textarea 
      rows={4}
      className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 placeholder-zinc-600 focus:outline-none resize-none"
      placeholder="Number of students mentored, outcomes, success stories, etc..."
    />
  </div>
</SectionCard>
          {/* Section 6: Background Verification */}
          <SectionCard title="6. Background & Verification / पृष्ठभूमि और सत्यापन">
            <div className="mb-8">
              <FormLabel label="Upload Resume/CV / रिज्यूमे/सीवी अपलोड करें" required />
              <div className="border border-dashed border-zinc-800 rounded-xl py-10 flex flex-col items-center justify-center bg-[#111111]/50 hover:bg-[#161616] cursor-pointer group transition-colors">
                <svg className="w-6 h-6 text-zinc-500 group-hover:text-zinc-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                <p className="text-zinc-500 text-xs">Click to upload or drag file (PDF, DOC, DOCX - Max 5MB)</p>
              </div>
            </div>
            <InputField label="LinkedIn Profile / लिंक्डइन प्रोफाइल" placeholder="https://linkedin.com/in/yourprofile" />
          </SectionCard>

          {/* Guidelines & Acceptance */}
          <div className="bg-[#181818] rounded-xl border border-zinc-800 p-6 mb-8">
             <div className="flex gap-4 mb-6">
                <div className="bg-[#d4ff33]/10 p-2 rounded-lg self-start">
                   <svg className="w-5 h-5 text-[#d4ff33]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                   <h4 className="text-white font-semibold">Registration Fee & Profile Activation</h4>
                   <p className="text-zinc-400 text-[13px] mt-1">After verification, a fee of <span className="text-[#d4ff33] font-bold">₹1,000 for a 2-year tenure</span> is required to activate your mentor profile.</p>
                </div>
             </div>
             
             <label className="flex items-start gap-4 cursor-pointer pt-4 border-t border-zinc-800">
               <div className="relative flex items-center justify-center mt-1">
                 <input
                   type="checkbox"
                   name="declaration"
                   className="peer w-5 h-5 rounded bg-zinc-800 border-none appearance-none checked:bg-[#d4ff33] transition-colors"
                   onChange={handleChange}
                 />
                 <svg className="absolute w-3.5 h-3.5 text-black opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
               </div>
               <p className="text-xs text-zinc-300 leading-relaxed">
                 I declare that the information provided is accurate and I agree to the mentoring guidelines and code of conduct.
               </p>
             </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="bg-[#d4ff33] hover:bg-[#c3e82d] text-black font-bold px-10 py-4 rounded-full flex items-center gap-3 transition-all active:scale-95 shadow-lg shadow-[#d4ff33]/10"
            >
              Submit Application
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
          
        </form>
      </main>
    </div>
  );
}