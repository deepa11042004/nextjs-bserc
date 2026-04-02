// "use client";

// import React, { useState } from "react";

// import { Check, Search, ChevronDown, ArrowRight, Upload } from "lucide-react";
// // --- Types ---
// interface EngagementPlan {
//   titleEn: string;
//   titleHi: string;
//   benefit: string;
//   name: string;
// }

// interface InputFieldProps {
//   label: string;
//   required?: boolean;
//   placeholder?: string;
//   type?: string;
//   name?: string;
//   min?: string | number;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// // --- Shared Sub-components ---

// const SectionCard = ({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) => (
//   <div className="bg-[#181818] rounded-xl border border-[#262626] p-6 mb-8 shadow-2xl">
//     <h3 className="text-white text-lg font-serif font-medium tracking-wide border-b border-[#2a2a2a] pb-4 mb-8 uppercase">
//       {title}
//     </h3>
//     {children}
//   </div>
// );

// const FormLabel = ({
//   label,
//   required,
// }: {
//   label: string;
//   required?: boolean;
// }) => (
//   <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5">
//     {label} {required && <span className="text-red-500 ml-0.5">*</span>}
//   </label>
// );

// const InputField: React.FC<InputFieldProps> = ({
//   label,
//   required,
//   placeholder,
//   type = "text",
//   name,
//   min,
//   onChange,
// }) => (
//   <div className="mb-6 w-full">
//     <FormLabel label={label} required={required} />
//     <input
//       type={type}
//       name={name}
//       placeholder={placeholder}
//       min={min}
//       onChange={onChange}
//       className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#a4cc22]/50 transition-colors"
//     />
//   </div>
// );

// export default function MentorRegistrationForm() {
//   // We'll use two states to ensure both the Guidelines and Code of Conduct are accepted
//   const [guidelinesAccepted, setGuidelinesAccepted] = useState<boolean>(false);
//   const [conductAccepted, setConductAccepted] = useState<boolean>(false);

//   const isFormReady = guidelinesAccepted && conductAccepted;
//   const plans: EngagementPlan[] = [
//     {
//       name: "bundle5",
//       titleEn: "Intensive 5-Session Bundle ",
//       titleHi: "5-सत्र बंडल",
//       benefit: "Bulk discount applicable",
//     },
//     {
//       name: "plan10",
//       titleEn: "Comprehensive 10-Session Plan ",
//       titleHi: "10-सत्र योजना",
//       benefit: "20% savings on per-session rate",
//     },
//     {
//       name: "extended",
//       titleEn: "Extended Mentorship Program ",
//       titleHi: "विस्तारित कार्यक्रम",
//       benefit: "Ongoing support & guidance",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#0d0d0d] text-zinc-300 py-16 px-4 selection:bg-[#a4cc22] selection:text-black">
//       <main className="max-w-4xl mx-auto">
//         {/* Header Section */}
//         <div className="mb-14">
//           <div className="flex items-center gap-4 mb-4">
//             <span className="text-orange-500 text-xs font-bold tracking-[0.2em] uppercase">
//               MENTOR PORTAL
//             </span>
//             <div className="h-px w-16 bg-[#a4cc22]/40"></div>
//           </div>
//           <h1 className="text-5xl font-serif font-bold text-white mb-5 leading-tight">
//             Register as a <br /> Mentor/Expert
//           </h1>
//           <p className="text-zinc-400 text-sm max-w-2xl">
//             Share your expertise and guide the next generation of space
//             innovators. Join our mentorship program.
//           </p>
//         </div>
//         <SectionCard title="1. PERSONAL INFORMATION / व्यक्तिगत जानकारी">
//           <InputField
//             label="Full Name / पूरा नाम "
//             placeholder="Dr./Prof./Your Name"
//             required
//           />
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
//             <InputField
//               label="Email Address / ईमेल पता "
//               placeholder="yourname@domain.com"
//               required
//             />
//             <InputField
//               type="number"
//               min="1"
//               label="Phone Number / फोन नंबर "
//               placeholder="+91 XXXXX XXXXX"
//               required
//             />
//           </div>
//           <InputField
//             label="Date of Birth / जन्म दिनांक"
//             type="date"
//             required
//           />
//         </SectionCard>

