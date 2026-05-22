/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Compass, ShieldCheck, Cpu, ArrowDown, ExternalLink } from "lucide-react";
import BrandName from "./BrandName";

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full py-16 sm:py-24 flex flex-col items-center justify-center overflow-hidden border-b border-slate-100">
      
      {/* Decorative vector matrix overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.015)_0%,transparent_65%)] pointer-events-none" />

      {/* Brand Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center space-y-3 mb-8"
      >
        <BrandName className="text-base tracking-[0.05em] scale-110 mb-1" withLogo={true} logoSizeClassName="h-6 w-6" />
        <div className="flex items-center gap-1.5 text-[9px] sm:text-xs font-mono text-slate-500 tracking-widest uppercase">
          <span>Reimagine</span>
          <span className="text-slate-300">•</span>
          <span>Rebuild</span>
          <span className="text-slate-300">•</span>
          <span>Transcend</span>
        </div>
      </motion.div>

      {/* Big Display Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-center max-w-4xl px-4"
      >
        <span className="inline-block py-1 px-3 border border-slate-200 text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-6 bg-slate-50">
          Model 2.0 // Active Grid Node
        </span>
        <h1 className="text-5xl sm:text-8xl lg:text-[100px] font-black tracking-tighter leading-[0.85] mb-6 text-black">
          OMEGA<span className="text-slate-350 text-orange-500">.</span>
        </h1>
        <p className="font-mono text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed uppercase tracking-wider">
          The revolutionary medical AI ecosystem of the global biosphere.
        </p>
      </motion.div>

      {/* Center Sub-lead & Purpose Statement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-center max-w-2xl px-6 mt-6 pb-2"
      >
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-light italic">
          An intelligent clinical intelligence, genomics, and therapeutics engine. Directing real-time pathogen forecasts, sub-nanometer cure synthesis, cellular senescence reversal, and localized molecular fabrication.
        </p>
      </motion.div>

      {/* Hero Interactive Anchor Rails */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl px-4 mt-12 z-10"
      >
        <div
          onClick={() => scrollToSection("constellation")}
          style={{ cursor: "pointer" }}
          className="group bg-white border border-slate-100 hover:border-slate-900 p-6 transition-all duration-250 cursor-pointer flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
        >
          <div>
            <div className="w-1.5 h-[1.5px] bg-slate-900 mb-4 group-hover:w-8 transition-all duration-300"></div>
            <h4 className="text-slate-900 text-xs font-bold uppercase tracking-widest mb-2">
              Grid Constellation
            </h4>
            <p className="text-slate-450 text-slate-500 text-xs leading-relaxed">
              Analyze symbiotic relations with specialized patient privacy ledgers and healthcare funding networks.
            </p>
          </div>
          <span className="text-[10px] font-mono text-slate-900 mt-6 flex items-center gap-1.5 font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
            Go to Node Map <ArrowDown className="h-3 w-3" />
          </span>
        </div>

        <div
          onClick={() => scrollToSection("simulator")}
          style={{ cursor: "pointer" }}
          className="group bg-white border border-slate-100 hover:border-slate-900 p-6 transition-all duration-250 cursor-pointer flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
        >
          <div>
            <div className="w-1.5 h-[1.5px] bg-slate-900 mb-4 group-hover:w-8 transition-all duration-300"></div>
            <h4 className="text-slate-900 text-xs font-bold uppercase tracking-widest mb-2">
              Treatment Simulator
            </h4>
            <p className="text-slate-450 text-slate-500 text-xs leading-relaxed">
              Stress epidemiological channels, track continuous vaccine arrays, and scroll clinical logs.
            </p>
          </div>
          <span className="text-[10px] font-mono text-slate-900 mt-6 flex items-center gap-1.5 font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
            Go to Simulation <ArrowDown className="h-3 w-3" />
          </span>
        </div>

        <div
          onClick={() => scrollToSection("configurator")}
          style={{ cursor: "pointer" }}
          className="group bg-white border border-slate-100 hover:border-slate-900 p-6 transition-all duration-250 cursor-pointer flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
        >
          <div>
            <div className="w-1.5 h-[1.5px] bg-slate-900 mb-4 group-hover:w-8 transition-all duration-300"></div>
            <h4 className="text-slate-900 text-xs font-bold uppercase tracking-widest mb-2">
              Clinical Configurator
            </h4>
            <p className="text-slate-450 text-slate-500 text-xs leading-relaxed">
              Compile regional clinic deployment specs endorsed by M.P. Khoza, Sr.
            </p>
          </div>
          <span className="text-[10px] font-mono text-slate-900 mt-6 flex items-center gap-1.5 font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
            Begin Configuration <ArrowDown className="h-3 w-3" />
          </span>
        </div>
      </motion.div>

      {/* External Reference Link to standard portal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 hover:text-slate-600 transition-colors"
      >
        <span>Accessing live nodes on</span>
        <a
          href="https://sansmercantile.com"
          target="_blank"
          referrerPolicy="no-referrer"
          className="text-slate-900 hover:underline flex items-center gap-0.5 font-bold"
        >
          sansmercantile.com <ExternalLink className="h-3 w-3 inline" />
        </a>
      </motion.div>
    </div>
  );
}
