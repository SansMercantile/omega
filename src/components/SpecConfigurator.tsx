/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CONFIGURATION_OPTIONS } from "../data";
import { Settings, Shield, Award, Sparkles, Send, CheckCircle, FileText, Download } from "lucide-react";
import BrandName from "./BrandName";

export default function SpecConfigurator() {
  const [enterpriseName, setEnterpriseName] = useState("");
  const [selections, setSelections] = useState<Record<string, string>>({
    deployment_type: "SADC Infectious Disease Sentinel",
    autonomy_level: "Alpha-9 (Fully Automated Care)",
    settlement_bandwidth: "500K Records/s (National Health Network)",
    sensory_layer: "In-Vivo Cellular Nano-Biosensors",
  });
  
  const [proposal, setProposal] = useState<{
    serialNumber: string;
    organization: string;
    metrics: { capacity: string; latency: string; rating: string };
    hash: string;
    timestamp: string;
  } | null>(null);

  const [authorizing, setAuthorizing] = useState(false);
  const [authorizedCode, setAuthorizedCode] = useState<string | null>(null);

  // Dynamic metrics calculation based on selection parameters for clinical nodes
  const getDynamicMetrics = () => {
    let capacity = "4.5B mutation models/sec";
    let latency = "0.11ms sequence delta";
    let rating = "AAA Clinic-Autonomy Certified";

    const dep = selections.deployment_type;
    const aut = selections.autonomy_level;
    const settle = selections.settlement_bandwidth;

    if (dep.includes("SADC")) {
      capacity = "3.8B antigen formulas/sec";
    } else if (dep.includes("Longevity")) {
      capacity = "7.2B cellular records/sec";
    } else {
      capacity = "4.5B mutation models/sec";
    }

    if (settle.includes("1M+")) {
      latency = "0.02ms sequence delta";
    } else if (settle.includes("500K")) {
      latency = "0.11ms sequence delta";
    } else {
      latency = "0.36ms sequence delta";
    }

    if (aut.includes("Alpha-9")) {
      rating = "AAA Clinic-Autonomy Certified";
    } else if (aut.includes("Beta-4")) {
      rating = "AA+ Clinician-in-loop Guided";
    } else {
      rating = "A- Rigid Policy Isolated";
    }

    return { capacity, latency, rating };
  };

  const handleSelect = (key: string, val: string) => {
    setSelections((prev) => ({ ...prev, [key]: val }));
    // If proposal exists, update metrics live
    if (proposal) {
      setProposal((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          metrics: getDynamicMetrics(),
        };
      });
    }
  };

  const createProposal = (e: React.FormEvent) => {
    e.preventDefault();
    const targetOrg = enterpriseName.trim() || "Mayo Clinical Integration Network";
    
    // Generate simulated cryptographic hash
    const fakeHash = Array.from({ length: 32 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("").toUpperCase();

    const serialNum = `Ω-MED-${Math.floor(1000 + Math.random() * 9000)}`;

    setProposal({
      serialNumber: serialNum,
      organization: targetOrg,
      metrics: getDynamicMetrics(),
      hash: fakeHash,
      timestamp: new Date().toISOString(),
    });
    setAuthorizedCode(null);
  };

  const authorizeProposal = () => {
    setAuthorizing(true);
    setTimeout(() => {
      setAuthorizing(false);
      setAuthorizedCode(`SMC-MED-AUTHORIZED-HASH-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1500);
  };

  const activeMetrics = getDynamicMetrics();

  return (
    <div id="configurator" className="w-full bg-white border border-slate-100 rounded-none shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-6 sm:p-10">
      <div className="flex flex-col lg:flex-row gap-10 items-stretch">
        
        {/* Left Form Panel: Spec Configurator */}
        <div className="w-full lg:w-6/12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900 animate-ping" />
              <div className="text-[9px] uppercase font-mono text-slate-400 font-bold flex items-center gap-1.5">
                <BrandName withLogo={true} logoSizeClassName="h-4 w-4" className="text-[10px]" /> Secure Clinical Configurator
              </div>
            </div>
            
            <h3 className="text-3xl font-black text-slate-950 tracking-tight leading-none mb-4">
              Omega Clinical Placement
            </h3>
            
            <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
              Establish parameters for an Omega medical node core. Tune real-time biosensors, manage diagnostic autonomy thresholds, and compile your official clinical deployment charter.
            </p>

            <form onSubmit={createProposal} className="space-y-5">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-400 mb-2 tracking-wider">
                  Target Healthcare Organization or Hospital Core
                </label>
                <input
                  type="text"
                  placeholder="e.g., Durban General Hospital, Mayo Clinic, WHO Grid"
                  value={enterpriseName}
                  onChange={(e) => setEnterpriseName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-none px-4 py-3 text-sm text-slate-800 font-mono placeholder:text-slate-300 focus:outline-none focus:border-slate-950 focus:bg-white transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)]"
                />
              </div>

              {CONFIGURATION_OPTIONS.map((opt) => (
                <div key={opt.id}>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-400 mb-1 tracking-wider">
                    {opt.name}
                  </label>
                  <p className="text-[10px] text-slate-400 mb-3 leading-tight text-slate-500">
                    {opt.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {opt.options.map((val) => {
                      const selected = selections[opt.id] === val;
                      return (
                        <button
                          key={val}
                          type="button"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleSelect(opt.id, val)}
                          className={`text-left px-3.5 py-3 rounded-none border text-xs font-mono flex flex-col justify-between h-full transition-all duration-150 relative cursor-pointer active:scale-[0.98] ${
                            selected
                                ? "bg-slate-950 border-slate-950 text-white"
                                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/50 hover:border-slate-300"
                          }`}
                        >
                          <span className="font-bold line-clamp-2">{val.split(" (")[0]}</span>
                          {val.includes("(") && (
                            <span className={`text-[9px] mt-1.5 block font-sans ${selected ? "text-slate-300" : "text-slate-400"}`}>
                              {val.slice(val.indexOf("(") + 1, -1)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <button
                type="submit"
                style={{ cursor: "pointer" }}
                className="w-full mt-3 bg-slate-950 hover:bg-black text-white font-mono font-bold uppercase tracking-widest text-xs py-3.5 rounded-none flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 active:scale-[0.99] shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
              >
                <FileText className="h-4 w-4" />
                Compile Omega Clinical Proposal
              </button>
            </form>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <h5 className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest mb-3">
              Recalculated Spec Aggregations
            </h5>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-50 border border-slate-100 p-4">
                <span className="text-[9px] text-slate-400 font-mono font-bold block uppercase tracking-wider">Antigen Print Rate</span>
                <span className="text-slate-900 font-bold text-xs mt-1.5 block truncate">
                  {activeMetrics.capacity.split(" ")[0]} {activeMetrics.capacity.split(" ")[1]}
                </span>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4">
                <span className="text-[9px] text-slate-400 font-mono font-bold block uppercase tracking-wider">Diagnosis Delay</span>
                <span className="text-slate-955 font-black text-xs text-slate-950 mt-1.5 block">
                  {activeMetrics.latency.split(" ")[0]}
                </span>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4">
                <span className="text-[9px] text-slate-400 font-mono font-bold block uppercase tracking-wider">Autonomy Rating</span>
                <span className="text-slate-900 font-bold text-xs mt-1.5 block truncate">
                  {activeMetrics.rating.split("-")[0].slice(0, 3)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Panel: Corporate Deployment Charter */}
        <div className="w-full lg:w-6/12 flex items-stretch">
          <div className="w-full bg-slate-50 border border-slate-100 rounded-none p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {proposal ? (
              <div className="flex flex-col justify-between h-full space-y-6">
                
                {/* Proposal Header */}
                <div>
                  <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                    <div>
                      <div className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold flex items-center gap-1.5">
                        <BrandName withLogo={true} logoSizeClassName="h-3.5 w-3.5" className="text-[10px]" /> Co. • Medical AI Proposal
                      </div>
                      <h4 className="text-lg font-bold text-slate-950 tracking-tight mt-1.5 uppercase">
                        Clinical Placement Charter: {proposal.serialNumber}
                      </h4>
                    </div>
                    <span className="text-[9px] font-mono text-slate-900 font-bold bg-white border border-slate-200 px-2.5 py-1">
                      DRAFT
                    </span>
                  </div>

                  {/* Core Content */}
                  <div className="space-y-4 pt-4 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400 uppercase tracking-wide font-medium">Healthcare Entity:</span>
                      <span className="text-slate-900 font-bold">{proposal.organization}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-slate-400 uppercase tracking-wide font-medium">Topology Strategy:</span>
                      <span className="text-slate-900 font-bold">{selections.deployment_type.split(" (")[0]}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400 uppercase tracking-wide font-medium">Directive level:</span>
                      <span className="text-slate-900 font-bold">{selections.autonomy_level.split(" (")[0]}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400 uppercase tracking-wide font-medium">SMC Clinical Ledger Capacity:</span>
                      <span className="text-slate-900 font-bold">{selections.settlement_bandwidth.split(" (")[0]}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400 uppercase tracking-wide font-medium">Active Biosensor Link:</span>
                      <span className="text-slate-900 font-bold">{selections.sensory_layer.split(" (")[0]}</span>
                    </div>

                    <div className="bg-white p-4 border border-slate-200 mt-2 space-y-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
                      <div className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">
                        Epidemiological Defense Forecast
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[11px]">
                        <div>
                          <span className="text-slate-400 block">Synthesis Peak Capacity:</span>
                          <span className="text-slate-900 font-bold block mt-0.5">{proposal.metrics.capacity}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Diagnostic Sequence Latency:</span>
                          <span className="text-slate-950 font-black block mt-0.5">{proposal.metrics.latency}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Signatures & Execution Section */}
                <div className="space-y-5 pt-4 border-t border-slate-200">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Master Signature 1 */}
                    <div className="border-t border-slate-200/80 pt-3">
                      <div className="text-[9px] uppercase tracking-wider font-bold text-slate-400 mb-1">Approved for Council:</div>
                      <div className="font-sans italic text-sm text-slate-900 font-bold leading-none mt-1">
                        M.P. Khoza, Sr.
                      </div>
                      <div className="text-[8px] font-mono text-slate-400 uppercase leading-none mt-1.5">
                        Mezzoforte Privilege Khoza, Sr.<br />
                        Founder & Chairman
                      </div>
                    </div>

                    {/* Tech Signature 2 */}
                    <div className="border-t border-slate-200/80 pt-3">
                      <div className="text-[9px] uppercase tracking-wider font-bold text-slate-400 mb-1">Approved for Cryptography:</div>
                      <div className="font-sans italic text-sm text-slate-900 font-bold leading-none mt-1">
                        S. Ray
                      </div>
                      <div className="text-[8px] font-mono text-slate-400 uppercase leading-none mt-1.5">
                        Dr. Stephen Ray<br />
                        Lead Cryptographer
                      </div>
                    </div>
                  </div>

                  {/* Authorization Controls */}
                  <div className="pt-2">
                    {authorizedCode ? (
                      <div className="bg-slate-900 border border-slate-955 p-4 rounded-none text-xs font-mono text-slate-100 flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-white shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold uppercase tracking-wider text-[9px] text-white">
                            Consensus Authorization Succeeded
                          </div>
                          <p className="text-[10px] text-slate-300 mt-1">
                            A secure clinical ledger block has been locked in the deep-space KEL identity repository under block 2026-05-20.
                          </p>
                          <code className="block bg-slate-950 px-2 py-1 text-[9px] text-slate-400 mt-2.5 select-all border border-slate-800">
                            {authorizedCode}
                          </code>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={authorizeProposal}
                        disabled={authorizing}
                        style={{ cursor: "pointer" }}
                        className="w-full bg-slate-950 text-white font-mono text-xs font-bold py-3 rounded-none hover:bg-black transition-colors uppercase cursor-pointer flex items-center justify-center gap-2 tracking-widest"
                      >
                        {authorizing ? (
                          <>
                            <span className="h-3.5 w-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                            Locking Autonomy Consensus Key...
                          </>
                        ) : (
                          <>
                            <Award className="h-4 w-4" />
                            Authorize Active Node
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Hash verification */}
                  <div className="flex justify-between text-[9px] font-mono text-slate-400 select-all border-t border-slate-200 pt-3">
                    <span>Block Signature:</span>
                    <span className="text-right tracking-tight font-bold text-slate-800">{proposal.hash.slice(0, 16)}...</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 m-auto space-y-4">
                <Settings className="h-10 w-10 text-slate-300 animate-[spin_30s_linear_infinite]" />
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-slate-500 text-xs">
                    Draft Under-determined
                  </h4>
                  <p className="text-slate-400 text-xs max-w-xs mt-2 leading-relaxed font-light">
                    Adjust specifications in the left configuration matrix and click "Compile Omega Clinical Proposal" to render the official clinical placement charter.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
