"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-muted animate-pulse rounded-sm flex items-center justify-center border border-border">Loading Interactive Map...</div>
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full -mt-24">
      {/* HEADER SECTION */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/assets/location.webp"
            alt="Contact Header"
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
            <h1 className="font-heading text-5xl md:text-7xl font-light text-white mb-4">Contact Us</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              We would love to hear from you. Get in touch for inquiries, feedback, or special events.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT INFO & FORM */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">

            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Get in Touch</h2>
                <h3 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-6">We are Here for You</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Whether you have a question about our menu, need to organize a private event, or want to share your experience, our team is ready to assist you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-2">
                  <div className="w-12 h-12 bg-card rounded-sm flex items-center justify-center border border-border flex-shrink-0">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold text-lg mb-1">Our Location</h4>
                    <p className="text-muted-foreground">Rudrapur Road, Opposite HDFC Bank,<br />Kichha, Uttarakhand</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-12 h-12 bg-card rounded-sm flex items-center justify-center border border-border flex-shrink-0">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold text-lg mb-1">Phone Number</h4>
                    <p className="text-muted-foreground">+91 00000 000XX</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-12 h-12 bg-card rounded-sm flex items-center justify-center border border-border flex-shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold text-lg mb-1">Email Address</h4>
                    <p className="text-muted-foreground">hello@houseofhunger.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-12 h-12 bg-card rounded-sm flex items-center justify-center border border-border flex-shrink-0">
                    <Clock className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold text-lg mb-1">Opening Hours</h4>
                    <p className="text-muted-foreground">Mon-Fri: 11:00 AM - 11:00 PM<br />Sat-Sun: 11:00 AM - 11:30 PM</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-foreground font-bold text-lg mb-4">Follow Us</h4>
                <div className="flex gap-2">
                  <a href="#" className="w-12 h-12 bg-card rounded-sm flex items-center justify-center text-foreground border border-border hover:bg-primary hover:border-primary transition-colors">
                    <FacebookIcon size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 bg-card rounded-sm flex items-center justify-center text-foreground border border-border hover:bg-primary hover:border-primary transition-colors">
                    <InstagramIcon size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 bg-card rounded-sm flex items-center justify-center text-foreground border border-border hover:bg-primary hover:border-primary transition-colors">
                    <TwitterIcon size={20} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-card p-8 md:p-10 rounded-sm border border-border shadow-xl">
                <h3 className="font-heading text-3xl font-light text-foreground mb-6">Send a Message</h3>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-primary/10 border border-primary text-primary p-6 rounded-sm text-center"
                  >
                    <Send className="mx-auto mb-4 w-12 h-12" />
                    <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                    <p>Thank you for reaching out. We will get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground">First Name</label>
                        <Input required placeholder="John" className="bg-background border-border" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground">Last Name</label>
                        <Input required placeholder="Doe" className="bg-background border-border" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Email Address</label>
                      <Input required type="email" placeholder="john@example.com" className="bg-background border-border" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Subject</label>
                      <Input required placeholder="How can we help you?" className="bg-background border-border" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Message</label>
                      <Textarea required placeholder="Write your message here..." className="bg-background border-border min-h-[150px] resize-none" />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-6 rounded-sm text-md uppercase tracking-widest font-semibold border border-foreground bg-transparent hover:bg-foreground text-foreground hover:text-background transition-colors"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="h-[500px] w-full relative px-4 md:px-8 pb-12">
        <MapComponent />
      </section>
    </div>
  );
}
