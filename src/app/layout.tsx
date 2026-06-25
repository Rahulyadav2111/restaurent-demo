import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "House of Hunger | Premium Dining in Kichha",
  description: "Experience exceptional dining at House of Hunger in Kichha, Uttarakhand. Unforgettable flavors, premium hospitality, and beautiful ambience.",
  keywords: "Restaurant in Kichha, Best Food in Kichha, North Indian, Chinese, Tandoori, Fine Dining, House of Hunger",
  openGraph: {
    title: "House of Hunger",
    description: "Experience exceptional dining at House of Hunger in Kichha.",
    url: "https://houseofhunger.com",
    siteName: "House of Hunger",
    images: [
      {
        url: "/assets/bg_main.webp",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "House of Hunger",
    description: "Experience exceptional dining at House of Hunger in Kichha.",
    images: ["/assets/bg_main.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, playfair.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow pt-24 pb-12">{children}</main>
          <Footer />
          <FloatingElements />
        </SmoothScroll>
      </body>
    </html>
  );
}
