import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import SmoothScroll from "@/components/SmoothScroll";
import { IM_Fell_English } from "next/font/google";
import "./globals.css";

const imFellEnglish = IM_Fell_English({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-sans',
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
      className={`h-full antialiased ${imFellEnglish.variable} font-sans`}
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
