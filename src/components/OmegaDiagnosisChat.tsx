/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Paperclip, 
  Trash2, 
  FileText, 
  Image, 
  Video, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  Activity, 
  HeartHandshake, 
  ShieldAlert, 
  Sparkles,
  RefreshCw,
  Clock
} from "lucide-react";
import BrandName from "./BrandName";

interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
  fileAttachment?: {
    name: string;
    type: string;
    dataUrl?: string;
  };
}

const PRESETS = [
  {
    title: "Joint Friction & Inflammation",
    text: "Experiencing localized swelling and dynamic friction pain in left patellofemoral joint. Pain levels elevated to 7/10 during mechanical descent.",
  },
  {
    title: "Epigenetic Chronic Fatigue",
    text: "Sub-optimal neurological focus. Constant somatic exhaustion and systemic muscle weariness. Resting cycle diagnostics report sleep parameters are normal.",
  },
  {
    title: "Digestive Water-Chain Distress",
    text: "Acute abdominal cramping, hydration depletion vectors, and gastrointestinal thermic spasms after drinking untraced municipal groundwater.",
  }
];

interface DictionaryTerm {
  term: string;
  category: "classification" | "cure" | "somatic";
  title: string;
  subtitle: string;
  description: string;
  impact_indicator?: string;
  connected_pillars?: string[];
}

