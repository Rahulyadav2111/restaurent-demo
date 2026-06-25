"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { ReservationModal } from "@/components/ReservationModal";

const links = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Listen for custom event to open modal
    const handleOpenModal = () => setReservationOpen(true);
    window.addEventListener("open-reservation", handleOpenModal);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("open-reservation", handleOpenModal);
    };
  }, []);

  return (
    <>
      <ReservationModal open={reservationOpen} onOpenChange={setReservationOpen} />
      
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-lg py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 z-50">
            <span className={`font-heading text-2xl md:text-3xl font-bold tracking-tight transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}>
              House<span className="text-primary">Of</span>Hunger
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm uppercase tracking-wider font-medium transition-colors hover:text-primary ${
                  pathname === link.href 
                    ? "text-primary" 
                    : scrolled ? "text-foreground/80 hover:text-foreground" : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => setReservationOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm uppercase tracking-wider font-semibold transition-all hover:shadow-[0_0_20px_rgba(255,45,117,0.4)]"
            >
              Reserve Table
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden z-50 transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center pt-20"
          >
            <div className="flex flex-col items-center space-y-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-heading tracking-widest ${
                    pathname === link.href ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setReservationOpen(true);
                }}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-lg uppercase tracking-wider font-semibold mt-8"
              >
                Reserve Table
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
