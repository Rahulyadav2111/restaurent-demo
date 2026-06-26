"use client";

import { ExternalLink } from "lucide-react";

export default function MapComponent() {
  return (
    <div className="relative w-full h-full rounded-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-border overflow-hidden z-0">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3492.51817454089!2d79.5077766!3d28.9146327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a07b66a88fdf2b%3A0x54c0b8f3e3ba0afa!2sHouse%20of%20Hunger!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen={false} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      
      <a
        href="https://www.google.com/maps/place/House+of+Hunger/@28.9146327,79.5077766,17z/data=!3m1!4b1!4m6!3m5!1s0x39a07b66a88fdf2b:0x54c0b8f3e3ba0afa!8m2!3d28.9146327!4d79.5077766!16s%2Fg%2F11lck81r3p"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 bg-primary text-foreground p-3 rounded-sm shadow-lg hover:bg-primary/90 hover:scale-[1.02] transition-all flex items-center justify-center z-10"
        title="Open in Google Maps"
      >
        <ExternalLink size={20} />
      </a>
    </div>
  );
}