//         {/* 2. Professional Details */}
//         <SectionCard title="2. PROFESSIONAL DETAILS / व्यावसायिक विवरण">
//           <InputField
//             label="Current Position / वर्तमान पद"
//             placeholder="e.g., Senior Engineer, Professor, Scientist"
//             required
//           />
//           <InputField
//             label="Organization / संगठन"
//             placeholder="Company/University/Institute name"
//             required
//           />
//           <InputField
//             label="Years of Experience / अनुभव के वर्ष"
//             placeholder="e.g., 5, 10, 15"
//             required
//           />
//           <div className="mb-6">
//             <FormLabel
//               label="Professional Bio / व्यावसायिक जीवन परिचय"
//               required
//             />

//             <textarea
//               rows={4}
//               className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500  "
//               placeholder="Brief description of your expertise and achievements..."
//             />
//           </div>
//         </SectionCard>

//         {/* 3. Expertise & Specialization */}
//         <SectionCard title="3. EXPERTISE & SPECIALIZATION / विशेषज्ञता और विशेषीकरण">
//           <div className="mb-6">
//             <FormLabel
//               label="Primary Technical Track / प्राथमिक तकनीकी ट्रैक"
//               required
//             />
//             <div className="relative">
//               <select className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-400 text-sm focus:outline-none appearance-none">
//                 <option>--Select Primary Track--</option>
//                 <option>Advanced Drone Technology (AIR Taxi)</option>
//                 <option>Defence Drone Technology</option>
//                 <option>Aircraft Design Technology</option>
//                 <option>Rocketry</option>
//                 <option>Robotics & Artificial Intelligence</option>
//                 <option>Project & Innovation for Viksit Bharat@2047</option>
//                 <option>Multiple Tracks (I can mentor across tracks)</option>
//               </select>
//               <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
//                 <ChevronDown />
//               </div>
//             </div>
//           </div>
//           <div className="mb-6">
//             <FormLabel label="Secondary/Additional Skills / माध्यमिक/अतिरिक्त कौशल" />
//             <textarea
//               rows={3}
//               className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 focus:outline-none"
//               placeholder="List any other relevant skills, certifications, or areas of expertise..."
//             />
//           </div>
//           <InputField
//             label="Key Competencies / मुख्य योग्यताएं"
//             placeholder="e.g., CAD Design, Aerodynamics, Control Systems, Machine Learning, Project Management..."
//             required
//           />
//         </SectionCard>

//         {/* 4. Mentoring Preferences */}
//         <SectionCard title="4. MENTORING PREFERENCES / सलाह देने की वरीयताएं">
//           {/* Mentoring Mode - Checkboxes */}
//           <div className="mb-8">
//             <label className="block text-zinc-100 text-[13px] font-semibold mb-4">
//               Preferred Mentoring Mode / पसंदीदा सलाह देने का तरीका{" "}
//               <span className="text-red-500">*</span>
//             </label>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {[
//                 { id: "video", label: " Video Call / वीडियो कॉल" },
//                 { id: "phone", label: "Phone Call / फोन कॉल" },
//                 { id: "chat", label: "Live Chat / लाइव चैट" },
//                 { id: "email", label: "Email / ईमेल" },
//               ].map((mode) => (
//                 <label
//                   key={mode.id}
//                   className="flex items-center gap-3 cursor-pointer group"
//                 >
//                   <div className="relative flex items-center justify-center">
//                     <input
//                       type="checkbox"
//                       className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-zinc-600 bg-transparent checked:bg-white checked:border-white transition-all"
//                     />
//                     <Check
//                       className="absolute h-4 w-4 text-black opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5"
//                       strokeWidth={4}
//                     />
//                   </div>
//                   <span className="text-zinc-300 text-[12px] leading-tight group-hover:text-white transition-colors">
//                     {mode.label}
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Availability Dropdown */}
//           <div className="mb-8">
//             <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5">
//               Availability / उपलब्धता <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <select className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-400 text-sm focus:outline-none focus:border-zinc-500 appearance-none transition-colors">
//                 <option>--Select Availability--</option>
//                 <option>Full-time (Can dedicate significant hours)</option>
//                 <option>Part-time (Few hours per week)</option>
//                 <option>Flexible (Available as needed)</option>
//                 <option>Weekends Only</option>
//                 <option>Evenings Only (After 6 PM)</option>
//               </select>
//               <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
//                 <ChevronDown />
//               </div>
//             </div>
//           </div>

