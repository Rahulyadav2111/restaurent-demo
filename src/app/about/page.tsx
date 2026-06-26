"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Target, Lightbulb } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col w-full -mt-24">
      {/* HEADER SECTION */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/assets/inner4.webp"
            alt="About Header"
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
            <h1 className="font-heading text-5xl md:text-7xl font-light text-white mb-4">Our Story</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              A journey of passion, flavors, and exceptional hospitality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] w-full rounded-sm overflow-hidden"
            >
              <Image
                src="/assets/dinning.webp"
                alt="House of Hunger Dining"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-primary font-semibold tracking-widest uppercase text-sm">Welcome To</h2>
              <h3 className="font-heading text-4xl md:text-5xl font-light text-foreground">House of Hunger</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                House of Hunger was created with a simple yet powerful purpose: to bring people together through delicious food and memorable dining experiences. Located in the heart of Kichha, we have built a sanctuary for food lovers who appreciate authentic taste and premium hospitality.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                From our carefully curated menu featuring North Indian, Chinese, and Tandoori specialties to our luxurious ambience, every detail has been designed to provide you with an unforgettable experience.
              </p>
              <div className="flex items-center gap-2 pt-4">
                <div className="w-16 h-16 bg-card rounded-sm flex items-center justify-center border border-border">
                  <Heart className="text-primary" />
                </div>
                <div>
                  <h4 className="text-foreground font-bold text-lg">Crafted with Love</h4>
                  <p className="text-sm text-muted-foreground">Every dish tells a story.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 bg-[#1C1311] text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-[#1C1311] p-10 rounded-sm border border-white/15 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Target size={120} className="text-primary" />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-primary/20 text-primary rounded-sm flex items-center justify-center mb-6">
                  <Target size={28} />
                </div>
                <h3 className="text-3xl font-heading font-light text-white mb-4">Our Mission</h3>
                <p className="text-white/65 text-lg leading-relaxed">
                  To deliver exceptional taste and service by using the freshest ingredients, maintaining the highest standards of hygiene, and treating every guest like family.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="bg-[#1C1311] p-10 rounded-sm border border-white/15 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Lightbulb size={120} className="text-primary" />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-primary/20 text-primary rounded-sm flex items-center justify-center mb-6">
                  <Lightbulb size={28} />
                </div>
                <h3 className="text-3xl font-heading font-light text-white mb-4">Our Vision</h3>
                <p className="text-white/65 text-lg leading-relaxed">
                  To become the preferred dining destination in Kichha and beyond, recognized for our culinary excellence, luxurious ambience, and unwavering commitment to quality.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AMBIENCE SHOWCASE */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <h2 className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Step Inside</h2>
            <h3 className="font-heading text-4xl md:text-5xl font-light text-foreground">Our Premium Ambience</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {["inner1.webp", "inner3.webp", "inner2.webp"].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.2 }}
                className="relative h-[400px] rounded-sm overflow-hidden group"
              >
                <Image
                  src={`/assets/${img}`}
                  alt="Restaurant Interior"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
