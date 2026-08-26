import type { Metadata } from "next";
import { Montserrat, Pacifico } from "next/font/google";

import { SITE } from "@/lib/site";

import "./globals.css";

const sans = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans-loaded",
});

const script = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script-loaded",
});

const title = `${SITE.name} · Pasta Fresca`;
const description =
  "Pasta fresca en Manizales. Encuéntranos en la feria: carta, pedido por WhatsApp y aviso cuando volvamos.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.publicUrl),
  title,
  description,
  icons: { icon: "/logo.png" },
  openGraph: {
    title,
    description,
    locale: "es_CO",
    type: "website",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${sans.variable} ${script.variable}`}>
      <body className="bg-navy font-sans text-paper antialiased">{children}</body>
    </html>
  );
}
