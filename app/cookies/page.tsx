import type { Metadata } from "next";
import { BlockSection } from "@/components/exact";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn how Kenstera uses cookies and similar tracking technologies on our website.",
};

export default function CookiePolicyPage() {
  return (
    <main className="bg-page">
      <BlockSection bare className="pb-10 pt-16 lg:pb-14 lg:pt-24">
        <h1 className="el-trim text-[36px] leading-[42px] tracking-[-0.72px] text-black lg:text-[48px] lg:leading-[52px] lg:tracking-[-0.96px]">
          Cookie Policy
        </h1>
        <p className="mt-5 text-[14px] leading-[21px] text-subtle">Last updated: February 11, 2026</p>
      </BlockSection>

      <BlockSection className="px-6 pb-20 pt-12 lg:px-8 lg:pb-[120px]">
        <div className="max-w-3xl space-y-10 text-[15px] leading-relaxed text-black/80">
          {/* What Are Cookies */}
          <section>
            <h2 className="mb-4 text-[22px] font-normal leading-[1.25] tracking-[-0.2px] text-black">What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners information about how their site is being used. Cookies may be set by the website you are visiting (&quot;first-party cookies&quot;) or by third-party services operating on that site (&quot;third-party cookies&quot;).
            </p>
          </section>

          {/* How We Use Cookies */}
          <section>
            <h2 className="mb-4 text-[22px] font-normal leading-[1.25] tracking-[-0.2px] text-black">How We Use Cookies</h2>
            <p className="mb-6">
              We use cookies and similar technologies for the purposes described below. The following table outlines the types of cookies we use, their providers, and their purpose.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 pr-4 text-left font-semibold text-neutral-900">Type</th>
                    <th className="py-3 pr-4 text-left font-semibold text-neutral-900">Provider</th>
                    <th className="py-3 text-left font-semibold text-neutral-900">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 pr-4 align-top font-medium text-neutral-900">Essential</td>
                    <td className="py-3 pr-4 align-top">Vercel</td>
                    <td className="py-3 align-top">
                      Required for the website to function properly. These cookies handle hosting, routing, and basic site functionality. They cannot be disabled.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 align-top font-medium text-neutral-900">Analytics</td>
                    <td className="py-3 pr-4 align-top">Vercel Analytics</td>
                    <td className="py-3 align-top">
                      Collects anonymous usage data to help us understand how visitors interact with our website, including page views, session duration, and navigation patterns. This data is used to improve site performance and user experience.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 align-top font-medium text-neutral-900">Marketing</td>
                    <td className="py-3 pr-4 align-top">Meta Pixel</td>
                    <td className="py-3 align-top">
                      Tracks conversions from Meta (Facebook and Instagram) advertisements, builds targeted audiences for future ads, and measures the effectiveness of advertising campaigns.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Managing Cookies */}
          <section>
            <h2 className="mb-4 text-[22px] font-normal leading-[1.25] tracking-[-0.2px] text-black">Managing Cookies</h2>
            <p className="mb-3">
              Most web browsers allow you to control cookies through their settings. You can typically find cookie settings in the &quot;Options,&quot; &quot;Settings,&quot; or &quot;Preferences&quot; menu of your browser. The following links may help you manage cookies in common browsers:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Google Chrome: Settings &gt; Privacy and security &gt; Cookies and other site data</li>
              <li>Mozilla Firefox: Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
              <li>Safari: Preferences &gt; Privacy</li>
              <li>Microsoft Edge: Settings &gt; Cookies and site permissions</li>
            </ul>
            <p className="mt-3">
              Please note that disabling certain cookies may affect the functionality of our website. Essential cookies cannot be disabled as they are necessary for the site to operate.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section>
            <h2 className="mb-4 text-[22px] font-normal leading-[1.25] tracking-[-0.2px] text-black">Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any updates will be posted on this page with an updated &quot;Last updated&quot; date.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="mb-4 text-[22px] font-normal leading-[1.25] tracking-[-0.2px] text-black">Contact</h2>
            <p>
              If you have questions about our use of cookies, please contact us at{" "}
              <a href="mailto:contact@kenstera.com" className="text-neutral-900 underline underline-offset-2 hover:text-black">contact@kenstera.com</a>.
            </p>
          </section>
        </div>
      </BlockSection>
    </main>
  );
}
