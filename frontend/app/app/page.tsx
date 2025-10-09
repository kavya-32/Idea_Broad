const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("🔗 API_URL =", API_URL);

// Fetch ideas
const fetchIdeas = async () => {
  setLoading(true);
  setError(null);
  try {
    const res = await fetch(`${API_URL}/api/ideas/`);
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const data: Idea[] = await res.json();
    setIdeas(
      data.sort((a, b) => 
        b.upvotes - a.upvotes ||
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    );
  } catch (err: any) {
    console.error(err);
    setError("Failed to fetch ideas. Is your backend running?");
    setIdeas([]);
  } finally {
    setLoading(false);
  }
};

// Submit idea
const submitIdea = async () => {
  if (!text.trim()) return;
  setSubmitting(true);
  setError(null);
  try {
    const res = await fetch(`${API_URL}/api/ideas/`, {
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
  try {
    await fetch(`${API_URL}/api/ideas/${id}/upvote/`, { method: "PATCH" });
    fetchIdeas();
  } catch (err) {
    console.error(err);
    setError("Failed to upvote");
  }
};

// Delete idea
const deleteIdea = async (id: number) => {
  try {
    await fetch(`${API_URL}/api/ideas/${id}/`, { method: "DELETE" });
    setIdeas(prev => prev.filter(i => i.id !== id));
  } catch (err) {
    console.error(err);
    setError("Failed to delete");
  }
};
