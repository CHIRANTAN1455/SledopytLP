import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const LOGOS = [
  { id: "01-cursor-pathfinder", title: "01 — Cursor Pathfinder", desc: "Terminal cursor leaving a constellation trail." },
  { id: "02-ascii-arrow", title: "02 — ASCII Signal", desc: "Monospace arrow with a blue status dot." },
  { id: "03-neural-constellation-s", title: "03 — Neural Constellation S", desc: "Five-node star-graph forming the letter S." },
  { id: "04-loading-bar-wordmark", title: "04 — Loading Bar Wordmark", desc: "Wordmark with an embedded progress bar." },
];

export default function LogoIdeas() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link
          to="/"
          data-testid="back-home-link"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-10"
        >
          <ArrowLeft size={16} /> back to site
        </Link>

        <div className="mb-12">
          <p className="text-[#4285F4] text-sm mb-2">// logo concepts</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            Sledopyt <span className="text-[#4285F4]">AI</span> — logo ideas
          </h1>
          <p className="text-white/50 mt-4 max-w-2xl text-sm">
            Four directions generated against the brand language: dark terminal, monospace,
            blue accent, pathfinder meaning. Click any image to open at full size.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LOGOS.map((l) => (
            <a
              key={l.id}
              href={`/assets/logos/${l.id}.png`}
              target="_blank"
              rel="noreferrer"
              data-testid={`logo-card-${l.id}`}
              className="group block border border-white/10 rounded-xl overflow-hidden bg-[#08080a] hover:border-[#4285F4]/60 transition-colors"
            >
              <div className="aspect-square bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={`/assets/logos/${l.id}.png`}
                  alt={l.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-5 border-t border-white/10">
                <p className="text-sm text-white/90">{l.title}</p>
                <p className="text-xs text-white/40 mt-1">{l.desc}</p>
              </div>
            </a>
          ))}
        </div>

        <p className="text-white/30 text-xs mt-10">
          Tell me which number(s) you like — I can iterate on color, weight, spacing, or generate fresh variants.
        </p>
      </div>
    </div>
  );
}
