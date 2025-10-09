'use client';

import { useEffect, useState } from "react"; 

// FIX: Define API_URL as a constant to avoid 'ReferenceError: process is not defined' 
// in this execution environment. Use the last confirmed, correct API URL.
const API_URL = "https://idea-broad-3.onrender.com"; 

// Idea type from backend
interface Idea {
  id: number;
  text: string;
  upvotes: number;
  created_at: string;
}

// -------------------------------------------------------------------
// NEW: Utility function for Fetch with Exponential Backoff
// -------------------------------------------------------------------
async function fetchWithRetry(url: string, options: RequestInit = {}, maxRetries: number = 3): Promise<Response> {
    // Inject 'cors' mode explicitly to ensure browser sends CORS headers correctly
    const finalOptions: RequestInit = { ...options, mode: 'cors' }; 

    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, finalOptions);
            
            if (response.status === 429) { 
                throw new Error(`Rate limit exceeded (${response.status})`);
            }
            
            // If response is received and not 429, we assume success or a permanent non-retryable error
            return response;
        } catch (error) {
            // If it's the last attempt, re-throw the error
            if (i === maxRetries - 1) {
                console.error(`Final attempt failed for URL: ${url}`, error);
                throw error; 
            }
            
            // Calculate exponential backoff delay: 1s, 2s, 4s...
            const delay = Math.pow(2, i) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error("Maximum retries reached.");
}


export default function LandingPage() {
  // States for API functionality
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // -------------------------------------------------------------------
  // API Functions (Updated to use fetchWithRetry)
  // -------------------------------------------------------------------

  // Fetch ideas 
  const fetchIdeas = async () => {
    setLoading(true);
    setError(null);
    if (!API_URL) {
      setError("API URL is not configured.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetchWithRetry(`${API_URL}/api/ideas/`);
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      
      const data: Idea[] = await res.json();
      setIdeas(
        data.sort(
          (a, b) =>
            b.upvotes - a.upvotes ||
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      );
    } catch (err: any) {
      console.error("Error fetching ideas:", err);
      // Explicitly mention CORS as the likely cause
      setError("Connection Failed (CORS Block or Server Offline). Please ensure your Django backend is running and configured to allow requests from this origin.");
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  // Submit idea 
  const submitIdea = async () => {
    if (!text.trim()) return;
    if (!API_URL) return setError("API URL is missing.");

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetchWithRetry(`${API_URL}/api/ideas/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Failed to submit idea");
      setText("");
      fetchIdeas(); // Refresh the list
    } catch (err: any) {
      console.error("Error submitting idea:", err);
      setError(err.message || "Idea submission failed (Check CORS/Server status)");
    } finally {
      setSubmitting(false);
    }
  };

  // Upvote 
  const upvote = async (id: number) => {
    if (!API_URL) return setError("API URL is missing.");
    try {
      await fetchWithRetry(`${API_URL}/api/ideas/${id}/upvote/`, { method: "PATCH" });
      fetchIdeas(); // Refresh the list
    } catch (err) {
      console.error("Error upvoting:", err);
      setError("Failed to upvote (Check CORS/Server status)");
    }
  };

  // Delete 
  const deleteIdea = async (id: number) => {
    if (!API_URL) return setError("API URL is missing.");
    try {
      await fetchWithRetry(`${API_URL}/api/ideas/${id}/`, { method: "DELETE" });
      // Optimistic update: remove the idea instantly
      setIdeas(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
      setError("Failed to delete (Check CORS/Server status)");
    }
  };
  
  // -------------------------------------------------------------------
  // Effect to fetch data on mount
  // -------------------------------------------------------------------
  useEffect(() => {
    fetchIdeas();
  }, []); // Only runs once on mount

  // -------------------------------------------------------------------
  // Main Render
  // -------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="py-6 text-center border-b border-indigo-200 mb-8 bg-white rounded-xl shadow-md">
          <h1 className="text-4xl font-extrabold text-indigo-700">🚀 Idea Board</h1>
          <p className="text-gray-500 mt-1">Submit, upvote, and prioritize the best ideas anonymously.</p>
        </header>

        {/* Idea Submission Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-indigo-200">
          <form onSubmit={(e) => { e.preventDefault(); submitIdea(); }} className="flex flex-col space-y-4">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Post your anonymous idea here (max 250 chars)..."
              maxLength={250}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-lg"
              disabled={submitting}
            />
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
              disabled={!text.trim() || submitting}
            >
              {submitting ? (
                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                <span>Post Idea</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </>
              )}
            </button>
            
          </form>
        </div>
        
        {/* Error Display */}
        {error && (
            <div className="text-red-600 text-center bg-red-100 p-3 rounded-lg border border-red-300 mb-6 font-medium">
                {error}
            </div>
        )}

        {/* Ideas List */}
        {loading && (
          <p className="text-center py-10 text-xl text-indigo-600 font-semibold flex justify-center items-center">
            <svg className="animate-spin inline mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading ideas...
          </p>
        )}

        {!loading && ideas.length === 0 && !error && (
          <p className="text-center py-10 text-gray-500 text-lg bg-white rounded-xl shadow-md">No ideas yet. Post the first one above!</p>
        )}

        {!loading && ideas.length > 0 && (
          <ul className="space-y-3">
            {ideas.map((idea) => (
              <li
                key={idea.id}
                className="p-4 bg-white rounded-xl shadow-lg flex justify-between items-start transition hover:shadow-xl border-l-8 border-indigo-500"
              >
                <div className="flex-1 pr-4">
                    <p className="text-gray-800 text-lg font-medium break-words">{idea.text}</p>
                    <p className="text-xs text-gray-500 mt-1">Posted: {new Date(idea.created_at).toLocaleDateString()}</p>
                </div>

                <div className="flex flex-col items-center space-y-2 ml-4">
                  {/* Upvote Button */}
                  <button
                    onClick={() => upvote(idea.id)}
                    className="flex flex-col items-center p-2 bg-indigo-100 text-indigo-700 rounded-lg font-bold shadow-sm hover:bg-indigo-200 transition duration-150 transform hover:scale-105 active:scale-95"
                    aria-label="Upvote idea"
                  >
                    <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
                    <span className="text-sm">{idea.upvotes}</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteIdea(idea.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition duration-150 rounded-full"
                    aria-label="Delete idea"
                    title="Delete Idea"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Footer */}
      <footer className="mt-12 py-4 text-center text-sm text-gray-500 border-t border-gray-300">
        &copy; {new Date().getFullYear()} IdeaBoard.
      </footer>
    </div>
  );
}
