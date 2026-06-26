"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const categories = ["All", "Ambience", "Exterior"];

const galleryImages = [
  { src: "inner_main.webp", category: "Ambience", span: "md:col-span-2 md:row-span-2" },
  { src: "outdoor.jpg", category: "Exterior", span: "md:col-span-2 row-span-1" },
  { src: "inner1.webp", category: "Ambience", span: "col-span-1 row-span-2" },
  { src: "bg_main.webp", category: "Ambience", span: "md:col-span-2 row-span-1" },
  { src: "dinning.webp", category: "Ambience", span: "col-span-1 row-span-1" },
  { src: "inner2.webp", category: "Ambience", span: "col-span-1 row-span-1" },
  { src: "location.webp", category: "Exterior", span: "md:col-span-2 row-span-1" },
  { src: "inner3.webp", category: "Ambience", span: "col-span-1 row-span-1" },
  { src: "inner4.webp", category: "Ambience", span: "col-span-1 row-span-1" },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredImages = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="flex flex-col w-full -mt-24">
      {/* HEADER SECTION */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/assets/inner1.webp"
            alt="Gallery Header"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/45 z-10" />
        </div>
        
        <div className="container relative z-20 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl md:text-7xl font-light text-white mb-4">Gallery</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              A visual journey through our luxurious ambience and culinary masterpieces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-20 bg-background min-h-screen">
        <div className="container mx-auto px-4 md:px-8">
          
          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {categories.map((category, i) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-sm text-sm uppercase tracking-wider font-medium transition-all ${
                  activeCategory === category
                    ? "bg-foreground text-background"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border/30"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Masonry-like Grid */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-2 auto-rows-[200px]">
            <AnimatePresence>
              {filteredImages.map((img, i) => (
                <motion.div
                  key={`${img.src}-${i}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={`relative overflow-hidden rounded-sm group cursor-pointer ${img.span}`}
                  onClick={() => setLightboxImage(img.src)}
                >
                  <Image
                    src={`/assets/${img.src}`}
                    alt={img.category}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="text-white w-10 h-10 transform scale-50 group-hover:scale-100 transition-transform duration-300" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded text-xs text-foreground uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {img.category}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-foreground/50 hover:text-foreground transition-colors z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImage(null);
              }}
            >
              <X size={36} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full h-full max-w-6xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={`/assets/${lightboxImage}`}
                alt="Enlarged view"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
