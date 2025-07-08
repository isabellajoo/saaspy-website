import { subscribeToNewsletter } from "@/lib/actions";

export default function DebugPage() {
  const checkConfig = async () => {
    "use server";
    
    const config = {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY ? "✓ Set" : "✗ Missing",
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN ? "✓ Set" : "✗ Missing",
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ? "✓ Set" : "✗ Missing",
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET ? "✓ Set" : "✗ Missing",
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID ? "✓ Set" : "✗ Missing",
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID ? "✓ Set" : "✗ Missing"
    };
    
    console.log("🔧 Server Environment Variables:", config);
    console.log("📍 Project ID Value:", process.env.FIREBASE_PROJECT_ID);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Firebase Configuration Debug</h1>
      <div className="space-y-2">
        <p>Check the server console for environment variable status.</p>
        <form action={checkConfig}>
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Check Firebase Config
          </button>
        </form>
      </div>
    </div>
  );
} 