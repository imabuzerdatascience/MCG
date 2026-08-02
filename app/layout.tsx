import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { NewsTicker } from "@/components/layout/NewsTicker";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MGC Associates Pvt. Ltd. | Corporate & Business Consulting Nepal",
  description: "MGC Associates provides legal, accounting, financial, compliance, HR, ICT, research, import-export and corporate consulting services in Kathmandu, Nepal.",
  openGraph: {
    title: "MGC Associates Pvt. Ltd. | Corporate & Business Consulting Nepal",
    description: "MGC Associates provides legal, accounting, financial, compliance, HR, ICT, research, import-export and corporate consulting services in Kathmandu, Nepal.",
    type: "website",
    locale: "en_US",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-off-white text-charcoal">
        <Navbar />
        <TopBar />
        <NewsTicker />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
