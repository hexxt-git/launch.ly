"use client";

import { useState } from "react";

export default function Home() {
  // Keep all your existing state and logic exactly the same
  const [idea, setIdea] = useState("");
  const [scripts, setScripts] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [strategy, setStrategy] = useState("");
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(false);

  const generateScripts = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea }),
    });
    const data = await res.json();
    setScripts(data.scripts || []);
    setStrategy("");
    setCaptions("");
    setSelected(null);
    setLoading(false);
  };

  const chooseScript = async (index: number) => {
    setSelected(index);
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea, scriptChoice: (index + 1).toString() }),
    });
    const data = await res.json();
    setStrategy(data.strategy || "");
    setCaptions(data.captions || "");
    setLoading(false);
  };

  return (
    <main className="min-h-screen text-white font-sans relative overflow-hidden">
      {/* New background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020103] to-[#622A9A] z-0"></div>
      <div className="absolute inset-0 z-0 opacity-20 bg-[length:40px_40px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]"></div>
      
      <div className="relative z-10 px-6 py-10 max-w-4xl mx-auto">
        {/* Updated header to match screenshot */}
        <div className="text-center mb-12">
          <p className="text-xl text-purple-200 mt-2">Ready to bring a new idea to life?</p>
        </div>

        {/* Original textarea but with adjusted styling */}
        <div className="mb-8 bg-[#1A192F]/70 backdrop-blur-sm p-6 rounded-lg border border-purple-500/30">
          <textarea
            placeholder="Describe your product or project idea..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="w-full p-4 rounded-md bg-[#1A192F] text-white border border-purple-500 focus:border-purple-300 focus:outline-none"
            rows={4}
          />
        </div>

        {/* Original generate button with adjusted styling */}
        <button
          onClick={generateScripts}
          disabled={loading || !idea.trim()}
          className="bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 text-lg font-medium w-full mb-12 transition-colors"
        >
          Generate Scripts
        </button>

        {/* Rest of your original functionality with UI tweaks */}
        {scripts.length > 0 && (
          <div className="mt-8 space-y-4 bg-[#1A192F]/70 backdrop-blur-sm p-6 rounded-lg border border-purple-500/30">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">Choose a Script</h2>
            {scripts.map((script, i) => (
              <button
                key={i}
                onClick={() => chooseScript(i)}
                className={`w-full text-left p-4 rounded-md border ${
                  selected === i ? "border-green-500 bg-green-900/50" : "border-purple-500 bg-[#1A192F]"
                } hover:bg-purple-800/50 transition-colors`}
              >
                <strong className="text-purple-300">Script {i + 1}:</strong> {script}
              </button>
            ))}
          </div>
        )}

        {strategy && (
          <div className="mt-10 bg-[#1A192F]/70 backdrop-blur-sm p-6 rounded-lg border border-purple-500/30">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">Marketing Strategy</h2>
            <pre className="whitespace-pre-wrap bg-[#1A192F] p-4 rounded-md border border-purple-500">{strategy}</pre>
          </div>
        )}

        {captions && (
          <div className="mt-10 bg-[#1A192F]/70 backdrop-blur-sm p-6 rounded-lg border border-purple-500/30">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">Social Media Captions</h2>
            <pre className="whitespace-pre-wrap bg-[#1A192F] p-4 rounded-md border border-purple-500">{captions}</pre>
          </div>
        )}
      </div>
    </main>
  );
}