const DICTIONARY_TERMS: Record<string, DictionaryTerm> = {
  "sekhmet": {
    term: "Sekhmet",
    category: "classification",
    title: "Sekhmet Immune Security System",
    subtitle: "Pathological Hostile Interception Core",
    description: "Omega's primary leucocytosis enhancement directive and immune defense matrix. It acts as an automated firewall inside the lymphatic framework, accelerating macrophage and leukocyte routing to toxic loads or active infectious hotspots.",
    impact_indicator: "IMMUNE EFFICIENCY SYNC: +18%",
    connected_pillars: ["Disease Forecasting Engine", "AlphaMissense Core"]
  },
  "hathor": {
    term: "Hathor",
    category: "classification",
    title: "Hathor Cellular Aesthetics & Matrix Restoration",
    subtitle: "Sintering and Tissue Restructuring",
    description: "Governs myofascial tissue alignments, skeletal lubrication, and dermal layers. It uses micro-current biological modeling templates to reinforce target muscular boundaries and reverse mechanical friction fatigue.",
    impact_indicator: "EXTRACELLULAR MATRIX REBUILD: +25%",
    connected_pillars: ["Cure Development Lab", "AlphaFold-based Model Structurer"]
  },
  "anubis": {
    term: "Anubis",
    category: "classification",
    title: "Anubis Cellular Lifecycle Supervision",
    subtitle: "Apoptosis Protocols & Restorative Rejuvenation",
    description: "Governs systemic restoration, DNA chromosome repair, and telomere integrity. It coordinates selective autophagy and apoptosis (programmed cell death) pathways to safely purge degraded cells from the host organism.",
    impact_indicator: "AUTOPHAGY RATE RECRUITMENT: MAXIMIZED",
    connected_pillars: ["Aging Reversal Research", "BioNeMo Gene-sequence Vector Array"]
  },
  "hapi": {
    term: "Hapi",
    category: "classification",
    title: "Hapi Hydraulic Fluidics & Circulation",
    subtitle: "Cardiovascular Viscosity & Hydration Loop",
    description: "Omega's hydraulic pathway regulator. Analyzes blood pressure homeostasis, bio-fluidic channels, renal glomerular processing, and acute hydration depletion dynamics.",
    impact_indicator: "OSMOTIC WATER-CHAIN HOMEOSTASIS: STABILIZED",
    connected_pillars: ["Health Restoration System", "AI Modulus Computational Network"]
  },
  "thoth": {
    term: "Thoth",
    category: "classification",
    title: "Thoth Neurological & Cognitive Framework",
    subtitle: "Synaptic Bandwidth Optimization Control",
    description: "Governs cortisol indices, neuro-transmitter configurations, and neurological focus vectors. Directs restorative synaptic recovery parameters to counter constant somatic exhaustion.",
    impact_indicator: "SYNAPTIC FOCUS CONFIDENCE: 98.4% NOMINAL",
    connected_pillars: ["Cognitive Reasoner Nodes", "Sleep/Rest Cycle Monitors"]
  },
  "set": {
    term: "Set",
    category: "classification",
    title: "Set Metabolic & Thermic Stress Controller",
    subtitle: "Glycemic Matrix & Caloric Intake Oversight",
    description: "Regulates carbohydrate-to-protein distributions, caloric energy burn, intestinal microbiome levels, and thermic fatigue threshold factors inside the gastrointestinal loop.",
    impact_indicator: "METABOLIC OVERHEAD LOAD: OPTIMIZED",
    connected_pillars: ["Amino/Caloric Smart Fridge Matrix"]
  },
  "peptide-omega-422-alpha": {
    term: "Peptide-OMEGA-422-alpha",
    category: "cure",
    title: "Peptide-OMEGA-422-alpha Synthesis Code",
    subtitle: "Epigenetic Histone Regulator & Repair Catalyst",
    description: "A customized simulated molecule formulated via AlphaFold screening. It attaches to active gene regulatory sites to downregulate cytokine synthesis and repair microvascular tissue strain points.",
    impact_indicator: "CHROMATIN METHYLATION VELOCITY: +34%",
    connected_pillars: ["AlphaFold Protein Array", "Triton Compiler Pipeline"]
  },
  "epigenetic": {
    term: "epigenetic",
    category: "somatic",
    title: "Epigenetic Regulation Modulators",
    subtitle: "DNA Transcription Offset Assessments",
    description: "Factors that modify gene transcription profiles without altering sequence structures. Omega tracks how environmental variables, light stress, and lifestyle fatigue modulate these critical epigenetic switches.",
    impact_indicator: "DYNAMIC TRANSCRIPTION EFFICIENCY SIGNALS: ACTIVE",
    connected_pillars: ["BioNeMo Clinical Platform", "Aging Reversal Research"]
  },
  "molecular peptide structures": {
    term: "Molecular Peptide structures",
    category: "cure",
    title: "Bi-directional Molecular Peptide Chains",
    subtitle: "Polypeptide Reconstruction Matrix",
    description: "On-demand synthesized polypeptide clusters which target damaged receptor sites and block viral/bacterial binding vectors. These are generated via dynamic GPU compiler acceleration.",
    impact_indicator: "TARGET RECEPTOR BINDING RATIO: 99.4%",
    connected_pillars: ["Cure Development Lab", "Triton Compiler Kernel Grid"]
  },
  "somatic rest matrix": {
    term: "Somatic Rest Matrix",
    category: "somatic",
    title: "Somatic Rest Matrix Decompression Schedule",
    subtitle: "Parasympathetic Acceleration & Recovery Loop",
    description: "A tailored therapeutic program prioritizing extended somatic restoration phases. Designed to drop physiological baseline stress and lower metabolic exhaustion markers during recovery.",
    impact_indicator: "CORTISOL COEFFICIENT REDUCTION: 2.4x COOLDOWN",
    connected_pillars: ["Smart Watch Core Tracker", "Sleep/Rest Diagnostics"]
  }
};

const parseInteractiveTerms = (text: string, onTermClick: (termKey: string) => void): React.ReactNode[] => {
  const keys = Object.keys(DICTIONARY_TERMS).sort((a, b) => b.length - a.length);
  const patternParts = keys.map((k) => k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
  const regex = new RegExp(`\\b(${patternParts.join('|')})\\b`, 'gi');
  
  let match;
  let lastIndex = 0;
  const nodes: React.ReactNode[] = [];
  let key = 0;
  
  while ((match = regex.exec(text)) !== null) {
    const matchedText = match[1];
    const matchIndex = match.index;
    
    if (matchIndex > lastIndex) {
      nodes.push(<span key={`text-${key++}`}>{text.slice(lastIndex, matchIndex)}</span>);
    }
    
    const lookupKey = matchedText.toLowerCase();
    
    nodes.push(
      <button
        key={`term-${key++}`}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onTermClick(lookupKey);
        }}
        style={{ cursor: "pointer" }}
        className="font-bold underline decoration-dotted decoration-orange-500 hover:text-orange-500 hover:bg-orange-50 transition-all inline cursor-pointer text-slate-950 bg-orange-50/20 px-1 border-b border-orange-300 rounded-sm font-sans"
        title="Click for secure clinical definition lookup"
      >
        {matchedText}
      </button>
    );
    
    lastIndex = regex.lastIndex;
  }
  
  if (lastIndex < text.length) {
    nodes.push(<span key={`text-${key++}`}>{text.slice(lastIndex)}</span>);
  }
  
  return nodes.length > 0 ? nodes : [text];
};

