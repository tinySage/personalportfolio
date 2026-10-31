import type { Metadata } from "next";
import "./globals.css";

// On Vercel this resolves to the production domain, so share images get absolute URLs.
const site = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: "Muktanan Mohapatra",
  description:
    "Muktanan (Momo) Mohapatra: ML researcher working on federated learning for cardiac ECG, energy-aware encrypted model updates, and 5G handover prediction.",
  openGraph: {
    title: "Muktanan Mohapatra",
    description: "Federated learning for medical signals. Also essays and robots.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&family=DM+Mono:wght@400;500&family=Mrs+Saint+Delafield&family=Pirata+One&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
