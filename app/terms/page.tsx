import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Kenstera",
  description:
    "Terms and conditions governing your use of Kenstera's website and services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-gray-400">Last updated: February 11, 2026</p>

        <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-neutral-700">
          {/* Introduction */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Introduction</h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website and services provided by Kenstera LLC (&quot;Kenstera,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using our website at kenstera.com, you agree to be bound by these Terms. If you do not agree, please do not use our website or services.
            </p>
          </section>

          {/* Use of Services */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Use of Services</h2>
            <p className="mb-3">
              You may use our website and services only for lawful purposes and in accordance with these Terms. You agree to provide accurate information when submitting forms or scheduling consultations, and to maintain the confidentiality of any account credentials.
            </p>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Acceptable Use</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Use the website in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to any part of the website, its servers, or any connected systems</li>
              <li>Introduce viruses, malware, or any other harmful code</li>
              <li>Scrape, crawl, or use automated means to access the website without our written permission</li>
              <li>Interfere with or disrupt the integrity or performance of the website</li>
              <li>Impersonate any person or entity, or misrepresent your affiliation with any person or entity</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Intellectual Property</h2>
            <p>
              All content on this website — including text, graphics, logos, images, and software — is the property of Kenstera LLC or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent.
            </p>
          </section>

          {/* User Content */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">User Content</h2>
            <p>
              If you submit any content to us (such as information through contact forms or consultation requests), you grant Kenstera a non-exclusive, royalty-free license to use that content for the purpose of providing our services. You represent that you have the right to submit such content and that it does not infringe on any third party&apos;s rights.
            </p>
          </section>

          {/* Disclaimer of Warranties */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Disclaimer of Warranties</h2>
            <p>
              Our website and services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the website will be uninterrupted, error-free, or free of harmful components.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Kenstera LLC and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the website or services, regardless of the cause of action or the theory of liability, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Kenstera LLC and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys&apos; fees) arising out of your use of the website, your violation of these Terms, or your violation of any rights of a third party.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms shall be brought exclusively in the courts located in the State of New York, and you consent to the personal jurisdiction of such courts.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Modifications</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to this page with an updated &quot;Last updated&quot; date. Your continued use of the website after changes are posted constitutes your acceptance of the revised Terms.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that the remaining provisions remain in full force and effect.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">Contact</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:info@kenstera.com" className="text-neutral-900 underline underline-offset-2 hover:text-black">info@kenstera.com</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
