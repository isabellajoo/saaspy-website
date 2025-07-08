"use client";

import { useEffect, useRef } from "react";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateBackground = () => {
      if (footerRef.current) {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
          footerRef.current.style.backgroundColor = 'rgb(31 41 55)'; // gray-800
        } else {
          footerRef.current.style.backgroundColor = 'rgb(243 244 246)'; // gray-100
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
    <footer ref={footerRef} className="w-full border-t border-gray-300 dark:border-gray-600 py-8 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-600 dark:text-gray-200 text-sm transition-colors">
              Copyright © Saaspy | Design by <span className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">We-R</span> | Powered by <span className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">Webflow</span>
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm transition-colors">
              Cookies Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 