//           {/* Maximum Students Input */}
//           <div className="mb-8">
//             <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5">
//               Maximum Students / अधिकतम छात्र{" "}
//               <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               placeholder="How many students can you mentor simultaneously?"
//               className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
//             />
//           </div>

//           {/* Session Duration Dropdown */}
//           <div className="mb-2">
//             <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5">
//               Session Duration Preference / सत्र की अवधि{" "}
//               <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <select className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-400 text-sm focus:outline-none focus:border-zinc-500 appearance-none transition-colors">
//                 <option>--Select Duration--</option>
//                 <option>30 Minutes</option>
//                 <option>45 Minutes</option>
//                 <option>1 hour</option>
//                 <option>1.5 hours</option>
//                 <option>2 hours</option>
//                 <option>Flexible</option>
//               </select>
//               <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
//                 <ChevronDown />
//               </div>
//             </div>
//           </div>
//         </SectionCard>

//         {/* 5. Professional Compensation */}
//         <SectionCard title="5. PROFESSIONAL COMPENSATION STRUCTURE / व्यावसायिक मुआवजा संरचना">
//           {/* Per Session Input */}
//           <div className="mb-8">
//             <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5">
//               Consultation Fee (Per Session) / परामर्श शुल्क{" "}
//               <span className="text-red-500">*</span>
//             </label>
//             <div className="relative group">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 font-bold text-lg">
//                 ₹
//               </span>
//               <input
//                 type="number"
//                 className="w-full pl-10 pr-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 focus:outline-none focus:border-[#a4cc22]/50 transition-colors"
//                 placeholder="e.g., 500, 1000, 2500"
//               />
//             </div>
//           </div>

//           {/* Working Engagement Models */}
//           <div className="mb-8">
//             <label className="block text-zinc-100 text-[13px] font-semibold mb-4">
//               Engagement Models & Pricing / संलग्नता मॉडल और मूल्य निर्धारण
//             </label>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {plans.map((plan) => (
//                 <div
//                   key={plan.name}
//                   className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg p-5 flex flex-col hover:border-zinc-600 transition-colors"
//                 >
//                   <h4 className="text-zinc-100 text-[13px] font-bold leading-tight mb-1">
//                     {plan.titleEn}
//                   </h4>
//                   <h4 className="text-zinc-400 text-[12px] font-medium mb-4">
//                     {plan.titleHi}
//                   </h4>

//                   {/* NOW WORKING: Total Investment Input */}
//                   <div className="relative mb-4">
//                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 text-xs font-bold">
//                       ₹
//                     </span>
//                     <input
//                       type="number"
//                       name={plan.name}
//                       placeholder="Total investment"
//                       className="w-full bg-[#111111] border border-[#2a2a2a] rounded px-8 py-2 text-[12px] text-zinc-200 focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600 placeholder:italic"
//                     />
//                   </div>

//                   <p className="text-orange-500 text-[10px] uppercase tracking-wider font-bold mt-auto">
//                     {plan.benefit}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Checkbox */}
//           <label className="flex items-center gap-4 cursor-pointer group">
//             <div className="relative flex items-center justify-center">
//               <input
//                 type="checkbox"
//                 className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-zinc-600 bg-transparent checked:bg-white checked:border-white transition-all"
//               />
//               <Check
//                 className="absolute h-4 w-4 text-black opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5"
//                 strokeWidth={4}
//               />
//             </div>
//             <span className="text-zinc-300 text-[13px] group-hover:text-white transition-colors">
//               I offer a complimentary introductory consultation / मैं एक
//               निःशुल्क परामर्श प्रदान करता हूं
//             </span>
//           </label>
//         </SectionCard>

