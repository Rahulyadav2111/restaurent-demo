"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingElements() {
  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919548910704"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 border border-foreground/20 bg-white rounded-sm flex items-center justify-center text-foreground shadow-sm hover:bg-foreground hover:text-white hover:scale-[1.02] transition-all duration-300"
      >
        <MessageCircle size={28} />
      </a>
    </>
  );
}
