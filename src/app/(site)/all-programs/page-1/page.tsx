"use client";
import Image from "next/image";
import { useState } from "react";

// ─────────────────────────────────────────────
// Reusable Input Component
// ─────────────────────────────────────────────
function FormInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
}: any) {
  return (
    <div>
      <label className="block text-slate-200 font-medium mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// Submit Button
// ─────────────────────────────────────────────
function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full py-3 rounded-lg font-semibold text-white transition ${
        isSubmitting
          ? "bg-slate-700 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90"
      }`}
    >
      {isSubmitting ? "Submitting..." : "Submit Registration"}
    </button>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function DroneWorkshopPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    altEmail: "",
    institution: "",
    designation: "",
    workshopDate: "",
    content: [] as string[],
    agreeRecord: false,
    agreeTerms: false,
  });

  type InfoItem = {
    label: string;
    value: string;
  };

  const infoItems: InfoItem[] = [
    {
      label: "Eligibility",
      value:
        "Open to all Indian and international universities, colleges, schools, and professionals",
    },
    { label: "Mode", value: "Online" },
    { label: "Date", value: "4th April, 2026" },
    { label: "Time", value: "10 AM – 1 PM" },
    { label: "Duration", value: "3 hours" },
    { label: "Certificate", value: "Provided" },
    { label: "Fee", value: "₹290" },
    { label: "Contact", value: "7042880241" },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contentOptions = [
    "Drone Design Basics",
    "Aerodynamics",
    "AI in Drones",
    "Flight Simulation",
    "Air Taxi Systems",
  ];

  // Available workshop dates
  const workshopDates = [
    "4 April 2026 (10 AM – 1 PM)",
     
  ];

  // Handle Input Change
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "content") {
      setFormData((prev) => ({
        ...prev,
        content: checked
          ? [...prev.content, value]
          : prev.content.filter((c) => c !== value),
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit Handler
  const handleSubmit = (e: any) => {
    e.preventDefault();

    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Submitted Data:", formData);
      alert("Registration Successful!");
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-center py-16 shadow-lg">
        <h1 className="text-4xl font-bold tracking-wide">
          ADVANCED DRONE (AIR TAXI) WORKSHOP
        </h1>
        <p className="mt-3 text-lg text-blue-100">
          Explore AI-driven drone innovations & aerodynamics
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <h2 className="mb-4 text-center text-3xl md:text-4xl font-bold font-serif text-blue-400">
            Workshop Overview
          </h2>

          <div className="mb-4 space-y-2 text-slate-300 leading-relaxed">
            <p>
              Under the visionary leadership of Hon. Prime Minister Shri
              Narendra Modi, the Government of India has launched transformative
              reforms to advance the space sector. These initiatives focus on
              promoting space education, research, and development across the
              nation.
            </p>

            <p>
              A key highlight is the celebration of National Space Day on August
              23, underscoring India's commitment to fostering innovation and
              scientific excellence in space exploration.
            </p>

            <p>
              Following the successful National Space Day event, the Bharat
              Space Education and Research Centre (भारत अंतरिक्ष शिक्षा अनुसंधान
              केंद्र) is spearheading efforts to foster talent, drive
              cutting-edge research, and promote innovation in the space domain.
            </p>
          </div>

          <ul className="space-y-2 text-gray-300">
            {infoItems.map((item) => (
              <li key={item.label}>
                <span className="font-semibold text-white">{item.label}:</span>{" "}
                {item.value}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 text-center">
            Certificate Preview
          </h2>

          <div className="relative w-full md:w-[70%] mx-auto aspect-[4/3] rounded-xl overflow-hidden border border-slate-700">
            {/* Image */}
            <Image
              src="/img/page-1.png"
              alt="Certificate"
              fill
              className="object-cover"
            />
          </div>

          {/* ✅ Added Description */}
          <div className="mt-4 text-center text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            <p className="font-extrabold text-white mb-2">
              Upon completion of the workshop, participants will be certified.
            </p>
            <p className="mt-1">
              The certificates will highlight the skills and knowledge gained
              through the workshop!
            </p>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-5"
        >
          <h2 className="text-2xl font-semibold text-blue-400">
            Participant Information
          </h2>

          {/* Row 1 */}
          <div className="grid md:grid-cols-2 gap-4">
            <FormInput
              id="name"
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
              required
              value={formData.name}
              onChange={handleChange}
            />

            <FormInput
              id="email"
              name="email"
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-2 gap-4">
            <FormInput
              id="contact"
              name="contact"
              label="Contact Number"
              type="tel"
              placeholder="Enter phone number"
              required
              value={formData.contact}
              onChange={handleChange}
            />

            <FormInput
              id="altEmail"
              name="altEmail"
              label="Alternative Email"
              type="email"
              placeholder="Optional"
              value={formData.altEmail}
              onChange={handleChange}
            />
          </div>

          {/* Row 3 */}
          <div className="grid md:grid-cols-2 gap-4">
            <FormInput
              id="institution"
              name="institution"
              label="Institution"
              placeholder="College / Organization"
              required
              value={formData.institution}
              onChange={handleChange}
            />

            <FormInput
              id="designation"
              name="designation"
              label="Designation"
              placeholder="Student / Faculty / Professional"
              required
              value={formData.designation}
              onChange={handleChange}
            />
          </div>

          {/* Workshop Date Dropdown */}
          <div>
            <label className="block text-slate-200 font-medium mb-2">
              Available Date of the Workshop{" "}
              <span className="text-red-400">*</span>
            </label>

            <select
              name="workshopDate"
              value={formData.workshopDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Workshop Date</option>
              {workshopDates.map((date) => (
                <option key={date}>{date}</option>
              ))}
            </select>
          </div>

         
          <div className="space-y-2">
            <label className="flex gap-2 text-slate-300">
              <input
                type="checkbox"
                name="agreeRecord"
                onChange={handleChange}
                required
              />
              I agree to recording & certification.
            </label>

            <label className="flex gap-2 text-slate-300">
              <input
                type="checkbox"
                name="agreeTerms"
                onChange={handleChange}
                required
              />
              I agree to terms & conditions.
            </label>
          </div>

          {/* Submit */}
          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </div>
    </div>
  );
}
