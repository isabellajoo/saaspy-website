"use client";

import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MAIN_COLOR = "#6CA8FF";

export default function Navbar() {
  const [cartCount] = useState(1); // 샘플 뱃지 표시용
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateBackground = () => {
      if (navRef.current) {
        const darkMode = document.documentElement.classList.contains('dark');
        setIsDark(darkMode);
        if (darkMode) {
          navRef.current.style.backgroundColor = 'rgb(17 24 39)'; // gray-900
        } else {
          navRef.current.style.backgroundColor = 'rgb(255 255 255)'; // white
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

  const menuItems = [
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Pages", href: "#pages", hasDropdown: true },
  ];

  return (
    <nav ref={navRef} className="w-full border-b border-gray-300 dark:border-gray-700 shadow-sm transition-colors">
      {/* 강제 색상/밑줄 제거 스타일 */}
      <style>{`
        .navbar-link, .navbar-link:visited, .navbar-link:active, .navbar-link:hover {
          color: #000 !important;
          text-decoration: none !important;
        }
        .dark .navbar-link, .dark .navbar-link:visited, .dark .navbar-link:active, .dark .navbar-link:hover {
          color: #fff !important;
        }
      `}</style>
      <div className="w-full flex justify-center px-4">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            {/* Left Side - Logo + Menu */}
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div className="flex items-center gap-2 select-none">
                <svg width="21" height="21" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="16" fill={MAIN_COLOR}/>
                  <path d="M16 8v8l6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="16" cy="16" r="10" stroke="#fff" strokeWidth="2" opacity="0.2"/>
                </svg>
                <span style={{ color: MAIN_COLOR, fontWeight: 900, letterSpacing: '-0.04em' }} className="text-3xl font-extrabold tracking-tight">Saaspy</span>
              </div>
              
              {/* Desktop Menu - Always next to logo */}
              <div className="hidden lg:flex gap-2 text-base font-medium">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="navbar-link font-medium flex items-center gap-1 px-6 py-2 rounded-xl focus:outline-none focus:ring-0 transition-colors duration-150 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="ml-0.5">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Side - Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button
                variant="ghost"
                className="relative border rounded-xl px-5 py-2 flex items-center gap-2 transition font-semibold shadow-sm"
                style={{
                  backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
                  borderColor: isDark ? '#374151' : '#d1d5db',
                  color: isDark ? '#ffffff' : '#374151'
                }}
              >
                <ShoppingCart 
                  className="w-5 h-5" 
                  style={{
                    color: isDark ? '#ffffff' : '#374151'
                  }}
                />
                <span 
                  className="hidden sm:inline"
                  style={{
                    color: isDark ? '#ffffff' : '#374151'
                  }}
                >
                  Cart
                </span>
                <span className="absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-white dark:border-gray-900" style={{ backgroundColor: MAIN_COLOR }}>
                  {cartCount}
                </span>
              </Button>
              
              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200">
                      <Menu className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-64 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    <div className="flex flex-col gap-4 mt-8">
                      {menuItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="navbar-link font-medium flex items-center gap-2 px-4 py-3 rounded-xl focus:outline-none focus:ring-0 transition-colors duration-150 hover:bg-gray-200 dark:hover:bg-gray-700"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                          {item.hasDropdown && (
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="ml-auto">
                              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </a>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 