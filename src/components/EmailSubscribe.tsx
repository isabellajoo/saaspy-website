"use client";

import { useEffect, useRef, useState } from "react";
import { subscribeToNewsletter } from "@/lib/actions";
import Toast from "@/components/Toast";

const MAIN_COLOR = "#6CA8FF";

export default function EmailSubscribe() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const updateBackground = () => {
      if (sectionRef.current) {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
          sectionRef.current.style.backgroundColor = 'rgb(17 24 39)'; // gray-900
        } else {
          sectionRef.current.style.backgroundColor = 'rgb(243 244 246)'; // gray-100
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      console.log("❌ Email is required");
      setToast({
        message: "Please enter your email address",
        type: "error"
      });
      return;
    }

    console.log("📧 Starting email subscription process...");
    console.log("📧 Email to save:", email);
    
    setIsLoading(true);
    setToast(null);

    try {
      console.log("🔄 Attempting to save to Firebase...");
      
      const result = await subscribeToNewsletter(email);
      
      if (result.success) {
        setToast({
          message: result.message,
          type: "success"
        });
        setEmail("");
      } else {
        setToast({
          message: result.message,
          type: "error"
        });
      }
      
    } catch (error) {
      console.error("❌ Error during subscription:", error);
      
      setToast({
        message: "Sorry, there was an error. Please try again later.",
        type: "error"
      });
    } finally {
      setIsLoading(false);
      console.log("🏁 Email subscription process completed");
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full flex justify-center py-12 px-4 transition-colors"
    >
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* First Row - Logo */}
        <div className="flex justify-start mb-2">
          <div className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill={MAIN_COLOR}/>
              <path d="M16 8v8l6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="16" cy="16" r="10" stroke="#fff" strokeWidth="2" opacity="0.2"/>
            </svg>
            <span style={{ color: MAIN_COLOR, fontWeight: 900, letterSpacing: '-0.04em' }} className="text-5xl font-extrabold tracking-tight">Saaspy</span>
          </div>
        </div>
        
        {/* Second Row - Description and Email Form */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <span className="text-gray-900 dark:text-gray-100 text-base flex-shrink-0 transition-colors">
            Join our newsletter to stay up to date on features and releases.
          </span>
          
          <form onSubmit={handleSubmit} className="flex gap-2 flex-shrink-0 md:justify-end">
            <input 
              type="email" 
              required 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-64 transition-colors disabled:opacity-50" 
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-6 py-2 text-white rounded-lg font-semibold transition whitespace-nowrap hover:opacity-90 flex-shrink-0 disabled:opacity-50"
              style={{ backgroundColor: MAIN_COLOR }}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
      
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
} 