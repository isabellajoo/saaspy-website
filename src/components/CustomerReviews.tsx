"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getReviews } from "@/lib/actions";

interface ReviewData {
  id: string;
  text: string;
  name: string;
  location: string;
  avatar: string;
  submittedAt?: unknown;
}

export default function CustomerReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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

  // Fetch reviews from Firebase
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log("🔄 Fetching reviews from Firebase...");
        
        const result = await getReviews();
        
        if (result.success && result.reviews.length > 0) {
          console.log("✅ Successfully loaded reviews from Firebase:", result.reviews.length);
          setReviews(result.reviews);
        } else {
          console.log("ℹ️ No reviews found in Firebase, showing empty state");
          setReviews([]);
        }
        
      } catch (error) {
        console.error("❌ Error fetching reviews from Firebase:", error);
        console.log("ℹ️ Showing empty state due to error");
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Check scroll position and update button states
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Update scroll buttons when reviews change
  useEffect(() => {
    if (!isLoading && reviews.length > 0) {
      setTimeout(checkScrollPosition, 100); // Small delay to ensure DOM is updated
    }
  }, [isLoading, reviews]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Approximate card width + gap
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Approximate card width + gap
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={sectionRef} className="w-full flex justify-center py-16 px-4 transition-colors">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 transition-colors">TESTIMONIALS</p>
            <h2 className="text-3xl font-bold text-black dark:text-white transition-colors">Customer Reviews</h2>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: isDark ? '#1f2937' : '#f9fafb',
                borderColor: isDark ? '#374151' : '#e5e7eb',
                color: isDark ? '#ffffff' : '#374151'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button 
              onClick={scrollRight}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: isDark ? '#1f2937' : '#f9fafb',
                borderColor: isDark ? '#374151' : '#e5e7eb',
                color: isDark ? '#ffffff' : '#374151'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
        
                <div 
          ref={scrollContainerRef}
          onScroll={checkScrollPosition}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
          }}
        >
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={`loading-${i}`}
                className="flex-shrink-0 w-80 rounded-xl shadow-lg border p-6 transition-colors animate-pulse"
                style={{
                  backgroundColor: isDark ? '#1f2937' : '#f9fafb',
                  borderColor: isDark ? '#374151' : '#e5e7eb'
                }}
              >
                <div className="space-y-4">
                  <div className="h-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : reviews.length === 0 ? (
            // Empty state
            <div className="w-full flex flex-col items-center justify-center py-16">
               <div 
                 className="rounded-full p-6 mb-4"
                 style={{
                   backgroundColor: isDark ? '#374151' : '#f3f4f6'
                 }}
               >
                 <svg 
                   className="w-12 h-12" 
                   fill="none" 
                   stroke="currentColor" 
                   viewBox="0 0 24 24"
                   style={{
                     color: isDark ? '#9ca3af' : '#6b7280'
                   }}
                 >
                   <path 
                     strokeLinecap="round" 
                     strokeLinejoin="round" 
                     strokeWidth={1.5} 
                     d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                   />
                 </svg>
               </div>
               <h3 
                 className="text-lg font-semibold mb-2 transition-colors"
                 style={{
                   color: isDark ? '#ffffff' : '#1f2937'
                 }}
               >
                 No Reviews Yet
               </h3>
               <p 
                 className="text-center max-w-md transition-colors"
                 style={{
                   color: isDark ? '#9ca3af' : '#6b7280'
                 }}
               >
                 Be the first to share your experience with our platform. Your feedback helps us improve!
               </p>
             </div>
           ) : (
             reviews.map((review, i) => (
              <div 
                key={i}
                className="flex-shrink-0 w-80 rounded-xl shadow-lg border p-6 flex flex-col justify-between transition-colors"
                style={{
                  backgroundColor: isDark ? '#1f2937' : '#f9fafb',
                  borderColor: isDark ? '#374151' : '#e5e7eb',
                  minHeight: '200px' // 4줄 기준 최소 높이
                }}
              >
                <p 
                  className="transition-colors leading-relaxed flex-grow"
                  style={{
                    color: isDark ? '#ffffff' : '#1f2937',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {review.text}
                </p>
                <div className="flex items-center gap-3 mt-4">
                <Image src={review.avatar} alt={review.name} width={40} height={40} className="rounded-full" />
                <div>
                  <div 
                    className="font-semibold transition-colors"
                    style={{
                      color: isDark ? '#ffffff' : '#000000'
                    }}
                  >
                    {review.name}
                  </div>
                  <div 
                    className="text-xs transition-colors"
                    style={{
                      color: isDark ? '#d1d5db' : '#6b7280'
                    }}
                  >
                    {review.location}
                  </div>
                </div>
              </div>
            </div>
          )))}
        </div>
      </div>
    </section>
  );
} 