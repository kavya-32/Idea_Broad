// frontend/src/app/page.tsx

import Link from 'next/link';

const features = [
  { 
    title: "Anonymous Sharing", 
    description: "Post your ideas without fear of judgment. Focus on the concept, not the creator.",
    icon: '💡'
  },
  { 
    title: "Real-Time Upvoting", 
    description: "See which ideas resonate instantly. Simple, democratic, and effective.",
    icon: '🚀'
  },
  { 
    title: "Zero Friction", 
    description: "No sign-ups, zero clutter. Jump straight into sharing your next big thing.",
    icon: '✨'
  },
  { 
    title: "Mobile First", 
    description: "Designed for inspiration on the go. Great UX on any device, everywhere.",
    icon: '📱'
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      
      {/* Navigation (Sticky for better UX) */}
      <header className="sticky top-0 z-10 py-4 shadow-md bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 flex justify-between items-center max-w-7xl">
          <h1 className="text-2xl font-extrabold text-indigo-600">IdeaBoard</h1>
          <Link 
            href="/app" 
            className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition duration-300 shadow-lg"
          >
            Launch Idea Board →
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-36 bg-gray-50 text-center border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm font-semibold text-indigo-600 uppercase mb-3">
            Capture. Share. Validate.
          </p>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-snug text-gray-900">
            Stop Thinking, Start <span className="text-indigo-600">Doing</span>.
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            The fastest, simplest, and most **anonymous** way to capture, share, and collectively vote on groundbreaking concepts.
          </p>
          <Link 
            href="/app" 
            className="inline-block px-12 py-4 text-xl font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition duration-300 shadow-xl transform hover:scale-[1.02] active:scale-100"
          >
            Launch Idea Board $\rightarrow$
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <h3 className="text-4xl font-bold text-center mb-16 text-gray-900">What makes IdeaBoard unique?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-8 bg-white rounded-xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-2xl hover:border-indigo-200"
              >
                <div className="text-4xl mb-4 text-indigo-500">{feature.icon}</div>
                <h4 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h4>
                <p className="text-gray-600 text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-indigo-700 text-white text-center">
        <div className="container mx-auto px-4">
            <h3 className="text-4xl font-extrabold mb-4">Ready to spark some genius?</h3>
            <p className="text-lg mb-8 opacity-90">Start sharing your vision today — no commitment required.</p>
            <Link 
              href="/app" 
              className="inline-block px-10 py-4 text-lg font-bold text-indigo-700 bg-white rounded-full hover:bg-gray-100 transition duration-300 shadow-2xl"
            >
              Go to The Idea Board $\rightarrow$
            </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-100">
        &copy; {new Date().getFullYear()} The Idea Board Project. Built with love and open source tools.
      </footer>
    </div>
  );
}