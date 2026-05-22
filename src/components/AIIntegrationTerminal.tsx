/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GitBranch, Github, Cpu, HelpCircle, RefreshCw, CheckCircle2, Shield, Settings, Database, Activity, Code } from "lucide-react";

export interface ScienceRepo {
  id: string;
  name: string;
  owner: "research" | "clinical-ai" | "acceleration";
  repo: string;
  description: string;
  activeBranch: string;
  stars: string;
  status: "Synchronized" | "Re-building" | "Idle";
  utility: string;
  metric: { label: string; value: string };
  impactMultiplier: number; // impact on simulation specs
}

export const SCIENCE_REGISTRIES: ScienceRepo[] = [
  // Research DeepMind
  {
    id: "alphafold",
    name: "AlphaFold 3",
    owner: "research",
    repo: "science-deepmind/alphafold",
    description: "Predicts structures and interactions of proteins, DNA, RNA, and chemical compounds with sub-nanometer precision.",
    activeBranch: "main",
    stars: "18.4k",
    status: "Synchronized",
    utility: "Sub-nanoscale vaccine & antigen molecular folding blueprints",
    metric: { label: "Folding Speed", value: "1.4M predictions/s" },
    impactMultiplier: 1.25,
  },
  {
    id: "alphamissense",
    name: "AlphaMissense",
    owner: "research",
    repo: "science-deepmind/alphamissense",
    description: "Evaluates the pathogenicity of missense mutations in human proteins to spot chronic diseases.",
    activeBranch: "release-v1",
    stars: "4.2k",
    status: "Synchronized",
    utility: "Genetic pathogen mutation forecasting and clinical hazard alarms",
    metric: { label: "Pathology Rate", value: "98.2% Accuracy" },
    impactMultiplier: 1.15,
  },
  {
    id: "jax",
    name: "JAX Autograd Core",
    owner: "research",
    repo: "science/jax",
    description: "Composable transformations of Python+NumPy programs; autograd and XLA compilation for ultimate research computing.",
    activeBranch: "main",
    stars: "29.8k",
    status: "Synchronized",
    utility: "High-performance parallel computation substrate for Omega models",
    metric: { label: "XLA Speedup", value: "82.4x scale" },
    impactMultiplier: 1.20,
  },
  // Clinical AI / GPT Core
  {
    id: "triton",
    name: "Triton Compiler Matrix",
    owner: "clinical-ai",
    repo: "clinical-ai/triton",
    description: "An open-source GPU programming language and compiler to write custom high-throughput deep learning kernels.",
    activeBranch: "master",
    stars: "14.1k",
    status: "Synchronized",
    utility: "Low-latency clinical model inference optimizations and tensor calculations",
    metric: { label: "Kernel BW", value: "1.25 TB/s" },
    impactMultiplier: 1.18,
  },
  {
    id: "whisper",
    name: "Whisper Speech AI",
    owner: "clinical-ai",
    repo: "clinical-ai/whisper",
    description: "Robust, multi-lingual speech recognition model utilized to transcribe clinical diagnostics and field trial dictations.",
    activeBranch: "main",
    stars: "61.3k",
    status: "Idle",
    utility: "Instant zero-knowledge clinician dictation audio transcribing",
    metric: { label: "Word Error Rate", value: "1.8% average" },
    impactMultiplier: 1.05,
  },
  {
    id: "gpt4o",
    name: "GPT-4o Clinical Agent Core",
    owner: "clinical-ai",
    repo: "clinical-ai/gpt-4o-agent",
    description: "Advanced reasoner and proxy orchestrator mapping medical trial logs and patient consultation schemas.",
    activeBranch: "main",
    stars: "custom",
    status: "Synchronized",
    utility: "Dynamic reasoning over multi-language medical ledgers and clinical logs",
    metric: { label: "Context Window", value: "128k input tokens" },
    impactMultiplier: 1.30,
  },
  // Acceleration
  {
    id: "bionemo",
    name: "BioNeMo Core",
    owner: "acceleration",
    repo: "acceleration/BioNeMo",
    description: "Generative AI platform for drug discovery, implementing state-of-the-art molecular modeling and sequence designs.",
    activeBranch: "main",
    stars: "2.8k",
    status: "Synchronized",
    utility: "Generative therapeutic designs and clinical trial modeling",
    metric: { label: "Therapeutic Screening", value: "10x drug hits" },
    impactMultiplier: 1.28,
  },
  {
    id: "modulus",
    name: "Modulus (Physics-ML)",
    owner: "acceleration",
    repo: "acceleration/modulus",
    description: "AI-driven physics modeling framework used to simulate hydraulic water vectors and cardiovascular fluid dynamics.",
    activeBranch: "main",
    stars: "3.5k",
    status: "Synchronized",
    utility: "Fluid dynamics simulation of biome water tables and epidemiological flows",
    metric: { label: "FEM Speedup", value: "1000x over classic" },
    impactMultiplier: 1.22,
  },
  {
    id: "parabricks",
    name: "Genome Sequencing Engine",
    owner: "acceleration",
    repo: "acceleration/clara-parabricks",
    description: "GPU-accelerated computational pipelines for high-throughput variant calling and DNA/RNA genomics sequencing.",
    activeBranch: "v4.2-dev",
    stars: "1.9k",
    status: "Idle",
    utility: "Real-time DNA sequence comparison and variant screening",
    metric: { label: "Whole Genome Seq", value: "22 mins/genome" },
    impactMultiplier: 1.20,
  }
];

