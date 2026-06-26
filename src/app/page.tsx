"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Clock, Leaf, MapPin, Star } from "lucide-react";
import { FoodModal, Food } from "@/components/FoodModal";
import AnimatedCounter from "@/components/AnimatedCounter";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const dishes = [
  { img: "dish1.webp", name: "Paneer Tikka Masala", cat: "Paneer Specials" },
  { img: "dish4.webp", name: "Tandoori Soya Chaap", cat: "Veg Tandoori Platter" },
  { img: "dish3.webp", name: "Steamed Yellow Dumplings", cat: "Yellow Dumplings" },
  { img: "drink1.webp", name: "Mango Mocktail", cat: "Beverages" },
];

const gallery = ["inner1.webp", "inner3.webp", "dinning.webp", "outdoor.jpg"];

const heroImages = ["bg_main.webp", "inner1.webp", "inner3.webp", "dinning.webp", "outdoor.jpg"];

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hero Image Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    const ease = "power3.out";

    gsap.timeline()
      .fromTo(".hero-reveal", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease, delay: 0.4 });

    gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
      gsap.fromTo(el, { y: 46, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease,
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });
    });

    gsap.utils.toArray<HTMLElement>(".stagger").forEach((group) => {
      gsap.fromTo(group.children, { y: 46, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.14,
        ease,
        scrollTrigger: {
          trigger: group,
          start: "top 78%",
        },
      });
    });

    gsap.utils.toArray<HTMLElement>(".photo-reveal").forEach((frame) => {
      const img = frame.querySelector("img");
      if (!img) return;

      gsap.fromTo(img, { scale: 1.08, opacity: 0.6 }, {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease,
        scrollTrigger: {
          trigger: frame,
          start: "top 82%",
        },
      });
    });

    // Overlap animation: Slow down the sections as we scroll down to create parallax stacking
    gsap.utils.toArray<HTMLElement>(".overlap-section").forEach((section) => {
      gsap.to(section, {
        yPercent: 30, // Section moves down 30% of its height, appearing to scroll slower
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Pin the static section properly
    ScrollTrigger.create({
      trigger: ".static-image-container",
      start: "top top",
      end: "+=50%",
      pin: true,
      pinSpacing: false,
    });
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="-mt-24 bg-[#FFFFFF]">
      {/* Home Main Section - 70vh */}
      <section className="hero relative h-[70vh] min-h-[500px] overflow-hidden bg-[#FFFFFF] overlap-section z-0">
        <div className="hero-photo absolute inset-0 h-[120%]">
          {heroImages.map((src, index) => (
            <Image
              key={src}
              src={`/assets/${src}`}
              alt={`House of Hunger ambience ${index + 1}`}
              fill
              priority={index === 0}
              className={`object-cover object-center transition-all duration-[3000ms] ease-in-out ${
                index === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
              quality={100}
            />
          ))}
          <div className="absolute inset-0 bg-black/50 transition-all duration-1000" />
        </div>

        <div className="editorial-container relative z-10 flex h-full flex-col items-center justify-center pt-24 text-center">
          <p className="hero-reveal mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-white/80">
            Kichha, Uttarakhand
          </p>
          {/* Text size small, centered, and highlighted */}
          <h1 className="hero-reveal max-w-3xl font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
            <span className="bg-[#B88B4A] text-white px-4 py-1 leading-relaxed rounded-sm inline-block">House of Hunger</span>
          </h1>
          <div className="hero-reveal mt-6 flex flex-col items-center gap-5">
            <p className="max-w-xl text-center text-sm md:text-base leading-7 text-white/90 font-medium">
              A polished dining room for generous plates, slow evenings, and warm hospitality.
            </p>
            <button
              onClick={() => window.dispatchEvent(new Event("open-reservation"))}
              className="editorial-button editorial-button-dark text-white border-white hover:bg-white hover:text-[#1C1C1C]"
            >
              <span>Book Table</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[#FFFFFF] py-8 border-y border-[#E5E5E5] overlap-section">
        <div className="editorial-container flex flex-col items-center justify-center gap-3 text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#6B6B6B] sm:flex-row">
          <MapPin size={16} className="text-[#8D7553]" />
          <span>Rudrapur Road, Opposite HDFC Bank, Kichha, Uttarakhand</span>
        </div>
      </section>

      <section className="relative z-20 bg-[#FFFFFF] py-20 md:py-[130px] overlap-section border-t border-[#E5E5E5]">
        <div className="editorial-container grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="photo-reveal relative h-[68vh] min-h-[430px] overflow-hidden lg:col-span-7">
            <Image src="/assets/inner_main.webp" alt="Restaurant interior" fill className="object-cover" />
          </div>
          <div className="fade-up lg:col-span-5">
            <p className="editorial-eyebrow mb-6">The Room</p>
            <h2 className="font-heading text-4xl font-bold leading-[1.1] text-foreground md:text-6xl">
              Designed for quiet appetite.
            </h2>
            <p className="mt-8 text-base leading-8 text-muted-foreground">
              Clean lines, warm light, and comfortable tables. The space feels premium without trying too hard.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-foreground/15 pt-8">
              <div>
                <p className="font-heading text-5xl font-light text-[#8D7553]"><AnimatedCounter value={5000} />+</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Guests</p>
              </div>
              <div>
                <p className="font-heading text-5xl font-light text-[#8D7553]"><AnimatedCounter value={50} />+</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Dishes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-30 bg-[#F9F9F9] py-20 text-[#1C1C1C] md:py-[130px] overlap-section border-t border-[#E5E5E5]">
        <div className="editorial-container">
          <div className="fade-up mb-14 max-w-3xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-[#B88B4A]">Menu Edit</p>
            <h2 className="font-heading text-4xl font-bold leading-[1.1] md:text-6xl">
              Familiar dishes, dressed with restraint.
            </h2>
          </div>

          <div className="stagger grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {dishes.map((dish, index) => (
              <button
                key={dish.name}
                onClick={() => { setSelectedFood(dish); setIsFoodModalOpen(true); }}
                className={`group text-left ${index % 2 ? "lg:pt-16" : ""}`}
              >
                <div className="photo-reveal relative h-[380px] overflow-hidden">
                  <Image src={`/assets/${dish.img}`} alt={dish.name} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#B88B4A]">{dish.cat}</p>
                <h3 className="mt-3 font-heading text-2xl font-bold">{dish.name}</h3>
              </button>
            ))}
          </div>

          <Link href="/menu" className="editorial-button editorial-button-dark mt-14 text-[#1C1C1C]">
            <span>Explore Menu</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Static image section that doesn't scroll */}
      <section className="static-image-container relative z-10 h-screen bg-[#1C1C1C]">
        <div className="h-full w-full flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image src="/assets/dinning.webp" alt="Static dining room image" fill className="object-cover" quality={100} />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </div>
      </section>

      {/* This section hides the static image by scrolling over it with a solid background and higher z-index */}
      <section className="relative z-40 bg-[#FFFFFF] py-20 md:py-[130px] overlap-section border-t border-[#E5E5E5]">
        <div className="editorial-container grid gap-14 lg:grid-cols-12">
          <div className="fade-up lg:col-span-4">
            <p className="editorial-eyebrow mb-6">Gallery</p>
            <h2 className="font-heading text-4xl font-bold leading-[1.1] md:text-6xl">
              A room worth looking at.
            </h2>
            <p className="mt-8 text-base leading-8 text-[#6B6B6B]">
              The fixed image stays behind you while this section covers it, keeping the scroll cinematic without clutter.
            </p>
          </div>
          <div className="stagger grid gap-4 md:grid-cols-2 lg:col-span-8">
            {gallery.map((img, index) => (
              <div key={img} className={`photo-reveal relative overflow-hidden ${index === 0 ? "h-[520px]" : "h-[360px]"} ${index === 1 ? "md:mt-16" : ""}`}>
                <Image src={`/assets/${img}`} alt="House of Hunger ambience" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Section with #1C1311 background */}
      <section className="relative z-50 bg-[#1C1311] py-20 text-white md:py-[130px] overlap-section border-t border-[#E5E5E5]">
        <div className="editorial-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: "Fresh Ingredients", desc: "Balanced dishes made with dependable produce." },
              { icon: Star, title: "Premium Ambience", desc: "Warm interiors, sharp photography, and clean spacing." },
              { icon: Clock, title: "Smooth Service", desc: "A calm pace for meals, celebrations, and family tables." },
            ].map((item) => (
              <div key={item.title} className="bg-[#2a1d1a] border border-white/10 p-10 hover:bg-[#332320] transition-colors duration-300">
                <item.icon className="mb-8 text-[#B88B4A]" size={36} />
                <h3 className="font-heading text-2xl font-bold mb-4">{item.title}</h3>
                <p className="leading-7 text-white/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-50 bg-[#FFFFFF] py-20 md:py-[130px] overlap-section border-t border-[#E5E5E5]">
        <div className="editorial-container text-center">
          <div className="fade-up mx-auto max-w-3xl">
            <p className="editorial-eyebrow mb-6">Reservations</p>
            <h2 className="font-heading text-4xl font-bold leading-[1.1] md:text-6xl text-[#1C1C1C]">
              Book the table. Keep the evening simple.
            </h2>
            <button
              onClick={() => window.dispatchEvent(new Event("open-reservation"))}
              className="editorial-button mx-auto mt-10 text-[#1C1C1C] border-[#1C1C1C]"
            >
              <span>Reserve Now</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <FoodModal food={selectedFood} open={isFoodModalOpen} onOpenChange={setIsFoodModalOpen} />
    </div>
  );
}