const parseBoldAndInteractiveText = (text: string, onTermClick: (termKey: string) => void) => {
  const regex = /\*\*(.*?)\*\*/g;
  let match;
  let lastIndex = 0;
  const nodes: React.ReactNode[] = [];
  let key = 0;
  
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const normalText = text.slice(lastIndex, match.index);
      const parsedText = parseInteractiveTerms(normalText, onTermClick);
      nodes.push(...parsedText);
    }
    
    const boldText = match[1];
    const parsedBoldText = parseInteractiveTerms(boldText, onTermClick);
    
    nodes.push(
      <strong key={`bold-${key++}`} className="font-extrabold text-slate-800 font-mono text-[10px] bg-slate-100 px-1 border border-slate-200">
        {parsedBoldText}
      </strong>
    );
    lastIndex = regex.lastIndex;
  }
  
  if (lastIndex < text.length) {
    const normalText = text.slice(lastIndex);
    const parsedText = parseInteractiveTerms(normalText, onTermClick);
    nodes.push(...parsedText);
  }
  
  return nodes.length > 0 ? nodes : text;
};

export default function OmegaDiagnosisChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeTermKey, setActiveTermKey] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [attachedFile, setAttachedFile] = useState<{ name: string; type: string; dataUrl: string; base64Data: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePreset, setActivePreset] = useState<number | null>(null);
  const [painLevel, setPainLevel] = useState<number>(5);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  // Sync messages with local storage for unified clinical report downloading
  useEffect(() => {
    localStorage.setItem("omega_medical_dialogues", JSON.stringify(messages));
    window.dispatchEvent(new Event("omega-chat-messages-updated"));
  }, [messages]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  // Handle preset selection
  const selectPreset = (index: number) => {
    setActivePreset(index);
    setInputText(PRESETS[index].text);
  };

  // Convert files to Base64 to send server-side
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 100);

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const base64Data = result.split(",")[1] || "";
      
      setTimeout(() => {
        setAttachedFile({
          name: file.name,
          type: file.type,
          dataUrl: result,
          base64Data: base64Data,
        });
        setUploadProgress(null);
      }, 500);
    };
    reader.readAsDataURL(file);
  };

  const removeAttachment = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Send diagnostic trigger
  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && !attachedFile) return;

    const userMessageText = inputText;
    const fileToUpload = attachedFile;

    // Build immediate message
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newUserMessage: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      text: userMessageText || `Diagnose attached medical file: [${fileToUpload?.name}]`,
      timestamp,
      fileAttachment: fileToUpload ? {
        name: fileToUpload.name,
        type: fileToUpload.type,
        dataUrl: fileToUpload.dataUrl
      } : undefined
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputText("");
    setAttachedFile(null);
    setActivePreset(null);
    setIsGenerating(true);

    try {
      // Build request payloads including history
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text
      }));

      const payload: any = {
        prompt: `Pain scale is recorded at ${painLevel}/10. Symptoms: ${userMessageText}`,
        history: historyPayload
      };

      if (fileToUpload) {
        payload.file = {
          data: fileToUpload.base64Data,
          mimeType: fileToUpload.type
        };
      }

      const response = await fetch("/api/diagnose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Diagnostic node connection timeout.");
      }

      const responseData = await response.json();
      
      const responseTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newModelMessage: ChatMessage = {
        id: Math.random().toString(),
        role: "model",
        text: responseData.text,
        timestamp: responseTimestamp
      };

      setMessages((prev) => [...prev, newModelMessage]);
    } catch (err: any) {
      const responseTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "model",
          text: `### ❌ CONNECTION OFFLINE\n\nFailed to sync with the diagnostic cluster. Please verify your GEMINI_API_KEY is configured under Secrets, or consult standard health services.`,
          timestamp: responseTimestamp
        }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Custom high precision renderer for markdown outputs to guarantee clean rendering without external library conflicts
  const parseBoldText = (text: string) => {
    const regex = /\*\*(.*?)\*\*/g;
    let match;
    let lastIndex = 0;
    const nodes: React.ReactNode[] = [];
    let key = 0;
    
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        nodes.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
      }
      nodes.push(<strong key={key++} className="font-extrabold text-slate-950 font-mono text-[10px] bg-slate-100 px-1 border border-slate-200">{match[1]}</strong>);
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      nodes.push(<span key={key++}>{text.slice(lastIndex)}</span>);
    }
    return nodes.length > 0 ? nodes : text;
  };

  const renderDiagnosticReportMessage = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("### ")) {
        return (
          <h4 key={i} className="text-sm font-black text-slate-950 uppercase tracking-tight mt-6 mb-3 border-b border-slate-200 pb-1.5 first:mt-0">
            {trimmed.replace("### ", "")}
          </h4>
        );
      }
      if (trimmed.startsWith("#### ")) {
        return (
          <h5 key={i} className="text-[10px] font-black text-slate-800 uppercase tracking-wider mt-4 mb-2 font-mono flex items-center gap-1.5">
            <span className="h-1 w-1 bg-orange-500 rounded-full" />
            {trimmed.replace("#### ", "")}
          </h5>
        );
      }
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        const cleanText = trimmed.replace(/^[\*\-]\s+/, "");
        return (
          <li key={i} className="ml-4 list-disc text-xs text-slate-650 font-sans leading-relaxed mb-1.5">
            {parseBoldAndInteractiveText(cleanText, setActiveTermKey)}
          </li>
        );
      }
      if (trimmed.startsWith("⚠️")) {
        return (
          <div key={i} className="bg-red-50 border-l-2 border-red-500 p-3 my-4 space-y-1">
            <span className="text-[9px] font-mono text-red-600 uppercase font-black tracking-widest block">EMERGENCY ESCALATION ALARM</span>
            <p className="text-xs text-red-700 font-medium leading-relaxed font-sans">{trimmed.replace("⚠️", "").trim()}</p>
          </div>
        );
      }
      if (trimmed === "") return <div key={i} className="h-2" />;
      return (
        <p key={i} className="text-xs text-slate-650 font-sans leading-relaxed mb-2.5 last:mb-0">
          {parseBoldAndInteractiveText(line, setActiveTermKey)}
        </p>
      );
    });
  };

  return (
    <div className="w-full bg-white border border-slate-100 rounded-none shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-6 sm:p-10 space-y-8">
      
      {/* Title block */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-slate-400 font-bold flex items-center gap-1.5">
            <BrandName withLogo={true} logoSizeClassName="h-3.5 w-3.5" className="text-[11px]" />
            COGNITIVE CURE PORTAL
          </span>
        </div>
        <h3 className="text-3xl font-black text-slate-950 tracking-tight leading-none uppercase">
          Autonomous Clinical Diagnosis
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mt-2 font-light max-w-2xl">
          Describe symptoms, input somatic pain scales, or attach photographic/clinical trial ledgers (supports JPEG, PNG, medical logs). Omega will synthesize biological cure templates and formulate clinical path blueprints.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left pane: pain config & inputs (5-cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Preset templates selector */}
          <div className="space-y-3">
            <span className="text-[9px] font-mono text-slate-400 uppercase font-bold tracking-widest block">
              Somatic Preset Triggers
            </span>
            <div className="space-y-2">
              {PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => selectPreset(idx)}
                  className={`w-full text-left p-3 border text-xs transition-all duration-150 rounded-none cursor-pointer ${
                    activePreset === idx
                      ? "border-slate-950 bg-slate-50"
                      : "border-slate-100 hover:border-slate-300 bg-white"
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  <div className="font-bold text-slate-950 mb-1 flex items-center justify-between">
                    <span>{p.title}</span>
                    <span className="text-[8px] font-mono text-slate-400 uppercase">Preset_0{idx+1}</span>
                  </div>
                  <p className="text-slate-500 text-[10.5px] line-clamp-2 leading-normal">
                    {p.text}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Pain Scale Selector */}
          <div className="bg-slate-50 border border-slate-150 p-5 space-y-3">
            <div className="flex justify-between text-[9px] font-mono text-slate-400 uppercase font-bold">
              <span>Somatic Discomfort Quotient</span>
              <span className="text-orange-600 font-bold bg-orange-50 border border-orange-100 px-1.5 py-0.5 font-mono">
                {painLevel}/10 Scale
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <input 
                type="range"
                min="0"
                max="10"
                value={painLevel}
                onChange={(e) => setPainLevel(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-200 accent-orange-500 cursor-ew-resize opacity-90 hover:opacity-100"
              />
            </div>
            
            <div className="flex justify-between text-[8px] text-slate-400 font-mono">
              <span>0 (EPIGENETIC BASELINE)</span>
              <span>5 (MODERATE STRESS)</span>
              <span>10 (SEVERE DISRUPTIVE)</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSend} className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[9px] font-mono text-slate-400 uppercase font-bold tracking-widest block">
                  Describe Presenting Symptoms
                </label>
                {inputText.length > 0 && (
                  <button 
                    type="button"
                    onClick={() => setInputText("")}
                    className="text-[9px] font-mono text-red-500 uppercase font-bold cursor-pointer"
                  >
                    Clear Text
                  </button>
                )}
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="E.g., I have a burning pain behind my chest during exercise, feeling moderately tight..."
                className="w-full min-h-[140px] border border-slate-200 p-4 text-xs font-sans placeholder-slate-400 focus:outline-none focus:border-slate-900 leading-relaxed rounded-none resize-none bg-white transition-all duration-150"
              />
            </div>

            {/* Dynamic visual state of attachment */}
            <AnimatePresence>
              {attachedFile && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="bg-orange-50/50 border border-orange-200/60 p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {attachedFile.type.startsWith("image/") ? (
                      <div className="h-8 w-8 bg-white border border-slate-200 flex items-center justify-center shrink-0">
                        <img src={attachedFile.dataUrl} className="h-full w-full object-cover" alt="" />
                      </div>
                    ) : attachedFile.type.startsWith("video/") ? (
                      <Video className="h-5 w-5 text-orange-600 shrink-0" />
                    ) : (
                      <FileText className="h-5 w-5 text-orange-600 shrink-0" />
                    )}
                    <div className="truncate text-left">
                      <p className="text-xs font-bold text-slate-900 truncate">{attachedFile.name}</p>
                      <p className="text-[9px] font-mono text-slate-400 uppercase truncate">
                        {(attachedFile.type || "unknown").toUpperCase()} • Attachment Locked
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeAttachment}
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
              {uploadProgress !== null && (
                <div className="h-1 w-full bg-slate-150 overflow-hidden mt-2 relative">
                  <div className="absolute left-0 top-0 bottom-0 bg-orange-500 transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
                </div>
              )}
            </AnimatePresence>

            {/* Selection mechanics (Upload / Clear / Submit) */}
            <div className="flex items-center gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,video/*,application/pdf,text/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-3 border border-slate-200 hover:border-slate-900 text-slate-400 hover:text-slate-900 transition-all duration-150 flex items-center justify-center gap-2 rounded-none cursor-pointer text-xs font-mono font-bold shrink-0 bg-white"
                style={{ cursor: "pointer" }}
              >
                <Paperclip className="h-4 w-4" />
                <span>Upload Logs/Visuals</span>
              </button>

              <button
                type="submit"
                disabled={isGenerating || (!inputText.trim() && !attachedFile)}
                className={`flex-1 py-3 px-6 rounded-none text-xs font-mono font-black uppercase tracking-widest border transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
                  isGenerating || (!inputText.trim() && !attachedFile)
                    ? "bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed"
                    : "bg-orange-500 text-slate-950 border-orange-500 hover:bg-orange-600 shadow-sm"
                }`}
                style={{ cursor: (!inputText.trim() && !attachedFile) ? "not-allowed" : "pointer" }}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Request Diagnostic</span>
                  </>
                )}
              </button>
            </div>
          </form>

        </div>

        {/* Right pane: Real-time Terminal Consultation Output (7-cols) */}
        <div className="lg:col-span-7 bg-slate-50 border border-slate-100 p-6 flex flex-col justify-between min-h-[450px] relative overflow-hidden">
          
          <div className="flex-1 flex flex-col justify-between">
            {/* Header telemetry lines */}
            <div className="flex justify-between items-center border-b border-slate-200pb-4 pb-3 mb-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-400 uppercase font-black flex items-center gap-1.5">
                  <Terminal className="h-3 w-3 text-slate-900" /> OMEGA COGNITIVE WORKSTATION V2.1
                </span>
                <span className="text-[10px] font-mono text-slate-400 block font-bold">MODE: REAL-TIME BIOPATH RECONSTRUCTION UNIT</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-slate-400 block flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 inline text-slate-400" /> UTC Telemetry
                </span>
              </div>
            </div>

            {/* Chat list viewport */}
            <div className="flex-1 max-h-[380px] overflow-y-auto space-y-4 pr-1 scrollbar-thin">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="p-4 bg-white border border-slate-150 rounded-full text-slate-400 animate-pulse">
                    <HeartHandshake className="h-8 w-8 text-orange-500" />
                  </div>
                  <div className="space-y-1.5">
                    <h5 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-mono">
                      Awaiting Diagnostic Trigger
                    </h5>
                    <p className="text-slate-400 text-[11px] leading-relaxed max-w-xs font-sans">
                      Select a trigger template, adjust pain index parameters, or upload clinical assets to initialize a consultation.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((m) => {
                    const isUser = m.role === "user";
                    return (
                      <div
                        key={m.id}
                        className={`p-5 rounded-none border text-left space-y-3 ${
                          isUser
                            ? "bg-white border-slate-200 text-slate-800 ml-8"
                            : "bg-white border-slate-950/25 shadow-[0_2px_8px_rgba(26,28,30,0.02)] text-slate-900 relative pr-6 mr-8"
                        }`}
                      >
                        {/* Selected indicator */}
                        {!isUser && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />
                        )}

                        <div className="flex justify-between items-center text-[8.5px] font-mono text-slate-400 font-bold uppercase select-none">
                          <span className={isUser ? "text-slate-500" : "text-orange-600"}>
                            {isUser ? "Patient Log" : "Omega Core Advisor"}
                          </span>
                          <span>{m.timestamp}</span>
                        </div>

                        {/* If user message has attachment details */}
                        {m.fileAttachment && (
                          <div className="bg-slate-50 p-2.5 border border-slate-200 flex items-center gap-2 text-[10.5px]">
                            {m.fileAttachment.type.startsWith("image/") ? (
                              <div className="h-10 w-10 bg-white border border-slate-200 overflow-hidden">
                                <img src={m.fileAttachment.dataUrl} className="h-full w-full object-cover" alt="" />
                              </div>
                            ) : (
                              <FileText className="h-5 w-5 text-slate-400" />
                            )}
                            <div className="truncate text-left">
                              <span className="font-bold text-slate-800 block truncate">{m.fileAttachment.name}</span>
                              <span className="text-[8.5px] font-mono uppercase text-slate-400 block font-light">MULTIMODAL DIAGNOSTIC LOADED</span>
                            </div>
                          </div>
                        )}

                        <div className="space-y-2">
                          {isUser ? (
                            <p className="text-xs text-slate-700 font-sans leading-relaxed break-words">{m.text}</p>
                          ) : (
                            <div>{renderDiagnosticReportMessage(m.text)}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {isGenerating && (
                    <div className="p-5 bg-white border border-slate-100 flex items-center gap-4 text-left shadow-sm">
                      <span className="h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin shrink-0" />
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-orange-500 uppercase font-black tracking-widest animate-pulse block">
                          OM-SYSTEM BIO-SYNTHESIZING & CLONING KERNELS
                        </span>
                        <p className="text-[10.5px] text-slate-400 font-mono italic">
                          Compiling protein folds, verifying molecular pathogen weights, referencing local diagnostic heuristics...
                        </p>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
            
            {/* Warning footprint disclaimer */}
            <div className="border-t border-slate-200/50 pt-4 mt-4 flex items-start gap-2.5 text-left text-slate-400">
              <ShieldAlert className="h-4 w-4 text-orange-400 shrink-0 self-start mt-0.5" />
              <div className="text-[9px] font-sans leading-normal">
                <span className="font-mono text-[8.5px] font-bold uppercase text-slate-400 block mb-0.5">DISCONNECTED RECONSTRUCTION WARNING</span>
                Omega is an autonomous advisory clinical AI model. Simulated diagnostic outcomes do not constitute legal personal treatment prescriptions. High intensity pain should be immediately routed to a certified professional physical clinic core.
              </div>
            </div>

          </div>

          {/* Absolute Term Definition Panel Overlay */}
          <AnimatePresence>
            {activeTermKey && DICTIONARY_TERMS[activeTermKey] && (
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="absolute inset-x-0 bottom-0 bg-slate-950 border-t border-slate-800 p-6 text-left text-white shadow-2xl z-20 flex flex-col justify-between min-h-[260px] select-none"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[8.5px] font-mono text-orange-400 font-extrabold uppercase tracking-widest block mb-1">
                        OM-DICT CLINICAL CONTEXT PROTOCOLS : {DICTIONARY_TERMS[activeTermKey].category.toUpperCase()}
                      </span>
                      <h4 className="text-base font-black uppercase text-white font-sans tracking-tight leading-none">
                        {DICTIONARY_TERMS[activeTermKey].title}
                      </h4>
                      <span className="text-[9.5px] font-mono text-slate-400 uppercase tracking-wider block mt-1.5 leading-none">
                        {DICTIONARY_TERMS[activeTermKey].subtitle}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTermKey(null)}
                      style={{ cursor: "pointer" }}
                      className="text-slate-400 hover:text-white font-mono text-[9px] uppercase font-bold border border-slate-800 hover:border-slate-700 bg-slate-900 px-2 py-1 transition-colors cursor-pointer"
                    >
                      [Dismiss Lookup]
                    </button>
                  </div>
                  <p className="text-[11.5px] text-slate-300 font-sans leading-relaxed">
                    {DICTIONARY_TERMS[activeTermKey].description}
                  </p>
                </div>

                <div className="border-t border-slate-800/80 pt-4 mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-[10px] font-mono">
                  <div>
                    <span className="text-slate-500 font-extrabold block uppercase tracking-wide text-[8px]">OM-GRID COLLATERAL SYSTEM PEERS:</span>
                    <div className="flex gap-1.5 mt-1 flex-wrap">
                      {DICTIONARY_TERMS[activeTermKey].connected_pillars?.map((p, idx) => (
                        <span key={idx} className="bg-slate-900 border border-slate-800 px-2 py-0.5 text-slate-400 uppercase text-[8.5px] font-black tracking-wide">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  {DICTIONARY_TERMS[activeTermKey].impact_indicator && (
                    <div className="text-right shrink-0">
                      <span className="text-slate-500 font-extrabold block uppercase tracking-wide text-[8px]">CORE BIOLOGICAL GAIN INFLUENCE:</span>
                      <span className="text-orange-400 font-black tracking-wide text-[10px] uppercase block mt-1 animate-pulse">
                        {DICTIONARY_TERMS[activeTermKey].impact_indicator}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
