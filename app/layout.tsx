import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "../styles/hero.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800"],
});

export const metadata: Metadata = {
  title: "M-Investment — L’excellence au service de votre patrimoine au Maroc",
  description:
    "Cabinet d’accompagnement immobilier au Maroc : conseil, sécurisation juridique & administrative, et services post-achat.",
  metadataBase: new URL("https://example.com"),
  alternates: { canonical: "https://example.com" },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
