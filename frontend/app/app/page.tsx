'use client';

import { useEffect, useState } from "react";

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

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  // Fetch all ideas
  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/ideas/`);
      const data = await res.json();
      setIdeas(data.sort((a: Idea, b: Idea) => b.upvotes - a.upvotes || new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    } catch (err) {
      console.error("Error fetching ideas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  // Submit a new idea
  const submitIdea = async () => {
    if (!text.trim()) return;
    try {
      setSubmitting(true);
      await fetch(`${API_URL}/ideas/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      setText("");
      fetchIdeas();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Upvote an idea
  const upvoteIdea = async (id: number) => {
    try {
      await fetch(`${API_URL}/ideas/${id}/upvote/`, { method: "PATCH" });
      fetchIdeas();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete an idea
  const deleteIdea = async (id: number) => {
    if (!confirm("Are you sure you want to delete this idea?")) return;
    try {
      await fetch(`${API_URL}/ideas/${id}/`, { method: "DELETE" });
      fetchIdeas();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">IdeaBoard Mini App</h1>

      {/* Input */}
      <div className="max-w-xl mx-auto mb-6 flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded-md"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your idea..."
          onKeyDown={(e) => e.key === "Enter" && submitIdea()}
        />
        <button
          onClick={submitIdea}
          className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={submitting}
        >
          Submit
        </button>
      </div>

      {/* Ideas */}
      {loading ? (
        <p className="text-center text-gray-600">Loading ideas...</p>
      ) : ideas.length === 0 ? (
        <p className="text-center text-gray-600">No ideas yet. Be the first!</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ideas.map((idea) => (
            <li key={idea.id} className="p-4 bg-white border rounded-md shadow flex flex-col justify-between gap-2">
              <p className="text-gray-800">{idea.text}</p>
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => upvoteIdea(idea.id)}
                  className="px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  🔥 {idea.upvotes}
                </button>
                <button
                  onClick={() => deleteIdea(idea.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
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
