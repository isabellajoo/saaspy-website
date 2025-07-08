import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EmailSubscribe from "@/components/EmailSubscribe";
import CustomerReviews from "@/components/CustomerReviews";
import WriteReview from "@/components/WriteReview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white transition-colors">
      <Navbar />
      <Hero />
      <EmailSubscribe />
      <CustomerReviews />
      <WriteReview />
      <Footer />
    </div>
  );
}
