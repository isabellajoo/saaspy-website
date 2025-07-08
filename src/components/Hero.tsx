"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const MAIN_COLOR = "#6CA8FF";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateBackground = () => {
      if (sectionRef.current) {
        const darkMode = document.documentElement.classList.contains('dark');
        setIsDark(darkMode);
        if (darkMode) {
          sectionRef.current.style.backgroundColor = 'rgb(17 24 39)'; // gray-900
        } else {
          sectionRef.current.style.backgroundColor = 'rgb(255 255 255)'; // white
        }
      }
    };

    // Initial update
    updateBackground();

    // Watch for dark mode changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateBackground();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full flex justify-center py-16 px-4 transition-colors">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="flex-1 flex flex-col gap-6 max-w-xl">
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight transition-colors">
              The only analytics <br className="hidden md:block" /> tool you need<span style={{ color: MAIN_COLOR }}>.</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-200 transition-colors leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
            </p>
            <div className="flex gap-4 mt-2">
              <Button 
                size="lg" 
                className="text-white font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: MAIN_COLOR }}
              >
                Features
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="font-bold transition-colors"
                style={{
                  backgroundColor: isDark ? '#1f2937' : 'white',
                  color: isDark ? '#ffffff' : '#111827',
                  borderColor: isDark ? '#374151' : '#4b5563'
                }}
              >
                Pricing
              </Button>
            </div>
            <div className="flex gap-4 mt-8 items-center">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-300 tracking-widest transition-colors">TRUSTED BY TEAMS AROUND THE WORLD</span>
              <div className="flex gap-2">
                <Image src="/youtube.svg" alt="YouTube" width={28} height={28} />
                <Image src="/pinterest.svg" alt="Pinterest" width={28} height={28} />
                <Image src="/facebook.svg" alt="Facebook" width={28} height={28} />
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <div className="rounded-3xl shadow-2xl bg-white dark:bg-gray-800 p-4 md:p-8 w-full max-w-md transition-colors border border-gray-200 dark:border-gray-600">
              <Image src="/dashboard.png" alt="Dashboard" width={400} height={320} className="rounded-xl" priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 