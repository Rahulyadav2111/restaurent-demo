"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ChefHat } from "lucide-react";

export interface Food {
  img: string;
  name: string;
  cat: string;
  desc?: string;
}

interface FoodModalProps {
  food: Food | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FoodModal({ food, open, onOpenChange }: FoodModalProps) {
  if (!food) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-[425px] overflow-hidden p-0 rounded-sm w-[90vw]">
        <div className="relative h-48 sm:h-64 w-full">
          <Image
            src={`/assets/${food.img}`}
            alt={food.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 left-4 bg-background/60 backdrop-blur-md px-3 py-1 rounded-sm text-xs text-foreground uppercase tracking-wider border border-foreground/10 z-10">
            {food.cat}
          </div>
        </div>
        <div className="p-6 relative">
          <div className="absolute -top-6 right-6 w-12 h-12 bg-primary rounded-sm flex items-center justify-center text-foreground shadow-lg shadow-primary/30 z-10">
            <ChefHat size={20} />
          </div>
          <DialogHeader className="text-left">
            <DialogTitle className="font-heading text-2xl font-bold text-foreground mb-2 pr-8">{food.name}</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              {food.desc || "Experience the authentic taste of our chef's special preparation, made with premium ingredients."}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => {
                onOpenChange(false);
                setTimeout(() => {
                  window.dispatchEvent(new Event('open-reservation'));
                }, 150);
              }}
              className="bg-primary hover:bg-primary/90 text-foreground px-6 py-2 rounded-sm text-sm uppercase tracking-widest font-semibold transition-all hover:scale-[1.01]"
            >
              Order Now
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
