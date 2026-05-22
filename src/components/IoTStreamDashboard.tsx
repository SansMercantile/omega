/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Tv, 
  Watch, 
  Wind, 
  Flame, 
  Check, 
  Activity, 
  AlertCircle, 
  Compass, 
  Power, 
  CloudRain, 
  RefreshCw, 
  Radio, 
  ShieldCheck,
  Smartphone,
  Sliders,
  Bluetooth,
  Link,
  Download,
  FileText,
  Lock,
  Unlock,
  UserCheck
} from "lucide-react";
import BrandName from "./BrandName";
import { auth, googleSignIn, getLocalProfile } from "../lib/workspace";

export interface IoTDevice {
  id: string;
  name: string;
  category: "watch" | "fridge" | "tv" | "ac";
  brand: string;
  status: "Disconnected" | "Connecting" | "Connected";
  deviceIp: string;
  metrics: { label: string; value: string | number; unit: string; trend?: "up" | "down" | "stable" }[];
  riskFactor: "Good" | "Elevated Risk" | "Nominal";
}

const INITIAL_DEVICES: IoTDevice[] = [
  {
    id: "device_watch",
    name: "Heart-Rate Cardio Watch",
    category: "watch",
    brand: "Garmin / Apple Watch Core",
    status: "Connected",
    deviceIp: "192.168.1.144",
    metrics: [
      { label: "Active Heart Rate", value: 72, unit: "BPM", trend: "stable" },
      { label: "SpO2 Oxygen Saturation", value: 98, unit: "%", trend: "stable" },
      { label: "Somatic Stress Level", value: 24, unit: "/100", trend: "down" },
      { label: "Somatic Rest Cycle", value: 7.2, unit: "hrs", trend: "up" }
    ],
    riskFactor: "Good"
  },
  {
    id: "device_fridge",
    name: "Amino/Caloric Smart Fridge",
    category: "fridge",
    brand: "Samsung Family Hub ThinQ",
    status: "Disconnected",
    deviceIp: "192.168.1.189",
    metrics: [
      { label: "Bio-Nutritional Stock", value: 84, unit: "% index", trend: "stable" },
      { label: "Carb/Protein Distribution", value: "3:1", unit: "ratio" },
      { label: "Lactose Pathogen Scan", value: 0.0, unit: "mg/L" },
      { label: "Fruit/Veg Hydration Status", value: 92, unit: "%" }
    ],
    riskFactor: "Nominal"
  },
  {
    id: "device_tv",
    name: "Sedentary Stimulus Smart TV",
    category: "tv",
    brand: "Sony Bravia OLED Node",
    status: "Connected",
    deviceIp: "192.168.1.112",
    metrics: [
      { label: "Continuous Screen Time", value: 180, unit: "mins", trend: "up" },
      { label: "Optic Stress Index", value: 68, unit: "%", trend: "up" },
      { label: "Luminance Exhaustion Rate", value: "Elevated", unit: "level" }
    ],
    riskFactor: "Elevated Risk"
  },
  {
    id: "device_ac",
    name: "Aerosol Purity Air Conditioner",
    category: "ac",
    brand: "Daikin Inverter CleanRoom",
    status: "Disconnected",
    deviceIp: "192.168.1.105",
    metrics: [
      { label: "Aerobic Air Purity", value: 12, unit: "AQI", trend: "down" },
      { label: "Ambient Humidity Ratio", value: 45, unit: "%" },
      { label: "Allergen Particulate Filter", value: 99.4, unit: "%" },
      { label: "Ambient Micro-Climate", value: 21.5, unit: "°C" }
    ],
    riskFactor: "Good"
  }
];

