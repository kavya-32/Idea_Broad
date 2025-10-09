'use client';

import { useState } from "react"; 
// useEffect and Idea interface are removed as live ideas section is removed.

// API_URL is no longer used for fetching, so we comment it out.
// const API_URL = "https://idea-broad-3.onrender.com";

// We keep a mock state just in case, but it's not strictly necessary.
export default function LandingPage() {
  const [inputText, setInputText] = useState(""); 
  
  // All state related to ideas, loading, and error are removed.

  // The entire useEffect block for fetching is removed.

  // The renderIdeas function is removed.

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* Hero Section */}
      <section className="py-24 text-center bg-indigo-600 text-white rounded-b-[40px] shadow-2xl">
        <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-7xl font-extrabold mb-6 tracking-tight animate-in slide-in-from-top-4 duration-500">
                IdeaBoard 🚀
            </h1>
            <p className="text-2xl mb-10 font-light max-w-2xl mx-auto opacity-90">
                The anonymous platform to share, vote on, and discover the community's best ideas instantly.
            </p>
            
            {/* CTA Group */}
            <div className="space-x-4">
                <a
                href="/app"
                className="px-10 py-4 bg-white text-indigo-700 font-bold rounded-full text-xl shadow-xl hover:bg-gray-100 transition duration-300 transform hover:scale-105 inline-block"
                >
                Launch IdeaBoard →
                </a>
                <a
                href="#features"
                className="px-10 py-4 bg-transparent text-white border-2 border-white font-bold rounded-full text-xl shadow-xl hover:bg-white/10 transition duration-300 transform hover:scale-105 inline-block"
                >
                Learn More
                </a>
            </div>
        </div>
      </section>

      {/* --- New Section: Key Features --- */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-5xl font-extrabold mb-4 text-center text-gray-800">Key Features</h2>
            <p className="text-xl text-center text-gray-500 mb-16">Everything you need to capture and prioritize brilliant concepts.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                
                <div className="p-8 bg-gray-100 rounded-2xl shadow-lg border-t-8 border-indigo-500 hover:shadow-xl transition duration-300">
                    <svg className="w-12 h-12 mb-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1m18-7h-4M7 4h10a2 2 0 012 2v2m-12 5h-2a2 2 0 01-2-2V8a2 2 0 012-2h2m-5 5h2m-2 0h-2M4 16h2m-2 0h-2"></path></svg>
                    <h3 className="font-extrabold text-2xl mb-3 text-gray-900">100% Anonymous Posting</h3>
                    <p className="text-gray-600">Share your thoughts without hesitation. All submissions are detached from your identity, ensuring honest and unfiltered feedback.</p>
                </div>

                <div className="p-8 bg-gray-100 rounded-2xl shadow-lg border-t-8 border-indigo-500 hover:shadow-xl transition duration-300">
                    <svg className="w-12 h-12 mb-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.765a2 2 0 011.85 2.53l-2.6 7.6c-.35 1.02-.9 1.83-1.6 2.37L12 21M7 1h10a2 2 0 012 2v2M5 10v10a2 2 0 002 2h10a2 2 0 002-2V10M12 4v4m-3 0h6"></path></svg>
                    <h3 className="font-extrabold text-2xl mb-3 text-gray-900">Real-Time Prioritization</h3>
                    <p className="text-gray-600">Ideas are instantly sorted by upvotes. See the community consensus evolve live and understand which concepts truly matter.</p>
                </div>

                <div className="p-8 bg-gray-100 rounded-2xl shadow-lg border-t-8 border-indigo-500 hover:shadow-xl transition duration-300">
                    <svg className="w-12 h-12 mb-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    <h3 className="font-extrabold text-2xl mb-3 text-gray-900">Minimalist & Fast UI</h3>
                    <p className="text-gray-600">Designed for speed and clarity. Spend less time navigating and more time engaging with great ideas. Works flawlessly on mobile.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- New Section: Testimonial --- */}
      <section className="py-20 bg-indigo-700 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
            <svg className="w-16 h-16 mx-auto mb-6 text-indigo-300 opacity-70" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 8a1 1 0 011 1v3a1 1 0 102 0V9a1 1 0 10-2 0V8zM5.5 5a.5.5 0 000 1h9a.5.5 0 000-1h-9zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path></svg>
            <blockquote className="text-3xl italic font-serif leading-relaxed mb-6">
                "IdeaBoard is the simplest way we've found to collect unbiased feedback from our community. No sign-ups, no fuss, just pure democratic idea sorting."
            </blockquote>
            <p className="text-lg font-semibold text-indigo-300">— Alex R., Product Manager at InnovateTech</p>
        </div>
      </section>

      {/* --- New Section: Our Vision --- */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-5xl font-extrabold mb-4 text-center text-gray-800">Our Vision</h2>
            <p className="text-xl text-center text-gray-500 mb-12 max-w-3xl mx-auto">We believe the best ideas should win, regardless of who submitted them. IdeaBoard is built on the principle of meritocracy.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-indigo-400">
                    <h3 className="font-bold text-2xl mb-2 text-indigo-700">Democratizing Ideas</h3>
                    <p className="text-gray-600">By removing names and profiles, we eliminate biases and focus solely on the potential impact and value of the idea itself. It’s pure collective intelligence at work.</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-indigo-400">
                    <h3 className="font-bold text-2xl mb-2 text-indigo-700">Simple & Sustainable</h3>
                    <p className="text-gray-600">We aim to keep the tool free from bloat. Our commitment is to provide a fast, reliable, and easily accessible platform for sharing ideas, without excessive features.</p>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section (Retained) */}
      <section className="py-16 text-center bg-indigo-50 border-t border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Spark Innovation?</h2>
        <a
          href="/app"
          className="px-12 py-4 bg-indigo-600 text-white font-bold rounded-full text-xl shadow-2xl hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
        >
          Launch IdeaBoard →
        </a>
      </section>
      
      {/* Footer (Retained) */}
      <footer className="py-4 text-center text-sm text-gray-500 border-t border-gray-200">
        &copy; {new Date().getFullYear()} IdeaBoard. Powered by Community.
      </footer>
    </div>
  );
}
