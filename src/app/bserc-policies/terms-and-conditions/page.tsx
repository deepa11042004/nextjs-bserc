// app/terms/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Bharat Space Education Research Centre',
  description: 'Terms and Conditions for using BSERC website, services, internships, and educational content. Governed by Indian law.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-black text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            TERMS AND CONDITIONS
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-indigo-100">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Effective Date: 17 February 2026
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Version: 1.0
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-7xl mx-auto px-4 py-12 prose prose-slate prose-lg ">
        
        {/* Introduction */}
        <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-lg mb-10">
          <p className="text-slate-700 leading-relaxed m-0">
            Welcome to the Bharat Space Education Research Centre website (<strong>www.bserc.org</strong>) (the <strong>&quot;Site&quot;</strong>), operated by Bharat Space Education Research Centre (<strong>&quot;BSERC&quot;</strong>, <strong>&quot;we&quot;</strong>, <strong>&quot;us&quot;</strong>, or <strong>&quot;our&quot;</strong>). These Terms and Conditions (<strong>&quot;Terms&quot;</strong>), including any guidelines or rules for specific services (e.g., internships, workshops on drone technology, rocketry, space entrepreneurship), govern your use of the Site, Content, and Services (as defined below).
          </p>
        </div>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            1. Acceptance of Terms
          </h2>
          <div className="space-y-4 text-slate-700">
            <p>
              By accessing or using the Site, you:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Confirm you have read, understood, and agree to be bound by these Terms;</li>
              <li>Represent you are at least <strong>18 years old</strong> or have parental/guardian consent if under 18;</li>
              <li>Warrant you have authority to bind yourself or your organization.</li>
            </ul>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
              <p className="font-medium text-amber-800 m-0">
                ⚠️ This forms a legally binding agreement. If you disagree, do not use the Site.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            2. Access and Registration
          </h2>
          <div className="space-y-4 text-slate-700">
            <p>
              Access to restricted areas requires registration as a <strong>&quot;Registered User&quot;</strong> with a unique login and password, non-transferable and for personal use only.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-medium text-red-800 m-0">
                  ✗ Misuse (e.g., sharing credentials) may result in immediate account suspension at BSERC&apos;s discretion, without liability.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="font-medium text-blue-800 m-0">
                  ✓ Notify <a href="mailto:info@bserc.org" className="underline font-semibold">info@bserc.org</a> immediately of any unauthorized use.
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-500 italic">
              BSERC is not liable for losses from your failure to secure credentials.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            3. Content and Services
          </h2>
          <div className="space-y-4 text-slate-700">
            <p>
              The Site offers educational <strong>Content</strong> (e.g., documents, workshops on space science, Def-Space internships, AI/robotics courses) and <strong>Services</strong> (e.g., registrations, certifications), subject to change.
            </p>
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
              <p className="font-medium text-emerald-800 m-0">
                ✓ Content is for informational and personal/non-commercial educational use only.
              </p>
            </div>
            <p>
              Report inappropriate Content to <a href="mailto:info@bserc.org" className="text-indigo-700 hover:text-indigo-900 underline">info@bserc.org</a>. All disclosures comply with our <a href="/privacy-policy" className="text-indigo-700 hover:text-indigo-900 underline">Privacy Policy</a>.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            4. Permitted Use and User Obligations
          </h2>
          <div className="space-y-4 text-slate-700">
            <p>
              Use is voluntary and at your risk. Download Content only for permitted personal or institutional educational purposes in space/defence tech.
            </p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>You are responsible for your account and Content you upload/post.</li>
              <li>Inactivate accounts via <a href="mailto:info@bserc.org" className="text-indigo-700 underline">info@bserc.org</a>.</li>
              <li>Fees may apply per separate agreements (e.g., internship training).</li>
            </ul>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            5. Prohibited Conduct
          </h2>
          <div className="text-slate-700">
            <p className="font-semibold mb-3">You agree not to:</p>
            <ul className="space-y-2">
              {[
                'Upload/transmit infringing, illegal, harmful, defamatory, obscene, or privacy-violating Content.',
                'Impersonate others or misrepresent affiliations.',
                'Violate laws (e.g., IT Act, 2000).',
                'Disrupt the Site or share private data without consent.',
                'Use for spam, commercial exploitation, or unauthorized sharing of BSERC materials (e.g., internship projects).',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-1">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
              <p className="font-medium text-red-800 m-0">
                Violations may lead to account termination without refund or liability.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            6. Disclaimer of Warranties
          </h2>
          <div className="bg-slate-100 border border-slate-300 rounded-lg p-5 text-slate-700">
            <p className="font-mono text-sm font-semibold text-slate-800 mb-2">
              &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;
            </p>
            <p className="m-0">
              The Site, Content, and Services are provided without warranties, express or implied, including merchantability, fitness for purpose, or non-infringement. BSERC disclaims liability for interruptions, errors, or user actions.
            </p>
            <p className="mt-3 font-medium">
              Your sole remedy is to cease use.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            7. Limitation of Liability
          </h2>
          <div className="space-y-4 text-slate-700">
            <p>
              BSERC shall not be liable for any direct, indirect, incidental, or consequential damages arising from Site use, even if advised of possibility.
            </p>
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="font-medium text-indigo-800 m-0">
                Liability is limited to Fees paid (if any).
              </p>
            </div>
          </div>
        </section>

        {/* Section 8 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            8. Intellectual Property
          </h2>
          <div className="space-y-4 text-slate-700">
            <p>
              Content is owned by BSERC or licensors, protected by <strong>Indian Copyright Act, 1957</strong>, and <strong>IT Act, 2000</strong>.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="font-medium text-emerald-800 m-0">
                  ✓ Limited license to view/download single copies for personal educational use, retaining notices.
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-medium text-red-800 m-0">
                  ✗ No reproduction or commercial use without written permission.
                </p>
              </div>
            </div>
            <p>
              &quot;BSERC&quot; is our trademark.
            </p>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="font-semibold text-blue-900 mb-2">📬 Reporting Infringements</p>
              <p className="text-blue-800 m-0">
                Under IT (Intermediary Guidelines) Rules, 2021, notify <a href="mailto:info@bserc.org" className="underline font-medium">info@bserc.org</a> with details (e.g., infringing URL, your contact).
              </p>
            </div>
          </div>
        </section>

        {/* Section 9 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            9. Links to Third Parties
          </h2>
          <div className="text-slate-700">
            <p>
              Links are for convenience; BSERC endorses none and disclaims liability for third-party sites.
            </p>
          </div>
        </section>

        {/* Section 10 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            10. Indemnity
          </h2>
          <div className="text-slate-700">
            <p>
              You indemnify BSERC, its officers, and affiliates against claims from your Site use or violations.
            </p>
          </div>
        </section>

        {/* Section 11 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            11. Governing Law and Jurisdiction
          </h2>
          <div className="text-slate-700">
            <p>
              Governed by <strong>Indian laws</strong>.
            </p>
          </div>
        </section>

        {/* Section 12 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            12. Changes and Termination
          </h2>
          <div className="space-y-4 text-slate-700">
            <p>
              BSERC may amend Terms (posted on Site) or terminate access without notice/liability.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="font-medium text-amber-800 m-0">
                ⚠️ Continued use of the Site after changes constitutes acceptance of amended Terms.
              </p>
            </div>
          </div>
        </section>

        {/* Section 13 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            13. Miscellaneous
          </h2>
          <div className="space-y-4 text-slate-700">
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>These Terms are the entire agreement.</li>
              <li>No agency/partnership created.</li>
              <li>Invalid provisions do not affect others.</li>
              <li><strong>Claims must be filed within 1 year</strong> of the incident.</li>
            </ul>
          </div>
        </section>

        {/* Contact Card */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl p-6 md:p-8 mt-12">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Contact Information
          </h3>
          <div className="space-y-4 text-slate-200">
            <p className="m-0">
              <strong>Bharat Space Education Research Centre</strong><br />
              New Delhi, India
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="mailto:info@bserc.org" 
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@bserc.org
              </a>
              <a 
                href="tel:+917303048646" 
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 7303048646
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
          <p className="m-0">
            These Terms are governed by the laws of India.<br />
            Last updated: 17 February 2026
          </p>
        </div>
      </article>
    </main>
  );
}