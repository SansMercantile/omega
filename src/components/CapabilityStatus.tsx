import React, { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, CircleOff, RefreshCw } from "lucide-react";
import { fetchCapabilities, OmegaCapability } from "../lib/omegaApi";

const statusLabels: Record<string, string> = {
  operational: "Operational",
  research_only: "Research only",
  requires_equipment: "Equipment required",
  not_available: "Not available",
  not_clinically_available: "Not clinically available",
  disabled: "Disabled",
  integration_required: "Integration required",
};

export default function CapabilityStatus() {
  const [capabilities, setCapabilities] = useState<OmegaCapability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchCapabilities();
      setCapabilities(result.capabilities);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Capability service unavailable");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  return (
    <section className="border border-slate-200 bg-slate-50 p-6 text-left">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">Live service registry</span>
          <h2 className="text-xl font-black uppercase text-slate-950 mt-1">Capability Readiness</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Status comes from the connected OMEGA API. Research capabilities are not clinical treatments, and unavailable capabilities never return fabricated success.
          </p>
        </div>
        <button type="button" onClick={() => void load()} className="border border-slate-300 bg-white p-2 text-slate-600 hover:text-slate-950" title="Refresh capability status">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {error ? (
        <div className="flex items-center gap-2 border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          <CircleOff className="h-4 w-4 shrink-0" /> {error}
        </div>
      ) : loading ? (
        <div className="text-xs font-mono text-slate-400">Loading live capability registry...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {capabilities.map((capability) => {
            const operational = capability.status === "operational" || capability.status === "software_operational";
            return (
              <div key={capability.id} className="border border-slate-200 bg-white p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-slate-900">{capability.label}</span>
                  {operational ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <AlertTriangle className="h-4 w-4 text-amber-600" />}
                </div>
                <span className={`inline-block mt-2 px-1.5 py-0.5 text-[8px] font-mono font-black uppercase border ${operational ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-800"}`}>
                  {statusLabels[capability.status] || capability.status}
                </span>
                <p className="mt-2 text-[10px] text-slate-500 leading-relaxed">Requires: {capability.requires.join("; ")}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
