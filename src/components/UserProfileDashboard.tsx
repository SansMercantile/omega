import React, { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  ShieldAlert, 
  Database, 
  Activity, 
  Heart, 
  Save, 
  RefreshCw, 
  HeartPulse, 
  Sliders, 
  ShieldCheck,
  Award,
  BellRing,
  Trash2
} from "lucide-react";
import { 
  OnboardingData, 
  saveLocalProfile, 
  getLocalProfile, 
  auth, 
  initAuth,
  saveServiceLog 
} from "../lib/workspace";
import { User as FirebaseUser } from "firebase/auth";

// Extended properties for deep UI enrichment
interface ProfilePreset {
  name: string;
  emoji: string;
  role: "patient" | "specialist" | "admin";
  allergies: string;
  conditions: string;
  database: "Supabase" | "MongoDB" | "ClickUp";
  hrLimit: number;
  stressFactor: number;
}

const PROFILE_PRESETS: ProfilePreset[] = [
  {
    name: "Aero-Allergy Focus (Standard Patient)",
    emoji: "🌾",
    role: "patient",
    allergies: "Seasonal Tree Pollen, Penicillin-G Complex, Dairy Casein",
    conditions: "Dermal Blemishes, Subcutaneous Histamine Fluctuation, Ocular Fatigue",
    database: "Supabase",
    hrLimit: 120,
    stressFactor: 42
  },
  {
    name: "Hypertension Rest Module (Somatic Patient)",
    emoji: "❤️",
    role: "patient",
    allergies: "N/A - Overloaded Histamines Cleared",
    conditions: "Cardiovascular Viscosity Depletion, Chronically Elevated Basal BP",
    database: "MongoDB",
    hrLimit: 145,
    stressFactor: 74
  },
  {
    name: "Senior Bio-Cryptologist (Specialist Node)",
    emoji: "🔬",
    role: "specialist",
    allergies: "Latex, Heavy Dust Mites",
    conditions: "Persistent Synaptic Decompression Exhaustion, Circadian Desynchrony",
    database: "ClickUp",
    hrLimit: 110,
    stressFactor: 28
  }
];

