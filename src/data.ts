/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface System {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  intensity: number; // For visualization positions
}

export interface SpecOption {
  id: string;
  name: string;
  description: string;
  options: string[];
  defaultValue: string;
}

export const CONSTELLATION_SYSTEMS: System[] = [
  {
    id: "omega",
    name: "Omega",
    category: "Medical AI Core",
    tagline: "Autonomous Health & Cure Matrix",
    description: "The primary clinical anchor coordinating real-time medical diagnostics, autonomous disease forecasting, rapid cure synthesis, and longevity research networks.",
    intensity: 1.0,
  },
  {
    id: "priv",
    name: "Priv",
    category: "Governance & Privacy",
    tagline: "Secure Patient & Trial Ledger",
    description: "Guarantees decentralized medical trials, zero-knowledge clinical patient privacy, and fully authenticated health data sharing.",
    intensity: 0.9,
  },
  {
    id: "mezzo",
    name: "Mezzo",
    category: "Capital & Funding",
    tagline: "Continuous Clinical Grants Core",
    description: "Directs low-latency funding distributions, research grant clearings, and medical resource placement automatically in response to outbreak signals.",
    intensity: 0.9,
  },
  {
    id: "kel",
    name: "KEL",
    category: "Identity & Security",
    tagline: "Sovereign Health Identifiers",
    description: "Provides cryptographically signed patient IDs, verifying trial results and practitioner accreditations globally without disclosing personal data.",
    intensity: 0.8,
  },
  {
    id: "brigit",
    name: "Brigit",
    category: "Trial Compliance & Ethics",
    tagline: "Smart Ethics Governance",
    description: "Automates multi-jurisdiction clinical trial validation and protocols, immediately clearing therapies for distribution upon positive trial output.",
    intensity: 0.75,
  },
  {
    id: "sia",
    name: "Sia",
    category: "Sovereign Logistics & Transport",
    tagline: "Zero-Trust Material Conveyance",
    description: "Secures high-speed clinical ingredient logistics, safe transport of sub-nanoscale biological elements, and zero-trust distribution routing.",
    intensity: 0.7,
  },
  {
    id: "kev",
    name: "KEV",
    category: "Adaptive Learning Systems",
    tagline: "Curriculum Repository Core",
    description: "A Constellation-scale learning architecture that continuously feeds clinical insights, pathology studies, and 185+ training subjects to medical personnel.",
    intensity: 0.72,
  },
  {
    id: "hathor",
    name: "Hathor",
    category: "Bio-Materials & Aesthetics",
    tagline: "Custom Cellular Refinement",
    description: "Governs advanced bio-material structures, tissue aesthetics, custom cellular matrix designs, and specialized molecular food-matrix enrichment.",
    intensity: 0.68,
  },
  {
    id: "sekhmet",
    name: "Sekhmet",
    category: "Bio-Defense & Security",
    tagline: "Pathogen Perimeter Shield",
    description: "Instantly screens vaccine distribution vectors, alerts against genetic telemetry leaks, and secures clinical research networks.",
    intensity: 0.8,
  },
  {
    id: "sobek",
    name: "Sobek",
    category: "Global Health Hazards",
    tagline: "Predictive Epidemiological Risk",
    description: "Monitors and models extreme climate-pathogen mutations, waterborne risks, and bio-incident warnings globally prior to community transmission.",
    intensity: 0.7,
  },
  {
    id: "ptah",
    name: "Ptah",
    category: "Synthesis & Bio-Fabrication",
    tagline: "Spatially-Distributed Cure Printing",
    description: "Instructs automated molecular synthesis printers to fabricate targeted vaccines and therapeutics directly at regional hospital hubs on demand.",
    intensity: 0.65,
  },
  {
    id: "hapi",
    name: "Hapi",
    category: "Hydraulic Core Flows",
    tagline: "River Basin Hydro-Grids",
    description: "Monitors and maps municipal river systems, regional water supply chains, and large hydraulic matrices to spot epidemiological indicators.",
    intensity: 0.74,
  },
  {
    id: "ra",
    name: "RA",
    category: "Biosensing & Telemetry",
    tagline: "Zonular Climatic Sensor Mesh",
    description: "Synchronizes planetary biome tracking, aerosol vectoring channels, and ultraviolet biosensor inputs to construct global pathogen warning frames.",
    intensity: 0.85,
  },
  {
    id: "shango",
    name: "Shango",
    category: "Planetary Energy & Power",
    tagline: "Thermonuclear Grid Transit",
    description: "Supervises localized high-output thermonuclear power distribution, clinical battery reserves, and emission-free grid stabilization.",
    intensity: 0.78,
  },
  {
    id: "montu",
    name: "Montu",
    category: "Tactical Defense Matrix",
    tagline: "Orbits & Borders Safeguards",
    description: "Secures high-speed clinical supply flights, safe orbital transport orbits, and automated perimeter bio-containment barriers.",
    intensity: 0.76,
  },
  {
    id: "kibuka",
    name: "Kibuka",
    category: "Meteorological Forecasting",
    tagline: "Aero-Sensing & Particulates",
    description: "Models particulate wind tunnels, ozone concentrations, targeted cloud seeding operations, and high-altitude meteorological channels.",
    intensity: 0.73,
  },
  {
    id: "mami_wata",
    name: "Mami Wata",
    category: "Water & Vector Analytics",
    tagline: "Aquatic Biome Pathogen Tracing",
    description: "Audits municipal water supplies, marine pathogen matrices, and river vector streams to pre-empt infectious transmission events.",
    intensity: 0.72,
  },
  {
    id: "primo",
    name: "Primo",
    category: "Sovereign Collateral & Capital",
    tagline: "Continuous Liquidity Reserve Pools",
    description: "Stabilizes deep asset backing pools, sovereign gold contracts, and financial safety clearing reserves across regional health entities.",
    intensity: 0.82,
  },
  {
    id: "anubis",
    name: "Anubis",
    category: "Cellular Lifecycle & Entropy",
    tagline: "Apoptotic Rejuvenation Protocol",
    description: "Coordinates aging reversal cell-clearing directives, cellular waste recycling intervals, and targeted programmatic bio-shredding schedules.",
    intensity: 0.6,
  }
];

