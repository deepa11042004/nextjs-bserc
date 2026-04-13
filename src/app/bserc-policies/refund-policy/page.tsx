// app/refund-policy/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Bharat Space Education Research Centre',
  description: 'Refund and cancellation policy for BSERC training programs in space technology, defence systems, and robotics. Effective February 2026.',
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-black text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            REFUND AND CANCELLATION POLICY
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-rose-100">
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
      <article className="max-w-7xl mx-auto px-4 py-12 prose prose-slate prose-lg  ">
        
        {/* Introduction */}
        <div className="bg-rose-50 border-l-4 border-rose-600 p-6 rounded-r-lg mb-10">
          <p className="text-slate-700 leading-relaxed m-0">
            Bharat Space Education Research Centre (<strong>&quot;BSERC&quot;</strong>, <strong>&quot;we&quot;</strong>, <strong>&quot;us&quot;</strong>, or <strong>&quot;our&quot;</strong>) provides specialised training programs in space technology, defence systems, robotics, and related disciplines (<strong>&quot;Programs&quot;</strong>) via its website and platforms.
          </p>
          <p className="text-slate-700 leading-relaxed mt-3 mb-0">
            This Policy governs all refunds, cancellations, and related matters. Enrollment constitutes acceptance of this Policy, the <a href="/bserc-policies/privacy-policy" className="text-rose-700 hover:text-rose-900 underline font-medium">Privacy Policy</a>, and <a href="/bserc-policies/terms-and-conditions" className="text-rose-700 hover:text-rose-900 underline font-medium">Terms of Use</a>.
          </p>
        </div>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            1. Introduction
          </h2>
          <div className="space-y-4 text-slate-700">
            <p>
              <strong>1.1</strong> BSERC provides specialised training programs in space technology, defence systems, robotics, and related disciplines (&quot;Programs&quot;) via its website and platforms.
            </p>
            <p>
              <strong>1.2</strong> This Policy governs all refunds, cancellations, and related matters. Enrollment constitutes acceptance of this Policy, the Privacy Policy, and Terms of Use.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="font-medium text-amber-800 m-0">
                ⚠️ <strong>1.3</strong> BSERC reserves the right to postpone or cancel any Program due to instructor unavailability, force majeure events (including but not limited to natural disasters, pandemics, political instability, or regulatory changes), or insufficient registrations, with notice provided via email or registered post.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            2. Fees and Refund Eligibility
          </h2>
          <div className="space-y-4 text-slate-700">
            <div className="bg-slate-100 border border-slate-300 rounded-lg p-4">
              <p className="font-semibold text-slate-800 m-0">
                2.1 All fees specified on the Program page (&quot;Fees&quot;) are <span className="text-rose-700 font-bold">non-refundable</span> except as expressly provided herein.
              </p>
            </div>
            
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
              <p className="font-medium text-emerald-800 m-0">
                ✓ <strong>2.2 Full Refund Condition:</strong> Full refund (less 10% administrative charge) applies solely if BSERC cancels or indefinitely postpones a Program post-enrollment.
              </p>
            </div>

            <div>
              <p className="font-semibold text-slate-800">2.3 No refunds for:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                <li>Self-paced Programs;</li>
                <li>Institutional tie-up Programs;</li>
                <li>No-shows or partial attendance;</li>
                <li>Requests received after <strong>3 (three) days</strong> from the first session&apos;s scheduled commencement.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            3. Admission Conditions
          </h2>
          <div className="space-y-4 text-slate-700">
            <p>
              <strong>3.1</strong> Admissions are provisional pending submission of full Fees and eligibility documents (e.g., academic certificates, identity proofs) within the stipulated period.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="font-medium text-red-800 m-0">
                ✗ <strong>3.2</strong> Non-compliance entitles BSERC to cancel admission without refund or liability.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            4. Prohibited Use and Termination
          </h2>
          <div className="text-slate-700">
            <p className="font-semibold mb-3">
              <strong>4.1</strong> Immediate termination of access, without refund, occurs upon detection of:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                'Sharing Program materials with unauthorised third parties;',
                'Use for content reproduction, resale, or commercial exploitation;',
                'Multiple unauthorised logins or IP misuse.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-1">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="font-medium text-red-800 m-0">
                <strong>4.2</strong> Affected accounts shall be permanently suspended.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            5. Refund Processing
          </h2>
          <div className="space-y-4 text-slate-700">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="font-medium text-blue-800 m-0">
                ✓ <strong>5.1</strong> Eligible refunds shall be processed to the original payment instrument within <strong>7-15 working days</strong> of validated request. No interest accrues on refunds.
              </p>
            </div>
            <p className="text-sm text-slate-500 italic">
              <strong>5.2</strong> BSERC bears no responsibility for transit delays in communications.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            6. Liability and Indemnity
          </h2>
          <div className="space-y-4 text-slate-700">
            <div className="bg-slate-100 border border-slate-300 rounded-lg p-4">
              <p className="m-0">
                <strong>6.1</strong> BSERC&apos;s liability is limited to refund of Fees as per Clause 2. We exclude liability for indirect, consequential, or incidental losses.
              </p>
            </div>
            <p>
              <strong>6.2</strong> Participants indemnify BSERC against claims arising from non-compliance with this Policy.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            7. General Provisions
          </h2>
          <div className="space-y-4 text-slate-700">
            <p>
              <strong>7.1</strong> Programs are non-transferable absent BSERC&apos;s prior written consent.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="font-medium text-amber-800 m-0">
                ⚠️ <strong>7.2</strong> This Policy supersedes prior versions and may be amended with notice. Continued enrollment constitutes acceptance of amendments.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <div className="bg-gradient-to-r from-rose-600 to-purple-700 text-white rounded-xl p-6 md:p-8 mt-12">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Refund Eligibility Quick Reference
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-slate-100">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="font-semibold text-emerald-300 mb-2">✓ Eligible for Refund</p>
              <ul className="text-sm space-y-1">
                <li>• BSERC cancels/postpones Program</li>
                <li>• Request within 3 days of start</li>
                <li>• Full attendance & compliance</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="font-semibold text-red-300 mb-2">✗ Not Eligible for Refund</p>
              <ul className="text-sm space-y-1">
                <li>• Self-paced or institutional Programs</li>
                <li>• No-shows or partial attendance</li>
                <li>• Policy violations or misuse</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-rose-200 mt-4 italic">
            All eligible refunds subject to 10% administrative charge. Processing time: 7-15 working days.
          </p>
        </div>

        {/* Contact Card */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl p-6 md:p-8 mt-12">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
            Contact for Refund Queries
          </h3>
          <div className="space-y-4 text-slate-200">
            <p className="m-0">
              <strong>Refund Officer</strong><br />
              Bharat Space Education Research Centre<br />
              Sub Dist: Dwarka, New Delhi, India
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="mailto:outreach@bserc.org" 
                className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                outreach@bserc.org
              </a>
              <a 
                href="/bserc-policies/terms-and-conditions" 
                className="inline-flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Terms & Conditions
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
          <p className="m-0">
            This policy is governed by the laws of India and forms part of your enrollment agreement with BSERC.<br />
            Last updated: 17 February 2026
          </p>
        </div>
      </article>
    </main>
  );
}