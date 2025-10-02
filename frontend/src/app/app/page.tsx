// frontend/src/app/app/page.tsx

'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';

// Define the Idea type
interface Idea {
  id: number;
  text: string;
  upvotes: number;
  created_at: string;
}

// API URL updated to use Django's default port 8000
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'; 

export default function IdeaBoardApp() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [newIdeaText, setNewIdeaText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIdeas = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use standard fetch for data retrieval
      const res = await fetch(`${API_URL}/ideas`);
      if (!res.ok) {
        throw new Error(`API returned ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      setIdeas(data);
    } catch (e: any) {
      console.error("Fetch Error:", e);
      setError("Could not connect to the API. Check if the backend is running.");
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePostIdea = async (e: FormEvent) => {
    e.preventDefault();
    const text = newIdeaText.trim();
    if (!text) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/ideas/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.text?.[0] || 'Failed to post idea.');
      }
      
      setNewIdeaText('');
      await fetchIdeas(); // Re-fetch all to get the latest, sorted list
    } catch (e: any) {
      setError(`Post Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async (id: number) => {
    // Optimistic update for responsiveness (optional but good UX)
    setIdeas(currentIdeas => currentIdeas.map(idea => 
      idea.id === id ? { ...idea, upvotes: idea.upvotes + 1 } : idea
    ));

    try {
      const res = await fetch(`${API_URL}/ideas/${id}/upvote/`, {
        method: 'PATCH',
      });

      if (!res.ok) {
        throw new Error('Upvote failed. The database may be down.');
      }
      
      await fetchIdeas(); // Re-fetch to sort correctly and ensure data is synced
    } catch (e: any) {
      setError(`Upvote Error: ${e.message}`);
      // Revert the optimistic update on failure (or just re-fetch)
      await fetchIdeas(); 
    }
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchIdeas();
  }, []);

  // --- Render Components ---

  const IdeaCard = ({ idea }: { idea: Idea }) => (
    <div className="bg-white p-5 rounded-xl shadow-md flex justify-between items-center transition hover:shadow-lg border-l-4 border-indigo-400">
      <p className="flex-grow text-gray-800 text-lg break-words pr-4">
        {idea.text}
      </p>
      <div className="flex items-center space-x-4">
        <span className="text-xl font-bold text-indigo-600 min-w-[30px] text-right">{idea.upvotes}</span>
        <button
          onClick={() => handleUpvote(idea.id)}
          className="p-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition disabled:bg-gray-400 shadow-md transform hover:scale-105 active:scale-95"
          disabled={loading}
          aria-label={`Upvote idea: ${idea.text}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6.386 5L8.4 4.09l1.636 4.887a2.5 2.5 0 00.99 1.49l3.41 2.946c.365.316.59.79.59 1.282V16.5c0 .276-.224.5-.5.5h-4.25c-.276 0-.5-.224-.5-.5v-4.148l-1.375-1.189a1 1 0 00-.775-.386H6.386z" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <header className="mb-8 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">The Anonymous Idea Board 🚀</h1>
        <p className="text-gray-600 mt-2">Just a blank canvas for your next big thing. Max 280 characters.</p>
        <Link href="/" className="text-sm text-indigo-500 hover:text-indigo-700 font-medium transition">← Back to Landing Page</Link>
      </header>

      {/* New Idea Input Form */}
      <form onSubmit={handlePostIdea} className="max-w-xl mx-auto mb-10 p-6 bg-white rounded-xl shadow-2xl border-t-4 border-indigo-600">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 resize-none text-gray-700"
          rows={4}
          placeholder="Type your groundbreaking idea here..."
          maxLength={280}
          value={newIdeaText}
          onChange={(e) => setNewIdeaText(e.target.value)}
          required
          disabled={loading}
        />
        <div className="flex justify-between items-center mt-3">
          <span className={`text-sm font-medium ${newIdeaText.length > 250 ? 'text-red-500' : 'text-gray-500'}`}>
            {newIdeaText.length}/280
          </span>
          <button
            type="submit"
            className="px-8 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition disabled:bg-indigo-300 shadow-md"
            disabled={loading || newIdeaText.length === 0}
          >
            {loading ? 'Submitting...' : 'Submit Idea'}
          </button>
        </div>
      </form>
      
      {/* Status Indicators */}
      {error && (
        <div className="max-w-4xl mx-auto p-4 bg-red-100 text-red-700 border-l-4 border-red-500 rounded-lg mb-6 font-medium">
          {error}
        </div>
      )}
      
      {loading && !ideas.length && (
        <div className="text-center text-indigo-600 font-semibold mt-10">
          Loading ideas...
        </div>
      )}

      {/* Ideas List */}
      <main className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-2">
          Top Ideas ({ideas.length})
        </h2>
        <div className="space-y-4">
          {ideas.length === 0 && !loading ? (
            <p className="text-center text-gray-500 p-10 bg-white rounded-xl shadow-inner">
              No ideas posted yet. Be the first to spark an idea!
            </p>
          ) : (
            ideas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}