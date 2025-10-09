// frontend/src/app/app/page.tsx
'use client';

import { useEffect, useState, FormEvent } from "react";

interface Idea {
  id: number;
  text: string;
  upvotes: number;
  created_at: string;
}

export default function MiniApp() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch ideas
  const fetchIdeas = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/ideas/`);
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const data: Idea[] = await res.json();
      setIdeas(
        data.sort((a, b) => b.upvotes - a.upvotes || new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      );
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch ideas. Is your backend running?");
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  // Submit new idea
  const submitIdea = async () => {
    if (!text.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/ideas/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Failed to submit idea");
      setText("");
      fetchIdeas();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Submit failed");
    } finally {
      setSubmitting(false);
    }
  };

  // Upvote idea
  const upvote = async (id: number) => {
    setIdeas(prev => prev.map(i => (i.id === id ? { ...i, upvotes: i.upvotes + 1 } : i)));
    try {
      await fetch(`${API_URL}/ideas/${id}/upvote/`, { method: "PATCH" });
      fetchIdeas();
    } catch (err) {
      console.error(err);
      setError("Failed to upvote");
      fetchIdeas();
    }
  };

  // Delete idea
  const deleteIdea = async (id: number) => {
    try {
      await fetch(`${API_URL}/ideas/${id}/`, { method: "DELETE" });
      setIdeas(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">IdeaBoard 🚀</h1>

      {/* Input */}
      <div className="max-w-xl mx-auto flex gap-2 mb-6">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submitIdea()}
          placeholder="Enter your idea..."
          className="flex-1 p-2 border rounded-md"
          disabled={submitting}
        />
        <button
          onClick={submitIdea}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          disabled={submitting}
        >
          Submit
        </button>
      </div>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {/* Ideas List */}
      {loading ? (
        <p className="text-center text-gray-600">Loading ideas...</p>
      ) : ideas.length === 0 ? (
        <p className="text-center text-gray-600">No ideas yet.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ideas.map(idea => (
            <li
              key={idea.id}
              className="p-4 bg-white rounded-md shadow flex justify-between items-center"
            >
              <span>{idea.text}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => upvote(idea.id)}
                  className="px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-xs"
                >
                  🔥 {idea.upvotes}
                </button>
                <button
                  onClick={() => deleteIdea(idea.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                >
                  🗑 Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
