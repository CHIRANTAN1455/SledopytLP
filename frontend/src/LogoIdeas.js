import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CODER_LOGOS = [
  { id: "01-cursor-pathfinder", title: "01 — Cursor Pathfinder", desc: "Terminal cursor leaving a constellation trail." },
  { id: "02-ascii-arrow", title: "02 — ASCII Signal", desc: "Monospace arrow with a blue status dot." },
  { id: "03-neural-constellation-s", title: "03 — Neural Constellation S", desc: "Five-node star-graph forming the letter S." },
  { id: "04-loading-bar-wordmark", title: "04 — Loading Bar Wordmark", desc: "Wordmark with an embedded progress bar." },
];

const GENZ_LOGOS = [
  { id: "05-y2k-chrome", title: "05 — Y2K Chrome", desc: "Liquid chrome blob, Frutiger Aero, holographic." },
  { id: "06-acid-sticker", title: "06 — Acid Sticker", desc: "Die-cut sticker, lime + electric blue, streetwear." },
  { id: "07-pixel-mascot", title: "07 — Pixel Mascot", desc: "8-bit tracker with binoculars, Game Boy palette." },
  { id: "08-vaporwave-glitch", title: "08 — Vaporwave Glitch", desc: "RGB-split wordmark, neon grid, VHS scanlines." },
  { id: "09-squishy-3d", title: "09 — Squishy 3D", desc: "Inflated jelly letters, pastel iridescent." },
  { id: "10-brutalist-zine", title: "10 — Brutalist Zine", desc: "Hi-contrast yellow, photocopy punk-flyer." },
];

const TREND_LOGOS = [
  { id: "11-blurtail-wordmark", title: "11 — BlurTail Wordmark", desc: "Wordmark with gradient motion-blur trail." },
  { id: "12-blurtail-letter-s", title: "12 — BlurTail 'S'", desc: "Solid S with ghosted afterimages fading off." },
  { id: "13-blurtail-arrow", title: "13 — BlurTail Arrow", desc: "Cursor-arrow with soft vapor trail." },
  { id: "14-scaler-S-bars", title: "14 — Scaler S-Bars", desc: "Letter S built from progressive vertical bars." },
  { id: "15-scaler-stepped-stairs", title: "15 — Scaler Equalizer", desc: "Ascending bar-chart staircase above wordmark." },
  { id: "16-scaler-footprint-path", title: "16 — Scaler Path", desc: "Stepped strokes that form a receding path." },
];

function LogoGrid({ items, light = false }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((l) => (
        <a
          key={l.id}
          href={`/assets/logos/${l.id}.png`}
          target="_blank"
          rel="noreferrer"
          data-testid={`logo-card-${l.id}`}
          className="group block border border-white/10 rounded-xl overflow-hidden bg-[#08080a] hover:border-[#4285F4]/60 transition-colors"
        >
          <div className={`aspect-square ${light ? "bg-white" : "bg-black"} flex items-center justify-center overflow-hidden`}>
            <img
              src={`/assets/logos/${l.id}.png`}
              alt={l.title}
              loading="lazy"
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
  );
}

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
            Two collections: a coder-aesthetic set matching the current site, and
            a Gen-Z set pushing into chrome, stickers, pixel art and brutalism. Click any
            image to open at full size.
          </p>
        </div>

        <div className="mb-6">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-4">/ coder set</p>
          <LogoGrid items={CODER_LOGOS} />
        </div>

        <div className="h-12" />

        <div className="mb-6">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-4">/ gen-z directions</p>
          <LogoGrid items={GENZ_LOGOS} />
        </div>

        <div className="h-12" />

        <div className="mb-6">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-4">
            / 2025 trends — blurtails &amp; scalers
          </p>
          <p className="text-white/40 text-xs mb-4 max-w-2xl">
            Inspired by the LogoLounge 2025 reports. BlurTails leave gradient motion
            trails (mirrors Sledopyt = pathfinder). Scalers use progressive stepped
            strokes for momentum and direction.
          </p>
          <LogoGrid items={TREND_LOGOS} light />
        </div>

        <p className="text-white/30 text-xs mt-12">
          Tell me which number(s) you like — I can iterate on color, weight, spacing, or generate fresh variants.
        </p>
      </div>
    </div>
  );
}
