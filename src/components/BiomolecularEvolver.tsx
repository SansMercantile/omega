/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, RefreshCw, Cpu, Heart, Trees as Vessel, Layers } from "lucide-react";

type OrganType = "dna" | "heart" | "vessels" | "liver" | "limb";

interface StageLog {
  timestamp: string;
  stage: string;
  message: string;
}

export default function BiomolecularEvolver({ className = "" }: { className?: string }) {
  const [evolution, setEvolution] = useState<{
    stage: "atom" | "splitting" | "organogenesis" | "organ";
    organ: OrganType;
    progress: number;
    logs: StageLog[];
  }>(() => {
    const initialTime = new Date().toLocaleTimeString();
    return {
      stage: "atom",
      organ: "dna",
      progress: 0,
      logs: [
        {
          timestamp: initialTime,
          stage: "ATOM CORE",
          message: "Initial somatic atom materialized. Magnetic polarity stabilizing."
        }
      ]
    };
  });

  const { stage, organ, progress, logs } = evolution;

  // Array of organs to cycle through randomly or sequentially
  const organs: OrganType[] = ["dna", "heart", "vessels", "liver", "limb"];

  // Dynamic timer config for slow development of the biological structure without re-render loops
  useEffect(() => {
    const interval = setInterval(() => {
      setEvolution((prev) => {
        let nextProgress = prev.progress + 1.25; // complete cycle takes approx 80 ticks, slow & steady
        let nextOrgan = prev.organ;

        if (nextProgress >= 100) {
          nextProgress = 0;
          const currentIndex = organs.indexOf(prev.organ);
          const nextIndex = (currentIndex + 1) % organs.length;
          nextOrgan = organs[nextIndex];
        }

        // Determine target stage and logs cleanly based on numerical thresholds
        let nextStage: "atom" | "splitting" | "organogenesis" | "organ" = "atom";
        let message = "";
        let stageName = "";

        if (nextProgress < 25) {
          nextStage = "atom";
          stageName = "Atom Core";
          message = "Initial somatic atom materialized. Magnetic polarity stabilizing.";
        } else if (nextProgress < 50) {
          nextStage = "splitting";
          stageName = "Cell Division";
          message = "Mitotic fission initiated. Atom core splitting into blastomeric clusters.";
        } else if (nextProgress < 75) {
          nextStage = "organogenesis";
          stageName = "Organogenesis";
          message = `Pre-differentiation stage. Mapping morphogenetic boundaries for target structure: ${nextOrgan.toUpperCase()}.`;
        } else {
          nextStage = "organ";
          stageName = "Matured Organ";
          message = `Structural assembly complete. Active [${nextOrgan.toUpperCase()}] organic structure fully integrated.`;
        }

        let nextLogs = prev.logs;
        if (nextStage !== prev.stage || nextProgress === 0) {
          const time = new Date().toLocaleTimeString();
          nextLogs = [
            { timestamp: time, stage: stageName.toUpperCase(), message },
            ...prev.logs.slice(0, 5)
          ];
        }

        return {
          progress: nextProgress,
          stage: nextStage,
          organ: nextOrgan,
          logs: nextLogs,
        };
      });
    }, 1000); // 1 tick per second. Full evolution flow: 80 seconds. Very steady and beautiful!

    return () => {
      clearInterval(interval);
    };
  }, []);

  // SVG dimensions & layouts
  const size = 260;
  const center = size / 2;

  // Render SVG content dynamically based on phase and target organ
  const renderInteractiveSvg = () => {
    if (stage === "atom") {
      return (
        <g>
          {/* Scientific Bohr / Quantum 3D Elliptical Orbiting Shells */}
          
          {/* Orbital path 1, tilted 30 degrees */}
          <g transform={`translate(${center}, ${center}) rotate(30) scale(1, 0.32)`}>
            <circle
              cx={0}
              cy={0}
              r={68}
              fill="none"
              stroke="rgba(15, 23, 42, 0.16)"
              strokeWidth="1.25"
              strokeDasharray="3 3"
            />
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            >
              <circle cx={68} cy={0} r={4.5} className="fill-orange-500" />
              <circle cx={68} cy={0} r={11} className="fill-orange-500/25 blur-[3px] pointer-events-none" />
            </motion.g>
          </g>

          {/* Orbital path 2, tilted 150 degrees */}
          <g transform={`translate(${center}, ${center}) rotate(150) scale(1, 0.32)`}>
            <circle
              cx={0}
              cy={0}
              r={68}
              fill="none"
              stroke="rgba(15, 23, 42, 0.16)"
              strokeWidth="1.25"
              strokeDasharray="3 3"
            />
            <motion.g
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "linear" }}
            >
              <circle cx={68} cy={0} r={4.5} className="fill-slate-950" />
              <circle cx={68} cy={0} r={11} className="fill-slate-950/20 blur-[3px] pointer-events-none" />
            </motion.g>
          </g>

          {/* Orbital path 3, tilted 270 degrees */}
          <g transform={`translate(${center}, ${center}) rotate(270) scale(1, 0.32)`}>
            <circle
              cx={0}
              cy={0}
              r={68}
              fill="none"
              stroke="rgba(15, 23, 42, 0.16)"
              strokeWidth="1.25"
              strokeDasharray="3 3"
            />
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
            >
              <circle cx={68} cy={0} r={4} className="fill-orange-600" />
              <circle cx={68} cy={0} r={10} className="fill-orange-600/20 blur-[3px] pointer-events-none" />
            </motion.g>
          </g>

          {/* Sub-shells & electron probability wave clouds (quantum hum) */}
          <motion.circle
            cx={center}
            cy={center}
            r={30}
            fill="none"
            stroke="rgba(249, 115, 22, 0.08)"
            strokeWidth="0.75"
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          />
          <motion.circle
            cx={center}
            cy={center}
            r={45}
            fill="none"
            stroke="rgba(15, 23, 42, 0.05)"
            strokeWidth="0.5"
            animate={{ scale: [1.05, 0.95, 1.05] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
          />

          {/* Quantum Nucleonics Cluster: overlapping protons & neutrons trembling under strong force */}
          <g transform={`translate(${center}, ${center})`}>
            {/* Core energy background glow */}
            <circle
              cx={0}
              cy={0}
              r={25}
              className="fill-orange-500/10 blur-md pointer-events-none"
            />

            <motion.g
              animate={{
                x: [0, 0.8, -0.6, 0.4, -0.7, 0.5, 0],
                y: [0, -0.7, 0.8, -0.5, 0.6, -0.4, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 0.18,
                ease: "linear"
              }}
            >
              {/* Protons: styled with orange/red spherical gradients */}
              {/* Neutrons: styled with slate/charcoal metallic colors */}
              
              {/* Particle 1: Proton */}
              <circle cx={-3.5} cy={-4} r={6.5} className="fill-orange-500 stroke-orange-600/30 stroke-[0.5]" />
              {/* Particle 2: Neutron */}
              <circle cx={4.5} cy={-5} r={6.5} className="fill-slate-800 stroke-slate-950/20 stroke-[0.5]" />
              {/* Particle 3: Proton */}
              <circle cx={-6} cy={3} r={6} className="fill-orange-600 stroke-orange-700/30 stroke-[0.5]" />
              {/* Particle 4: Neutron */}
              <circle cx={5} cy={4} r={6} className="fill-slate-900 stroke-slate-950/20 stroke-[0.5]" />
              {/* Particle 5: Proton */}
              <circle cx={0.5} cy={6} r={6.5} className="fill-orange-500 stroke-orange-600/30 stroke-[0.5]" />
              {/* Particle 6: Neutron */}
              <circle cx={-1} cy={-7.5} r={6} className="fill-slate-800 stroke-slate-950/20 stroke-[0.5]" />
              {/* Particle 7: Proton (Center Cap) */}
              <circle cx={0} cy={0} r={6.5} className="fill-orange-500 stroke-orange-600/40 stroke-[0.5]" />
              
              {/* Tiny specular highlight overlays for 3D realism */}
              <circle cx={-2} cy={-2} r={1.2} fill="rgba(255,255,255,0.45)" />
              <circle cx={2} cy={-7} r={1} fill="rgba(255,255,255,0.3)" />
              <circle cx={-5} cy={1} r={1} fill="rgba(255,255,255,0.4)" />
              <circle cx={3.5} cy={2.5} r={1} fill="rgba(255,255,255,0.3)" />
            </motion.g>
          </g>
        </g>
      );
    }

    if (stage === "splitting") {
      return (
        <g>
          {/* Visual division circles diverging */}
          <motion.g
            animate={{ 
              x: [-10, -25, -20, -10],
              y: [-10, -20, -15, -10]
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <circle cx={center} cy={center} r={14} fill="none" stroke="rgba(15, 23, 42, 0.8)" strokeWidth="1.5" />
            <circle cx={center} cy={center} r={4} className="fill-orange-500" />
          </motion.g>

          <motion.g
            animate={{ 
              x: [10, 25, 18, 10],
              y: [10, 20, 14, 10]
            }}
            transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
          >
            <circle cx={center} cy={center} r={12} fill="none" stroke="rgba(15, 23, 42, 0.8)" strokeWidth="1.5" />
            <circle cx={center} cy={center} r={3} className="fill-slate-900" />
          </motion.g>

          <motion.g
            animate={{ 
              x: [-20, 10, -5, -20],
              y: [15, -15, 5, 15]
            }}
            transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
          >
            <circle cx={center} cy={center} r={10} fill="none" stroke="rgba(15, 23, 42, 0.4)" strokeWidth="1" />
            <circle cx={center} cy={center} r={2} className="fill-slate-500" />
          </motion.g>

          <motion.g
            animate={{ 
              x: [20, -15, 10, 20],
              y: [-15, 15, -10, -15]
            }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <circle cx={center} cy={center} r={11} fill="none" stroke="rgba(15, 23, 42, 0.4)" strokeWidth="1" />
            <circle cx={center} cy={center} r={2} className="fill-orange-400" />
          </motion.g>

          {/* Dotted lattice connections showing splitting threads */}
          <line
            x1={center - 15}
            y1={center - 15}
            x2={center + 15}
            y2={center + 15}
            stroke="rgba(249, 115, 22, 0.3)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <line
            x1={center - 20}
            y1={center + 15}
            x2={center + 20}
            y2={center - 15}
            stroke="rgba(15, 23, 42, 0.2)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        </g>
      );
    }

    if (stage === "organogenesis") {
      // Cellular ghost wireframes blending with incoming organ shape outlines
      return (
        <g>
          {/* Concentric expanding pulses */}
          <motion.circle
            cx={center}
            cy={center}
            r={60}
            fill="none"
            stroke="rgba(249, 115, 22, 0.15)"
            strokeWidth="1"
            animate={{ scale: [0.6, 1.2], opacity: [0.8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeOut" }}
          />

          {/* Scaffolding points */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 2 * Math.PI) / 12;
            const r = 55;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={1.5} className="fill-slate-900" />
                <line
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="rgba(15, 23, 42, 0.05)"
                  strokeWidth="0.5"
                />
              </g>
            );
          })}

          {/* Faint placeholder of the organ geometry itself */}
          <g opacity="0.25" className="stroke-slate-900" strokeWidth="1" fill="none">
            {renderOrganGeometry(organ, true)}
          </g>

          {/* Reconstruction scanning horizontal line */}
          <motion.line
            x1={center - 70}
            y1={20}
            x2={center + 70}
            y2={20}
            stroke="rgb(249, 115, 22)"
            strokeWidth="1.5"
            animate={{ y: [40, size - 40, 40] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        </g>
      );
    }

    if (stage === "organ") {
      // Complete beautifully animated organ wireframe
      return (
        <g>
          {/* Main glowing anatomical vector with motion paths */}
          {renderOrganGeometry(organ, false)}

          {/* Subtly pulse background ambient medical grids */}
          <circle
            cx={center}
            cy={center}
            r={75}
            fill="none"
            stroke="rgba(249, 115, 22, 0.1)"
            strokeWidth="0.5"
            strokeDasharray="1 5"
          />
        </g>
      );
    }
  };

  // Helper vectors for rendering various organs beautifully
  const renderOrganGeometry = (type: OrganType, isPlaceholder: boolean) => {
    const strokeCol = isPlaceholder ? "rgba(148, 163, 184, 0.4)" : "rgb(15, 23, 42)";
    const strokeWidth = isPlaceholder ? "1" : "1.75";

    switch (type) {
      case "dna":
        // Beautiful twisting double helix with connecting bases
        return (
          <g>
            <motion.path
              d={`M ${center - 50} ${center - 40} Q ${center - 25} ${center - 80}, ${center} ${center - 40} T ${center + 50} ${center - 40}`}
              fill="none"
              stroke={strokeCol}
              strokeWidth={strokeWidth}
              animate={isPlaceholder ? {} : { strokeDashoffset: [0, 40] }}
              strokeDasharray="6 3"
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            />
            <motion.path
              d={`M ${center - 50} ${center + 40} Q ${center - 25} ${center}, ${center} ${center + 40} T ${center + 50} ${center + 40}`}
              fill="none"
              stroke={strokeCol}
              strokeWidth={strokeWidth}
              animate={isPlaceholder ? {} : { strokeDashoffset: [0, -40] }}
              strokeDasharray="6 3"
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            />
            {/* Base pairs linking them */}
            {[...Array(9)].map((_, idx) => {
              const xPos = center - 40 + idx * 10;
              // Simple calculated heights based on sin curves to connect
              const yOffset = Math.sin((idx * Math.PI) / 4) * 20;
              return (
                <line
                  key={idx}
                  x1={xPos}
                  y1={center - yOffset}
                  x2={xPos}
                  y2={center + yOffset}
                  stroke={isPlaceholder ? "rgba(148, 163, 184, 0.2)" : "rgba(249,115,22,0.8)"}
                  strokeWidth="1"
                />
              );
            })}
          </g>
        );

      case "heart":
        // Smooth medical outline of a human heart
        return (
          <motion.g
            animate={isPlaceholder ? {} : { scale: [1, 1.04, 1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            {/* Cardiac aorta pathways */}
            <path
              d={`M ${center - 10} ${center - 45} L ${center - 10} ${center - 25} M ${center + 5} ${center - 48} L ${center + 5} ${center - 25}`}
              stroke={isPlaceholder ? "rgba(148, 163, 184, 0.2)" : "rgba(249,115,22,0.6)"}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Main cardiac muscle body shape */}
            <path
              d={`M ${center} ${center + 45} 
                 C ${center - 45} ${center + 15}, ${center - 35} ${center - 25}, ${center} ${center - 25}
                 C ${center + 35} ${center - 25}, ${center + 45} ${center + 15}, ${center} ${center + 45} Z`}
              fill="none"
              stroke={strokeCol}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Vascular ventricle lines */}
            <path
              d={`M ${center - 15} ${center - 10} Q ${center - 5} ${center + 15}, ${center - 8} ${center + 35}`}
              fill="none"
              stroke="rgba(148,163,184,0.5)"
              strokeWidth="1"
            />
            <path
              d={`M ${center + 12} ${center - 5} Q ${center + 5} ${center + 12}, ${center} ${center + 30}`}
              fill="none"
              stroke="rgba(249,115,22,0.4)"
              strokeWidth="1"
            />
          </motion.g>
        );

      case "vessels":
        // Branched microvascular trees
        return (
          <g>
            {/* Left and Right Main pulmonary branches */}
            <motion.path
              d={`M ${center} ${center + 50} 
                 C ${center} ${center + 20}, ${center - 20} ${center + 10}, ${center - 30} ${center - 10}
                 C ${center - 40} ${center - 25}, ${center - 25} ${center - 45}, ${center - 45} ${center - 55}`}
              fill="none"
              stroke={strokeCol}
              strokeWidth={strokeWidth}
              animate={isPlaceholder ? {} : { strokeDasharray: ["0, 100", "100, 0"] }}
              transition={{ duration: 4, ease: "easeInOut" }}
            />
            <motion.path
              d={`M ${center} ${center + 50} 
                 C ${center} ${center + 20}, ${center + 20} ${center + 10}, ${center + 30} ${center - 10}
                 C ${center + 40} ${center - 25}, ${center + 25} ${center - 45}, ${center + 45} ${center - 55}`}
              fill="none"
              stroke={strokeCol}
              strokeWidth={strokeWidth}
            />
            {/* Sub-capillary branch points */}
            <path
              d={`M ${center - 30} ${center - 10} Q ${center - 45} ${center - 5}, ${center - 55} ${center - 20}`}
              fill="none"
              stroke="rgba(249,115,22,0.6)"
              strokeWidth="1"
            />
            <path
              d={`M ${center + 30} ${center - 10} Q ${center + 45} ${center - 5}, ${center + 55} ${center - 20}`}
              fill="none"
              stroke="rgba(249,115,22,0.6)"
              strokeWidth="1"
            />
            <path
              d={`M ${center - 45} ${center - 55} Q ${center - 35} ${center - 65}, ${center - 25} ${center - 62}`}
              fill="none"
              stroke={strokeCol}
              strokeWidth="0.75"
            />
            <path
              d={`M ${center + 45} ${center - 55} Q ${center + 35} ${center - 65}, ${center + 25} ${center - 62}`}
              fill="none"
              stroke={strokeCol}
              strokeWidth="0.75"
            />
          </g>
        );

      case "liver":
        // Semi-polygon lobular shape of a human liver
        return (
          <g>
            {/* Outer asymmetrical liver boundaries */}
            <motion.path
              d={`M ${center - 65} ${center + 15}
                 C ${center - 55} ${center - 35}, ${center + 35} ${center - 45}, ${center + 60} ${center - 10}
                 C ${center + 70} ${center + 10}, ${center + 40} ${center + 35}, ${center + 15} ${center + 25}
                 C ${center + 5} ${center + 30}, ${center - 25} ${center + 32}, ${center - 65} ${center + 15} Z`}
              fill="none"
              stroke={strokeCol}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              animate={isPlaceholder ? {} : { strokeDasharray: ["60, 20", "20, 60", "60, 20"] }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            />
            {/* Segmenting septum lines & gall bladder spot */}
            <path
              d={`M ${center + 15} ${center - 28} Q ${center + 10} ${center}, ${center + 15} ${center + 25}`}
              fill="none"
              stroke="rgba(148,163,184,0.6)"
              strokeWidth="1.25"
            />
            <circle
              cx={center - 12}
              cy={center + 14}
              r={4}
              className={isPlaceholder ? "fill-slate-300" : "fill-orange-500/80"}
            />
          </g>
        );

      case "limb":
        // Smooth hand bones or limb skeletal architecture
        return (
          <g>
            {/* Wrist / Forearm pivot */}
            <rect
              x={center - 6}
              y={center + 40}
              width="12"
              height="20"
              rx="3"
              fill="none"
              stroke={strokeCol}
              strokeWidth={strokeWidth}
            />
            {/* Palm carpals node */}
            <circle
              cx={center}
              cy={center + 20}
              r={10}
              fill="none"
              stroke={strokeCol}
              strokeWidth={strokeWidth}
            />
            {/* Thumb finger bone path */}
            <path
              d={`M ${center - 8} ${center + 16} L ${center - 28} ${center + 10} L ${center - 42} ${center}`}
              fill="none"
              stroke={strokeCol}
              strokeWidth="1"
            />
            {/* Index finger bone path */}
            <path
              d={`M ${center - 5} ${center + 12} L ${center - 15} ${center - 15} L ${center - 20} ${center - 45}`}
              fill="none"
              stroke={strokeCol}
              strokeWidth="1.25"
            />
            {/* Middle finger bone path */}
            <path
              d={`M ${center} ${center + 10} L ${center} ${center - 22} L ${center} ${center - 55}`}
              fill="none"
              stroke={strokeCol}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            {/* Ring finger bone path */}
            <path
              d={`M ${center + 5} ${center + 12} L ${center + 15} ${center - 15} L ${center + 20} ${center - 45}`}
              fill="none"
              stroke={strokeCol}
              strokeWidth="1.25"
            />
            {/* Pinky finger bone path */}
            <path
              d={`M ${center + 8} ${center + 16} L ${center + 26} ${center + 5} L ${center + 38} ${center - 18}`}
              fill="none"
              stroke={strokeCol}
              strokeWidth="1"
            />

            {/* Glowing bone nodules */}
            {!isPlaceholder && (
              <>
                <circle cx={center - 42} cy={0 + center} r={1.5} className="fill-orange-500" />
                <circle cx={center - 20} cy={-45 + center} r={1.5} className="fill-orange-500" />
                <circle cx={center} cy={-55 + center} r={1.5} className="fill-orange-500" />
                <circle cx={center + 20} cy={-45 + center} r={1.5} className="fill-orange-500" />
                <circle cx={center + 38} cy={-18 + center} r={1.5} className="fill-orange-500" />
              </>
            )}
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`border border-slate-200 bg-white p-6 relative select-none flex flex-col md:flex-row gap-6 items-center shadow-[0_1px_3px_rgba(0,0,0,0.02)] ${className}`}>
      
      {/* Decorative background grid matrix lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      {/* SVG Canvas view */}
      <div className="relative h-[260px] w-[260px] border border-slate-100 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
          {renderInteractiveSvg()}
        </svg>

        {/* Floating progress marker ring */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-0.5 bg-slate-900 text-white font-mono text-[8px] uppercase font-bold tracking-widest">
          <RefreshCw className="h-2 w-2 animate-spin-slow text-orange-400" />
          {progress.toFixed(0)}% Assembly
        </div>

        {/* Floating badge for Active Phase */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 border border-slate-200 bg-white font-mono text-[7px] text-slate-500 uppercase font-black">
          <Activity className="h-2 w-2 text-slate-950" />
          Phase: {stage}
        </div>
      </div>

      {/* Narrative block */}
      <div className="flex-1 flex flex-col justify-between h-full space-y-4 text-left w-full self-stretch">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] font-mono tracking-wider text-slate-400 font-extrabold uppercase">
              RECONSTRUCTION MATRIX ENGINE // Ω-21
            </span>
          </div>

          <h4 className="text-slate-950 font-black text-sm uppercase tracking-tight flex items-center gap-2">
            Biomolecular Coreogenesis
          </h4>

          <p className="text-slate-500 text-xs font-light leading-relaxed">
            Omega monitors epigenetic stem-cell differentiation pathways. Here, molecular atoms undergo slow mitotic fission and morphology mapping to assemble fully-formed organs automatically.
          </p>
        </div>

        {/* Real-time event log ledger list */}
        <div className="border border-slate-150 border-slate-250 bg-slate-50 p-3 font-mono text-[9px] text-slate-400 space-y-1.5 line-clamp-3 min-h-[92px] overflow-hidden flex flex-col justify-end">
          <div className="text-[8px] font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Operational Console Alerts</span>
            <span className="text-orange-600 bg-orange-100/60 px-1 font-bold">LIVE SYNC</span>
          </div>
          <div className="space-y-1">
            {logs.slice(0, 3).map((l, index) => (
              <div key={index} className="flex gap-2 items-start text-[8.5px] border-l border-slate-200 pl-2">
                <span className="text-slate-300 shrink-0 font-light">{l.timestamp}</span>
                <span className="text-slate-650 text-slate-700 font-semibold shrink-0">[{l.stage}]</span>
                <span className="text-slate-500 truncate">{l.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
