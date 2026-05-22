/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { SHIPPING_LANES, SIMULATION_LOGS, ShippingLane } from "../data";
import { Activity, ShieldAlert, Zap, Layers, Play, CheckCircle2, RotateCcw } from "lucide-react";

export default function OperationalSimulator() {
  const [lanes, setLanes] = useState<ShippingLane[]>(SHIPPING_LANES);
  const [logs, setLogs] = useState(SIMULATION_LOGS);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [congestionApplied, setCongestionApplied] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal logs
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Action: Trigger neural optimization
  const triggerOptimization = () => {
    if (isOptimizing) return;
    setIsOptimizing(true);
    setOptimizationProgress(0);
    
    addLog("Omega", "Initiated global molecular modeling and bio-synthesis sweep...");

    // Smooth progress bar simulation
    const interval = setInterval(() => {
      setOptimizationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          finishOptimization();
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const finishOptimization = () => {
    setIsOptimizing(false);
    // Dynamically improve efficiency metrics
    setLanes((prevLanes) =>
      prevLanes.map((lane) => ({
        ...lane,
        efficiencyRating: Math.min(99.99, Number((lane.efficiencyRating + 0.15).toFixed(2))),
        status: lane.status === "Re-routing" ? "Optimal" : lane.status,
      }))
    );
    addLog("Omega", "Cure development modeling complete. Treatment pipeline coverage maximized to peak efficacy.");
    addLog("Mezzo", "Distributed 14 clinical trial update approvals to vaccine print centers.");
  };

  // Action: Apply spatial stress/congestion
  const toggleCongestionStress = () => {
    if (congestionApplied) {
      // Revert
      setCongestionApplied(false);
      setLanes((prevLanes) =>
        prevLanes.map((l) =>
          l.id === "pipeline-4" || l.id === "lane-4"
            ? { ...l, efficiencyRating: 94.2, status: "Re-routing" }
            : l
        )
      );
      addLog("Sobek", "Outbreak surge fully contained. Treatment pipelines returning to standard protocols.");
    } else {
      setCongestionApplied(true);
      setLanes((prevLanes) =>
        prevLanes.map((l) =>
          l.id === "pipeline-4" || l.id === "lane-4"
            ? { ...l, efficiencyRating: 88.5, status: "Defending" }
            : l
        )
      );
      addLog("Sekhmet", "Biohazard alert triggered on Trans-Basin vector ringfence. Deploying preventative vaccine shielding.");
      addLog("Omega", "Alert raised: Amplifying antigen deployment to Durban General Hospital.");
    }
  };

  // Helper to append a log
  const addLog = (system: string, message: string) => {
    const time = new Date().toISOString().split("T")[1].slice(0, 8);
    setLogs((prev) => [...prev, { timestamp: time, system, message }]);
  };

  return (
    <div id="simulator" className="w-full bg-white border border-slate-100 rounded-none shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-6 sm:p-10">
      <div className="flex flex-col xl:flex-row gap-10 items-stretch">
        
        {/* Left Side: Dynamic Controls & Shipping Lane Status */}
        <div className="w-full xl:w-7/12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900 animate-ping" />
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-slate-400 font-bold">
                Clinical Simulation Console
              </span>
            </div>
            <h3 className="text-3xl font-black text-slate-950 tracking-tight leading-none mb-4">
              Treatment Simulator
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
              Stress-test the real-time epidemiological containment of the Omega medical system. Trigger active drug synthesis sweeps, simulate global sensor warnings, and audit the clinical trial ledgers dynamically.
            </p>

            {/* Simulated Live Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={triggerOptimization}
                disabled={isOptimizing}
                className={`px-5 py-3 rounded-none text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 border cursor-pointer active:scale-[0.98] ${
                  isOptimizing
                    ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                    : "bg-slate-950 text-white border-slate-900 hover:bg-black"
                }`}
              >
                {isOptimizing ? `SYNTHESIZING ANTIGENS (${optimizationProgress}%)` : "Execute Neural Synthesis Sweep"}
              </button>

              <button
                onClick={toggleCongestionStress}
                style={{ cursor: "pointer" }}
                className={`px-5 py-3 rounded-none text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 border cursor-pointer active:scale-[0.98] ${
                  congestionApplied
                    ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                    : "bg-white text-slate-900 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {congestionApplied ? "De-escalate Biohazard Stress" : "Simulate Epidemic Biohazard Congestion"}
              </button>
            </div>

            {/* Optimization Progress Bar */}
            {isOptimizing && (
              <div className="w-full bg-slate-50 border border-slate-100 p-2 rounded-none mb-6">
                <div className="flex justify-between text-[9px] font-mono text-slate-400 px-1 pb-1.5 font-bold">
                  <span>MOLECULAR REPAIR ALGORITHM ACTIVATED</span>
                  <span>{optimizationProgress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-none overflow-hidden">
                  <div
                    className="h-full bg-slate-900 transition-all duration-150"
                    style={{ width: `${optimizationProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Active Shipping corridors */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono uppercase text-slate-400 tracking-widest font-bold">
                Active Treatment Pipelines & Containments
              </h4>
              
              <div className="grid gap-4">
                {lanes.map((lane) => (
                  <div
                    key={lane.id}
                    className="bg-slate-50 border border-slate-100 hover:border-slate-300 rounded-none p-4 sm:p-5 transition-all duration-200"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                      <div>
                        <div className="text-[9px] text-slate-400 font-mono tracking-wider font-bold">
                          GRID PIPELINE ID // SM-{lane.id.toUpperCase()}
                        </div>
                        <h5 className="text-base font-bold text-slate-900">
                          {lane.name}
                        </h5>
                      </div>
                      <span
                        className={`text-[9px] font-mono font-bold uppercase px-2.5 py-1 border rounded-none ${
                          lane.status === "Optimal"
                            ? "bg-slate-900 text-white border-slate-950"
                            : lane.status === "Settling"
                            ? "bg-slate-100 text-slate-800 border-slate-200"
                            : lane.status === "Re-routing"
                            ? "bg-blue-50 text-blue-800 border-blue-200"
                            : "bg-red-50 text-red-800 border-red-200"
                        }`}
                      >
                        {lane.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs font-mono border-t border-slate-200/60 pt-4">
                      <div>
                        <span className="text-slate-400 text-[9px] block uppercase font-bold">Primary Hub</span>
                        <span className="text-slate-800 text-[11px] font-bold block truncate max-w-full mt-1">
                          {lane.source}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[9px] block uppercase font-bold">Antigen Dosages</span>
                        <span className="text-slate-800 text-[11px] block mt-1">
                          {lane.activeShipments.toLocaleString()} units
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[9px] block uppercase font-bold">Efficacy Rate</span>
                        <span className="text-slate-950 text-[11px] font-black block mt-1">
                          {lane.efficiencyRating}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: High-Fidelity Scrolling Live Logs */}
        <div className="w-full xl:w-5/12 flex flex-col bg-slate-50 border border-slate-100 rounded-none overflow-hidden min-h-[400px]">
          <div className="bg-white px-4 py-3.5 border-b border-slate-100 flex justify-between items-center shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
            <div className="flex items-center gap-2 font-mono text-[9px] font-bold text-slate-500 uppercase tracking-widest">
              <Activity className="h-4 w-4 text-slate-900" />
              <span>Omega Realtime Clinical Stream</span>
            </div>
            <button
              onClick={() => setLogs(SIMULATION_LOGS)}
              style={{ cursor: "pointer" }}
              className="text-slate-400 hover:text-slate-900 cursor-pointer p-1 transition-colors"
              title="Reset Console"
            >
              <RotateCcw className="h-3 w-3" />
            </button>
          </div>

          {/* Scrolling shell body */}
          <div className="p-5 flex-1 overflow-y-auto font-mono text-[11px] text-slate-600 space-y-4 h-[340px] max-h-[440px] bg-[#fafafa]">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2.5 items-start leading-relaxed hover:bg-slate-100/50 py-0.5 rounded">
                <span className="text-[10px] text-slate-400 select-none font-medium">{log.timestamp}</span>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-none font-bold select-none shrink-0 border ${
                    log.system === "Omega"
                      ? "bg-slate-950 text-white border-slate-950"
                      : log.system === "Mezzo"
                      ? "bg-slate-200 text-slate-800 border-slate-300"
                      : log.system === "Sekhmet"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-white text-slate-500 border-slate-200"
                  }`}
                >
                  {log.system}
                </span>
                <span className="text-slate-800 break-words tracking-tight">{log.message}</span>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          <div className="bg-white px-4 py-3 border-t border-slate-100 text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider shrink-0 flex justify-between">
            <span>Secured via Priv Health-Ledger</span>
            <span>Est Ingress: SADC Medical Core</span>
          </div>
        </div>

      </div>
    </div>
  );
}
