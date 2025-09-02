import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.arkinstitutebc.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ark Institute — TESDA-accredited training",
    template: "%s | Ark Institute",
  },
  description:
    "Ark Institute offers TESDA-accredited programs with a modern, professional learning experience.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Ark Institute",
    title: "Ark Institute — TESDA-accredited training",
    description:
      "Ark Institute offers TESDA-accredited programs with a modern, professional learning experience.",
    images: [
      {
        url: "/images/twitter-img.png",
        width: 1200,
        height: 630,
        alt: "Ark Institute",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ark Institute — TESDA-accredited training",
    description:
      "Ark Institute offers TESDA-accredited programs with a modern, professional learning experience.",
    images: ["/images/twitter-img.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
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
        <Script id="org-jsonld" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Ark Institute",
            url: siteUrl,
            logo: new URL("/logo/ark-transpa.png", siteUrl).toString(),
            sameAs: [
              "https://www.facebook.com/people/ARK-Institute-Inc/61572338462118/?_rdc=1&_rdr",
              "https://www.instagram.com/arkinstitutebc/",
            ],
          })}
        </Script>
      </head>
      <body className={`${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
