'use client';

import { useEffect, useState } from "react";

// Idea type from backend
interface Idea {
  id: number;
  text: string;
  upvotes: number;
  created_at: string;
}

export default function LandingPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  // Use the backend URL from env
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch(`${API_URL}/ideas/`);
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
  }, [API_URL]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="py-20 text-center bg-indigo-600 text-white">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to IdeaBoard 🚀</h1>
        <p className="text-xl mb-6">Share ideas anonymously and see which ones get the most upvotes.</p>
        <a
          href="/app"
          className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition"
        >
          Go to MiniApp →
        </a>
      </section>

{Array.isArray(ideas) && ideas.length > 0 ? (
  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {ideas.slice(0, 4).map((idea) => (
      <li
        key={idea.id}
        className="p-4 bg-white rounded shadow flex justify-between items-center"
      >
        <span>{idea.text}</span>
        <span className="text-indigo-600 font-bold">🔥 {idea.upvotes}</span>
      </li>
    ))}
  </ul>
) : (
  <p className="text-center text-gray-500">No ideas yet. Be the first!</p>
)}


      {/* How It Works Section */}
      <section className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded shadow">
            <h3 className="font-bold text-xl mb-2">1. Post Ideas</h3>
            <p>Submit your ideas anonymously in MiniApp.</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="font-bold text-xl mb-2">2. Upvote</h3>
            <p>See which ideas inspire others and upvote them.</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="font-bold text-xl mb-2">3. Discover</h3>
            <p>Top ideas rise to the top instantly, helping creativity flow.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Share Your Idea?</h2>
        <a
          href="/app"
          className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
        >
          Launch MiniApp →
        </a>
      </section>
    </div>
  );
}
