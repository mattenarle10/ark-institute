import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

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
        url: "/logo/ark-white.png",
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
    images: ["/logo/ark-white.png"],
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
      <body className={`${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
