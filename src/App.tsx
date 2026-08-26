/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Cpu, 
  Wallet, 
  ShieldAlert, 
  Hammer, 
  Network, 
  ShieldCheck, 
  HelpCircle,
  FileCheck,
  User,
  Activity,
  UserCheck,
  Settings,
  Grid,
  HeartPulse
} from "lucide-react";
import { Analytics } from "@vercel/analytics/react";

import HeroSection from "./components/HeroSection";
import PartnersSection from "./components/PartnersSection";
import ConstellationVisualizer from "./components/ConstellationVisualizer";
import AIIntegrationTerminal from "./components/AIIntegrationTerminal";
import OmegaDiagnosisChat from "./components/OmegaDiagnosisChat";
import IoTStreamDashboard from "./components/IoTStreamDashboard";
import OperationalSimulator from "./components/OperationalSimulator";
import SpecConfigurator from "./components/SpecConfigurator";
import BrandName from "./components/BrandName";
import OmegaIntegrationCenter from "./components/OmegaIntegrationCenter";
import UserProfileDashboard from "./components/UserProfileDashboard";
import BiomolecularEvolver from "./components/BiomolecularEvolver";
import { OMEGA_FEATURES } from "./data";
import { initAuth, getLocalProfile, OnboardingData, auth } from "./lib/workspace";
import { User as FirebaseUser } from "firebase/auth";

