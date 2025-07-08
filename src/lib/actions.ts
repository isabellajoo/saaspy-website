"use server";

import { collection, addDoc, serverTimestamp, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Debug function to check environment variables
function checkFirebaseConfig() {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY ? "✓" : "✗",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN ? "✓" : "✗",
    projectId: process.env.FIREBASE_PROJECT_ID ? "✓" : "✗",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET ? "✓" : "✗",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID ? "✓" : "✗",
    appId: process.env.FIREBASE_APP_ID ? "✓" : "✗"
  };
  
  console.log("🔧 Firebase Config Check:", config);
  console.log("📍 Project ID:", process.env.FIREBASE_PROJECT_ID);
  
  return config;
}

export async function subscribeToNewsletter(email: string) {
  try {
    console.log("📧 Starting email subscription process...");
    console.log("📧 Email to save:", email);
    
    // Check Firebase configuration
    checkFirebaseConfig();

    const docRef = await addDoc(collection(db, "newsletter_subscribers"), {
      email: email,
      subscribedAt: serverTimestamp(),
      status: "active"
    });

    console.log("✅ Email saved successfully!");
    console.log("✅ Document ID:", docRef.id);
    console.log("✅ Email:", email);
    console.log("✅ Timestamp:", new Date().toISOString());

    return { success: true, message: "Successfully subscribed! Thank you for joining our newsletter." };
  } catch (error) {
    console.error("❌ Error saving email to Firebase:", error);
    console.error("❌ Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      email: email,
      timestamp: new Date().toISOString()
    });

    return { success: false, message: "Sorry, there was an error. Please try again later." };
  }
}

export async function submitReview(formData: { name: string; location: string; review: string }) {
  try {
    console.log("📝 Starting review submission process...");
    console.log("📝 Review data:", formData);
    
    // Check Firebase configuration
    checkFirebaseConfig();

    const docRef = await addDoc(collection(db, "customer_reviews"), {
      name: formData.name,
      location: formData.location,
      review: formData.review,
      submittedAt: serverTimestamp(),
      status: "pending"
    });

    console.log("✅ Review saved successfully!");
    console.log("✅ Document ID:", docRef.id);
    console.log("✅ Review data:", formData);
    console.log("✅ Timestamp:", new Date().toISOString());

    return { success: true, message: "Thank you for your review! It has been submitted successfully." };
  } catch (error) {
    console.error("❌ Error saving review to Firebase:", error);
    console.error("❌ Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      formData: formData,
      timestamp: new Date().toISOString()
    });

    return { success: false, message: "Sorry, there was an error submitting your review. Please try again later." };
  }
}

export async function getReviews() {
  try {
    console.log("🔄 Fetching reviews from Firebase...");
    
    // Check Firebase configuration
    checkFirebaseConfig();

    const reviewsQuery = query(
      collection(db, "customer_reviews"),
      orderBy("submittedAt", "desc"),
      limit(6)
    );

    const querySnapshot = await getDocs(reviewsQuery);
    const firebaseReviews: any[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      firebaseReviews.push({
        id: doc.id,
        text: data.review,
        name: data.name,
        location: data.location,
        avatar: `/avatar${(firebaseReviews.length % 3) + 1}.png`,
        submittedAt: data.submittedAt
      });
    });

    console.log("✅ Successfully loaded reviews from Firebase:", firebaseReviews.length);
    return { success: true, reviews: firebaseReviews };
  } catch (error) {
    console.error("❌ Error fetching reviews from Firebase:", error);
    return { success: false, reviews: [] };
  }
} 