export const OMEGA_FEATURES = [
  {
    title: "Disease Forecasting Engine",
    icon: "Cpu",
    description: "Sustains a continuous global epidemiological forecast model, tracking environmental and biometric sensory streams to target outbreaks before they transmit to the public."
  },
  {
    title: "Cure Development Lab",
    icon: "Wallet",
    description: "Accelerates targeted therapeutic discovery using sub-nanoscale molecular modeling, autonomously identifying antigen lock-keys and finalizing vaccine designs."
  },
  {
    title: "Aging Reversal Research",
    icon: "ShieldAlert",
    description: "Governs systemic epigenetic repair, managing cellular lineage transitions, telomere stabilization, and apoptotic schedules to reverse senescence dynamically."
  },
  {
    title: "Health Restoration System",
    icon: "Hammer",
    description: "Coordinates just-in-time nanotherapeutic interventions and custom medicine delivery via Ptah print-nodes located directly within local clinic hubs."
  }
];

export const CONFIGURATION_OPTIONS: SpecOption[] = [
  {
    id: "deployment_type",
    name: "Clinical Core Topology",
    description: "The deployment structural mode and operational focus for the target Medical AI Core.",
    options: ["SADC Infectious Disease Sentinel", "Global Longevity & Rejuvenation Center", "SMC Academic Cure Accelerator"],
    defaultValue: "SADC Infectious Disease Sentinel",
  },
  {
    id: "autonomy_level",
    name: "Diagnostic & Bio-Autonomy Limit",
    description: "Defines the degree of automated treatment authorization before physical health council audit.",
    options: ["Alpha-9 (Fully Automated Care)", "Beta-4 (Human Clinician Consultation)", "Gamma-1 (Strict Policy Bound Diagnostics)"],
    defaultValue: "Alpha-9 (Fully Automated Care)",
  },
  {
    id: "settlement_bandwidth",
    name: "SMC Clinical Ledger Capacity",
    description: "Peak medical trial audit records and grant transactions cleared per second.",
    options: ["100K Records/s (Regional Clinic)", "500K Records/s (National Health Network)", "1M+ Records/s (Global Biosphere Core)"],
    defaultValue: "500K Records/s (National Health Network)",
  },
  {
    id: "sensory_layer",
    name: "Active Biosensor Stream Link",
    description: "Primary biological telemetry feeds feeding into the modeling engine.",
    options: ["Orbital Aerosol Climate Mesh", "Regional Pathogen Air-Monitor Ring", "In-Vivo Cellular Nano-Biosensors"],
    defaultValue: "In-Vivo Cellular Nano-Biosensors",
  }
];

