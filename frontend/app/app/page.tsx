// frontend/src/app/app/page.tsx

'use client';

import { useState, useEffect, FormEvent } from 'react';

// Define the Idea type
interface Idea {
  id: number;
  text: string;
  upvotes: number;
  created_at: string;
}

// FIX: Using localhost to ensure browser can connect to the Docker-mapped port 8000
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api

export default function IdeaBoardApp() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [newIdeaText, setNewIdeaText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- API Handlers ---

  const fetchIdeas = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch ideas (Django backend handles sorting by upvotes descending)
      const res = await fetch(`${API_URL}/ideas`);
      if (!res.ok) {
        // FIX: Enhanced error message for 500 errors to guide the user to check backend logs
        if (res.status >= 500) {
          throw new Error(`Server returned status ${res.status}. Check your 'backend' Docker container logs for Python errors.`);
        }
        throw new Error(`API returned ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      setIdeas(data);
    } catch (e: any) {
      console.error("Fetch Error:", e);
      
      const isConnectionError = e.message && e.message.includes('Failed to fetch');
      
      // FIX: Check for connection error specifically and suggest checking if the backend is running.
      if (isConnectionError) {
        setError("Connection Error: The Django backend is unreachable. Please ensure your 'backend' Docker container is running and not crashed (check logs!).");
      } else {
        setError(e.message || "An unknown error occurred while fetching ideas.");
      }
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
        // FIX: Enhanced error message for 500 errors to guide the user to check backend logs
        if (res.status >= 500) {
          throw new Error(`Server returned status ${res.status}. Check your 'backend' Docker container logs for Python errors.`);
        }

        // Attempt to parse validation errors from Django REST Framework
        const errorData = await res.json();
        const detail = errorData.text?.[0] || errorData.detail || 'Failed to post idea.';
        throw new Error(detail);
      }
      
      setNewIdeaText('');
      await fetchIdeas(); // Refresh the list
    } catch (e: any) {
      const isConnectionError = e.message && e.message.includes('Failed to fetch');
      
      if (isConnectionError) {
        setError("Post Error: The Django backend is unreachable. Please ensure your 'backend' Docker container is running and not crashed (check logs!).");
      } else {
        setError(`Post Error: ${e.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async (id: number) => {
    // Optimistic update for responsiveness
    setIdeas(currentIdeas => currentIdeas.map(idea => 
      idea.id === id ? { ...idea, upvotes: idea.upvotes + 1 } : idea
    ));

    try {
      const res = await fetch(`${API_URL}/ideas/${id}/upvote/`, {
        method: 'PATCH',
      });

      if (!res.ok) {
        // FIX: Enhanced error message for 500 errors to guide the user to check backend logs
        if (res.status >= 500) {
          throw new Error(`Server returned status ${res.status}. Check your 'backend' Docker container logs for Python errors.`);
        }
        throw new Error('Upvote failed. Server connection error.');
      }
      
      await fetchIdeas(); // Re-fetch to confirm and re-sort
    } catch (e: any) {
      const isConnectionError = e.message && e.message.includes('Failed to fetch');

      if (isConnectionError) {
        setError("Upvote Error: The Django backend is unreachable. Please ensure your 'backend' Docker container is running and not crashed (check logs!).");
      } else {
        setError(`Upvote Error: ${e.message}`);
      }
      // Revert optimism by fetching fresh data
      await fetchIdeas(); 
    }
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchIdeas();
  }, []);

  // --- Render Sub-Components ---

  const IdeaCard = ({ idea }: { idea: Idea }) => (
    <div className="bg-white p-5 rounded-xl shadow-lg flex justify-between items-center transition hover:shadow-xl border-l-4 border-indigo-400">
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
          {/* Spark icon (Upvote) */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
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
        <a href="/" className="text-sm text-indigo-500 hover:text-indigo-700 font-medium transition">← Back to Landing Page</a>
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
          aria-label="Idea Text Input"
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
          <span className="font-bold">Error:</span> {error}
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
