import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  const _siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://arkinstitutebc.com"
  return {
    name: "Ark Institute",
    short_name: "Ark",
    description:
      "Ark Institute offers TESDA-accredited programs with a modern, professional learning experience.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111827",
    icons: [
      { src: "/favicon.ico", sizes: "16x16 32x32", type: "image/x-icon" },
      {
        src: "/logo/ark-transpa.png",
        sizes: "600x600",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/logo/ark-white.png",
        sizes: "600x600",
        type: "image/png",
        purpose: "any",
      },
    ],
  }
}
