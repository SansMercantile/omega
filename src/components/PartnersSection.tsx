/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { CheckCircle, ShieldAlert, Cpu, Heart, Network } from "lucide-react";

export interface Partner {
  id: string;
  name: string;
  subLabel: string;
  description: string;
  logoSvg: React.ReactNode;
  website: string;
}

const PARTNERS: Partner[] = [
  {
    id: "research",
    name: "Global Proteomic Science",
    subLabel: "Bio-Folding Model Array",
    description: "Advanced proteomic fold forecasting vectors and clinical disease prediction maps integrated directly into active core medical pipelines.",
    website: "https://sansmercantile.com/systems/",
    logoSvg: (
      <svg viewBox="0 0 24 24" className="h-6 w-auto fill-none stroke-current stroke-2 text-slate-800" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12,2 22,8.5 22,20 12,25.5 2,20 2,8.5" />
        <circle cx="12" cy="14" r="4" />
      </svg>
    ),
  },
  {
    id: "clinical",
    name: "Autonomous GPT Core",
    subLabel: "Clinical Inference Engine",
    description: "Advanced clinical reasoning nodes authorizing zero-knowledge, high-context clinical consultation summarization schemas and diagnostics.",
    website: "https://sansmercantile.com/platform/",
    logoSvg: (
      <svg viewBox="0 0 24 24" className="h-6 w-auto fill-none stroke-current stroke-2 text-slate-800" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: "acceleration",
    name: "Physics Acceleration Engine",
    subLabel: "BioNeMo & Fluid-ML Core",
    description: "Multi-modal model structural training matrices and accelerated physics tensor computations rendering fluid biome dynamics beautifully.",
    website: "https://sansmercantile.com/about/",
    logoSvg: (
      <svg viewBox="0 0 24 24" className="h-6 w-auto fill-none stroke-current stroke-2 text-slate-800" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
      </svg>
    ),
  }
];

export default function PartnersSection() {
  return (
    <div className="w-full bg-slate-50 border border-slate-100 p-8 sm:p-12 relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute right-0 top-0 h-40 w-40 bg-radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.02)_0%,transparent_60%) pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Title Block */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span className="text-[9px] font-mono tracking-[0.3em] font-black uppercase text-slate-400">
              COLLABORATION LEDGER
            </span>
          </div>
          <h3 className="text-2xl font-black tracking-tight text-slate-950 uppercase">
            Om-Grid Ecosystem Partners
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light">
            Sans Mercantile coordinates directly with leading global scientific AI developers and computational physics architectures to anchor the Omega clinical matrix.
          </p>
        </div>

        {/* Brand Grid list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {PARTNERS.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-slate-150 p-6 flex flex-col justify-between transition-all duration-200 hover:border-slate-900 group"
            >
              <div className="space-y-4">
                {/* Logo and Status */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div className="p-3 bg-slate-50 border border-slate-200 group-hover:border-slate-900 transition-colors">
                    {p.logoSvg}
                  </div>
                  <span className="text-[8.5px] font-mono font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 animate-pulse">
                    Live Link
                  </span>
                </div>

                {/* Info Text */}
                <div>
                  <h4 className="text-sm font-black text-slate-950 uppercase tracking-tight">
                    {p.name}
                  </h4>
                  <span className="text-[9px] font-mono text-slate-400 uppercase font-black tracking-wider block mt-0.5">
                    {p.subLabel}
                  </span>
                  <p className="text-slate-500 text-xs leading-relaxed font-light mt-3">
                    {p.description}
                  </p>
                </div>
              </div>

              {/* Footer link to partner portal */}
              <div className="mt-6 pt-4 border-t border-slate-50">
                <a
                  href={p.website}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="text-[9.5px] font-mono font-black text-slate-800 uppercase tracking-wider hover:text-orange-500 flex items-center gap-1 transition-colors"
                >
                  Verify Open-Source Repo ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Consensus Verification Footnote */}
        <div className="border-t border-slate-200 pb-2 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-mono text-slate-400 uppercase font-bold">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
            <span>Consensus Ledger Status: SECURE VALIDATED SYNC</span>
          </div>
          <div>
            SSL Node Hash: sha256_peer_exchange_verified
          </div>
        </div>

      </div>
    </div>
  );
}
