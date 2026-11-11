import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk, DM_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { OG_IMAGE, OG_IMAGE_URL, SITE_DESCRIPTION } from "@/lib/seo";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
  variable: "--font-fraunces",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-dm-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06120c",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kenstera.com"),
  title: {
    default: "Kenstera — Make your business thrive",
    template: "%s | Kenstera",
  },
  description: SITE_DESCRIPTION,
  // Relative canonical: resolves against metadataBase + the current route's
  // pathname, so every page canonicalizes to itself unless it overrides this.
  alternates: { canonical: "./" },
  openGraph: {
    title: "Kenstera — Make your business thrive",
    description: SITE_DESCRIPTION,
    url: "https://kenstera.com",
    siteName: "Kenstera",
    locale: "en_US",
    type: "website",
    images: [...OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenstera — Make your business thrive",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${hanken.variable} ${dmMono.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <Nav />
        <div className="site">
          {children}
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1431516435037638');
            `,
          }}
        />
      </body>
    </html>
  );
}
