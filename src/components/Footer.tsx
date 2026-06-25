"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "@/components/icons";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-muted animate-pulse rounded-2xl flex items-center justify-center border border-border">Loading Map...</div>
});

export default function Footer() {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About Us', href: '/about' },
    { name: 'Reservations', href: '#', onClick: (e: React.MouseEvent) => { e.preventDefault(); window.dispatchEvent(new Event('open-reservation')); } },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-card pt-0 pb-10 mt-auto overflow-hidden">
      <div className="w-full h-[350px] relative px-4 md:px-8 mt-8 mb-16">
        <MapComponent />
      </div>
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-heading text-3xl font-bold tracking-tight text-foreground">
                House<span className="text-primary">Of</span>Hunger
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Experience the finest dining in Kichha. Unforgettable flavors, premium hospitality, and a beautiful ambience await you.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors">
                <FacebookIcon size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors">
                <InstagramIcon size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors">
                <TwitterIcon size={18} />
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-heading font-semibold text-foreground uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-primary mt-1 flex-shrink-0" size={18} />
                <span className="text-muted-foreground text-sm leading-relaxed">
                  Rudrapur Road,<br />
                  Opposite HDFC Bank,<br />
                  Kichha, Uttarakhand
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-primary flex-shrink-0" size={18} />
                <span className="text-muted-foreground text-sm">+91 00000 000XX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-primary flex-shrink-0" size={18} />
                <span className="text-muted-foreground text-sm">hello@houseofhunger.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-heading font-semibold text-foreground uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.onClick ? (
                    <a href={link.href} onClick={link.onClick} className="text-muted-foreground hover:text-primary transition-colors text-sm cursor-pointer">
                      {link.name}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-6">
            <h4 className="text-lg font-heading font-semibold text-foreground uppercase tracking-wider">Opening Hours</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Monday - Friday</span>
                <span className="text-foreground font-medium">11:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Saturday - Sunday</span>
                <span className="text-foreground font-medium">11:00 AM - 11:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} House of Hunger. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
