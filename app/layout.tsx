import type { Metadata } from "next";
import { Geist_Mono, IBM_Plex_Sans_Arabic, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://www.saaco-sa.com"),

  title: "SARAYA Advanced Arab Co | Contracting & Construction",

  description:
    "SARAYA Advanced Arab Co provides professional contracting, construction, infrastructure, MEP, maintenance, renovation, and turnkey solutions.",

  openGraph: {
    title: "SARAYA Advanced Arab Co | Contracting & Construction",
    description:
      "Professional contracting, construction, infrastructure, MEP, maintenance, renovation, and turnkey solutions.",
    url: "https://www.saaco-sa.com",
    siteName: "SARAYA Advanced Arab Co",
    locale: "en_US",
    type: "website",
    images: [
  {
    url: "/og-saraya.png",
    width: 1200,
    height: 630,
    alt: "SARAYA Advanced Arab Co",
  },
],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${geistMono.variable} ${ibmPlexArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
