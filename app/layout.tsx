import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { OG_IMAGE, OG_IMAGE_URL } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Fonts used by the dark case-study routes (/work/*). Scoped via the
// `.landing-root` selector in globals.css, so the rest of the site keeps Inter.
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kenstera.com"),
  title: {
    default: "Kenstera",
    template: "%s | Kenstera",
  },
  description: "Kenstera accelerates your businesses with automated marketing, lead generation, customer support, and more.",
  // Relative canonical: resolves against metadataBase + the current route's
  // pathname, so every page canonicalizes to itself unless it overrides this.
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Kenstera",
    description:
      "Kenstera accelerates your businesses with automated marketing, lead generation, customer support, and more.",
    url: "https://kenstera.com",
    siteName: "Kenstera",
    locale: "en_US",
    type: "website",
    images: [...OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenstera",
    description:
      "Kenstera accelerates your businesses with automated marketing, lead generation, customer support, and more.",
    images: [OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://stream.mux.com" />
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <Analytics />
        <SpeedInsights/>
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
