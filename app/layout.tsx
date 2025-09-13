import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import "../styles/hero.css";

const cormorant = Playfair_Display({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  style: ["normal","italic"],
});

export const metadata: Metadata = {
  title: "M-Investment — L’excellence au service de votre patrimoine au Maroc",
  description:
    "Cabinet d’accompagnement immobilier au Maroc : conseil, sécurisation juridique & administrative, et services post-achat.",
  metadataBase: new URL("https://example.com"),
  alternates: { canonical: "https://example.com" },
  icons: {
    icon: [
      { url: "/assets/icons/logotouse.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/icons/logotouse.png", sizes: "48x48", type: "image/png" },
      { url: "/assets/icons/logotouse.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [{ url: "/assets/icons/logotouse.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/assets/icons/logotouse.png",
  },
  openGraph: {
    title: "M-Investment",
    description:
      "Votre partenaire de confiance pour investir et vous installer au Maroc.",
    url: "https://example.com",
    siteName: "M-Investment",
    type: "website",
    images: [
      { url: "/assets/og-image.jpg", width: 1200, height: 630, alt: "M-Investment" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "M-Investment",
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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`${cormorant.variable} antialiased`} style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
        {children}
      </body>
    </html>
  );
}
