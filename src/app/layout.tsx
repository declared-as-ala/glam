import type { Metadata } from "next";
import { Toaster } from "sonner";

import { AppProviders } from "@/components/providers/app-providers";

import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://glam-parapharmacie.tn"),
  title: {
    default: "GLAM Parapharmacie",
    template: "%s | GLAM Parapharmacie",
  },
  description:
    "GLAM Parapharmacie, votre boutique en ligne premium en Tunisie pour les soins, dermocosmetiques et produits de beaute.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
