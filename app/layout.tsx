import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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
    alternates: {
    canonical: "https://kenstera.com",
  },
  openGraph: {
    title: "Kenstera",
    description:
      "Kenstera accelerates your businesses with automated marketing, lead generation, customer support, and more.",
    url: "https://kenstera.com",
    siteName: "Kenstera",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1456,
        height: 816,
        alt: "Kenstera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenstera",
    description:
      "Kenstera accelerates your businesses with automated marketing, lead generation, customer support, and more.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
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
