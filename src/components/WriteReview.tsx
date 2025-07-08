"use client";

import { useEffect, useRef, useState } from "react";
import { submitReview } from "@/lib/actions";
import Toast from "@/components/Toast";

const MAIN_COLOR = "#6CA8FF";

export default function WriteReview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isDark, setIsDark] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    review: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.review) {
      console.log("❌ All fields are required");
      setToast({
        message: "Please fill in all fields",
        type: "error"
      });
      return;
    }

    console.log("📝 Starting review submission process...");
    console.log("📝 Review data:", formData);
    
    setIsLoading(true);
    setToast(null);

    try {
      console.log("🔄 Attempting to save review to Firebase...");
      
      const result = await submitReview(formData);
      
      if (result.success) {
        setToast({
          message: result.message,
          type: "success"
        });
        setFormData({ name: "", location: "", review: "" });
      } else {
        setToast({
          message: result.message,
          type: "error"
        });
      }
      
    } catch (error) {
      console.error("❌ Error during review submission:", error);
      
      setToast({
        message: "Sorry, there was an error submitting your review. Please try again later.",
        type: "error"
      });
    } finally {
      setIsLoading(false);
      console.log("🏁 Review submission process completed");
    }
  };

  return (
    <section ref={sectionRef} className="w-full flex justify-center py-16 px-4 transition-colors">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div 
          className="rounded-xl shadow-lg border p-8 transition-colors"
          style={{
            backgroundColor: isDark ? '#1f2937' : '#f9fafb',
            borderColor: isDark ? '#374151' : '#e5e7eb'
          }}
        >
          <div className="text-left mb-8">
            <h2 
              className="text-3xl font-bold transition-colors"
              style={{
                color: isDark ? '#ffffff' : '#000000'
              }}
            >
              Write a Review
            </h2>
          </div>
          
          <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                  className="w-full px-4 py-3 rounded-lg border transition-colors disabled:opacity-50"
                  style={{
                    backgroundColor: isDark ? '#374151' : '#ffffff',
                    borderColor: isDark ? '#4b5563' : '#d1d5db',
                    color: isDark ? '#ffffff' : '#1f2937'
                  }}
                />
              </div>
              
              <div>
                <input
                  type="text"
                  name="location"
                  placeholder="Location (e.g. Seoul, South Korea)"
                  value={formData.location}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                  className="w-full px-4 py-3 rounded-lg border transition-colors disabled:opacity-50"
                  style={{
                    backgroundColor: isDark ? '#374151' : '#ffffff',
                    borderColor: isDark ? '#4b5563' : '#d1d5db',
                    color: isDark ? '#ffffff' : '#1f2937'
                  }}
                />
              </div>
              
              <div>
                <textarea
                  name="review"
                  placeholder="Please write your review"
                  value={formData.review}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border transition-colors disabled:opacity-50 resize-none"
                  style={{
                    backgroundColor: isDark ? '#374151' : '#ffffff',
                    borderColor: isDark ? '#4b5563' : '#d1d5db',
                    color: isDark ? '#ffffff' : '#1f2937'
                  }}
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg font-semibold transition-all disabled:opacity-50 hover:opacity-90"
                style={{
                  backgroundColor: MAIN_COLOR,
                  color: '#ffffff'
                }}
              >
                {isLoading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
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