export interface ShippingLane {
  id: string;
  name: string;
  source: string;
  destination: string;
  activeShipments: number;
  efficiencyRating: number;
  status: "Defending" | "Optimal" | "Re-routing" | "Settling";
  coordinates: { x1: number; y1: number; x2: number; y2: number };
}

export const SHIPPING_LANES: ShippingLane[] = [
  {
    id: "pipeline-1",
    name: "SADC Infectious Outbreak Containment",
    source: "Durban General Hospital",
    destination: "Sub-Saharan Quarantine Gate",
    activeShipments: 1420,
    efficiencyRating: 99.82,
    status: "Optimal",
    coordinates: { x1: 20, y1: 80, x2: 45, y2: 25 }
  },
  {
    id: "pipeline-2",
    name: "Epigenetic Rejuvenation Peptide Delivery",
    source: "Singapore Biotech Hub",
    destination: "Cape Town Longevity Institute",
    activeShipments: 890,
    efficiencyRating: 98.45,
    status: "Settling",
    coordinates: { x1: 80, y1: 50, x2: 35, y2: 70 }
  },
  {
    id: "pipeline-3",
    name: "In-Vivo Diagnostic Telemetry Stream",
    source: "Tokyo Institute of Genetics",
    destination: "Geneva Health Union Grid",
    activeShipments: 2050,
    efficiencyRating: 99.12,
    status: "Optimal",
    coordinates: { x1: 75, y1: 20, x2: 90, y2: 35 }
  },
  {
    id: "pipeline-4",
    name: "Ebola / Marburg Biohazard Ringfence",
    source: "Congo Basin Outbreak Core",
    destination: "Marseille Level 4 Security Lab",
    activeShipments: 412,
    efficiencyRating: 94.20,
    status: "Re-routing",
    coordinates: { x1: 55, y1: 45, x2: 48, y2: 30 }
  }
];

export const SIMULATION_LOGS = [
  { timestamp: "09:12:49", system: "Omega", message: "Molecular compound optimized for Epigenetic Variant alpha-3; cellular senescence reversal rate increased to 94.2%." },
  { timestamp: "09:12:51", system: "Mezzo", message: "Disbursed SM-9080A research grants to Cape Town Longevity Lab. Latency: 0.14ms." },
  { timestamp: "09:12:52", system: "Ptah", message: "Activated local clinic 3D antigen print run of vaccine SM-102 for Durban General Hospital." },
  { timestamp: "09:12:54", system: "Sekhmet", message: "Neutralized unauthorized sequence leak detection scan on Geneva telemetry channel." },
  { timestamp: "09:12:56", system: "Mami Wata", message: "Limpopo aquatic biosphere scanner reports targeted cholera peptide levels dropped below threshold." },
  { timestamp: "09:12:58", system: "Omega", message: "Trial consensus reached with Priv and Brigit. Epigenetic therapeutics verified for human deployment." }
];
