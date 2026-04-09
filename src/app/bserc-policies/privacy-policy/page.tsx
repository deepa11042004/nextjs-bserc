// app/privacy-policy/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Bharat Space Education Research Centre',
  description: 'Privacy Policy for BSERC - governing collection, use, and protection of personal data in compliance with DPDP Act, 2023',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-black text-white py-12 px-4">
        <div className="max-w-8xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            PRIVACY POLICY
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-blue-100">
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
              Version: 2.0
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-7xl mx-auto  px-4 py-12 prose prose-slate prose-lg ">
        
        {/* Introduction */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-10">
          <p className="text-slate-700 leading-relaxed m-0">
            Bharat Space Education Research Centre (<strong>&quot;BSERC&quot;</strong>, <strong>&quot;we&quot;</strong>, <strong>&quot;us&quot;</strong>, <strong>&quot;our&quot;</strong>) respects your privacy and is committed to compliance with the <strong>Digital Personal Data Protection Act, 2023 (&quot;DPDP Act&quot;)</strong> and other applicable laws. This Policy governs the collection, use, disclosure, and protection of personal data obtained via our website (the <strong>&quot;Site&quot;</strong>) and related services.
          </p>
        </div>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            1. Scope and Definitions
          </h2>
          <div className="space-y-4 text-slate-700">
            <p>
              <strong>1.1</strong> &quot;Personal Data&quot; means any information relating to an identified or identifiable individual, as defined under the DPDP Act.
            </p>
            <p>
              <strong>1.2</strong> This Policy applies to all users (<strong>&quot;you&quot;</strong>, <strong>&quot;your&quot;</strong>) interacting with the Site for queries, registrations for Defence & Space Events, memberships, or feedback.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            2. Collection of Personal Data
          </h2>
          <div className="space-y-4 text-slate-700">
            <div>
              <p className="font-semibold text-slate-800">2.1 Voluntary Provision:</p>
              <p className="mt-1">
                We collect Personal Data only as necessary to respond to your requests, such as name, Institution, email, postal address, or telephone number submitted via forms or email. <span className="bg-amber-100 px-1 rounded font-medium">Sensitive Personal Data</span> (e.g., financial details, Aadhaar numbers) is <strong>not collected</strong>.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-800">2.2 Automatic Collection:</p>
              <p className="mt-1">
                Technical data is logged for Site management, including IP address, domain, browser type, operating system, access date/time, and pages accessed. No individual profiles are created for commercial purposes.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            3. Purpose and Use of Personal Data
          </h2>
          <div className="space-y-4 text-slate-700">
            <div>
              <p className="font-semibold text-slate-800">3.1 Personal Data is processed solely for:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                <li>Responding to queries and providing requested information/services;</li>
                <li>Aggregated analysis to enhance Site functionality (e.g., visitor metrics, technology usage).</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="font-medium text-green-800 m-0">
                ✓ No Personal Data is used for commercial marketing, advertising, or profiling.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            4. Disclosure of Personal Data
          </h2>
          <div className="space-y-4 text-slate-700">
            <div>
              <p className="font-semibold text-slate-800">4.1 Disclosure occurs only:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                <li>To government agencies where your query pertains to their mandate;</li>
                <li>As mandated by law, regulation, or judicial order.</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="font-medium text-red-800 m-0">
                ✗ No disclosure to third parties for commercial gain.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            5. Data Security, Retention, and Transmission
          </h2>
          <div className="space-y-4 text-slate-700">
            <p>
              <strong>5.1</strong> Personal Data is secured using industry-standard encryption, access controls, and safeguards.
            </p>
            <p>
              <strong>5.2 Retention:</strong> Personal Data is retained for the minimum period necessary (not exceeding <strong>12 months post-response</strong>) or as legally required, then securely deleted/destroyed.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="font-medium text-amber-800 m-0">
                ⚠️ Email transmission is insecure; do not include sensitive information. Utilize secure portals or registered post.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            6. Assets Acquired via Grants
          </h2>
          <div className="space-y-4 text-slate-700">
            <p>
              <strong>6.1</strong> BSERC does not routinely fund infrastructure. Assets procured using BSERC grants (with prior written approval) vest exclusively in BSERC.
            </p>
            <p>
              <strong>6.2</strong> Such assets shall not be alienated, encumbered, or repurposed without BSERC&apos;s prior written consent.
            </p>
            <p>
              <strong>6.3</strong> Upon program termination, BSERC reserves the right to retain, gift to the grantee institution, or transfer assets at its sole discretion.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            7. User Rights under DPDP Act
          </h2>
          <div className="space-y-4 text-slate-700">
            <p>
              <strong>7.1</strong> You may request access, correction, erasure, or portability of your Personal Data.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="font-medium text-slate-800 m-0">
                <strong>7.2</strong> To exercise rights or withdraw consent, contact the Data Protection Officer at{' '}
                <a 
                  href="mailto:privacy@bserc.org" 
                  className="text-blue-700 hover:text-blue-900 underline font-medium"
                >
                  privacy@bserc.org
                </a>{' '}
                within 30 days of response.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            8. Cookies and Third-Party Links
          </h2>
          <div className="space-y-4 text-slate-700">
            <p>
              <strong>8.1</strong> Only essential cookies are used; no analytics or advertising trackers.
            </p>
            <p>
              <strong>8.2</strong> Linked third-party sites are not governed by this Policy.
            </p>
          </div>
        </section>

        {/* Section 9 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            9. Governing Law and Updates
          </h2>
          <div className="space-y-4 text-slate-700">
            <p>
              <strong>9.1</strong> This Policy is governed by Indian law.
            </p>
            <p>
              <strong>9.2</strong> Amendments may be made; continued Site use constitutes acceptance.
            </p>
          </div>
        </section>

        {/* Section 10 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            10. Use of Data
          </h2>
          <div className="text-slate-700">
            <p>
              The data we collect is used exclusively to provide services, respond to queries, and enable the organization to identify and contact the appropriate individual who has applied for or requested such services.
            </p>
          </div>
        </section>

        {/* Contact Card */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl p-6 md:p-8 mt-12">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Information
          </h3>
          <div className="space-y-3 text-slate-200">
            <p className="m-0">
              <strong>Data Protection Officer</strong><br />
              Bharat Space Education Research Centre<br />
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
                href="mailto:privacy@bserc.org" 
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                privacy@bserc.org (DPO)
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
          <p className="m-0">
            This Privacy Policy is compliant with the Digital Personal Data Protection Act, 2023 (India).<br />
            Last updated: 17 February 2026
          </p>
        </div>
      </article>
    </main>
  );
}