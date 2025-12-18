import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import "../styles/hero.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Haven Bridge — L’excellence au service de votre patrimoine au Maroc",
  description:
    "Cabinet d’accompagnement immobilier au Maroc : conseil, sécurisation juridique & administrative, et services post-achat.",
  metadataBase: new URL("https://m-investment.ma"),
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/assets/icons/bridgerton.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/icons/bridgerton.png", sizes: "48x48", type: "image/png" },
      { url: "/assets/icons/bridgerton.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [{ url: "/assets/icons/bridgerton.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/assets/icons/bridgerton.png",
  },
  openGraph: {
    title: "Haven Bridge",
    description:
      "Votre partenaire de confiance pour investir et vous installer au Maroc.",
    url: "https://m-investment.ma",
    siteName: "Haven Bridge",
    type: "website",
    images: [
      { url: "/assets/og-image.jpg", width: 1200, height: 630, alt: "Haven Bridge" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Haven Bridge",
    description:
      "Votre partenaire de confiance pour investir et vous installer au Maroc.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Viewport handled by export const viewport */}
      </head>
      <body className={`${playfair.variable} antialiased`} style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
        {children}
      </body>
    </html>
  );
}
