"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingElements() {
  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/9100000000XX"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:scale-110 transition-all duration-300"
      >
        <MessageCircle size={28} />
      </a>
    </>
  );
}
