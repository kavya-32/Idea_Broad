'use client';

import { useEffect, useState } from "react";

// Idea type from backend (unchanged)
interface Idea {
  id: number;
  text: string;
  upvotes: number;
  created_at: string;
}

export default function LandingPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  // API_URL को सीधे useEffect के बाहर, लेकिन कंपोनेंट के अंदर पढ़ें
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // API_URL की जाँच करें
    if (!API_URL) {
        console.error("API URL is not configured. Check NEXT_PUBLIC_API_URL.");
        setLoading(false);
        return; // अगर URL नहीं है, तो fetching रोक दें
    }

    const fetchIdeas = async () => {
      try {
        const res = await fetch(`${API_URL}/api/ideas/`);         
        // Response check जोड़ें
        if (!res.ok) {
            throw new Error(`Failed to fetch ideas: ${res.status}`);
        }
        
        const data: Idea[] = await res.json();
        // Sort by upvotes descending
        setIdeas(data.sort((a, b) => b.upvotes - a.upvotes));
      } catch (err) {
        console.error("Error fetching ideas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIdeas();
  }, [API_URL]); // dependency unchanged

  // ... (बाकी return JSX code unchanged)
  
  // आप लोडिंग या एरर स्टेट को भी रेंडर कर सकते हैं
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading ideas...</div>;
  }
  
  // ... (बाकी return JSX code)
  
  return (
    // ... (आपका JSX यहाँ)
  );
}