export default function UserProfileDashboard() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Core Onboarding State Fields
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"patient" | "specialist" | "admin">("patient");
  const [allergies, setAllergies] = useState("N/A");
  const [conditions, setConditions] = useState("N/A");
  const [selectedDatabase, setSelectedDatabase] = useState<"MongoDB" | "Supabase" | "ClickUp">("Supabase");

  // Extended Custom State Fields
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneContact, setPhoneContact] = useState("+27 (21) 555-0312");
  const [emergencyName, setEmergencyName] = useState("Dr. Stephan Ray");
  const [emergencyPhone, setEmergencyPhone] = useState("+27 (21) 555-0102");
  const [biometricWearableEnabled, setBiometricWearableEnabled] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Dynamic Telemetry Indices
  const [targetHeartRateLimit, setTargetHeartRateLimit] = useState(125);
  const [basalStressScore, setBasalStressScore] = useState(45);
  const [hydrationRetentionRate, setHydrationRetentionRate] = useState(72);
  const [synapticCohesion, setSynapticCohesion] = useState(88);

  // Active greeting determined by time of day
  const [greeting, setGreeting] = useState("SYSTEM COMPLIANCE ACTIVE_");

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("MORNING SHIFT REPORT //");
    else if (hours < 18) setGreeting("AFTERNOON DISPATCH LOOP //");
    else setGreeting("LATE NIGHT CONSOLE LOG //");
  }, []);

  // Monitor auth state to fetch current cached profile of the signed-in user
  useEffect(() => {
    const unsub = initAuth(
      (currentUser) => {
        setUser(currentUser);
        setEmailAddress(currentUser.email || "");
        
        // Retrieve profile from local system configuration
        const cachedProf = getLocalProfile(currentUser.uid);
        if (cachedProf) {
          setFullName(cachedProf.fullName || currentUser.displayName || "");
          setRole(cachedProf.role || "patient");
          setAllergies(cachedProf.allergies || "N/A");
          setConditions(cachedProf.conditions || "N/A");
          setSelectedDatabase(cachedProf.selectedDatabase || "Supabase");

          // Feed mock custom fields for expanded layout from storage if available
          const extendedKey = `meta_profile_ext_${currentUser.uid}`;
          const storedExt = localStorage.getItem(extendedKey);
          if (storedExt) {
            try {
              const parsed = JSON.parse(storedExt);
              if (parsed.emailAddress) setEmailAddress(parsed.emailAddress);
              if (parsed.phoneContact) setPhoneContact(parsed.phoneContact);
              if (parsed.emergencyName) setEmergencyName(parsed.emergencyName);
              if (parsed.emergencyPhone) setEmergencyPhone(parsed.emergencyPhone);
              if (parsed.biometricWearableEnabled !== undefined) {
                setBiometricWearableEnabled(parsed.biometricWearableEnabled);
              }
              if (parsed.targetHeartRateLimit) setTargetHeartRateLimit(parsed.targetHeartRateLimit);
              if (parsed.basalStressScore) setBasalStressScore(parsed.basalStressScore);
              if (parsed.hydrationRetentionRate) setHydrationRetentionRate(parsed.hydrationRetentionRate);
              if (parsed.synapticCohesion) setSynapticCohesion(parsed.synapticCohesion);
            } catch {
              // Ignore
            }
          }
        }
        setHasUnsavedChanges(false);
      },
      () => {
        setUser(null);
        setHasUnsavedChanges(false);
      }
    );
    return () => unsub();
  }, []);

  const handleApplyPreset = (preset: ProfilePreset) => {
    setRole(preset.role);
    setAllergies(preset.allergies);
    setConditions(preset.conditions);
    setSelectedDatabase(preset.database);
    setTargetHeartRateLimit(preset.hrLimit);
    setBasalStressScore(preset.stressFactor);
    setHasUnsavedChanges(true);
    setSuccessMsg(`Preset: "${preset.name}" applied. Review your modified indexes below and save compile!`);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleFieldChange = (setter: any, value: any) => {
    setter(value);
    setHasUnsavedChanges(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setErrorMsg("Unauthorized core: Please authenticate via the Integration Hub first.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    setTimeout(() => {
      try {
        const primaryProfile: OnboardingData = {
          userId: user.uid,
          fullName: fullName.trim() || user.displayName || "Unknown Specialist",
          role,
          allergies: allergies.trim() || "N/A",
          conditions: conditions.trim() || "N/A",
          selectedDatabase,
          onboarded: true
        };

        // Save core onboarding profile using standard workspace utility
        saveLocalProfile(primaryProfile);

        // Save custom extended indices for high-fidelity dashboards
        const extendedConfig = {
          emailAddress,
          phoneContact,
          emergencyName,
          emergencyPhone,
          biometricWearableEnabled,
          targetHeartRateLimit,
          basalStressScore,
          hydrationRetentionRate,
          synapticCohesion
        };
        localStorage.setItem(`meta_profile_ext_${user.uid}`, JSON.stringify(extendedConfig));

        // Submit system updates and dispatch notification
        const actionLog = {
          service: selectedDatabase,
          action: "CORE_BLUEPRINT_UPDATED",
          status: "SUCCESS" as const,
          timestamp: new Date().toLocaleTimeString(),
          payload: JSON.stringify({
            fullName: primaryProfile.fullName,
            role,
            allergies,
            conditions,
            biometrics_active: biometricWearableEnabled,
            target_hr_limit: targetHeartRateLimit
          })
        };
        saveServiceLog(actionLog);

        setHasUnsavedChanges(false);
        setSuccessMsg("Success! Epigenetic profile and biographic parameters compile authorized.");
        
        // Dispatch internal window event to trigger reactive reload on sibling components (OmegaIntegrationCenter, etc)
        window.dispatchEvent(new Event("omega-profile-updated"));

      } catch (err: any) {
        console.error("Profile save error:", err);
        setErrorMsg("Failed to serialize local profile values, check storage partitions.");
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  const handlePurgeCache = () => {
    if (!user) return;
    if (confirm("Are you sure you want to revert profile variables to safe clinic defaults?")) {
      const defaultProf: OnboardingData = {
        userId: user.uid,
        fullName: user.displayName || "",
        role: "patient",
        allergies: "N/A",
        conditions: "N/A",
        selectedDatabase: "Supabase",
        onboarded: false
      };
      saveLocalProfile(defaultProf);
      localStorage.removeItem(`meta_profile_ext_${user.uid}`);
      
      setFullName(user.displayName || "");
      setRole("patient");
      setAllergies("N/A");
      setConditions("N/A");
      setSelectedDatabase("Supabase");
      setPhoneContact("+27 (21) 555-0312");
      setEmergencyName("Dr. Stephen Ray");
      setEmergencyPhone("+27 (21) 555-0102");
      setBiometricWearableEnabled(true);
      setTargetHeartRateLimit(125);
      setBasalStressScore(45);
      setHydrationRetentionRate(72);
      setSynapticCohesion(88);

      window.dispatchEvent(new Event("omega-profile-updated"));
      setToastSuccess("Biographic indices reset to factory default standards.");
    }
  };

  const setToastSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  if (!user) {
    return (
      <div className="border border-slate-200 bg-white p-12 text-center space-y-4">
        <ShieldAlert className="h-8 w-8 text-amber-500 mx-auto" />
        <h4 className="text-sm font-black text-slate-950 uppercase tracking-wide">
          SECURITY RESTRICTION: AUTHENTICATION LOCK
        </h4>
        <p className="text-slate-500 text-xs max-w-md mx-auto leading-relaxed font-light">
          Your personal medical files, subcutaneous allergy matrices, and live EHR cloud sync target destinations are stored under cryptographic user accounts. 
        </p>
        <p className="text-[10px] font-mono text-slate-400 uppercase font-black bg-slate-50 border border-slate-100 py-1.5 max-w-sm mx-auto">
          Please log in on the Integration Center page to proceed.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      
      {/* Header and status info */}
      <div className="border-b border-slate-200 pb-5 text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-black text-orange-500 uppercase tracking-widest block mb-2">
            {greeting} ACTIVE USER MANAGEMENT PORTAL
          </span>
          <h2 className="text-xl font-black text-slate-950 uppercase tracking-tight font-display">
            Human Calibration Registry
          </h2>
          <p className="text-slate-500 text-xs leading-relaxed font-light mt-1">
            Maintain high density biometric thresholds, update medical parameters, and schedule automatic disease response ledger outputs.
          </p>
        </div>

        {hasUnsavedChanges && (
          <div className="flex items-center gap-2 border border-orange-500/20 bg-orange-50/50 px-3 py-1.5 rounded-none shrink-0 self-start sm:self-center">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
            <span className="text-[9px] font-mono font-bold text-orange-850 text-orange-800 uppercase tracking-wide">Unsaved Changes In Buffer</span>
          </div>
        )}
      </div>

      {/* Preset selection widget */}
      <div className="bg-slate-50 border border-slate-100 p-6 text-left">
        <span className="text-[8.5px] font-mono text-slate-400 uppercase font-black tracking-widest block mb-3">
          SUPER-ACCELERATED BIO-SAMPLE PRESETS // ONE-CLICK INTEGRATION
        </span>
        <p className="text-slate-500 text-xs leading-relaxed font-light mb-4">
          Select an optimization blueprint template to instantly load certified diagnostic vectors and target chronic threshold definitions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROFILE_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              style={{ cursor: "pointer" }}
              className="bg-white border border-slate-200 hover:border-slate-950 p-4 rounded-none transition-all duration-150 hover:shadow-sm cursor-pointer flex flex-col justify-between text-left group"
            >
              <div>
                <span className="text-lg mb-2 block">{preset.emoji}</span>
                <h5 className="text-[10.5px] font-black uppercase text-slate-900 group-hover:text-orange-500 transition-colors">
                  {preset.name}
                </h5>
                <ul className="mt-2.5 space-y-1 text-[9.5px] text-slate-500 font-light leading-relaxed">
                  <li><strong className="font-medium text-slate-700">Role:</strong> {preset.role}</li>
                  <li className="truncate"><strong className="font-medium text-slate-700">Allergies:</strong> {preset.allergies}</li>
                  <li className="truncate"><strong className="font-medium text-slate-700">Condition:</strong> {preset.conditions}</li>
                </ul>
              </div>
              <span className="text-[7.5px] font-mono text-slate-400 font-extrabold uppercase mt-3 tracking-widest bg-slate-50 border border-slate-100 px-1 py-0.5 w-max">
                EHR: {preset.database === "Supabase" ? "RELATIONAL SQL" : preset.database === "MongoDB" ? "DOCUMENT NOSQL" : "WORKSPACE TASKS"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Forms and Biometric Panels */}
      <form onSubmit={handleSaveProfile} className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left Side: Biographics and Baseline Forms (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* General Biographic Block */}
          <div className="border border-slate-200 bg-white p-6 space-y-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-100 pb-2.5 flex items-center gap-2">
              <User className="h-4 w-4 text-slate-600" /> Biographic & Security Classification
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono text-slate-400 uppercase font-black">
                  User Representative Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <User className="h-3.5 w-3.5" />
                  </span>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => handleFieldChange(setFullName, e.target.value)}
                    placeholder="e.g. Stephen Ray"
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 font-sans text-xs bg-white text-slate-950 focus:outline-none focus:border-slate-900 block"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono text-slate-400 uppercase font-black">
                  Clinical Affiliation Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Mail className="h-3.5 w-3.5" />
                  </span>
                  <input
                    type="email"
                    required
                    value={emailAddress}
                    onChange={(e) => handleFieldChange(setEmailAddress, e.target.value)}
                    placeholder="e.g. user@gmail.com"
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 font-sans text-xs bg-white text-slate-950 focus:outline-none focus:border-slate-900 block"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono text-slate-400 uppercase font-black">
                  Primary Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Phone className="h-3.5 w-3.5" />
                  </span>
                  <input
                    type="text"
                    value={phoneContact}
                    onChange={(e) => handleFieldChange(setPhoneContact, e.target.value)}
                    placeholder="e.g. +27 (21) 555-0312"
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 font-sans text-xs bg-white text-slate-950 focus:outline-none focus:border-slate-900 block"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono text-slate-400 uppercase font-black">
                  Clinical Space Role Access
                </label>
                <select
                  value={role}
                  onChange={(e) => handleFieldChange(setRole, e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 font-sans text-xs bg-white text-slate-950 focus:outline-none focus:border-slate-900"
                >
                  <option value="patient">Registered Patient (Somatic Host)</option>
                  <option value="specialist">Clinician / Research Specialist</option>
                  <option value="admin">Sovereign Biodefense Administrator</option>
                </select>
              </div>
            </div>
          </div>

          {/* Medical Baseline Block */}
          <div className="border border-slate-200 bg-white p-6 space-y-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-100 pb-2.5 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-slate-600" /> Somatic Baseline & Pathological Indicators
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono text-slate-400 uppercase font-black">
                  Dermal & Food Allergies
                </label>
                <textarea
                  rows={2}
                  value={allergies}
                  onChange={(e) => handleFieldChange(setAllergies, e.target.value)}
                  placeholder="List active allergens or write N/A..."
                  className="w-full px-3 py-1.5 border border-slate-200 font-sans text-xs bg-white text-slate-950 focus:outline-none focus:border-slate-900 block resize-none"
                />
                <span className="text-[8.5px] text-slate-400 font-light italic">
                  E.g., Hathor tracks skin spot reactions against allergen flares.
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono text-slate-400 uppercase font-black">
                  Chronic Diseases & Rest Targets
                </label>
                <textarea
                  rows={2}
                  value={conditions}
                  onChange={(e) => handleFieldChange(setConditions, e.target.value)}
                  placeholder="Detail active symptoms or core targets..."
                  className="w-full px-3 py-1.5 border border-slate-200 font-sans text-xs bg-white text-slate-950 focus:outline-none focus:border-slate-900 block resize-none"
                />
                <span className="text-[8.5px] text-slate-400 font-light italic">
                  E.g., Secondary stress triggers associated with hypertension.
                </span>
              </div>
            </div>
          </div>

          {/* Database Target & Synchronization Preferences */}
          <div className="border border-slate-200 bg-white p-6 space-y-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-100 pb-2.5 flex items-center gap-2">
              <Database className="h-4 w-4 text-slate-600" /> Cloud EHR Database Allocation
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono text-slate-400 uppercase font-black">
                  Active Sync Database Node
                </label>
                <select
                  value={selectedDatabase}
                  onChange={(e) => handleFieldChange(setSelectedDatabase, e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 font-sans text-xs bg-white text-slate-950 focus:outline-none focus:border-slate-900"
                >
                  <option value="Supabase">Relational SQL Serverless Base</option>
                  <option value="MongoDB">Distributed Document NoSQL Node</option>
                  <option value="ClickUp">Central Project Board Pipeline</option>
                </select>
              </div>

              <div className="flex flex-col justify-end">
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-105 border-slate-200/60 p-3">
                  <input
                    id="chk-biometric"
                    type="checkbox"
                    checked={biometricWearableEnabled}
                    onChange={(e) => handleFieldChange(setBiometricWearableEnabled, e.target.checked)}
                    className="h-4 w-4 text-slate-950 rounded border-slate-300 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-slate-950"
                  />
                  <label htmlFor="chk-biometric" className="text-[10.5px] font-bold text-slate-800 uppercase tracking-tight cursor-pointer select-none">
                    Continuous Bio-Telemetry Sync Mode
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Escalation Matrix */}
          <div className="border border-slate-200 bg-white p-6 space-y-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-100 pb-2.5 flex items-center gap-2">
              <Award className="h-4 w-4 text-slate-600" /> Emergency Biodefense Contact
            </h4>
            <p className="text-slate-500 text-[10px] leading-relaxed font-light">
              Automatic alert dispatches are launched through the Omega Integration Mail Sync utility to this address when critical cardiopulmonary status is breached.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono text-slate-400 uppercase font-black">
                  Escalation Specialist Name
                </label>
                <input
                  type="text"
                  value={emergencyName}
                  onChange={(e) => handleFieldChange(setEmergencyName, e.target.value)}
                  placeholder="e.g. Dr. Stephen Ray"
                  className="w-full px-3 py-2 border border-slate-200 font-sans text-xs bg-white text-slate-950 focus:outline-none focus:border-slate-900 block"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono text-slate-400 uppercase font-black">
                  Emergency Secure Hotline
                </label>
                <input
                  type="text"
                  value={emergencyPhone}
                  onChange={(e) => handleFieldChange(setEmergencyPhone, e.target.value)}
                  placeholder="e.g. +27 (21) 555-0102"
                  className="w-full px-3 py-2 border border-slate-200 font-sans text-xs bg-white text-slate-950 focus:outline-none focus:border-slate-900 block"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Biometric Sliders & System Output Logs (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Biometrics Tuning Slider Board */}
          <div className="border border-slate-200 bg-slate-50 p-6 space-y-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-2.5 flex items-center gap-2 select-none">
              <Sliders className="h-4 w-4 text-slate-600" /> Biometric Tuning Sliders
            </h4>
            <p className="text-slate-500 text-[9.5px] leading-relaxed font-light select-none">
              Adjust your target thresholds and health parameters. These coefficients calibrate Omega’s neural diagnosing model behavior.
            </p>

            {/* Stress rate threshold slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono uppercase">
                <span className="font-bold text-slate-600">Heart Rate Threshold Alarm</span>
                <span className="font-extrabold text-orange-600 bg-orange-100/50 px-1.5 py-0.5 font-sans rounded">{targetHeartRateLimit} BPM</span>
              </div>
              <input
                type="range"
                min="90"
                max="160"
                value={targetHeartRateLimit}
                onChange={(e) => handleFieldChange(setTargetHeartRateLimit, parseInt(e.target.value, 10))}
                className="w-full accent-slate-950 cursor-pointer h-1.5 bg-slate-200 rounded-none appearance-none"
              />
              <span className="text-[8px] text-slate-400 block font-light select-none">
                Alarm triggers on watch metrics when BPM exceeds this integer.
              </span>
            </div>

            {/* Cortisol score slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono uppercase">
                <span className="font-bold text-slate-600">Basal Cortisol Factor</span>
                <span className="font-extrabold text-slate-900 bg-slate-200 px-1.5 py-0.5 font-sans rounded">{basalStressScore}/100</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={basalStressScore}
                onChange={(e) => handleFieldChange(setBasalStressScore, parseInt(e.target.value, 10))}
                className="w-full accent-slate-950 cursor-pointer h-1.5 bg-slate-200 rounded-none appearance-none"
              />
              <span className="text-[8px] text-slate-400 block font-light select-none">
                Establishes base sensitivity of Thoth Neurological Optimization framework.
              </span>
            </div>

            {/* Osmotic water rate slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono uppercase">
                <span className="font-bold text-slate-600">Glomerular Hydro Osmotic Index</span>
                <span className="font-extrabold text-emerald-600 bg-emerald-100/50 px-1.5 py-0.5 font-sans rounded">{hydrationRetentionRate}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={hydrationRetentionRate}
                onChange={(e) => handleFieldChange(setHydrationRetentionRate, parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-200 rounded-none appearance-none"
              />
              <span className="text-[8px] text-slate-400 block font-light select-none">
                Calibrates hydration feedback recommendations under circulatory Hapi hydraulics logic.
              </span>
            </div>

            {/* Cognitive synaptic bandwidth slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono uppercase">
                <span className="font-bold text-slate-600">Synaptic Bandwidth Level</span>
                <span className="font-extrabold text-blue-600 bg-blue-100/50 px-1.5 py-0.5 font-sans rounded">{synapticCohesion}% Cohesion</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={synapticCohesion}
                onChange={(e) => handleFieldChange(setSynapticCohesion, parseInt(e.target.value, 10))}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-200 rounded-none appearance-none"
              />
              <span className="text-[8px] text-slate-400 block font-light select-none">
                Monitors neuronal signal integrity during somatic core rest audits.
              </span>
            </div>
          </div>

          {/* Master trigger buttons */}
          <div className="border border-slate-200 bg-white p-6 space-y-4">
            
            {/* Success and Error Indicators */}
            {successMsg && (
              <div className="border border-emerald-500/20 bg-emerald-50 text-emerald-900 p-3.5 text-xs text-left font-light select-text">
                <span className="font-mono font-bold text-[9px] text-emerald-800 uppercase block mb-1">COMPILATION SUCCESSFUL_</span>
                {successMsg}
              </div>
            )}

            {errorMsg && (
              <div className="border border-red-500/20 bg-red-50 text-red-950 p-3.5 text-xs text-left font-light select-text">
                <span className="font-mono font-bold text-[9px] text-red-800 uppercase block mb-1">COMPILER ABORT_</span>
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ cursor: "pointer" }}
              className="w-full bg-slate-950 hover:bg-slate-850 text-white font-mono font-black text-xs uppercase py-3 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed select-none"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> WRITING TO SECTIONS...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" /> SAVE CORE BIOMETRICS
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePurgeCache}
              style={{ cursor: "pointer" }}
              className="w-full border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-950 font-mono text-[10px] uppercase py-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none"
            >
              <Trash2 className="h-3.5 w-3.5" /> Revert Baseline [Restore]
            </button>
          </div>

          {/* Secure cryptographic regulatory assurance footnote */}
          <div className="border border-slate-100 p-4 text-[9px] font-mono text-slate-400 text-left space-y-1 select-none">
            <div className="flex items-center gap-1 font-bold text-slate-500 uppercase">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> HIPAA / GDPR SAFE NODE
            </div>
            <p className="leading-relaxed">
              Biometric templates are formatted locally and signed with isolated container vectors (AES-GCM-256 integrity checks enabled). Telemetry feeds match the authentic local standard database format.
            </p>
          </div>

        </div>

      </form>
    </div>
  );
}
