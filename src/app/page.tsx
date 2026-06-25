"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, ChefHat, GlassWater, Users, Clock, Award, Star } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Hero Animations
    const tl = gsap.timeline();
    
    tl.fromTo(".hero-badge", 
      { opacity: 0, scale: 0.8 }, 
      { opacity: 1, scale: 1, duration: 1, ease: "power4.out", delay: 0.2 }
    )
    .fromTo(".hero-title-word",
      { opacity: 0, y: 100, rotateX: -45 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.1, ease: "expo.out" },
      "-=0.6"
    )
    .fromTo(".hero-desc",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(".hero-btns",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(".scroll-indicator",
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      "-=0.4"
    );

    // Parallax hero background
    gsap.to(".hero-bg", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // 2. Scroll Fade Up Animations
    gsap.utils.toArray<HTMLElement>(".fade-up-section").forEach(section => {
      gsap.fromTo(section, 
        { opacity: 0, y: 80 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // 3. Staggered Cards (Dishes)
    gsap.fromTo(".dish-card",
      { opacity: 0, y: 100, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.8, 
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ".dishes-grid",
          start: "top 80%",
        }
      }
    );

    // 4. Staggered Features
    gsap.fromTo(".feature-card",
      { opacity: 0, scale: 0.8, rotationY: 45 },
      { 
        opacity: 1, 
        scale: 1, 
        rotationY: 0,
        duration: 0.8, 
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%",
        }
      }
    );

    // 5. Image Reveal Effect
    gsap.fromTo(".reveal-img-container",
      { clipPath: "inset(100% 0 0 0)" },
      { 
        clipPath: "inset(0% 0 0 0)", 
        duration: 1.5, 
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".reveal-img-container",
          start: "top 80%",
        }
      }
    );
    gsap.fromTo(".reveal-img",
      { scale: 1.3 },
      { 
        scale: 1, 
        duration: 1.5, 
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".reveal-img-container",
          start: "top 80%",
        }
      }
    );

  }, { scope: containerRef });

  return (
    <div className="flex flex-col w-full -mt-24" ref={containerRef}>
      {/* 1. HERO SECTION */}
      <section className="hero-section relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="hero-bg absolute inset-0 w-full h-[130%] -top-[15%]">
            <Image
              src="/assets/bg_main.webp"
              alt="House of Hunger Ambience"
              fill
              priority
              className="object-cover object-center"
              quality={90}
            />
          </div>
          <div className="absolute inset-0 bg-black/50 z-10" />
        </div>
        
        <div className="container relative z-20 px-4 flex flex-col items-center text-center mt-20" style={{ perspective: "1000px" }}>
          <div className="hero-badge mb-6">
            <span className="text-primary font-semibold tracking-[0.3em] uppercase text-sm md:text-base bg-background/90 px-4 py-2 rounded-full">
              Welcome to
            </span>
          </div>
          
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl overflow-hidden flex gap-4 flex-wrap justify-center">
            <span className="hero-title-word inline-block">House</span>
            <span className="hero-title-word inline-block text-primary italic">of</span>
            <span className="hero-title-word inline-block">Hunger</span>
          </h1>
          
          <p className="hero-desc text-lg md:text-2xl text-white/90 max-w-2xl font-light mb-10">
            Experience Exceptional Dining in Kichha. Where unforgettable flavors, premium hospitality, and beautiful ambience come together.
          </p>
          
          <div className="hero-btns flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.dispatchEvent(new Event('open-reservation'))}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest font-semibold transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,45,117,0.5)]"
            >
              Reserve Table
            </button>
            <Link
              href="/menu"
              className="bg-transparent border border-white/30 hover:border-white hover:bg-white/10 text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest font-semibold transition-all backdrop-blur-sm"
            >
              Explore Menu
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent animate-pulse" />
        </div>
      </section>

      {/* 2. SIGNATURE EXPERIENCE */}
      <section className="py-24 bg-background relative z-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up-section space-y-8">
              <div>
                <h2 className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Signature Experience</h2>
                <h3 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">A Taste of Luxury</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Every dish at House of Hunger is crafted with passion. We source the freshest ingredients to bring you authentic flavors, prepared by expert chefs who understand the art of fine dining. Join us for a memorable experience filled with exceptional hospitality.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border/50">
                <div>
                  <h4 className="text-4xl font-bold text-foreground mb-2"><AnimatedCounter value={5000} />+</h4>
                  <p className="text-muted-foreground text-sm uppercase tracking-wider">Happy Guests</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-foreground mb-2"><AnimatedCounter value={50} />+</h4>
                  <p className="text-muted-foreground text-sm uppercase tracking-wider">Signature Dishes</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-foreground mb-2">4.5+</h4>
                  <p className="text-muted-foreground text-sm uppercase tracking-wider">Customer Rating</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-foreground mb-2"><AnimatedCounter value={100} />+</h4>
                  <p className="text-muted-foreground text-sm uppercase tracking-wider">Events Hosted</p>
                </div>
              </div>
            </div>

            <div className="reveal-img-container relative h-[600px] w-full rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                  src="/assets/inner_main.webp"
                  alt="Luxury Dining Experience"
                  fill
                  className="reveal-img object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED DISHES */}
      <section className="py-24 bg-muted/50 border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="fade-up-section text-center mb-16">
            <h2 className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Culinary Masterpieces</h2>
            <h3 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Featured Dishes</h3>
          </div>

          <div className="dishes-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: "dish1.webp", name: "Paneer Tikka Masala", cat: "Paneer Specials" },
              { img: "dish2.webp", name: "Hawaiian chicken salad", cat: "Hawaiian salad" },
              { img: "dish3.webp", name: "steamed yellow dumplings", cat: "yellow dumplings (momos)" },
              { img: "dish4.webp", name: "Tandoori Soya Chaap", cat: "Veg Tandoori Platter" },
              { img: "dish5.webp", name: " Veg Spring Rolls", cat: "Spring Rolls" },
              { img: "drink1.webp", name: "Mango Mocktail", cat: "Beverages" }
            ].map((dish, i) => (
              <div key={i} className="dish-card">
                <Card className="bg-background border-border overflow-hidden group cursor-pointer hover:border-primary/50 hover:shadow-xl transition-all duration-500 h-full">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={`/assets/${dish.img}`}
                      alt={dish.name}
                      fill
                      className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white uppercase tracking-wider border border-white/10 z-10">
                      {dish.cat}
                    </div>
                  </div>
                  <CardContent className="p-6 relative">
                    <div className="absolute -top-6 right-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/30 transform transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110 z-10">
                      <ChefHat size={20} />
                    </div>
                    <h4 className="font-heading text-2xl font-bold text-foreground mb-2">{dish.name}</h4>
                    <p className="text-muted-foreground text-sm">Experience the authentic taste of our chef's special preparation, made with premium ingredients.</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* OUR AMBIANCE */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-row-reverse lg:flex-row-reverse">
            <div className="fade-up-section space-y-8 lg:pl-10 order-2 lg:order-1">
              <div>
                <h2 className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Beautiful Spaces</h2>
                <h3 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">Designed for Comfort</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Whether you're looking for a cozy corner for a romantic dinner or a spacious area for family gatherings, House of Hunger offers the perfect setting. Our spaces are meticulously crafted to enhance your dining experience.
                </p>
                <ul className="space-y-4">
                  {[
                    "Elegant indoor dining with air conditioning",
                    "Beautiful outdoor seating arrangements",
                    "Perfect for parties and corporate events"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                        <Star size={12} fill="currentColor" />
                      </div>
                      <span className="text-foreground font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="reveal-img-container relative h-[500px] w-full rounded-2xl overflow-hidden group shadow-2xl order-1 lg:order-2">
              <Image
                src="/assets/inner2.webp"
                alt="Restaurant Ambiance"
                fill
                className="reveal-img object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY CAROUSEL */}
      <section className="py-24 bg-muted/30 overflow-hidden border-y border-border">
        <div className="container mx-auto px-4 md:px-8 mb-12 flex justify-between items-end fade-up-section">
          <div>
            <h2 className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Visual Journey</h2>
            <h3 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Gallery Highlights</h3>
          </div>
          <Link href="/gallery" className="hidden md:inline-block text-primary font-medium hover:underline tracking-wide uppercase text-sm">
            View All
          </Link>
        </div>

        <div className="w-full flex gap-6 px-4 md:px-8 overflow-x-auto pb-8 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
          {[
            "inner3.webp",
            "inner4.webp",
            "dinning.webp",
            "outdoor.jpg",
            "inner1.webp",
          ].map((img, i) => (
            <div key={i} className="relative min-w-[85vw] md:min-w-[400px] h-[350px] md:h-[450px] rounded-2xl overflow-hidden snap-center group flex-shrink-0 shadow-lg">
              <Image
                src={`/assets/${img}`}
                alt="Gallery highlight"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            </div>
          ))}
        </div>
        <div className="container mx-auto px-4 mt-4 md:hidden text-center fade-up-section">
          <Link href="/gallery" className="inline-block text-primary font-medium hover:underline tracking-wide uppercase text-sm">
            View Full Gallery
          </Link>
        </div>
      </section>
      {/* 4. WHY CHOOSE US */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="fade-up-section text-center mb-16">
            <h2 className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Our Promise</h2>
            <h3 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Why Choose Us</h3>
          </div>

          <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1500px" }}>
            {[
              { icon: Leaf, title: "Fresh Ingredients", desc: "We source only the finest, farm-fresh ingredients for every meal." },
              { icon: ChefHat, title: "Expert Chefs", desc: "Our culinary masters bring years of fine dining experience." },
              { icon: Award, title: "Premium Ambience", desc: "A luxurious setting perfect for family dining and celebrations." },
              { icon: Users, title: "Family Friendly", desc: "Warm hospitality that makes everyone feel right at home." },
              { icon: Clock, title: "Fast Service", desc: "Prompt and courteous service without compromising quality." },
              { icon: Star, title: "Quality Food", desc: "Uncompromising standards in taste, hygiene, and presentation." },
            ].map((feature, i) => (
              <div
                key={i}
                className="feature-card bg-card p-8 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
              >
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-500">
                  <feature.icon className="text-primary group-hover:text-white transition-colors duration-500" size={32} />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RESERVATION CTA */}
      <section className="relative py-32 bg-card overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/assets/bg1.webp"
            alt="Reserve Table"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="fade-up-section">
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">Reserve Your Table Today</h2>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Join us for an unforgettable dining experience. Book your table in advance to ensure the perfect spot for your gathering.
            </p>
            <button
              onClick={() => window.dispatchEvent(new Event('open-reservation'))}
              className="inline-block bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-full text-lg uppercase tracking-widest font-semibold transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,45,117,0.6)]"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
