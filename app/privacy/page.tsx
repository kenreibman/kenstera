import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Kenstera",
  description:
    "Learn how Kenstera collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-gray-400">Last updated: February 11, 2026</p>

        <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-neutral-700">
          {/* Introduction */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Introduction</h2>
            <p>
              Kenstera LLC (&quot;Kenstera,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website kenstera.com. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Information We Collect</h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Personal information you provide directly</strong>: such as your name, email address, company name, and phone number when you fill out a contact form or schedule a consultation.
              </li>
              <li>
                <strong>Usage data</strong>: including your IP address, browser type, operating system, referring URLs, pages visited, and time spent on those pages.
              </li>
              <li>
                <strong>Cookies and tracking technologies</strong>: we use cookies, pixels, and similar technologies to collect information about your browsing activity. See our <a href="/cookies" className="text-neutral-900 underline underline-offset-2 hover:text-black">Cookie Policy</a> for details.
              </li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Respond to your inquiries and provide requested services</li>
              <li>Improve and optimize our website and user experience</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Send communications related to our services (only when you have opted in or where permitted by law)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Third-Party Services</h2>
            <p className="mb-3">We use the following third-party services that may collect data:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Vercel Analytics</strong>: for website performance monitoring and anonymous usage analytics. Vercel&apos;s privacy policy governs their handling of this data.
              </li>
              <li>
                <strong>Meta Pixel (Facebook)</strong>: for measuring the effectiveness of advertising campaigns and understanding user actions on our site. Data collected is subject to Meta&apos;s Data Policy.
              </li>
              <li>
                <strong>Cal.com</strong>: for scheduling consultations and meetings. When you book through Cal.com, your scheduling information is processed according to Cal.com&apos;s privacy policy.
              </li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep your information confidential. We may also disclose information when required by law or to protect our rights.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required or permitted by law. Contact form submissions and consultation records are retained for the duration of our business relationship and a reasonable period thereafter.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Your Rights</h2>
            <p className="mb-3">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict certain processing of your data</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time (where processing is based on consent)</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:info@kenstera.com" className="text-neutral-900 underline underline-offset-2 hover:text-black">info@kenstera.com</a>.
            </p>
          </section>

          {/* Security */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Security</h2>
            <p>
              We implement reasonable administrative, technical, and physical safeguards to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Children&apos;s Privacy</h2>
            <p>
              Our website and services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us and we will promptly delete it.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:info@kenstera.com" className="text-neutral-900 underline underline-offset-2 hover:text-black">info@kenstera.com</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
