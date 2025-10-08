// src/app/landing/page.tsx
'use client';

const features = [
  { title: "Anonymous Sharing", description: "Post your ideas without fear of judgment.", icon: "💡" },
  { title: "Real-Time Upvoting", description: "See which ideas resonate instantly.", icon: "🔥" },
  { title: "Zero Friction", description: "No accounts, no clutter. Jump straight in.", icon: "✨" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center py-32 bg-indigo-50">
        <h1 className="text-5xl font-extrabold text-indigo-600 mb-6">
          Welcome to IdeaBoard 🚀
        </h1>
        <p className="text-lg text-gray-700 mb-10 max-w-xl">
          Capture, share, and upvote ideas anonymously. No sign-ups, zero clutter — just pure creativity.
        </p>
        <a
          href="/app"
          className="px-10 py-4 bg-indigo-600 text-white rounded-full text-lg font-bold hover:bg-indigo-700 transition shadow-lg"
        >
          Go to Idea Board →
        </a>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-16">Why IdeaBoard?</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {features.map((f, i) => (
            <div key={i} className="p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition text-center">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-indigo-600 text-white text-center">
        <h2 className="text-4xl font-extrabold mb-4">Ready to share your ideas?</h2>
        <p className="text-lg mb-8 max-w-xl mx-auto">
          Start posting your vision today — no commitment required.
        </p>
        <a
          href="/app"
          className="px-10 py-4 bg-white text-indigo-700 rounded-full font-bold hover:bg-gray-100 transition shadow-xl"
        >
          Launch Idea Board →
        </a>
      </section>

    </div>
  );
}
