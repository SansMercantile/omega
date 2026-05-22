/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CONSTELLATION_SYSTEMS, System } from "../data";
import { Network, Sparkles, Cpu, Layers, Compass, ArrowUpRight } from "lucide-react";

export default function ConstellationVisualizer() {
  const [selectedSystem, setSelectedSystem] = useState<System>(
    CONSTELLATION_SYSTEMS.find((s) => s.id === "omega") || CONSTELLATION_SYSTEMS[0]
  );
  
  // Custom slow orbital animation variables for nodes
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.15) % 360);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Compute position on circle for each surrounding system
  const getCoordinates = (index: number, total: number, radius: number) => {
    // Offset Omega itself (first in array), and layout the others on a circle
    const count = total - 1;
    const itemIndex = index - 1;
    if (index === 0) {
      // Omega is the absolute center
      return { x: 250, y: 250 };
    }
    const baseAngle = (itemIndex / count) * 2 * Math.PI;
    const dynamicAngle = baseAngle + (rotationAngle * Math.PI) / 180;
    return {
      x: 250 + radius * Math.cos(dynamicAngle),
      y: 250 + radius * Math.sin(dynamicAngle),
    };
  };

  return (
    <div id="constellation" className="w-full bg-white border border-slate-100 rounded-none shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-6 sm:p-10">
      <div className="flex flex-col lg:flex-row gap-10 items-stretch">
        
        {/* Left Telemetry/Info Deck */}
        <div className="w-full lg:w-5/12 flex flex-col justify-between py-2">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900 animate-ping" />
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-slate-400 font-bold">
                The 21-System Constellation
              </span>
            </div>
            
            <h3 className="text-3xl font-black text-slate-950 tracking-tight leading-none mb-4">
              Symbiosis Matrix
            </h3>
            
            <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
              Omega represents the digital nervous system coordinating parallel clinical research, zero-trust trial ledgers, and global environmental pathogen biosensors into a unified medical AI ecosystem.
            </p>

            {/* Selected Node Spec Sheet */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSystem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-50 border border-slate-100 p-6 relative overflow-hidden"
              >
                {/* Visual back logo tint */}
                <div className="absolute -right-6 -bottom-6 text-slate-200/40 font-black text-6xl select-none uppercase pointer-events-none">
                  {selectedSystem.name.slice(0, 3)}
                </div>

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[9px] font-mono bg-slate-200/60 text-slate-700 px-2.5 py-1 rounded-none uppercase font-bold tracking-wider">
                      {selectedSystem.category}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mt-2 uppercase tracking-wide">
                      {selectedSystem.name}
                    </h4>
                  </div>
                  <div className="h-8 w-8 rounded-none border border-slate-200 bg-white flex items-center justify-center text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                    <span className="text-xs font-mono font-bold">
                      {CONSTELLATION_SYSTEMS.indexOf(selectedSystem) + 1}
                    </span>
                  </div>
                </div>

                <p className="text-slate-650 font-sans italic text-xs mb-3 text-slate-600">
                  &ldquo;{selectedSystem.tagline}&rdquo;
                </p>

                <p className="text-slate-500 text-xs leading-relaxed mb-4">
                  {selectedSystem.description}
                </p>

                <div className="border-t border-slate-200/60 pt-4 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">Node Autonomy Status:</span>
                  <span className={selectedSystem.id === "omega" ? "text-slate-950 font-bold" : "text-slate-600"}>
                    {selectedSystem.id === "omega" ? "PRIMARY CO-COORDINATOR" : "ACTIVE SYMBIOSIS Core"}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-slate-50 border border-slate-100 p-4">
                <div className="text-slate-400 uppercase tracking-widest text-[9px] font-bold">Global Synchrony</div>
                <div className="text-lg font-bold text-slate-900 mt-1">99.999%</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4">
                <div className="text-slate-400 uppercase tracking-widest text-[9px] font-bold">Relational Nodes</div>
                <div className="text-lg font-bold text-slate-900 mt-1 flex items-center gap-1">
                  21 Active <ArrowUpRight className="h-3.5 w-3.5 text-slate-900" />
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-mono mt-4 text-center">
              Constellation system metrics normalized to Sans Mercantile strategic models.
            </p>
          </div>
        </div>

        {/* Right Constellation Plotter */}
        <div className="w-full lg:w-7/12 flex items-center justify-center bg-slate-50 rounded-none border border-slate-100 relative min-h-[400px] sm:min-h-[500px]">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:30px_30px] opacity-40 pointer-events-none" />
          
          <div className="absolute top-4 right-4 bg-white border border-slate-100 px-3 py-1.5 rounded-none text-[9px] font-mono text-slate-500 z-10 flex items-center gap-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] uppercase tracking-wider font-bold">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-slate-900"></span>
            </span>
            Interactive Sensor Plotter
          </div>

          <div className="relative w-full aspect-square max-w-[480px]">
            <svg
              className="w-full h-full"
              viewBox="0 0 500 500"
              style={{ overflow: "visible" }}
            >
              <defs>
                <radialGradient id="omega-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0f172a" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f1f5f9" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Orbiting rings */}
              <circle
                cx="250"
                cy="250"
                r="180"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              <circle
                cx="250"
                cy="250"
                r="110"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="1"
              />

              {/* Dynamic connecting lines */}
              {CONSTELLATION_SYSTEMS.map((sys, idx) => {
                const targetCoord = getCoordinates(idx, CONSTELLATION_SYSTEMS.length, 180);
                const isSelected = selectedSystem.id === sys.id;
                return (
                  <g key={`line-${sys.id}`}>
                    {idx > 0 && (
                      <line
                        x1="250"
                        y1="250"
                        x2={targetCoord.x}
                        y2={targetCoord.y}
                        stroke={isSelected ? "#020617" : "#cbd5e1"}
                        strokeWidth={isSelected ? 1.5 : 0.8}
                        strokeOpacity={isSelected ? 0.9 : 0.4}
                        className="transition-all duration-300"
                      />
                    )}
                    {idx > 0 && isSelected && (
                      <circle
                        cx={targetCoord.x}
                        cy={targetCoord.y}
                        r="18"
                        fill="none"
                        stroke="#0f172a"
                        strokeWidth="1"
                        strokeDasharray="2 3"
                        className="animate-[spin_12s_linear_infinite]"
                      />
                    )}
                  </g>
                );
              })}

              {/* Central Omega Glow background */}
              <circle cx="250" cy="250" r="85" fill="url(#omega-glow)" />

              {/* Center Omega Core Node */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedSystem(CONSTELLATION_SYSTEMS[0])}
              >
                <circle
                  cx="250"
                  cy="250"
                  r="28"
                  fill="#ffffff"
                  stroke={selectedSystem.id === "omega" ? "#0f172a" : "#94a3b8"}
                  strokeWidth="2"
                  className="transition-all duration-300 group-hover:scale-105 shadow-sm"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="23"
                  fill="#fafafa"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
                <text
                  x="250"
                  y="254"
                  textAnchor="middle"
                  fill={selectedSystem.id === "omega" ? "#0f172a" : "#475569"}
                  className="font-mono text-[9px] font-bold tracking-tight select-none"
                >
                  Ω Core
                </text>
              </g>

              {/* Outer surrounding systems */}
              {CONSTELLATION_SYSTEMS.map((sys, idx) => {
                if (idx === 0) return null; // Skip central Omega
                const coord = getCoordinates(idx, CONSTELLATION_SYSTEMS.length, 180);
                const isSelected = selectedSystem.id === sys.id;

                return (
                  <g
                    key={`node-${sys.id}`}
                    className="cursor-pointer group"
                    onClick={() => setSelectedSystem(sys)}
                  >
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r="20"
                      fill="url(#node-glow)"
                      className="pointer-events-none opacity-50"
                    />
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r="14"
                      fill="#ffffff"
                      stroke={isSelected ? "#0f172a" : "#cbd5e1"}
                      strokeWidth={isSelected ? 2 : 1.2}
                      className="transition-all duration-300 group-hover:stroke-slate-900 group-hover:scale-110 shadow-sm"
                    />
                    <text
                      x={coord.x}
                      y={coord.y + 3}
                      textAnchor="middle"
                      fill={isSelected ? "#0f172a" : "#64748b"}
                      className="font-mono text-[8px] font-bold select-none group-hover:text-slate-900 transition-colors duration-200"
                    >
                      {sys.name.slice(0, 3).toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hint label inside the plotter */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white border border-slate-100 text-[9px] font-mono px-4 py-1.5 rounded-none text-slate-400 text-center pointer-events-none uppercase tracking-wider font-semibold">
              Select node to activate relational telemetry
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