//         {/* 6. Background Information */}
//         <SectionCard title="6. BACKGROUND INFORMATION / पृष्ठभूमि जानकारी">
//           <div className="mb-8">
//             <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5">
//               Upload Resume/CV / रिज्यूमे/सीवी अपलोड करें{" "}
//               <span className="text-red-500">*</span>
//             </label>
//             <div className="border border-dashed border-[#333] rounded-xl py-12 flex flex-col items-center justify-center bg-[#111111]/50 hover:bg-[#161616] cursor-pointer group transition-colors">
//               <div className="mb-3 text-zinc-500 group-hover:text-zinc-300">
//                 <Upload />
//               </div>
//               <p className="text-zinc-500 text-xs font-medium">
//                 Click to upload or drag file (PDF, DOC, DOCX - Max 5MB)
//               </p>
//             </div>
//           </div>

//           {/* Profile Photo Upload */}
//           <div className="mb-8">
//             <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5">
//               Upload Profile Photo / प्रोफाइल फोटो अपलोड करें{" "}
//               <span className="text-red-500">*</span>
//             </label>
//             <div className="border border-dashed border-[#333] rounded-xl py-12 flex flex-col items-center justify-center bg-[#111111]/50 hover:bg-[#161616] cursor-pointer group transition-colors">
//               <div className="mb-3 text-zinc-500 group-hover:text-zinc-300">
//                 <Upload />
//               </div>
//               <p className="text-zinc-500 text-xs font-medium">
//                 Click to upload or drag file (JPG, PNG - Max 2MB)
//               </p>
//             </div>
//           </div>

//           {/* LinkedIn Input */}
//           <div className="mb-6">
//             <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5">
//               LinkedIn Profile / लिंक्डइन प्रोफाइल
//             </label>
//             <input
//               type="url"
//               placeholder="https://linkedin.com/in/yourprofile"
//               className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
//             />
//           </div>

//           {/* Portfolio/Website Input */}
//           <div className="mb-2">
//             <label className="block text-zinc-100 text-[13px] font-semibold mb-2.5">
//               Portfolio / Website / पोर्टफोलियो / वेबसाइट
//             </label>
//             <input
//               type="url"
//               placeholder="https://yourportfolio.com"
//               className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
//             />
//           </div>
//         </SectionCard>

// {/* Section 7: Previous Experience */}
// <SectionCard title="7. PREVIOUS MENTORING EXPERIENCE / पूर्व सलाह देने का अनुभव">
//   <div className="mb-6">
//     <FormLabel label="Have you mentored students/interns before? / क्या आपने पहले छात्रों/इंटर्न को मार्गदर्शन दिया है?" required />
//     <select className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-400 text-sm focus:outline-none">
//       <option>--Select--</option>
//       <option>Yes</option>
//       <option>No</option>
//     </select>
//   </div>
//   <div className="mb-2">
//     <FormLabel label="Tell us about your mentoring experience / अपने सलाह देने के अनुभव के बारे में बताएं" />
//     <textarea 
//       rows={4}
//       className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-100 placeholder-zinc-600 focus:outline-none resize-none"
//       placeholder="Number of students mentored, outcomes, success stories, etc..."
//     />
//   </div>
// </SectionCard>
//           {/* Section 6: Background Verification */}
//           <SectionCard title="6. Background & Verification / पृष्ठभूमि और सत्यापन">
//             <div className="mb-8">
//               <FormLabel label="Upload Resume/CV / रिज्यूमे/सीवी अपलोड करें" required />
//               <div className="border border-dashed border-zinc-800 rounded-xl py-10 flex flex-col items-center justify-center bg-[#111111]/50 hover:bg-[#161616] cursor-pointer group transition-colors">
//                 <svg className="w-6 h-6 text-zinc-500 group-hover:text-zinc-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
//                 <p className="text-zinc-500 text-xs">Click to upload or drag file (PDF, DOC, DOCX - Max 5MB)</p>
//               </div>
//             </div>