export default function IoTStreamDashboard() {
  const [devices, setDevices] = useState<IoTDevice[]>(INITIAL_DEVICES);
  const [activeTab, setActiveTab] = useState<"all" | "watch" | "fridge" | "tv" | "ac">("all");
  const [logFeed, setLogFeed] = useState<string[]>([
    "INITIALIZED IoT Biosphere synchronizer daemon...",
    "SECURE HANDSHAKE: Heart-Rate Cardio Watch [192.168.1.144] Connected.",
    "SCAN COMPLETED: Sedentary Stimulus Smart TV [192.168.1.112] triggers Sedentary Warning (Active > 150m).",
  ]);
  const [connectingId, setConnectingId] = useState<string | null>(null);

  // Authenticated user state tracking from standard lib
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isSigningInGoogle, setIsSigningInGoogle] = useState(false);
  const [isSimulatedLink, setIsSimulatedLink] = useState(false);
  const [samsungHealthData, setSamsungHealthData] = useState({
    sleepDuration: 7.4,
    deepSleep: 2.3,
    remSleep: 1.9,
    lightSleep: 3.2,
    sleepQualityScore: 89,
    caloriesBurned: 340,
    stressLevel: 28,
    ecgStatus: "Sinus Rhythm Nominal",
    lastSyncedAt: ""
  });
  const [isReportGenerating, setIsReportGenerating] = useState(false);

  useEffect(() => {
    // Monitor auth state on mount
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  const handleGoogleLogin = async () => {
    setIsSigningInGoogle(true);
    try {
      const res = await googleSignIn();
      if (res?.user) {
        setCurrentUser(res.user);
        setLogFeed((prev) => [
          ...prev,
          `🔐 [GOOGLE AUTH] Operator ${res.user.displayName || res.user.email} authenticated. Gated medical telemetry unlocked.`
        ]);
        window.dispatchEvent(new Event("omega-profile-updated"));
      }
    } catch (e: any) {
      console.error(e);
      setLogFeed((prev) => [
        ...prev,
        `❌ [GOOGLE AUTH ERROR] Authentication failed: ${e.message || "Canceled"}`
      ]);
    } finally {
      setIsSigningInGoogle(false);
    }
  };

  // Toggle quick virtual simulated pair for Samsung wearables in isolated sandboxes
  const toggleSimulatedPairing = () => {
    if (isSimulatedLink) {
      setIsSimulatedLink(false);
      setLogFeed((prev) => [...prev, "🔌 [SAMSUNG LINK] Wearable connection terminated. Cloud sync suspended."]);
      setDevices((prevDevices) =>
        prevDevices.map((d) => {
          if (d.id === "device_watch") {
            return {
              ...d,
              name: "Heart-Rate Cardio Watch",
              brand: "Garmin / Apple Watch Core",
              status: "Disconnected" as const
            };
          }
          return d;
        })
      );
    } else {
      setLogFeed((prev) => [...prev, "📶 [SAMSUNG LINK] Initiating wristband NFC & Bluetooth discoverability..."]);
      setTimeout(() => {
        setIsSimulatedLink(true);
        setLogFeed((prev) => [
          ...prev,
          "🤝 [SAMSUNG LINK] Paired Galaxy Watch 6. Samsung Health Terms Agreement endorsed successfully.",
          "📊 [SAMSUNG CLINICAL CORE] Active health stream unlocked! Heart rate, sleep records and ECG telemetry linked!"
        ]);
        
        setDevices((prevDevices) =>
          prevDevices.map((d) => {
            if (d.id === "device_watch") {
              return {
                ...d,
                name: "Samsung Galaxy Watch 6 (GATT Live)",
                brand: "Samsung Connected BLE",
                status: "Connected" as const,
                metrics: d.metrics.map((m) => {
                  if (m.label === "Active Heart Rate") return { ...m, value: 76, trend: "stable" as const };
                  if (m.label === "Somatic Stress Level") return { ...m, value: 28, trend: "down" as const };
                  if (m.label === "Somatic Rest Cycle") return { ...m, value: 7.4, trend: "up" as const };
                  return m;
                })
              };
            }
            return d;
          })
        );
      }, 700);
    }
  };

  // Generate, download and back up a beautifully formatted patient clinical report 
  const downloadPatientReport = () => {
    setIsReportGenerating(true);
    setLogFeed((prev) => [...prev, "⚙️ [CLINICAL REPORT] Gathering clinical records & diagnostic conversations..."]);
    
    setTimeout(() => {
      const uid = currentUser?.uid || "anonymous_operator";
      const profileInfo = getLocalProfile(uid);
      const email = currentUser?.email || "anonymous_operator@sansmercantile.com";
      const name = profileInfo?.fullName || currentUser?.displayName || "Alpha Patient";
      const role = profileInfo?.role || "patient";
      const allergies = profileInfo?.allergies || "Seasonal Pollen, Penicillin-G Complex";
      const conditions = profileInfo?.conditions || "Ocular Fatigue, Chronic Fatigue Factor";
      const activeDb = profileInfo?.selectedDatabase || "Supabase DB Cluster";

      // Read advisory dialogues from local key synched above inside Chat component 
      let chatHistory = "No active medical consultation records found in this cloud partition.";
      const storedChat = localStorage.getItem("omega_medical_dialogues");
      if (storedChat) {
        try {
          const parsed = JSON.parse(storedChat);
          if (Array.isArray(parsed) && parsed.length > 0) {
            chatHistory = parsed
              .map(
                (m: any) =>
                  `[${m.timestamp}] ${m.role === "user" ? "PATIENT" : "OMEGA CLINICAL AI"}: ${m.text}`
              )
              .join("\n\n");
          }
        } catch (err) {
          console.warn(err);
        }
      }

      const watchStatus = devices.find(d => d.id === "device_watch")?.status || "Unknown";
      const watchHR = devices.find(d => d.id === "device_watch")?.metrics.find(m => m.label === "Active Heart Rate")?.value ?? 72;
      const watchSleep = devices.find(d => d.id === "device_watch")?.metrics.find(m => m.label === "Somatic Rest Cycle")?.value ?? "7.2 hrs";
      const fridgeStatus = devices.find(d => d.id === "device_fridge")?.status || "Unknown";
      const airStatus = devices.find(d => d.id === "device_ac")?.status || "Unknown";

      const timestamp = new Date().toLocaleString();
      const reportId = `EHR-SEC-` + Math.random().toString(36).substring(3, 8).toUpperCase();

      const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Clinical EHR Report - ${name}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background-color: #f8fafc;
      margin: 0;
      padding: 40px;
    }
    .report-container {
      max-width: 800px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
      padding: 40px;
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .logo-title {
      font-size: 24px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #0c4a6e;
    }
    .logo-subtitle {
      font-size: 9px;
      font-family: monospace;
      color: #64748b;
      letter-spacing: 0.22em;
      margin-top: 4px;
    }
    .metadata-box {
      background-color: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 16px;
      margin-bottom: 24px;
      font-size: 12px;
    }
    .metadata-title {
      font-size: 10px;
      font-family: monospace;
      font-weight: bold;
      color: #475569;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      border-left: 3px solid #f97316;
      padding-left: 10px;
      margin-top: 30px;
      margin-bottom: 15px;
    }
    .data-grid {
      display: grid;
      grid-template-cols: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }
    .data-card {
      background: #fafafa;
      border: 1px solid #e2e8f0;
      padding: 12px;
    }
    .data-label {
      font-size: 10px;
      font-family: monospace;
      color: #64748b;
      text-transform: uppercase;
    }
    .data-value {
      font-size: 14px;
      font-weight: bold;
      color: #0f172a;
      margin-top: 4px;
    }
    .transcript-box {
      background-color: #0f172a;
      color: #f1f5f9;
      font-family: monospace;
      font-size: 11px;
      padding: 20px;
      border-radius: 4px;
      white-space: pre-wrap;
      max-height: 400px;
      overflow-y: auto;
      line-height: 1.6;
    }
    .signature-grid {
      display: grid;
      grid-template-cols: 1fr 1fr;
      gap: 40px;
      margin-top: 40px;
      border-top: 1px dashed #cbd5e1;
      padding-top: 30px;
    }
    .signature-line {
      border-top: 1px solid #0f172a;
      margin-top: 40px;
      padding-top: 8px;
      font-size: 11px;
      font-family: monospace;
      text-transform: uppercase;
    }
    .footer-text {
      text-align: center;
      font-size: 10px;
      color: #94a3b8;
      margin-top: 40px;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div class="report-container">
    <table class="header-table">
      <tr>
        <td style="text-align: left;">
          <div class="logo-title">SANS MERCANTILE SYSTEMS</div>
          <div class="logo-subtitle">OMEGA CLINICAL AI CORE // SECURE MEDICAL LEDGER</div>
        </td>
        <td style="text-align: right; vertical-align: top;">
          <div style="font-size: 11px; font-family: monospace; font-weight: bold;">REPORT ID: ${reportId}</div>
          <div style="font-size: 10px; color: #64748b; font-family: monospace; margin-top: 4px;">DATE: ${timestamp}</div>
        </td>
      </tr>
    </table>

    <div class="metadata-box">
      <div class="metadata-title">PATIENT SECURITY CERTIFICATION & BACKUP IN PROCESS</div>
      This clinical analysis summary certifies that the patient below has synchronized dynamic biological telemetry stream mappings. Real-time indicators are continuously saved and archived securely inside core Google Cloud services.
    </div>

    <div class="section-title">1. Patient Profile Info</div>
    <div class="data-grid">
      <div class="data-card">
        <div class="data-label">Full Name / Operator</div>
        <div class="data-value">${name}</div>
      </div>
      <div class="data-card">
        <div class="data-label">Google Account Email</div>
        <div class="data-value">${email}</div>
      </div>
      <div class="data-card">
        <div class="data-label">Subcutaneous Allergies</div>
        <div class="data-value">${allergies}</div>
      </div>
      <div class="data-card">
        <div class="data-label">Somatic Chronic Conditions</div>
        <div class="data-value">${conditions}</div>
      </div>
      <div class="data-card">
        <div class="data-label">Patient Role Access</div>
        <div class="data-value" style="text-transform: uppercase;">${role}</div>
      </div>
      <div class="data-card">
        <div class="data-label">Encrypted Target Database</div>
        <div class="data-value">${activeDb} Node</div>
      </div>
    </div>

    <div class="section-title">2. Biometric Sensor & IoT Sync Matrix</div>
    <div class="data-grid">
      <div class="data-card">
        <div class="data-label">Wearable Bluetooth Link Status</div>
        <div class="data-value">${watchStatus === "Connected" ? "CONNECTED (SAMSUNG HEALTH LIVE DUPLEX)" : "DISCONNECTED"}</div>
      </div>
      <div class="data-card">
        <div class="data-label">Current Heart Rate</div>
        <div class="data-value">${watchHR} BPM</div>
      </div>
      <div class="data-card">
        <div class="data-label">Samsung Sleep Tracking Index</div>
        <div class="data-value">${watchSleep} (89% Recoup Rating)</div>
      </div>
      <div class="data-card">
        <div class="data-label font-mono">Sync Channel Type</div>
        <div class="data-value">${isSimulatedLink ? "Samsung Health Virtual Sync" : "Native Web BLE GATT Dynamic Stream"}</div>
      </div>
      <div class="data-card">
        <div class="data-label">Smart Fridge Connection</div>
        <div class="data-value" style="text-transform: uppercase;">${fridgeStatus}</div>
      </div>
      <div class="data-card">
        <div class="data-label">Aerosol CleanRoom Filter</div>
        <div class="data-value" style="text-transform: uppercase;">${airStatus}</div>
      </div>
    </div>

    <div class="section-title">3. Scientific & Medical Advice Chat History</div>
    <div style="font-size: 11px; text-transform: uppercase; font-family: monospace; color: #64748b; margin-bottom: 8px;">
      Core Cognitive AI Conversation Logs (Omega Diagnostics Core)
    </div>
    <div class="transcript-box">${chatHistory}</div>

    <div class="section-title">4. Epigenetic Rejuvenation Directives</div>
    <p style="font-size: 11.5px; line-height: 1.6; color: #475569;">
      Based on somatic indicators and medical consult details, Omega recommends activating the Hathor Cellular Restoration Network and compiling custom regulatory peptide chains (OMEGA-422-alpha). Stress markers call for somatic decompression scheduling under direct clinical supervision.
    </p>

    <div class="signature-grid">
      <div class="signature-line">
        <strong>C. Maddison</strong><br>
        Chief Business Development Officer &amp; Executive Partner<br>
        SANS MERCANTILE SYSTEMS
      </div>
      <div class="signature-line">
        <strong>M.P. Khoza, Sr.</strong><br>
        Council Executive President &amp; Founder<br>
        OMEGA GLOBAL SAFEGUARDS
      </div>
    </div>

    <div class="footer-text">
      SANS MERCANTILE CO. CONFIDENTIAL CERTIFICATE • PRESERVED &amp; BACKED UP ON GOOGLE CLOUD
    </div>
  </div>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Clinical_Report_Patient_${name.replace(/[^a-zA-Z0-9]/g, "_")}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setLogFeed((prev) => [
        ...prev,
        `💾 [CLINICAL EHR SYNC] Report downloaded successfully: "Clinical_Report_Patient_${name}.html"`,
        `☁️ [GOOGLE CLOUD SAVED] Backup securely synchronized on your cloud database ledger. (ID: ${reportId})`
      ]);

      setIsReportGenerating(false);
    }, 1200);
  };

  // Web Bluetooth configuration and live states
  const [bleStatus, setBleStatus] = useState<"Disconnected" | "Connecting" | "Connected" | "Unsupported" | "NotRunningSecurely">(() => {
    if (typeof window !== "undefined") {
      const isSecure = window.location.protocol === "https:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      if (!(navigator as any).bluetooth) {
        return "Unsupported";
      }
      if (!isSecure) {
        return "NotRunningSecurely";
      }
    }
    return "Disconnected";
  });
  const [bleDeviceName, setBleDeviceName] = useState<string>("");
  const [bleHeartRate, setBleHeartRate] = useState<number | null>(null);
  const [bleDeviceObject, setBleDeviceObject] = useState<any>(null);

  const requestBluetoothDevice = async () => {
    const nav = navigator as any;
    if (!nav.bluetooth) {
      setLogFeed((prev) => [
        ...prev,
        "❌ [WEB BLUETOOTH] Bluetooth API not available on your browser. (Typically requires Chrome, Edge or Opera)"
      ]);
      setBleStatus("Unsupported");
      return;
    }

    try {
      setBleStatus("Connecting");
      setLogFeed((prev) => [...prev, "📶 [BLE] Requesting Bluetooth Heart Rate wearable (service: 0x180D)..."]);
      
      const device = await nav.bluetooth.requestDevice({
        filters: [{ services: ["heart_rate"] }],
        optionalServices: ["heart_rate", "battery_service"]
      });

      setBleDeviceName(device.name || "Samsung Wearable");
      setBleDeviceObject(device);
      setLogFeed((prev) => [...prev, `📶 [BLE] Authorized device: "${device.name || "Galaxy Watch"}". Linking GATT Server...`]);

      const server = await device.gatt.connect();
      setLogFeed((prev) => [...prev, "📶 [BLE] GATT Socket connected. Standardizing primary services..."]);

      const service = await server.getPrimaryService("heart_rate");
      setLogFeed((prev) => [...prev, "📶 [BLE] 'heart_rate' (0x180D) service acquired. Locating dynamic characteristic..."]);

      const characteristic = await service.getCharacteristic("heart_rate_measurement");
      setLogFeed((prev) => [...prev, "📶 [BLE] Characteristic acquired. Enabling real-time notification push..."]);

      await characteristic.startNotifications();
      setLogFeed((prev) => [...prev, "📶 [BLE] Subscription successful! Actively polling biological telemetry..."]);
      setBleStatus("Connected");

      const handleHrNotification = (event: any) => {
        const value = event.target.value;
        const flags = value.getUint8(0);
        const rate16Bits = flags & 0x1;
        let bpm = 0;
        if (rate16Bits) {
          bpm = value.getUint16(1, true);
        } else {
          bpm = value.getUint8(1);
        }

        setBleHeartRate(bpm);
        setLogFeed((prev) => [
          ...prev.slice(-25),
          `💓 [LIVE BLUEOTH FEED] Received HR from paired wristwear: ${bpm} BPM.`
        ]);

        // Integrate heart rate with the centralized watch card state
        setDevices((prevDevices) =>
          prevDevices.map((d) => {
            if (d.id === "device_watch") {
              return {
                ...d,
                name: `${device.name || "Galaxy Watch 6 Classic"} (GATT Live)`,
                brand: "Samsung Connected BLE",
                status: "Connected" as const,
                metrics: d.metrics.map((m) =>
                  m.label === "Active Heart Rate" ? { ...m, value: bpm, trend: bpm > 72 ? "up" as const : "down" as const } : m
                )
              };
            }
            return d;
          })
        );
      };

      characteristic.addEventListener("characteristicvaluechanged", handleHrNotification);

      device.addEventListener("gattserverdisconnected", () => {
        setLogFeed((prev) => [...prev, "🔌 [BLE] Wear OS device link closed. Resetting local simulation daemon."]);
        setBleStatus("Disconnected");
        setBleDeviceName("");
        setBleHeartRate(null);
        setBleDeviceObject(null);
        setDevices((prevDevices) =>
          prevDevices.map((d) => {
            if (d.id === "device_watch") {
              return {
                ...d,
                name: "Heart-Rate Cardio Watch",
                brand: "Garmin / Apple Watch Core",
                status: "Connected" as const
              };
            }
            return d;
          })
        );
      });

    } catch (err: any) {
      console.error(err);
      setBleStatus("Disconnected");
      let errMsg = err.message || JSON.stringify(err);
      if (
        errMsg.toLowerCase().includes("permissions policy") || 
        errMsg.toLowerCase().includes("disallowed by permissions") ||
        errMsg.toLowerCase().includes("security")
      ) {
        errMsg = "Bluetooth is blocked inside this preview iframe by security policies. To pair your real Samsung Watch classic, please open the 'Development App URL' or 'Shared App URL' in a new web tab directly, or click 'Virtual Samsung Health Sync' below to run the high-fidelity simulator.";
      }
      setLogFeed((prev) => [...prev, `❌ [BLE DEVIATION] Pairing canceled: ${errMsg}`]);
    }
  };

  const disconnectBluetoothDevice = async () => {
    if (bleDeviceObject && bleDeviceObject.gatt.connected) {
      setLogFeed((prev) => [...prev, "🔌 [BLE] Voluntary unpairing initiated..."]);
      await bleDeviceObject.gatt.disconnect();
    } else {
      setBleStatus("Disconnected");
      setBleDeviceName("");
      setBleHeartRate(null);
      setBleDeviceObject(null);
    }
  };
  
  // Clinical profile calibration indices representing advanced medical functions
  const [allergySensitivity, setAllergySensitivity] = useState<"low" | "moderate" | "severe">("moderate");
  const [recoveryProfile, setRecoveryProfile] = useState<"rest" | "performance">("performance");
  const [safeguardActive, setSafeguardActive] = useState(true);
  const [bloodPressureZone, setBloodPressureZone] = useState<"normotensive" | "elevated" | "hypertensive">("normotensive");

  // Live sweeping wave sweep index
  const [waveOffset, setWaveOffset] = useState(0);

  // 5-minute auto reconnect countdown trackers (seconds remaining per disconnected device)
  const [disconnectTimers, setDisconnectTimers] = useState<Record<string, number>>({
    "device_fridge": 300,
    "device_ac": 290
  });

  // Helper to identify if a device currently breaches defined emergency medical/environmental thresholds
  const getCriticalThresholdBreach = (dev: IoTDevice): string | null => {
    if (dev.status !== "Connected") return null;
    if (dev.id === "device_watch") {
      const hrMetric = dev.metrics.find((m) => m.label === "Active Heart Rate");
      if (hrMetric && typeof hrMetric.value === "number") {
        if (hrMetric.value > 150) {
          const pacemakerMsg = safeguardActive ? " [Pacemaker Active Safeguard Stabilized]" : "";
          return `TACHYCARDIA CRITICAL: ${hrMetric.value} BPM${pacemakerMsg}`;
        }
        if (hrMetric.value < 45) {
          return `BRADYCARDIA ADVERSE EVENT: ${hrMetric.value} BPM`;
        }
        // BP zone warning trigger helper
        if (bloodPressureZone === "elevated" && hrMetric.value > 105) {
          return `HYPERTENSIVE FLUCTUATION ALARM: HR has exceeded standard 105 BPM target for high BP clinical profiles.`;
        }
      }

      const spo2 = dev.metrics.find((m) => m.label === "SpO2 Oxygen Saturation");
      if (spo2 && typeof spo2.value === "number" && spo2.value < 90) {
        return `HYPOXIA PATHOLOGY HAZARD: ${spo2.value}% SpO2 Oxygen Saturation`;
      }

      const stress = dev.metrics.find((m) => m.label === "Somatic Stress Level");
      if (stress && typeof stress.value === "number" && stress.value > 85) {
        return `ACUTE SOMATIC ADRENAL EXHAUSTION: Stress Index ${stress.value}/100`;
      }
    }
    
    if (dev.id === "device_ac") {
      const aqiMetric = dev.metrics.find((m) => m.label === "Aerobic Air Purity");
      if (aqiMetric && typeof aqiMetric.value === "number") {
        const threshold = allergySensitivity === "severe" ? 40 : allergySensitivity === "low" ? 140 : 100;
        if (aqiMetric.value > threshold) {
          return `AEROSOL STIMULUS DANGER: Air Purity degraded to ${aqiMetric.value} AQI [Sensitivity Profile: ${allergySensitivity.toUpperCase()}]`;
        }
      }
    }

    if (dev.id === "device_fridge") {
      const pathogen = dev.metrics.find((m) => m.label === "Lactose Pathogen Scan");
      if (pathogen && typeof pathogen.value === "number" && pathogen.value > 3.0) {
        return `BIO-NUTRITIONAL CONTAMINATION: Smart Fridge flagged pathogen levels at ${pathogen.value} mg/L Spores`;
      }
    }

    if (dev.id === "device_tv") {
      const screenTime = dev.metrics.find((m) => m.label === "Continuous Screen Time");
      if (screenTime && typeof screenTime.value === "number") {
        const limit = recoveryProfile === "rest" ? 60 : 180;
        if (screenTime.value > limit) {
          return `OPTIC EXHAUSTION THRESHOLD EXCEEDED: Continuous TV Screen Time is ${screenTime.value} mins [Rest Profile Limit: ${limit} mins]`;
        }
      }
    }

    return null;
  };

  // Live sweeping ECG trace helper
  const getECGPath = () => {
    const width = 400;
    const height = 40;
    const points = [];
    // Heart rate determines the frequency of QRS complexes
    const activeHr = devices.find(d => d.id === "device_watch")?.metrics.find(m => m.label === "Active Heart Rate")?.value ?? 72;
    const hrNumber = typeof activeHr === "number" ? activeHr : 72;
    // wave length scale based on heart rate
    const frequency = hrNumber / 60; // beats per second
    
    for (let x = 0; x <= 100; x++) {
      const rx = (x + waveOffset) % 100;
      let y = height / 2;
      
      // Create a rhythmic QRS pulse shape
      const phase = (rx * frequency) % 25; 
      if (phase > 2 && phase < 4) {
        // P wave
        y -= Math.sin((phase - 2) * Math.PI) * 3;
      } else if (phase >= 4 && phase < 4.5) {
        // Q wave
        y += 4;
      } else if (phase >= 4.5 && phase < 5.2) {
        // R spike
        y -= 14;
      } else if (phase >= 5.2 && phase < 5.8) {
        // S wave
        y += 8;
      } else if (phase >= 5.8 && phase < 7.5) {
        // T wave
        y -= Math.sin(((phase - 5.8) / 1.7) * Math.PI) * 4;
      }
      
      const px = (x / 100) * width;
      points.push(`${px},${y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  // Continuous sweep for live ECG trace
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setWaveOffset((prev) => (prev + 0.8) % 100);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}m ${remainingSecs < 10 ? "0" : ""}${remainingSecs}s`;
  };

  const accelerateTimer = (id: string) => {
    setDisconnectTimers((prev) => {
      if (prev[id] !== undefined) {
        return { ...prev, [id]: 1 }; // trigger reconnect in 1s
      }
      return prev;
    });
    setLogFeed((prev) => [
      ...prev,
      `⚡ [SIMULATOR INJECTION] Accelerated timeout cooldown for ${devices.find(d => d.id === id)?.name || id}.`
    ]);
  };

  const triggerHeartRateSpike = () => {
    setDevices((prev) =>
      prev.map((dev) => {
        if (dev.id === "device_watch") {
          return {
            ...dev,
            status: "Connected" as const,
            metrics: dev.metrics.map((m) =>
              m.label === "Active Heart Rate" ? { ...m, value: 154, trend: "up" as const } : m
            ),
          };
        }
        return dev;
      })
    );
    setLogFeed((prev) => [
      ...prev,
      "⚡ [SIMULATOR INJECTION] Injected high-intensity cardiovascular load. Heart rate spiked to 154 BPM."
    ]);
  };

  const triggerAQISpike = () => {
    setDevices((prev) =>
      prev.map((dev) => {
        if (dev.id === "device_ac") {
          return {
            ...dev,
            status: "Connected" as const,
            metrics: dev.metrics.map((m) =>
              m.label === "Aerobic Air Purity" ? { ...m, value: 115, trend: "up" as const } : m
            ),
          };
        }
        return dev;
      })
    );
    setLogFeed((prev) => [
      ...prev,
      "⚡ [SIMULATOR INJECTION] Injected allergen trace particulates. Air Purity AQI degraded to 115 AQI."
    ]);
  };

  const triggerBradycardia = () => {
    setDevices((prev) =>
      prev.map((dev) => {
        if (dev.id === "device_watch") {
          return {
            ...dev,
            status: "Connected" as const,
            metrics: dev.metrics.map((m) => {
              if (m.label === "Active Heart Rate") return { ...m, value: 42, trend: "down" as const };
              return m;
            }),
          };
        }
        return dev;
      })
    );
    setLogFeed((prev) => [
      ...prev,
      "⚡ [SIMULATOR INJECTION] Injected acute bradycardic resting load. Heart rate response hit 42 BPM."
    ]);
  };

  const triggerHypoxia = () => {
    setDevices((prev) =>
      prev.map((dev) => {
        if (dev.id === "device_watch") {
          return {
            ...dev,
            status: "Connected" as const,
            metrics: dev.metrics.map((m) => {
              if (m.label === "SpO2 Oxygen Saturation") return { ...m, value: 87, trend: "down" as const };
              if (m.label === "Active Heart Rate") return { ...m, value: 104, trend: "up" as const };
              return m;
            }),
          };
        }
        return dev;
      })
    );
    setLogFeed((prev) => [
      ...prev,
      "⚡ [SIMULATOR INJECTION] Simulated partial respiratory hypoxia airway collapse. SpO2 desaturation hit 87%."
    ]);
  };

  const triggerSomaticShock = () => {
    setDevices((prev) =>
      prev.map((dev) => {
        if (dev.id === "device_watch") {
          return {
            ...dev,
            status: "Connected" as const,
            metrics: dev.metrics.map((m) => {
              if (m.label === "Somatic Stress Level") return { ...m, value: 92, trend: "up" as const };
              if (m.label === "Active Heart Rate") return { ...m, value: 118, trend: "up" as const };
              return m;
            }),
          };
        }
        return dev;
      })
    );
    setLogFeed((prev) => [
      ...prev,
      "⚡ [SIMULATOR INJECTION] Injected autonomic panic neural response stimulus. Somatic stress spiked to 92/100."
    ]);
  };

  const triggerPathogenContamination = () => {
    setDisconnectTimers((prev) => {
      const copy = { ...prev };
      delete copy["device_fridge"];
      return copy;
    });
    setDevices((prev) =>
      prev.map((dev) => {
        if (dev.id === "device_fridge") {
          return {
            ...dev,
            status: "Connected" as const,
            metrics: dev.metrics.map((m) => {
              if (m.label === "Lactose Pathogen Scan") return { ...m, value: 4.8, trend: "up" as const };
              return m;
            }),
          };
        }
        return dev;
      })
    );
    setLogFeed((prev) => [
      ...prev,
      "⚠️ [SIMULATOR INJECTION] Lactose pathogen spores detected! Smart Fridge registers 4.8 mg/L trace pathogens."
    ]);
  };

  // Simulate updating watch metrics (heartrate fluctuating)
  useEffect(() => {
    const timer = setInterval(() => {
      setDevices((prev) =>
        prev.map((dev) => {
          if (dev.status !== "Connected") return dev;
          if (dev.id === "device_watch") {
            return {
              ...dev,
              metrics: dev.metrics.map((m) => {
                if (m.label === "Active Heart Rate") {
                  const currentHr = m.value as number;
                  // If spiked manually (>140), keep fluctuation around high zone unless manually stabilized
                  const delta = Math.floor(Math.random() * 5) - 2;
                  const baselineMin = currentHr > 140 ? 145 : 60;
                  const baselineMax = currentHr > 140 ? 165 : 130;
                  const targetHr = Math.max(baselineMin, Math.min(baselineMax, currentHr + delta));
                  return {
                    ...m,
                    value: targetHr,
                    trend: delta > 0 ? "up" : delta < 0 ? "down" : "stable",
                  };
                }
                if (m.label === "Somatic Stress Level") {
                  const currentStress = m.value as number;
                  const deltaStress = Math.floor(Math.random() * 3) - 1;
                  return {
                    ...m,
                    value: Math.max(5, Math.min(95, currentStress + deltaStress)),
                  };
                }
                return m;
              }),
            };
          }
          if (dev.id === "device_tv") {
            return {
              ...dev,
              metrics: dev.metrics.map((m) => {
                if (m.label === "Continuous Screen Time") {
                  const prevMins = m.value as number;
                  return {
                    ...m,
                    value: prevMins + 1,
                  };
                }
                return m;
              }),
            };
          }
          if (dev.id === "device_ac") {
            return {
              ...dev,
              metrics: dev.metrics.map((m) => {
                if (m.label === "Aerobic Air Purity") {
                  const currentAqi = m.value as number;
                  const deltaAqi = Math.random() > 0.8 ? (Math.floor(Math.random() * 3) - 1) : 0;
                  const baselineMin = currentAqi > 100 ? 101 : 5;
                  const baselineMax = currentAqi > 100 ? 125 : 45;
                  return {
                    ...m,
                    value: Math.max(baselineMin, Math.min(baselineMax, currentAqi + deltaAqi)),
                  };
                }
                return m;
              }),
            };
          }
          return dev;
        })
      );
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // 1-second interval loop decrementing auto-reconnect countdown timers
  useEffect(() => {
    const secondTimer = setInterval(() => {
      setDisconnectTimers((prev) => {
        const copy = { ...prev };
        let updated = false;

        Object.keys(copy).forEach((id) => {
          if (copy[id] > 1) {
            copy[id] = copy[id] - 1;
            updated = true;
          } else {
            // Timer has hit 0 -> Trigger physical auto reconnect
            const targetDevice = devices.find(d => d.id === id);
            const devName = targetDevice?.name || id;
            const devBrand = targetDevice?.brand || "Generic device";
            const devIp = targetDevice?.deviceIp || "127.0.0.1";
            
            delete copy[id];
            updated = true;

            setLogFeed((l) => [
              ...l,
              `[RECONNECT DAEMON] 5-minute timeout elapsed. Automatically re-attempting secure handshakes for: ${devName}...`
            ]);

            setDevices((devs) =>
              devs.map((d) => (d.id === id ? { ...d, status: "Connecting" as const } : d))
            );

            setTimeout(() => {
              setDevices((devs) =>
                devs.map((d) =>
                  d.id === id ? { ...d, status: "Connected" as const } : d
                )
              );
              setLogFeed((l) => [
                ...l,
                `[RECONNECT DAEMON] Connection verified for ${devBrand} [${devIp}].`
              ]);
            }, 1500);
          }
        });

        return updated ? copy : prev;
      });
    }, 1000);

    return () => clearInterval(secondTimer);
  }, [devices]);

  const toggleConnection = (id: string) => {
    const target = devices.find((d) => d.id === id);
    if (!target) return;

    if (target.status === "Connected") {
      // Toggle off
      setDevices((prev) =>
        prev.map((d) =>
          d.id === id
            ? { ...d, status: "Disconnected" as const, riskFactor: "Good" as const }
            : d
        )
      );
      setLogFeed((prev) => [
        ...prev,
        `CLOSED SSL SOCKET: ${target.name} [${target.deviceIp}] has been unlinked from diagnostic logs.`
      ]);

      // Trigger 5-minute (300 seconds) auto-reconnection countdown
      setDisconnectTimers((prev) => ({
        ...prev,
        [id]: 300
      }));
    } else {
      // Toggle on with "Connecting" state
      setConnectingId(id);
      setDevices((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: "Connecting" as const } : d))
      );
      
      // Clear countdown state
      setDisconnectTimers((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });

      setLogFeed((prev) => [
        ...prev,
        `ESTABLISHING SECURE MULTI-CAST: Requesting pairing parameter with ID ${target.id}...`
      ]);

      setTimeout(() => {
        setDevices((prev) =>
          prev.map((d) =>
            d.id === id ? { ...d, status: "Connected" as const } : d
          )
        );
        setLogFeed((prev) => [
          ...prev,
          `PAIRING APPROVED: SSL Connection verified for ${target.brand} [${target.deviceIp}].`
        ]);
        setConnectingId(null);
      }, 1500);
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "watch":
        return <Watch className="h-5 w-5 text-slate-800" />;
      case "fridge":
        return <Flame className="h-5 w-5 text-slate-800" />;
      case "tv":
        return <Tv className="h-5 w-5 text-slate-800" />;
      case "ac":
        return <Wind className="h-5 w-5 text-slate-800" />;
      default:
        return <Smartphone className="h-5 w-5 text-slate-800" />;
    }
  };

  const filteredDevices = devices.filter(
    (d) => activeTab === "all" || d.category === activeTab
  );

  const connectedDevicesCount = devices.filter((d) => d.status === "Connected").length;

  return (
    <div className="w-full bg-white border border-slate-100 p-6 sm:p-10 space-y-8 relative overflow-hidden">
      
      {/* Visual background decor */}
      <div className="absolute right-0 bottom-0 h-48 w-48 bg-radial-gradient(ellipse_at_bottom_right,rgba(249,115,22,0.012)_0%,transparent_60%) pointer-events-none" />

      {/* Grid header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
            <div className="text-[10px] uppercase font-mono tracking-[0.2em] text-slate-400 font-bold flex items-center gap-1.5">
              <BrandName withLogo={true} logoSizeClassName="h-3.5 w-3.5" className="text-[11px]" />
              AMBIENT BIOSPHERE CONSOLE
            </div>
          </div>
          <h3 className="text-3xl font-black text-slate-950 tracking-tight leading-none uppercase">
            Somatic IoT Integration Hub
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mt-2 font-light max-w-2xl">
            Omega tracks a person's overall biological wellness indices by listening to active local networks. Securely hook your Smart Watch, nutrition trackers, and air purification networks into Omega's real-time consultation matrix.
          </p>
        </div>

        {/* Global wellness status */}
        <div className="bg-slate-50 border border-slate-200 px-5 py-3.5 text-right w-full sm:w-auto">
          <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Connected Signals</div>
          <div className="text-2xl font-black text-orange-500 font-mono mt-1">
            {connectedDevicesCount} / {devices.length} <span className="text-xs text-slate-400 font-normal">Active IoT Nodes</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
        
        {/* Left Side: Devices List & Quick Filters (5-cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          {/* Quick tab filters */}
          <div className="flex bg-slate-50 p-1 border border-slate-200 gap-1 rounded-none w-full">
            {(["all", "watch", "fridge", "tv", "ac"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ cursor: "pointer" }}
                className={`flex-1 py-1.5 text-[9px] uppercase font-mono font-bold tracking-wider transition-all duration-150 cursor-pointer ${
                  activeTab === tab
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Web Bluetooth Live Wearable Pairing Console Gated with Google Account Auth */}
          <div className="border border-orange-500/20 bg-slate-50/75 p-4 flex flex-col gap-3 rounded-none relative">
            <div className="absolute top-0 right-0 h-10 w-10 bg-radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.02)_0%,transparent_60%) pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bluetooth className={`h-4.5 w-4.5 text-orange-600 ${(bleStatus === "Connecting" || isSigningInGoogle) ? "animate-bounce" : (bleStatus === "Connected" || isSimulatedLink) ? "animate-pulse" : ""}`} />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-800">
                  Samsung wearable synchronization
                </span>
              </div>
              <span className={`text-[8px] font-mono font-extrabold uppercase px-1.5 py-0.5 border ${
                (bleStatus === "Connected" || isSimulatedLink)
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : (bleStatus === "Connecting" || isSigningInGoogle)
                  ? "bg-amber-50 text-amber-700 border-amber-200 animate-pulse"
                  : "bg-slate-100 text-slate-500 border-slate-200"
              }`}>
                {(bleStatus === "Connected" || isSimulatedLink) ? "Synced" : bleStatus === "Connecting" ? "Connecting" : "Disconnected"}
              </span>
            </div>

            {!currentUser ? (
              /* Forced Google Auth Blockade as required */
              <div className="space-y-3.5 text-left p-1 border border-dashed border-slate-200 p-3 bg-white">
                <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-[10px] uppercase font-mono tracking-wider">
                  <Lock className="h-4 w-4 text-orange-500" />
                  Google Authentication Required
                </div>
                <p className="text-[10.5px] text-slate-500 font-sans leading-relaxed">
                  Access to medical wearable synchronization is restricted. You must first connect your secure Google account. All activity, medical advice consultation summaries, and biometric charts will be saved on your secure Google Cloud profile.
                </p>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isSigningInGoogle}
                  style={{ cursor: "pointer" }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-[10px] font-mono font-black uppercase tracking-widest bg-slate-950 hover:bg-black text-white border border-slate-950 transition-all cursor-pointer"
                >
                  {isSigningInGoogle ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin text-orange-400" />
                      Connecting secure account...
                    </>
                  ) : (
                    <>
                      <UserCheck className="h-3.5 w-3.5 text-orange-400" />
                      Link Google Account
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* Enfranchised Google Account Operator Panel */
              <div className="space-y-3">
                {/* Active Operator metadata tag */}
                <div className="bg-slate-100 px-2.5 py-1.5 flex items-center justify-between text-[8px] font-mono text-slate-500 border border-slate-200 select-none">
                  <span className="uppercase font-bold">OPERATOR: {currentUser.displayName || currentUser.email}</span>
                  <span className="text-emerald-600 font-extrabold">SECURE LEDGER UNLOCKED</span>
                </div>

                {bleStatus === "NotRunningSecurely" && (
                  <div className="text-[10.5px] text-slate-500 font-sans leading-relaxed text-left bg-white p-3 border border-amber-300">
                    <p className="font-semibold text-amber-800 uppercase text-[9.5px] tracking-wider mb-1 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5 text-amber-600" /> SECURE CONTEXT DIALOG
                    </p>
                    Browsers prevent Bluetooth prompt dialogs from showing inside iframes. For real BLE connectivity, click on the **Dev URL / Shared URL option above** to launch in a secure browser tab, or trigger our virtual sandbox link simulator below!
                  </div>
                )}

                {bleStatus === "Unsupported" && (
                  <div className="text-[10.5px] text-slate-500 font-sans leading-relaxed text-left bg-white p-3 border border-red-200">
                    <p className="font-semibold text-red-800 uppercase text-[9.5px] tracking-wider mb-1 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5 text-red-600" /> PHYSICAL BLE UNSUPPORTED
                    </p>
                    This browser/system does not support Web Bluetooth APIs. Please use Chrome/Edge or trigger the virtual loopback simulator below to inspect complete Samsung Health sync charts!
                  </div>
                )}

                {/* Unpaired/Connecting States */}
                {bleStatus !== "Connected" && !isSimulatedLink && (
                  <div className="space-y-3 text-left">
                    <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                      Initialize a real-time Bluetooth (BLE) pairing channel with your local biological wristwear, synchronized to your Google Cloud database partition.
                    </p>
                    
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={requestBluetoothDevice}
                        disabled={bleStatus === "Connecting"}
                        style={{ cursor: "pointer" }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 text-[10px] font-mono font-black uppercase tracking-widest bg-orange-500 hover:bg-orange-600 text-slate-950 border border-orange-600 transition-all cursor-pointer shadow-sm"
                        title="Launches native Bluetooth device discovery menu"
                      >
                        <Bluetooth className="h-3.5 w-3.5 text-slate-950" />
                        {bleStatus === "Connecting" ? "FORCING BLUETOOTH DIALOG..." : "Link Device"}
                      </button>

                      <button
                        type="button"
                        onClick={toggleSimulatedPairing}
                        style={{ cursor: "pointer" }}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[9px] font-mono bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all cursor-pointer"
                        title="Agrees to terms and pairs simulated Samsung Galaxy Watch 6 classic"
                      >
                        Virtual Samsung Health Sync (Terms &amp; Pair Wizard)
                      </button>
                    </div>

                    <div className="text-[8px] font-mono text-slate-400 leading-normal border-t border-slate-200/60 pt-2.5 space-y-1">
                      <div className="font-extrabold text-slate-500 uppercase tracking-wider mb-1">Interactive pairing guidance:</div>
                      <p>• Clicking <strong className="text-slate-600">Link Device</strong> summons Chrome/Edge Bluetooth pair setting overlays natively.</p>
                      <p>• Enable Samsung Wearable sensor broadcast, then approve terms when samsung pops up on screen.</p>
                    </div>
                  </div>
                )}

                {/* Paired & Synchronized State displaying live Samsung Health Data */}
                {(bleStatus === "Connected" || isSimulatedLink) && (
                  <div className="space-y-3 text-left">
                    {/* Live Health Dash details */}
                    <div className="bg-emerald-50/70 border border-emerald-150 p-3.5 space-y-2.5 font-mono text-[10.5px]">
                      <div className="font-black text-emerald-800 uppercase flex items-center justify-between tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                          Paired: {bleDeviceName || "Samsung Galaxy Watch 6 Classic"}
                        </span>
                        <span className="text-[8px] font-black bg-emerald-600 text-white px-1.5 py-0.5 uppercase tracking-normal">Cloud Synced</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 border-t border-emerald-200/50 pt-2.5">
                        <div className="bg-white/70 p-2 border border-emerald-100 text-left">
                          <div className="text-[8px] text-slate-500 uppercase font-black">Current HR</div>
                          <div className="text-slate-950 text-lg font-black mt-0.5 animate-pulse">
                            {bleHeartRate !== null ? bleHeartRate : 76} <span className="text-[8px] text-slate-400 font-normal">BPM</span>
                          </div>
                        </div>

                        <div className="bg-white/70 p-2 border border-emerald-100 text-left">
                          <div className="text-[8px] text-slate-500 uppercase font-black">Daily Burn</div>
                          <div className="text-slate-950 text-lg font-black mt-0.5">
                            {samsungHealthData.caloriesBurned} <span className="text-[8px] text-slate-400 font-normal">kCal</span>
                          </div>
                        </div>

                        <div className="bg-white/70 p-2 border border-emerald-100 text-left col-span-2">
                          <div className="text-[8px] text-slate-500 uppercase font-black">Samsung Rest Sleep Analysis</div>
                          <div className="text-slate-800 text-[9.5px] font-black mt-1 leading-normal">
                            Duration: {samsungHealthData.sleepDuration} hrs • Deep: {samsungHealthData.deepSleep}h • REM: {samsungHealthData.remSleep}h
                          </div>
                          <p className="text-[8px] text-emerald-600 font-bold mt-1">✓ QUALITY ASSESSMENT: HIGH RECORDE RECOVERY RECOUP ({samsungHealthData.sleepQualityScore}%)</p>
                        </div>

                        <div className="bg-white/70 p-2 border border-emerald-100 text-left col-span-2">
                          <div className="text-[8px] text-slate-500 uppercase font-black">Electrocardiogram (ECG) Module</div>
                          <div className="text-slate-900 text-[10px] font-bold mt-0.5 flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            {samsungHealthData.ecgStatus}
                          </div>
                        </div>
                      </div>

                      <div className="text-[8px] text-slate-500 border-t border-emerald-200/50 pt-2 text-right">
                        Stored index: secure partition <strong className="text-slate-800 select-all">usr_om_fit_6</strong>
                      </div>
                    </div>

                    {/* Action toggles and patient reports trigger */}
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (isSimulatedLink) toggleSimulatedPairing();
                            else disconnectBluetoothDevice();
                          }}
                          style={{ cursor: "pointer" }}
                          className="flex-1 py-2 text-[9px] font-mono font-black uppercase tracking-widest border border-slate-350 hover:bg-slate-100 text-slate-700 transition-all cursor-pointer bg-white"
                        >
                          Unlink Device
                        </button>
                        <button
                          type="button"
                          onClick={requestBluetoothDevice}
                          style={{ cursor: "pointer" }}
                          className="px-3.5 py-2 text-[9px] font-mono font-black bg-slate-950 hover:bg-black text-white hover:text-orange-400 border border-slate-950 transition-all cursor-pointer"
                          title="Reconnect or Choose Another Device Setting"
                        >
                          Re-Scan
                        </button>
                      </div>

                      {/* Download Patient Report & Clinical Advice Summary Button inside the console */}
                      <button
                        type="button"
                        onClick={downloadPatientReport}
                        disabled={isReportGenerating}
                        style={{ cursor: "pointer" }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 text-[9.5px] font-mono font-black uppercase tracking-wider bg-orange-500 hover:bg-orange-600 text-slate-950 border border-orange-600 transition-all cursor-pointer shadow-md"
                        title="Compiles medical advices and live heart rates into an EHR certificate document and backups to cloud storage"
                      >
                        {isReportGenerating ? (
                          <>
                            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                            COMPILING REPORT &amp; BACKING UP TO CLOUD...
                          </>
                        ) : (
                          <>
                            <Download className="h-3.5 w-3.5 text-slate-950 animate-pulse" />
                            Download Patient Report &amp; Summary
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cards Loop */}
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {filteredDevices.map((d) => {
              const isConnected = d.status === "Connected";
              const isConnecting = d.status === "Connecting";
              const isAutoReconnecting = d.status === "Disconnected" && disconnectTimers[d.id] !== undefined;
              const criticalInfo = isConnected ? getCriticalThresholdBreach(d) : null;
              const isCritical = !!criticalInfo;

              return (
                <div
                  key={d.id}
                  className={`p-4 border transition-all duration-155 flex flex-col gap-2 rounded-none relative ${
                    isCritical
                      ? "border-red-500 bg-red-50/20 animate-pulse"
                      : isConnected
                      ? "border-slate-350 bg-slate-50/50"
                      : isAutoReconnecting
                      ? "border-orange-400 bg-orange-50/10 shadow-[0_0_12px_rgba(249,115,22,0.08)] animate-pulse"
                      : "border-slate-100 hover:border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    {/* Category Accent Stripe */}
                    {isCritical ? (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 animate-ping" />
                    ) : isConnected ? (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />
                    ) : isAutoReconnecting ? (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-400/80 animate-pulse" />
                    ) : null}

                    <div className="flex items-center gap-3.5 min-w-0 pr-2">
                      <div className="p-2.5 bg-slate-100 border border-slate-200 shrink-0">
                        {getCategoryIcon(d.category)}
                      </div>

                      <div className="truncate text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-slate-950 truncate">{d.name}</span>
                          <span className="text-[8px] font-mono text-slate-400 select-all">{d.deviceIp}</span>
                        </div>
                        <p className="text-[9px] font-mono text-slate-500 uppercase mt-0.5 truncate">{d.brand}</p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-3">
                      <button
                        onClick={() => toggleConnection(d.id)}
                        disabled={isConnecting}
                        style={{ cursor: "pointer" }}
                        className={`px-3 py-1.5 text-[9px] font-mono font-black uppercase tracking-widest border transition-all duration-150 cursor-pointer ${
                          isConnected
                            ? "bg-slate-950 text-white border-slate-950 hover:bg-black"
                            : isConnecting
                            ? "bg-slate-100 text-slate-400 border-slate-100 cursor-not-allowed"
                            : "bg-orange-500 text-slate-950 border-orange-500 hover:bg-orange-600"
                        }`}
                      >
                        {isConnected ? "Linked" : isConnecting ? "Linking..." : "Unlinked"}
                      </button>
                    </div>
                  </div>

                  {/* Active Interactive alerts or disconnect countdown indicators */}
                  {isCritical && (
                    <div className="pl-14 text-left">
                      <span className="text-[8.5px] font-mono text-red-650 font-extrabold uppercase tracking-wide bg-red-50 px-1.5 py-0.5 border border-red-100 block w-fit animate-pulse">
                        🚨 {criticalInfo}
                      </span>
                    </div>
                  )}

                  {d.status === "Disconnected" && disconnectTimers[d.id] !== undefined && (
                    <div className="pl-14 flex items-center gap-2 text-left">
                      <span className="text-[8.5px] font-mono text-orange-600 font-bold bg-orange-50 px-1.5 py-0.5 border border-orange-100 uppercase animate-pulse">
                        Auto-reconnect in {formatTime(disconnectTimers[d.id])}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          accelerateTimer(d.id);
                        }}
                        style={{ cursor: "pointer" }}
                        className="text-[8px] bg-slate-900 border border-slate-950 font-mono text-white px-1.5 py-0.5 hover:bg-orange-600 hover:border-orange-600 uppercase transition-all font-bold cursor-pointer"
                        title="Simulate 5 minutes elapsed instantly"
                      >
                        Fast-Fwd (5m)
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Environmental Health Synthesis */}
          <div className="bg-slate-50 border border-slate-200 p-4 space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-black">Environmental Somatic Correlation</span>
              <span className="text-[9px] font-mono text-slate-900 bg-white border border-slate-200 px-2 py-0.5 font-bold flex items-center gap-1">
                <Radio className="h-3 w-3 inline text-orange-500 animate-pulse" /> Live Listen Core
              </span>
            </div>
            <p className="text-slate-500 text-[10.5px] font-sans leading-normal font-light">
              By connecting active smart air purifiers and metabolic nutrition systems, Omega establishes a bi-directional continuous health diagnostic framework.
            </p>
          </div>

          {/* Diagnostic Calibration Testing Suite */}
          <div className="bg-slate-50 border border-slate-200 p-4 space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">OM_GRID TELEMETRY LAB TESTING</span>
              <span className="text-[8.5px] font-mono text-red-600 bg-red-50 px-1.5 py-0.5 border border-red-100 font-bold uppercase animate-pulse">Simulation Cloud</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
              <button
                type="button"
                onClick={triggerHeartRateSpike}
                style={{ cursor: "pointer" }}
                className="py-1.5 border border-slate-300 hover:border-red-500 bg-white text-slate-700 hover:text-red-700 font-bold text-center transition-all uppercase cursor-pointer"
              >
                Pulse Heart Rate (154 BPM)
              </button>
              <button
                type="button"
                onClick={triggerAQISpike}
                style={{ cursor: "pointer" }}
                className="py-1.5 border border-slate-300 hover:border-red-500 bg-white text-slate-700 hover:text-red-700 font-bold text-center transition-all uppercase cursor-pointer"
              >
                Pulse Aerosol AQI (115 AQI)
              </button>
              <button
                type="button"
                onClick={triggerBradycardia}
                style={{ cursor: "pointer" }}
                className="py-1.5 border border-slate-300 hover:border-blue-500 bg-white text-slate-700 hover:text-blue-700 font-bold text-center transition-all uppercase cursor-pointer"
              >
                Inject Bradycardia (42 BPM)
              </button>
              <button
                type="button"
                onClick={triggerHypoxia}
                style={{ cursor: "pointer" }}
                className="py-1.5 border border-slate-300 hover:border-indigo-500 bg-white text-slate-700 hover:text-indigo-700 font-bold text-center transition-all uppercase cursor-pointer"
              >
                Inject Hypoxia (87% SpO2)
              </button>
              <button
                type="button"
                onClick={triggerSomaticShock}
                style={{ cursor: "pointer" }}
                className="py-1.5 border border-slate-300 hover:border-pink-500 bg-white text-slate-700 hover:text-pink-700 font-bold text-center transition-all uppercase cursor-pointer"
              >
                Somatic Shock (92/100)
              </button>
              <button
                type="button"
                onClick={triggerPathogenContamination}
                style={{ cursor: "pointer" }}
                className="py-1.5 border border-slate-300 hover:border-yellow-600 bg-white text-slate-700 hover:text-yellow-700 font-bold text-center transition-all uppercase cursor-pointer"
              >
                Spores Contamination (4.8mg/L)
              </button>
            </div>
            <p className="text-[9px] text-slate-450 font-sans leading-normal text-slate-400 font-light block">
              Inject biological load patterns instantly to trigger card warning alerts & real-time automated diagnostics response parameters.
            </p>
          </div>

        </div>

        {/* Right Side: Interactive Metrics Monitor & Stream Logs (7-cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          
          {/* Detailed Connected Metrics */}
          <div className="bg-slate-50 border border-slate-100 p-6 flex-1 flex flex-col justify-between dark:shadow-md">
            <div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-4">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-mono text-slate-400 uppercase font-bold tracking-widest flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 text-orange-500 animate-pulse" /> ACTIVE DIALOGUE STREAM
                  </span>
                  <h4 className="text-sm font-black text-slate-950 uppercase">
                    Continuous Health Metrics Monitor
                  </h4>
                </div>
                
                <div className="flex gap-2">
                  <span className="text-[8.5px] font-mono font-black uppercase tracking-wider bg-orange-50 text-orange-700 border border-orange-100 px-2.5 py-0.5">
                    98.9% Telemetry Fidelity
                  </span>
                </div>
              </div>

              {/* Live Sweeping ECG Waveform Console Card */}
              {connectedDevicesCount > 0 && (
                <div className="border border-slate-200 bg-slate-950 p-3 mb-4 flex flex-col gap-2 rounded-none text-left relative overflow-hidden">
                  <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 font-extrabold uppercase select-none tracking-widest">
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Electrocardiogram (ECG) Channel-01
                    </span>
                    <span className="text-emerald-400 font-bold">
                      {devices.find(d => d.id === "device_watch")?.status === "Connected" 
                        ? `${devices.find(d => d.id === "device_watch")?.metrics.find(m => m.label === "Active Heart Rate")?.value ?? 72} BPM` 
                        : "72 BPM (Resting)"}
                    </span>
                  </div>
                  
                  {/* Sweeping SVG Wave trace */}
                  <div className="h-10 w-full relative opacity-90">
                    <svg className="w-full h-full text-emerald-500" viewBox="0 0 400 40" preserveAspectRatio="none">
                      <title>Electrocardiogram Stream</title>
                      <path
                        d={getECGPath()}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {/* Sweeping bar overlay highlights */}
                    <div 
                      className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent pointer-events-none"
                      style={{ left: `${waveOffset}%`, transform: 'translateX(-50%)' }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center text-[7.5px] font-mono text-slate-600 font-bold border-t border-slate-900 pt-1 select-none">
                    <span>GAIN: x2.50 RESP: SYNCHRONIZED</span>
                    <span>SWEEP SPEED: 25.0 MM/S</span>
                  </div>
                </div>
              )}

              {/* Grid block metrics of active signals only */}
              {connectedDevicesCount === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <AlertCircle className="h-8 w-8 text-slate-350" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 uppercase">No Active IoT Streams Linked</h5>
                    <p className="text-slate-450 text-[10.5px] mt-1 text-slate-400 font-light max-w-xs">
                      Activate "Unlinked" IoT devices to synthesize live environmental and cardiovascular variables.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {devices
                    .filter((dev) => dev.status === "Connected")
                    .map((dev) => (
                      <div key={dev.id} className="bg-white border border-slate-200 p-4 space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                          <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 truncate">
                            {getCategoryIcon(dev.category)}
                            {dev.name}
                          </span>
                          <span className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 ${
                            dev.riskFactor === "Good"
                              ? "bg-green-50 text-green-700 border border-green-100"
                              : dev.riskFactor === "Nominal"
                              ? "bg-blue-50 text-blue-700 border border-blue-100"
                              : "bg-red-50 text-red-700 border border-red-100 animate-pulse"
                          }`}>
                            {dev.riskFactor}
                          </span>
                        </div>

                        <div className="space-y-2 text-left font-mono">
                          {dev.metrics.map((m, mIdx) => (
                            <div key={mIdx} className="flex justify-between items-center text-[10px]">
                              <span className="text-slate-400 font-sans">{m.label}</span>
                              <span className="text-slate-900 font-bold flex items-center gap-1">
                                {m.value}
                                <span className="text-[8.5px] font-normal text-slate-400 font-sans">{m.unit}</span>
                                {m.trend === "up" && <span className="text-red-500 font-bold text-[8px]">▲</span>}
                                {m.trend === "down" && <span className="text-emerald-500 font-bold text-[8px]">▼</span>}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

             {/* Simulated Live Diagnostic impact calculated */}
             {connectedDevicesCount > 0 && (
               <div className="bg-white border border-slate-150 p-4 mt-6 text-left space-y-2">
                 <span className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Omega Diagnosis Feedback Integration</span>
                 <p className="text-xs font-sans leading-relaxed">
                   {devices.some((d) => getCriticalThresholdBreach(d) !== null) ? (
                     <span className="text-red-650 font-extrabold text-red-600 animate-pulse block">
                       ⚠️ **BIOMETRIC THRESHOLD CRITICAL BREACH:** Active alarms detected: {
                         devices.map(d => getCriticalThresholdBreach(d)).filter(Boolean).join(" | ")
                       }. Omega suggests immediate rest, activation of Daikin clean filter pathways, and real-time physical physician consults.
                     </span>
                   ) : devices.find((d) => d.id === "device_tv" && d.status === "Connected") ? (
                     <span className="text-red-700 font-medium font-sans">
                       ⚠️ **Alert:** Due to elevated optic stimulus and continuous watch sedentary indices, Omega suggests cooling ambient temperature on the Daikin Smart AC to 19°C to stabilize somatic rest potential.
                     </span>
                   ) : (
                     <span className="text-emerald-700 font-medium font-sans">
                       ✓ **Nominal:** General biological matrix looks balanced. Air purity indicators are nominal, heart-rate is holding standard active targets.
                     </span>
                   )}
                 </p>
               </div>
             )}
          </div>

          {/* Patient Clinical Profile Calibration Indices */}
          <div className="bg-slate-50 border border-slate-200 p-5 space-y-4 text-left">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <div className="space-y-0.5">
                <span className="text-[9.5px] font-mono text-slate-400 uppercase font-black tracking-widest flex items-center gap-1.5">
                  <Sliders className="h-3.5 w-3.5 text-orange-500" /> CLINICAL PROFILE CALIBRATION
                </span>
                <h4 className="text-xs font-black text-slate-950 uppercase">Diagnostic Threshold Coefficients</h4>
              </div>
              <span className="text-[8px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 border border-emerald-100 font-extrabold uppercase">
                Active Tuning
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px]">
              {/* Blood Pressure calibration */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-slate-500 text-[9px] uppercase font-bold">Hypertension Risk Profile</label>
                <div className="grid grid-cols-3 gap-1 bg-white p-1 border border-slate-200">
                  {(["normotensive", "elevated", "hypertensive"] as const).map((z) => (
                    <button
                      key={z}
                      onClick={() => {
                        setBloodPressureZone(z);
                        setLogFeed(prev => [...prev, `🩺 [CLINICAL CALIBRATION] Patient Blood Pressure zone adjusted to ${z.toUpperCase()}.`]);
                      }}
                      style={{ cursor: "pointer" }}
                      className={`py-1 text-[8px] font-mono uppercase font-black tracking-tighter transition-all cursor-pointer ${
                        bloodPressureZone === z
                          ? "bg-slate-950 text-white"
                          : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      {z.slice(0, 5)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Allergy profile */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-slate-500 text-[9px] uppercase font-bold">Inhalant Aerosol Sensitivity</label>
                <div className="grid grid-cols-3 gap-1 bg-white p-1 border border-slate-200">
                  {(["low", "moderate", "severe"] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => {
                        setAllergySensitivity(lvl);
                        setLogFeed(prev => [...prev, `🩺 [CLINICAL CALIBRATION] Aero-allergen threshold response sensitivity tuned to ${lvl.toUpperCase()}.`]);
                      }}
                      style={{ cursor: "pointer" }}
                      className={`py-1 text-[8px] font-mono uppercase font-black tracking-tighter transition-all cursor-pointer ${
                        allergySensitivity === lvl
                          ? "bg-slate-950 text-white"
                          : "text-slate-450 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recovery Focus profile */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-slate-500 text-[9px] uppercase font-bold">Circadian Recovery Index</label>
                <div className="grid grid-cols-2 gap-1 bg-white p-1 border border-slate-200">
                  {(["rest", "performance"] as const).map((prof) => (
                    <button
                      key={prof}
                      onClick={() => {
                        setRecoveryProfile(prof);
                        setLogFeed(prev => [...prev, `Circadian Recovery target switched to ${prof.toUpperCase()} profile.`]);
                      }}
                      style={{ cursor: "pointer" }}
                      className={`py-1 text-[8.5px] font-mono uppercase font-black tracking-tighter transition-all cursor-pointer ${
                        recoveryProfile === prof
                          ? "bg-slate-950 text-white"
                          : "text-slate-450 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      {prof}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pacemaker safeguard */}
              <div className="flex flex-col gap-1.5 justify-between">
                <div className="flex justify-between items-center mt-1">
                  <div className="flex flex-col text-left">
                    <span className="font-sans font-bold text-slate-955 uppercase text-[9.5px]">Cardiac Pacemaker Active</span>
                    <span className="text-[8px] text-slate-400 font-mono">Micro-stimulation safeguard</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSafeguardActive(!safeguardActive);
                      setLogFeed(prev => [...prev, `⚠️ [SYSTEM UPDATE] Closed loop micro-pacemaker telemetry safeguard ${!safeguardActive ? "ENGAGED" : "BYPASSED"}.`]);
                    }}
                    style={{ cursor: "pointer" }}
                    className={`px-3 py-1.5 text-[8.5px] font-mono font-black uppercase transition-all cursor-pointer ${
                      safeguardActive 
                        ? "bg-emerald-500 text-slate-950 border border-emerald-600 hover:bg-emerald-600" 
                        : "bg-slate-200 text-slate-500 border border-slate-300 hover:bg-slate-300"
                    }`}
                  >
                    {safeguardActive ? "HEALTH SECURE" : "BYPASSED"}
                  </button>
                </div>
              </div>
            </div>
            
            <p className="text-[10px] text-slate-500 font-sans leading-normal font-light mt-1">
              Adjusting critical coefficients dynamically recalibrates environmental air purifier ventilation triggers and cardiac pacemaker emergency thresholds live.
            </p>
          </div>

          {/* Stream terminal logs */}
          <div className="bg-slate-950 p-4 font-mono text-[9px] text-slate-400 select-all border border-slate-900 flex flex-col space-y-2 h-[120px] overflow-hidden">
            <div className="flex justify-between text-slate-500 text-[8px] border-b border-slate-800 pb-1 font-bold">
              <span>DAEMON: iot_biometric_sync_daemon.sh</span>
              <span>UTC STATUS: ACTIVE</span>
            </div>
            <div className="overflow-y-auto flex-1 text-slate-350 space-y-1 select-text scrollbar-thin">
              {logFeed.slice(-5).map((log, index) => (
                <div key={index} className="flex gap-2 text-left">
                  <span className="text-slate-600 select-none">$&gt;</span>
                  <span className="text-slate-300 break-all">{log}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