interface AIIntegrationTerminalProps {
  onMultipliersChange?: (multiplier: number) => void;
}

export default function AIIntegrationTerminal({ onMultipliersChange }: AIIntegrationTerminalProps) {
  const [repos, setRepos] = useState<ScienceRepo[]>(SCIENCE_REGISTRIES);
  const [selectedRepo, setSelectedRepo] = useState<ScienceRepo>(SCIENCE_REGISTRIES[0]);
  const [filter, setFilter] = useState<"all" | "research" | "clinical-ai" | "acceleration">("all");
  const [busyRepoId, setBusyRepoId] = useState<string | null>(null);
  const [syncLogs, setSyncLogs] = useState<string[]>([
    "INITIALIZED Open-Science Integrations daemon...",
    "CONNECTED to api.github.com secure mirrors.",
    "VERIFIED SHA-256 for alphafold@main.",
    "MOUNTED BioNeMo molecular folding weights successfully.",
    "OMEGA 2.0 active and running on hybrid compute cluster.",
  ]);

  // Handle active multipliers calculation to push stats up
  useEffect(() => {
    if (onMultipliersChange) {
      const activeMultiplier = repos
        .filter((r) => r.status === "Synchronized")
        .reduce((acc, curr) => acc + (curr.impactMultiplier - 1.0), 1.0);
      onMultipliersChange(Number(activeMultiplier.toFixed(2)));
    }
  }, [repos, onMultipliersChange]);

  const toggleRepoStatus = (repoId: string) => {
    if (busyRepoId) return;
    setBusyRepoId(repoId);
    
    // Simulate re-sync step
    const target = repos.find((r) => r.id === repoId);
    if (!target) return;

    const currentlySync = target.status === "Synchronized";
    const nextStatus = currentlySync ? "Idle" : "Re-building";

    // Set intermediate state
    setRepos((prev) =>
      prev.map((r) => (r.id === repoId ? { ...r, status: nextStatus } : r))
    );

    const repoName = target.repo;
    const actionLog = currentlySync 
      ? `DISMOUNTED framework substrate: ${repoName} from diagnostic chain.`
      : `SPAWNING code integration process for git://github.com/${repoName}.git...`;
    
    setSyncLogs((prev) => [...prev, actionLog]);

    if (!currentlySync) {
      // Complete the build sequence after 1.2s
      setTimeout(() => {
        setRepos((prev) =>
          prev.map((r) => (r.id === repoId ? { ...r, status: "Synchronized" } : r))
        );
        setSyncLogs((prev) => [
          ...prev,
          `PULLED commits on git branch [${target.activeBranch}].`,
          `COMPILED optimal LLVM/Triton kernels for GPU node architecture.`,
          `VERIFIED SHA-256 checksum consensus.`,
          `SYNCHRONIZED ${target.name} into the active diagnostic core!`
        ]);
        setBusyRepoId(null);
      }, 1200);
    } else {
      setTimeout(() => {
        setBusyRepoId(null);
      }, 300);
    }
  };

  const filteredRepos = repos.filter(
    (r) => filter === "all" || r.owner === filter
  );

  return (
    <div className="w-full bg-white border border-slate-100 rounded-none shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-6 sm:p-10 space-y-8">
      
      {/* Block Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-slate-400 font-bold">
              OPEN SOURCE REPOSITORIES INTEGRATOR
            </span>
          </div>
          <h3 className="text-3xl font-black text-slate-950 tracking-tight leading-none">
            Unified Science Registry
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mt-2 font-light max-w-2xl">
            Omega integrates peer-reviewed science directly from community platforms. Toggle active GitHub kernels from <span className="font-semibold text-slate-800">Global Science</span>, <span className="font-semibold text-slate-800">Clinical Reasoning Models</span>, <span className="font-semibold text-slate-800">GPT Core</span>, and <span className="font-semibold text-slate-800 font-medium">High-Compute GPU Accelerations</span> to upgrade clinical forecasting performance.
          </p>
        </div>

        {/* Brand visual label */}
        <div className="bg-slate-50 border border-slate-200 px-4 py-3 text-right">
          <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Computed Multiplier</div>
          <div className="text-2xl font-black text-orange-500 font-mono mt-1">
            {repos.filter((r) => r.status === "Synchronized").length} <span className="text-xs text-slate-400 font-normal">Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left List of Repos (5-cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          {/* Owner Filter Pills */}
          <div className="flex bg-slate-50 p-1 border border-slate-200 gap-1 rounded-none w-full">
            {(["all", "research", "clinical-ai", "acceleration"] as const).map((btn) => (
              <button
                key={btn}
                style={{ cursor: "pointer" }}
                onClick={() => setFilter(btn)}
                className={`flex-1 py-1.5 text-[10px] uppercase font-mono font-bold tracking-wider transition-all duration-150 cursor-pointer ${
                  filter === btn
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-900"
                }`}
              >
                {btn === "research" ? "Research" : btn === "clinical-ai" ? "Clinical AI" : btn === "acceleration" ? "Compute" : "All"}
              </button>
            ))}
          </div>

          {/* Repo list container */}
          <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
            {filteredRepos.map((r) => {
              const isSelected = selectedRepo.id === r.id;
              const isSync = r.status === "Synchronized";
              const isBuilding = r.status === "Re-building";

              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedRepo(r)}
                  style={{ cursor: "pointer" }}
                  className={`p-3.5 border transition-all duration-150 flex items-center justify-between cursor-pointer rounded-none relative group ${
                    isSelected
                      ? "border-slate-950 bg-slate-50 shadow-[0_1px_3px_rgba(0,0,0,0.015)]"
                      : "border-slate-100 hover:border-slate-300 bg-white"
                  }`}
                >
                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />
                  )}

                  <div className="space-y-1 pr-2 truncate">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 ${
                        r.owner === "research" 
                          ? "bg-blue-50 text-blue-700 border border-blue-100" 
                          : r.owner === "clinical-ai" 
                          ? "bg-green-50 text-green-700 border border-green-100" 
                          : "bg-purple-50 text-purple-700 border border-purple-100"
                      }`}>
                        {r.owner}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 select-all font-bold">
                        {r.repo.split("/")[1]}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-950 tracking-tight block truncate mt-1">
                      {r.name}
                    </h4>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {isBuilding ? (
                      <span className="h-4 w-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin shrink-0" />
                    ) : (
                      <span className={`h-1.5 w-1.5 rounded-full ${isSync ? "bg-orange-500" : "bg-slate-300"}`} />
                    )}
                    <span className={`text-[9px] font-mono uppercase font-bold ${isSync ? "text-orange-600" : "text-slate-400"}`}>
                      {r.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="bg-slate-50 border border-slate-100 p-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">GitHub Connection Syncing</span>
              <span className="text-[10px] font-mono text-slate-900 bg-white border border-slate-200 px-2 py-0.5 font-bold flex items-center gap-1">
                <Github className="h-3 w-3 inline" /> API v3 SSL
              </span>
            </div>
          </div>
        </div>

        {/* Right Info Screen and Live Terminal (7-cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          
          {/* Selected Repo Details */}
          <div className="bg-slate-50 border border-slate-100 p-6 relative overflow-hidden flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start border-b border-slate-200/60 pb-3">
                <div className="space-y-1">
                  <div className="text-[9px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1.5">
                    <Github className="h-3 w-3 text-slate-900" />
                    <span>GITHUB REGISTRY // {selectedRepo.repo}</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-950 uppercase mt-1 tracking-tight">
                    {selectedRepo.name}
                  </h4>
                </div>

                <button
                  onClick={() => toggleRepoStatus(selectedRepo.id)}
                  style={{ cursor: "pointer" }}
                  className={`px-3 py-1.5 rounded-none text-[9px] font-mono font-black uppercase tracking-widest border transition-all duration-150 cursor-pointer ${
                    selectedRepo.status === "Synchronized"
                      ? "bg-slate-900 text-white border-slate-900 hover:bg-black"
                      : "bg-orange-500 text-slate-950 border-orange-500 hover:bg-orange-600"
                  }`}
                >
                  {selectedRepo.status === "Synchronized" 
                    ? "Dismount Framework" 
                    : selectedRepo.status === "Re-building" 
                    ? "Building Kernels..." 
                    : "Mount Framework"}
                </button>
              </div>

              {/* Body */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs font-mono">
                <div className="space-y-3">
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">Utility Spectrum</span>
                    <span className="text-slate-900 font-medium block mt-1 text-[11px] leading-relaxed">
                      {selectedRepo.utility}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-bold font-mono">Synced Branch</span>
                    <span className="text-slate-800 font-semibold block mt-0.5">
                      <GitBranch className="h-3.5 w-3.5 inline text-slate-400 mr-1" />
                      {selectedRepo.activeBranch}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 bg-white p-4 border border-slate-200">
                  <span className="text-slate-500 uppercase tracking-wider text-[9px] font-bold block">
                    Computational Telemetry
                  </span>
                  <div>
                    <span className="text-slate-400 block text-[9px]">{selectedRepo.metric.label}:</span>
                    <span className="text-slate-900 font-black text-xs block mt-0.5">
                      {selectedRepo.metric.value}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">Science Multiplier Impact:</span>
                    <span className="text-orange-500 font-bold block mt-0.5">
                      +{Math.round((selectedRepo.impactMultiplier - 1.0) * 100)}% GFLOPS Compute
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-slate-500 text-xs font-light tracking-wide italic leading-relaxed pt-4 border-t border-slate-200/40 mt-4 font-sans">
                {selectedRepo.description}
              </p>
            </div>

            <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 border-t border-slate-200/60 pt-4 mt-4">
              <span>SHA-256: SECURE_VERIFIED_MIRROR</span>
              <span className="font-bold text-slate-700">STARS: {selectedRepo.stars}</span>
            </div>
          </div>

          {/* Real-time GitHub Daemon output terminal */}
          <div className="bg-slate-950 rounded-none p-4 font-mono text-[9px] text-slate-400 select-all border border-slate-900 flex flex-col space-y-2 h-[130px] overflow-hidden">
            <div className="flex justify-between text-slate-500 text-[8px] border-b border-slate-800 pb-1 font-bold">
              <span>DAEMON: git_clone_daemon.sh</span>
              <span>UTC: {new Date().toISOString().split("T")[0]}</span>
            </div>
            <div className="overflow-y-auto flex-1 text-orange-500/80 space-y-1 select-text scrollbar-thin">
              {syncLogs.slice(-5).map((log, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-slate-600 select-none">$&gt;</span>
                  <span className="text-slate-350 break-all text-slate-300">{log}</span>
                </div>
              ))}
            </div>
            <div className="text-[8px] text-slate-500 text-right uppercase tracking-[0.1em] font-semibold">
              Ready // All streams SSL handshaked
            </div>
          </div>

        </div>

      </div>

      {/* Active OMEGA Features Pipeline Interlinks */}
      <div className="border-t border-slate-100 pt-6 mt-4">
        <div className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-[0.15em] mb-3">
          Active Omega Core Pillars Acceleration Interlinks
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-slate-50 border border-slate-150 rounded-none text-left">
            <span className="text-[8px] font-mono text-slate-400 block font-bold uppercase tracking-wider">Disease Forecasting Engine</span>
            <span className={`text-[10px] font-black block mt-1 uppercase ${
              repos.find(r => r.id === "alphamissense")?.status === "Synchronized" ? "text-orange-600 animate-pulse" : "text-slate-400"
            }`}>
              {repos.find(r => r.id === "alphamissense")?.status === "Synchronized" ? "⚡ +15% Heuristic Sensor Acc" : "Idle Heuristics Mapping"}
            </span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-150 rounded-none text-left">
            <span className="text-[8px] font-mono text-slate-400 block font-bold uppercase tracking-wider">Cure Development Lab</span>
            <span className={`text-[10px] font-black block mt-1 uppercase ${
              repos.find(r => r.id === "alphafold")?.status === "Synchronized" ? "text-orange-600 animate-pulse" : "text-slate-400"
            }`}>
              {repos.find(r => r.id === "alphafold")?.status === "Synchronized" ? "⚡ +25% Peptide folds/sec" : "Idle Fold Synthesizer"}
            </span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-150 rounded-none text-left">
            <span className="text-[8px] font-mono text-slate-400 block font-bold uppercase tracking-wider">Aging Reversal Research</span>
            <span className={`text-[10px] font-black block mt-1 uppercase ${
              repos.find(r => r.id === "bionemo")?.status === "Synchronized" ? "text-orange-600" : "text-slate-400"
            }`}>
              {repos.find(r => r.id === "bionemo")?.status === "Synchronized" ? "⚡ +28% Gene-sequence Vector" : "Idle Epigenetic Link"}
            </span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-150 rounded-none text-left">
            <span className="text-[8px] font-mono text-slate-400 block font-bold uppercase tracking-wider">Health Restoration System</span>
            <span className={`text-[10px] font-black block mt-1 uppercase ${
              repos.find(r => r.id === "triton")?.status === "Synchronized" ? "text-orange-600" : "text-slate-400"
            }`}>
              {repos.find(r => r.id === "triton")?.status === "Synchronized" ? "⚡ +18% LLVM GPU kernel flow" : "Idle Micro-Print Substrate"}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
