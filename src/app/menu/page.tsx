"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChefHat } from "lucide-react";
import { FoodModal, Food } from "@/components/FoodModal";

const categories = [
  "All",
  "Paneer Specials",
  "Hawaiian salad",
  "yellow dumplings (momos)",
  "Veg Tandoori Platter",
  "Spring Rolls",
  "Beverages",
];

const menuItems = [
  { img: "dish1.webp", name: "Paneer Tikka Masala", cat: "Paneer Specials", desc: "Cubes of paneer cooked in a rich and creamy tomato gravy." },
  { img: "dish2.webp", name: "Hawaiian chicken salad", cat: "Hawaiian salad", desc: "A fresh and tropical chicken salad with sweet Hawaiian flavors." },
  { img: "dish3.webp", name: "steamed yellow dumplings", cat: "yellow dumplings (momos)", desc: "Delicate steamed yellow dumplings filled with savory goodness." },
  { img: "dish4.webp", name: "Tandoori Soya Chaap", cat: "Veg Tandoori Platter", desc: "Smoky and spiced tandoori soya chaap grilled to perfection." },
  { img: "dish5.webp", name: "Veg Spring Rolls", cat: "Spring Rolls", desc: "Crispy and golden spring rolls packed with fresh vegetables." },
  { img: "drink1.webp", name: "Mango Mocktail", cat: "Beverages", desc: "A refreshing mocktail bursting with tropical mango flavor." },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);

  const filteredItems = activeCategory === "All"
    ? menuItems
    : menuItems.filter(item => item.cat === activeCategory);

  return (
    <div className="flex flex-col w-full -mt-24">
      {/* HEADER SECTION */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/assets/inner2.webp"
            alt="Menu Header"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/70 z-10" />
        </div>

        <div className="container relative z-20 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-4">Our Menu</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Discover a culinary journey through authentic flavors and modern presentations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section className="py-10 md:py-20 bg-background min-h-screen">
        <div className="container mx-auto px-4 md:px-8">

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category, i) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider font-medium transition-all ${activeCategory === category
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-card text-muted-foreground hover:bg-card/80 hover:text-foreground border border-border"
                  }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <AnimatePresence>
              {filteredItems.map((item, i) => (
                <motion.div
                  key={`${item.name}-${i}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    className="bg-card border-border overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors h-full flex flex-col"
                    onClick={() => { setSelectedFood(item as Food); setIsFoodModalOpen(true); }}
                  >
                    <div className="relative h-32 sm:h-48 md:h-64 w-full overflow-hidden shrink-0">
                      <Image
                        src={`/assets/${item.img}`}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-black/60 backdrop-blur-md px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs text-white uppercase tracking-wider border border-white/10 z-10">
                        {item.cat}
                      </div>
                    </div>
                    <CardContent className="p-3 md:p-6 relative flex-grow flex flex-col">
                      <div className="absolute -top-4 right-4 md:-top-6 md:right-6 w-8 h-8 md:w-12 md:h-12 bg-background border border-border rounded-full flex items-center justify-center text-primary transform transition-transform group-hover:rotate-12 group-hover:bg-primary group-hover:text-white group-hover:border-primary z-10">
                        <ChefHat className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <h4 className="font-heading text-base sm:text-lg md:text-2xl font-bold text-foreground mb-1 md:mb-3 pr-6 md:pr-8">{item.name}</h4>
                      <p className="text-muted-foreground text-xs md:text-sm leading-snug md:leading-relaxed line-clamp-3 md:line-clamp-none">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <h3 className="text-2xl font-heading text-foreground mb-2">No items found</h3>
              <p className="text-muted-foreground">We are working on adding new delicious items to this category.</p>
            </motion.div>
          )}

        </div>
      </section>

      <FoodModal food={selectedFood} open={isFoodModalOpen} onOpenChange={setIsFoodModalOpen} />
    </div>
  );
}