type AppTab = "overview" | "workspace" | "diagnostics" | "profile";

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>("overview");
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<OnboardingData | null>(null);

  // Load and subscribe to profile states
  const refreshProfileState = (currentUser: FirebaseUser | null) => {
    if (currentUser) {
      setUser(currentUser);
      const prof = getLocalProfile(currentUser.uid);
      setProfile(prof);
    } else {
      setUser(null);
      setProfile(null);
    }
  };

  useEffect(() => {
    // Basic auth listening subscription
    const unsub = initAuth(
      (currentUser) => {
        refreshProfileState(currentUser);
      },
      () => {
        setUser(null);
        setProfile(null);
      }
    );

    // Watch for updates dispatched from UserProfileDashboard
    const handleProfileUpdate = () => {
      refreshProfileState(auth.currentUser);
    };
    window.addEventListener("omega-profile-updated", handleProfileUpdate);

    return () => {
      unsub();
      window.removeEventListener("omega-profile-updated", handleProfileUpdate);
    };
  }, []);

  // Mapping of string identifiers to Lucide components for feature cards
  const getIconComponent = (icon: string) => {
    switch (icon) {
      case "Cpu":
        return <Cpu className="h-5 w-5 text-slate-950" />;
      case "Wallet":
        return <Wallet className="h-5 w-5 text-slate-950" />;
      case "ShieldAlert":
        return <ShieldAlert className="h-5 w-5 text-slate-950" />;
      case "Hammer":
        return <Hammer className="h-5 w-5 text-slate-950" />;
      default:
        return <HelpCircle className="h-5 w-5 text-slate-950" />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between selection:bg-slate-100 selection:text-slate-950 antialiased">
      
      {/* Decorative vector grid accent at top */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-slate-300 to-transparent pointer-events-none" />

      {/* Top Clinical Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 select-none">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          
          {/* Logo Brand Brand wrapper */}
          <button 
            onClick={() => setActiveTab("overview")}
            style={{ cursor: "pointer" }}
            className="flex items-center gap-2 cursor-pointer border-none bg-transparent hover:opacity-85 transition-opacity"
          >
            <BrandName logoSizeClassName="h-5 w-5" className="text-sm select-none tracking-wider font-display font-bold uppercase" />
          </button>

          {/* Navigation Tab Actions */}
          <nav className="hidden md:flex items-center space-x-1.5 h-full">
            <button
              onClick={() => setActiveTab("overview")}
              style={{ cursor: "pointer" }}
              className={`px-3 py-1.5 text-[10.5px] font-sans font-extrabold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                activeTab === "overview" 
                  ? "text-slate-950 border-b-2 border-slate-950" 
                  : "text-slate-400 hover:text-slate-950 border-b-2 border-transparent"
              }`}
            >
              Overview & Pillars
            </button>

            <button
              onClick={() => setActiveTab("workspace")}
              style={{ cursor: "pointer" }}
              className={`px-3 py-1.5 text-[10.5px] font-sans font-extrabold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                activeTab === "workspace" 
                  ? "text-slate-950 border-b-2 border-slate-950" 
                  : "text-slate-400 hover:text-slate-950 border-b-2 border-transparent"
              }`}
            >
              Clinical Sync Workspace
            </button>

            <button
              onClick={() => setActiveTab("diagnostics")}
              style={{ cursor: "pointer" }}
              className={`px-3 py-1.5 text-[10.5px] font-sans font-extrabold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                activeTab === "diagnostics" 
                  ? "text-slate-950 border-b-2 border-slate-950" 
                  : "text-slate-400 hover:text-slate-950 border-b-2 border-transparent"
              }`}
            >
              Diagnostics & Simulators
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              style={{ cursor: "pointer" }}
              className={`px-3 py-1.5 text-[10.5px] font-sans font-extrabold uppercase tracking-wider transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                activeTab === "profile" 
                  ? "text-orange-650 text-orange-600 border-b-2 border-orange-500" 
                  : "text-slate-400 hover:text-slate-950 border-b-2 border-transparent"
              }`}
            >
              <Settings className="h-3.5 w-3.5 animate-spin-slow" />
              Human Calibration
            </button>
          </nav>

          {/* Right Action: Session Indicator */}
          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={() => setActiveTab("profile")}
                style={{ cursor: "pointer" }}
                className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-150 border-slate-200 text-left cursor-pointer group hover:border-slate-400 transition-all select-none"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                <div className="text-[10px] font-mono leading-tight">
                  <span className="text-slate-400 uppercase text-[8.5px] block font-bold">Active Operator</span>
                  <span className="text-slate-950 font-black truncate max-w-[120px] inline-block uppercase block">
                    {profile?.fullName || user.displayName || user.email?.split("@")[0]}
                  </span>
                </div>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-100 font-mono text-[9px] text-slate-400 uppercase font-black select-none">
                <ShieldAlert className="h-3.5 w-3.5 text-slate-350" /> Gate Locked
              </div>
            )}
          </div>

        </div>

        {/* Mobile Tab Selectors bar */}
        <div className="flex md:hidden items-center border-t border-slate-100 overflow-x-auto scrollbar-none divide-x divide-slate-100">
          <button
            onClick={() => setActiveTab("overview")}
            style={{ cursor: "pointer" }}
            className={`flex-1 min-w-[70px] text-center py-2.5 text-[9px] font-sans font-black uppercase tracking-wider cursor-pointer ${
              activeTab === "overview" ? "bg-slate-950 text-white" : "bg-white text-slate-500"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("workspace")}
            style={{ cursor: "pointer" }}
            className={`flex-1 min-w-[70px] text-center py-2.5 text-[9px] font-sans font-black uppercase tracking-wider cursor-pointer ${
              activeTab === "workspace" ? "bg-slate-950 text-white" : "bg-white text-slate-500"
            }`}
          >
            Sync
          </button>
          <button
            onClick={() => setActiveTab("diagnostics")}
            style={{ cursor: "pointer" }}
            className={`flex-1 min-w-[70px] text-center py-2.5 text-[9px] font-sans font-black uppercase tracking-wider cursor-pointer ${
              activeTab === "diagnostics" ? "bg-slate-950 text-white" : "bg-white text-slate-500"
            }`}
          >
            Labs
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            style={{ cursor: "pointer" }}
            className={`flex-1 min-w-[70px] text-center py-2.5 text-[9px] font-sans font-black uppercase tracking-wider cursor-pointer ${
              activeTab === "profile" ? "bg-orange-500 text-slate-950 font-black" : "bg-white text-slate-500"
            }`}
          >
            Profile
          </button>
        </div>

      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-10 pb-20 relative min-h-[500px]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: OVERVIEW & PILLARS */}
          {activeTab === "overview" && (
            <motion.div
              key="tab-overview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="space-y-24"
            >
              {/* Hero Spotlight Header */}
              <HeroSection />

              {/* Strategic AI Partners Section */}
              <PartnersSection />

              {/* Live backend capability registry */}
              <CapabilityStatus />

              {/* Core Operational Pillars (Bento-like features block) */}
              <section id="pillars" className="space-y-10">
                <div className="text-center max-w-2xl mx-auto">
                  <span className="text-[10px] font-mono tracking-[0.3em] text-slate-400 uppercase block mb-3 font-bold">
                    Medical AI Core Specifications
                  </span>
                  <h2 className="text-3xl font-black text-slate-950 tracking-tight leading-none mb-3">
                    The Four Core Pillars
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    Epidemiological forecasts, sub-nanometer cure discovery, epigenetic cellular rejuvenation, and localized therapeutic synthesis.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {OMEGA_FEATURES.map((feat) => (
                    <div
                      key={feat.title}
                      className="bg-slate-50 border border-slate-100 hover:border-slate-900 p-6 rounded-none transition-all duration-200 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.01)]"
                    >
                      <div>
                        <div className="h-10 w-10 rounded-none border border-slate-200 bg-white flex items-center justify-center mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                          {getIconComponent(feat.icon)}
                        </div>
                        <h4 className="text-slate-900 font-bold uppercase tracking-wider text-xs mb-2">
                          {feat.title}
                        </h4>
                        <p className="text-slate-500 text-xs leading-relaxed font-light">
                          {feat.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Constellation Integration Section */}
              <section id="constellation" className="space-y-6">
                <div className="max-w-xl pb-2 text-left">
                  <h3 className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-[0.22em] mb-2 flex items-center gap-2">
                    <Network className="h-4 w-4 text-slate-950" /> SECTION 01 // BIOSPASE CONSTELLATION SYMBIOSE
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-light">
                    Explore dynamic interfaces across parallel research nodes, medical trial ledgers, and environmental sensor grids. Omega guides continuous health telemetry and bio-synthesis automatically.
                  </p>
                </div>
                <ConstellationVisualizer />
              </section>

              {/* Biomolecular Evolver (Pillar representation) */}
              <section id="biomolecular-evolution" className="space-y-6">
                <div className="max-w-xl pb-2 text-left">
                  <h3 className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-[0.22em] mb-2 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-slate-950" /> SECTION 02 // REAL-TIME EPIGENETIC BIO-STRUCTURE SYNTHESIS
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-light">
                    Observe the automated, continuous somatic cell division and morphological layout assembly. Molecular atoms undergo mitotic fission to construct functional anatomical structures dynamically.
                  </p>
                </div>
                <BiomolecularEvolver />
              </section>
            </motion.div>
          )}

          {/* TAB 2: CLINICAL WORKSPACE */}
          {activeTab === "workspace" && (
            <motion.div
              key="tab-workspace"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="space-y-16"
            >
              {/* Advanced Integration & Coordination suite */}
              <section id="workspace-suite" className="space-y-6">
                <div className="border border-slate-200 p-6 bg-slate-50 text-left">
                  <span className="text-[9px] font-mono text-slate-400 uppercase font-bold tracking-widest block mb-1">COORDINATION ENVIRONMENT DISPATCH</span>
                  <h3 className="text-lg font-black text-slate-950 uppercase">Clinical Coordination Cabin & EHR sync</h3>
                  <p className="text-slate-500 text-xs font-light max-w-2xl leading-relaxed mt-1">
                    Connect official secure contact lists, sync real-time biographic profiles with standard EHR backends, launch encrypted telehealth consults, and write simulated clinical telemetry logs.
                  </p>
                </div>
                <OmegaIntegrationCenter />
              </section>

              {/* IoT Ambient Biosphere */}
              <section id="iot-biosphere" className="space-y-6">
                <div className="max-w-xl pb-1 text-left">
                  <h3 className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-[0.22em] mb-2 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-slate-950" /> SECTION 02 // AMBIENT BIOSPHERE & IoT SYNC HUB
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-light">
                    Monitor telemetry metrics streamed from interconnected Smart Watches, Smart Refrigerators, and air conditioning systems. Review and override safeguard profiles instantly.
                  </p>
                </div>
                <IoTStreamDashboard />
              </section>

              {/* Biomolecular Evolver (EHR sync monitoring) */}
              <section id="workspace-biomolecular-evolution" className="space-y-6">
                <div className="max-w-xl pb-2 text-left">
                  <h3 className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-[0.22em] mb-2 flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-slate-950" /> SECTION 03 // ACTIVE DIAGNOSTIC SOMATIC RECONCONSTRUCTION
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-light">
                    Coordinate live synthetic cell differentiation states, feeding telemetry parameters directly into clinical contact ledger pipelines and remote consulting grids.
                  </p>
                </div>
                <BiomolecularEvolver />
              </section>
            </motion.div>
          )}

          {/* TAB 3: DIAGNOSTICS & SIMULATORS */}
          {activeTab === "diagnostics" && (
            <motion.div
              key="tab-diagnostics"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="space-y-16"
            >
              
              {/* Pathogen Simulator core */}
              <section id="simulator" className="space-y-6">
                <div className="max-w-xl pb-2 text-left">
                  <h3 className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-[0.22em] mb-2 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-slate-950" /> SECTION 03 // EPIDEMIOLOGICAL CORRIDORS & PATHWAY SIMULATOR
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-light">
                    Stress public health corridors on the map to evaluate the reactive disease intervention and nanotherapeutic cure networks of active medical grids.
                  </p>
                </div>
                <OperationalSimulator />
              </section>

              {/* Cognitive Diagnosing & chat */}
              <section id="diagnosis" className="space-y-6">
                <div className="max-w-xl pb-2 text-left">
                  <h3 className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-[0.22em] mb-2 flex items-center gap-2">
                    <Network className="h-4 w-4 text-slate-950" /> SECTION 04 // OMEGA COGNITIVE MEDICAL REASONER & CURE FORMULIST
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-light">
                    Engage in live medical dialogues. Request chemical synthetic formulas for target somatic ailments, modeled against custom structural molecular receptors.
                  </p>
                </div>
                <OmegaDiagnosisChat />
              </section>

              {/* Registries Terminal */}
              <section id="ai-registries" className="space-y-6">
                <AIIntegrationTerminal />
              </section>

              {/* Spec configuration manager and placement charter exporter */}
              <section id="configurator" className="space-y-6">
                <div className="max-w-xl pb-2 text-left">
                  <h3 className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-[0.22em] mb-2 flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-slate-950" /> SECTION 05 // CLINICAL CORE CONFIGURATOR
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-light">
                    Build a custom regional clinical AI specification file. Export clinical placement charters endorsed by founder M.P. Khoza, Sr.
                  </p>
                </div>
                <SpecConfigurator />
              </section>

              {/* Biomolecular Evolver (Diagnostic simulation companion) */}
              <section id="diagnostics-biomolecular-evolution" className="space-y-6">
                <div className="max-w-xl pb-2 text-left">
                  <h3 className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-[0.22em] mb-2 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-slate-950" /> SECTION 06 // EXPERIMENTAL MITOTIC GENETIC CELL SIMULATION
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-light">
                    Validate multi-lobed tissue models and DNA helical segment codes before certifying operational bio-defense placements.
                  </p>
                </div>
                <BiomolecularEvolver />
              </section>

            </motion.div>
          )}

          {/* TAB 4: MY CALIBRATED PROFILE */}
          {activeTab === "profile" && (
            <motion.div
              key="tab-profile"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="space-y-6"
            >
              <UserProfileDashboard />

              {/* Biomolecular Evolver (Calibration dashboard companion) */}
              <section id="profile-biomolecular-evolution" className="space-y-6 pt-6">
                <div className="max-w-xl pb-2 text-left">
                  <h3 className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-[0.22em] mb-2 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-slate-950" /> CALIBRATION SPECIMEN COMPANION
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-light">
                    Continuously sync custom heart rate thresholds, stress profiles, and synaptic parameters to tune structural biomolecular morphogenesis outcomes.
                  </p>
                </div>
                <BiomolecularEvolver />
              </section>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Corporate Clinical footer */}
      <footer className="w-full bg-white border-t border-slate-100 py-16 text-slate-500 select-none">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-100 pb-10">
            <div className="space-y-2 text-left">
              <BrandName logoSizeClassName="h-6 w-6" className="text-base select-all tracking-wider font-display font-bold text-slate-950 uppercase" />
              <p className="text-[9px] font-mono text-slate-400 uppercase font-bold tracking-widest block text-left">
                21 Systems Constellation • Reimagine • Rebuild • Transcend
              </p>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-mono uppercase font-bold text-slate-400">
              <a href="https://sansmercantile.com/systems/" target="_blank" referrerPolicy="no-referrer" className="hover:text-slate-900 transition-colors">Systems</a>
              <a href="https://sansmercantile.com/platform/" target="_blank" referrerPolicy="no-referrer" className="hover:text-slate-900 transition-colors">Platform</a>
              <a href="https://sansmercantile.com/about/" target="_blank" referrerPolicy="no-referrer" className="hover:text-slate-900 transition-colors">Council & Leadership</a>
              <a href="https://sansmercantile.com/legal/faq/" target="_blank" referrerPolicy="no-referrer" className="hover:text-slate-900 transition-colors">Knowledge Base</a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-10 text-[9px] font-mono text-slate-400 font-medium">
            <div className="text-left">
              © {new Date().getFullYear()} Sans Mercantile. All rights reserved. 
              <span className="text-slate-200 mx-2">|</span> 
              Regulatory Compliance Authority: SADC, SARS, FATCA, GDPR.
            </div>
            <div className="text-left md:text-right">
              Coordinated by Chairman Council <strong className="text-slate-800">Mezzoforte Privilege.</strong> <strong className="text-slate-800"></strong>.
            </div>
          </div>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}
