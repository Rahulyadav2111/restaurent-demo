"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const timeSlots = ["12:00 PM", "1:00 PM", "2:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email address is required"),
  date: z.date({
    message: "A reservation date is required.",
  }),
  time: z.string().min(1, "Please select a time slot"),
  guests: z.number().min(1).max(20),
  specialRequest: z.string().optional(),
});

export function ReservationModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      time: "",
      guests: 2,
      specialRequest: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      form.reset();
    }, 2000);
  }

  // Handle success dialog close
  const handleSuccessClose = () => {
    setShowSuccess(false);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent 
          className="bg-card border-border sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0"
          data-lenis-prevent="true"
        >
          <div className="bg-primary/10 p-6 border-b border-border text-center relative overflow-hidden">
             <div className="relative z-10">
               <h2 className="font-heading text-3xl font-bold text-foreground">Book a Table</h2>
               <p className="text-muted-foreground mt-2">Ensure the perfect spot for your gathering. Reserve in advance.</p>
             </div>
          </div>

          <div className="p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Personal Details */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-heading font-semibold text-foreground border-b border-border/50 pb-2">Personal Details</h3>
                    
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-background border-border focus-visible:ring-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 00000 000XX" className="bg-background border-border focus-visible:ring-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" className="bg-background border-border focus-visible:ring-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Reservation Details */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-heading font-semibold text-foreground border-b border-border/50 pb-2">Reservation Details</h3>
                    
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Reservation Date</FormLabel>
                          <Popover>
                            <PopoverTrigger 
                              render={
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal bg-background border-border hover:bg-background/80 hover:text-foreground",
                                    !field.value && "text-muted-foreground"
                                  )}
                                />
                              }
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 z-[100]" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date(new Date().setHours(0, 0, 0, 0))
                                }
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Reservation Time</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-3 gap-2">
                              {timeSlots.map((time) => (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => field.onChange(time)}
                                  className={cn(
                                    "px-2 py-1.5 text-xs border rounded-md transition-colors",
                                    field.value === time
                                      ? "bg-primary border-primary text-white"
                                      : "bg-background border-border text-muted-foreground hover:border-primary/50"
                                  )}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="guests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Number of Guests</FormLabel>
                          <FormControl>
                            <div className="flex items-center space-x-4">
                              <Button
                                type="button"
                                variant="outline"
                                className="bg-background border-border text-foreground hover:bg-background/80 hover:text-primary h-8 w-8 p-0"
                                onClick={() => field.onChange(Math.max(1, field.value - 1))}
                              >
                                -
                              </Button>
                              <span className="text-lg font-medium w-8 text-center text-foreground">{field.value}</span>
                              <Button
                                type="button"
                                variant="outline"
                                className="bg-background border-border text-foreground hover:bg-background/80 hover:text-primary h-8 w-8 p-0"
                                onClick={() => field.onChange(Math.min(20, field.value + 1))}
                              >
                                +
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <FormField
                    control={form.control}
                    name="specialRequest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">Special Request (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any dietary restrictions, special occasions, or seating preferences?"
                            className="resize-none bg-background border-border focus-visible:ring-primary min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-center pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 rounded-full text-md uppercase tracking-widest font-semibold bg-primary hover:bg-primary/90 text-white transition-all shadow-[0_0_20px_rgba(255,45,117,0.3)] hover:shadow-[0_0_30px_rgba(255,45,117,0.5)]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Processing...
                      </span>
                    ) : (
                      "Confirm Reservation"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      {/* SUCCESS MODAL */}
      <Dialog open={showSuccess} onOpenChange={handleSuccessClose}>
        <DialogContent className="bg-card border-border sm:max-w-md text-center p-0 overflow-hidden z-[110]" data-lenis-prevent="true">
          <div className="bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-10 flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6 relative"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75"
              />
              <CheckCircle2 size={48} className="text-primary relative z-10" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <DialogTitle className="text-3xl font-heading text-foreground mb-3">Reservation Confirmed!</DialogTitle>
              <DialogDescription className="text-muted-foreground text-base leading-relaxed">
                Thank you for choosing House of Hunger. Your table has been reserved. 
                <br/><br/>
              </DialogDescription>
            </motion.div>
          </div>
          <div className="p-6 bg-card flex justify-center">
            <Button onClick={handleSuccessClose} className="w-full bg-primary text-white hover:bg-primary/90 py-6 rounded-xl uppercase tracking-wider font-semibold transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,45,117,0.3)]">
              Awesome!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