//             <div className="flex gap-4 mb-8">
//               <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-200 flex items-center justify-center">
//                 <Search className="text-orange-500 w-5 h-5" />
//               </div>
//               <div>
//                 <h4 className="text-xl font-semibold text-gray-100 mb-2">
//                   Profile Visibility & Collaboration
//                 </h4>
//                 <p className="text-gray-400 leading-relaxed text-sm">
//                   Your expertise will be highlighted to potential mentees,
//                   startups, and professionals for collaboration.
//                 </p>
//               </div>
//             </div>

//             {/* Guideline Checkbox */}
//             <label className="flex items-start gap-4 cursor-pointer select-none pt-4 border-t border-[#2d3023]">
//               <div className="relative flex items-center mt-1">
//                 <input
//                   type="checkbox"
//                   checked={guidelinesAccepted}
//                   onChange={() => setGuidelinesAccepted(!guidelinesAccepted)}
//                   className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-gray-500 bg-transparent checked:bg-white checked:border-white transition-all"
//                 />
//                 <Check
//                   className="absolute h-4 w-4 text-black opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5"
//                   strokeWidth={4}
//                 />
//               </div>
//               <div className="text-gray-200 text-xs md:text-sm">
//                 I understand and accept the guidelines. I agree to pay the
//                 ₹1,000 registration fee /
//                 <span className="block text-gray-400 mt-1">
//                   मैं दिशानिर्देशों को समझता हूँ और ₹1,000 पंजीकरण शुल्क का
//                   भुगतान करने के लिए सहमत हूँ
//                 </span>
//               </div>
//             </label>
//           </div>

//           {/* Code of Conduct Box (New Addition) */}
//           <div className="bg-[#111111] border border-[#262620] rounded-2xl p-8 mb-10">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-200 flex items-center justify-center">
//                 <Check className="text-orange-500 w-5 h-5" strokeWidth={3} />
//               </div>
//               <h4 className="text-white font-medium text-lg">
//                 Code of Conduct / आचरण संहिता
//               </h4>
//             </div>
//             <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
//               As a mentor, you agree to maintain professional ethics, provide
//               quality guidance, respect student confidentiality, and uphold the
//               values of the Def-Space program.
//             </p>

//             <label className="flex items-start gap-4 cursor-pointer select-none">
//               <div className="relative flex items-center mt-1">
//                 <input
//                   type="checkbox"
//                   checked={conductAccepted}
//                   onChange={() => setConductAccepted(!conductAccepted)}
//                   className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-zinc-600 bg-transparent checked:bg-white checked:border-white transition-all"
//                 />
//                 <Check
//                   className="absolute h-4 w-4 text-black opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5"
//                   strokeWidth={4}
//                 />
//               </div>
//               <div className="text-white text-[13px] font-semibold leading-relaxed">
//                 I declare that the information provided is accurate and I agree
//                 to the mentoring guidelines and code of conduct /
//                 <span className="block font-normal text-zinc-400 mt-1">
//                   मैं घोषणा करता हूँ कि प्रदान की गई जानकारी सटीक है और मैं सलाह
//                   देने के दिशानिर्देशों और आचरण संहिता से सहमत हूँ
//                 </span>
//               </div>
//             </label>
//           </div>

//           {/* Submit Button Section */}
//           <div className="flex flex-col items-center">
//             <div className="w-full h-px bg-zinc-800/50 mb-12"></div>
//             <button
//               type="submit"
//               disabled={!isFormReady}
//               className={`
//                 flex items-center gap-2 px-10 py-4 rounded-full font-bold transition-all active:scale-95
//                 ${
//                   isFormReady
//                     ? "bg-orange-500 hover:bg-orange-600 text-black text-black shadow-lg shadow-[#ccf15a]/10"
//                     : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
//                 }
//               `}
//             >
//               Submit Application
//               <ArrowRight className="w-5 h-5" />
//             </button>
//           </div>
//         </SectionCard>
//       </main>
//     </div>
//   );
// }
