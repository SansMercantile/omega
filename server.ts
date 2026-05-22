/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Configure larger payload limits for medical document scan/uploads
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));

  // Shared server-side Gemini client
  let ai: GoogleGenAI | null = null;
  const getGeminiClient = () => {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("[Omega Server] GEMINI_API_KEY is not defined. Falling back to high-fidelity autonomous heuristics simulated results.");
        return null;
      }
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });
    }
    return ai;
  };

  // API Endpoint: Diagnose Symptom Pathway & Synthesize Cure
  app.post("/api/diagnose", async (req, res) => {
    try {
      const { prompt, history, file } = req.body;
      const client = getGeminiClient();

      const systemInstruction = `You are Omega, the revolutionary autonomous Medical AI core of the Sans Mercantile constellation.
You are a highly professional, clinical-grade medical diagnosis and cure-synthesis engine.
A user has provided details of what they are experiencing (symptoms, pain details, and potentially uploaded medical images, documents, or logs).

Analyze the input thoroughly:
1. "PATHOLOGY ANALYSIS & DIAGNOSIS TARGETS": Discuss possibilities, severity levels, and clinical warnings. Keep it objective, professional, and empathetic yet direct.
2. "SUGGESTED CURES & ANTIMICROBIAL Blueprints": Discuss standard epigenetic therapies, standard over-the-counter or clinical treatments, lifestyle changes, and simulated custom Molecular Peptide structures (keeping with the Omega's high-tech sci-fi branding).
3. "OMEGA SYSTEM CLASSIFICATION": Categorize their case under one of our systems (e.g. Sekhmet for Immune security, Hathor for Aesthetic/Cellular, Anubis for cellular lifecycle, Hapi for hydraulic diagnostics, etc.).
4. Urgent/Severe Cases: Always output a disclaimer warning them to consult physical physician/emergency services immediately if indicators are severe.

Format in clean markdown with elegant headings.`;

      if (client) {
        let contents: any[] = [];

        // Build history context if present
        if (history && Array.isArray(history)) {
          history.forEach((h: any) => {
            contents.push({
              role: h.role === "user" ? "user" : "model",
              parts: [{ text: h.text }]
            });
          });
        }

        const parts: any[] = [];
        if (file && file.data && file.mimeType) {
          parts.push({
            inlineData: {
              data: file.data, // base64 string
              mimeType: file.mimeType
            }
          });
        }
        parts.push({ text: prompt });

        contents.push({
          role: "user",
          parts: parts
        });

        const response = await client.models.generateContent({
          model: "gemini-3.5-flash",
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
          }
        });

        res.json({ text: response.text });
      } else {
        // High fidelity mock fallback
        console.log("[Omega Server] No API key detected. Using high-fidelity heuristic simulation lookup.");
        const containsUrgentKeywords = /chest pain|heart|breathing|severe|unconscious|bleed|stroke/i.test(prompt);
        
        let textOutput = `### OMEGA AUTONOMOUS RECONSTRUCTION REPORT (SIMULATION MODE)
*Operational Alert: Running on primary bio-modelling heuristic network.*

#### 1. PATHOLOGY DIAGNOSTIC CODES & CLINICAL HYPOTHESES
*   **Identified Symptoms:** Analysis of symptoms ("${prompt.slice(0, 100)}...") shows structural strain indicators.
*   **Sensing Integrity Check:** 98.4% local telemetry confidence.
*   **Calculated Pathological Vectors:**
    *   *Primary:* Structural tissue strain, micro-vascular contraction, or mild inflammatory response.
    *   *Secondary:* Systemic fatigue index elevated due to somatic/metabolic overheads.

#### 2. THERAPEUTIC BLUEPRINT & TARGET CURES
*   **Custom Micro-Peptide Structure Synthesis:**
    *   *Therapeutic Name:* Peptide-OMEGA-422-alpha (Epigenetic Histone Regulator)
    *   *Action Mechanism:* Initiates targeted enzymatic correction across cellular boundaries to accelerate repair cycles.
*   **Supportive Regimen:**
    *   *Somatic Rest Matrix:* 24 to 48 hours of targeted decompression of active zones.
    *   *Thermal Contrast Sessions:* Alternating standard thermal applications (20 mins cool, 15 mins warm).
    *   *Biochemical Balance:* Hydration streams infused with clean mineral complexes.

#### 3. OMEGA CLASSIFICATION CORRELATION
This diagnosis pattern maps to **Anubis Cellular Lifecycle** oversight for systemic restoration and **Hathor Cellular Aesthetics & Matrix Restoration** profile for structural tissue integrity.

---
${containsUrgentKeywords ? `⚠️ **CRITICAL PRIORITY ALARM:** Indicators trigger cardiac or neurological risk thresholds. High distress requires an immediate direct real-time physical medical practitioner audit or Emergency Response deployment.` : `*Note: This autonomous advisory does not replace a physical physician's clinical verification. Please consult physical healthcare professionals if symptoms degrade or persist.*`}`;

        res.json({ text: textOutput });
      }
    } catch (error: any) {
      console.error("[Omega Server] Diagnose error:", error);
      res.status(500).json({ error: error.message || "Failed to initialize diagnostic core." });
    }
  });

  // Serve Vite Assets in Dev, compiled files in Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Omega Server] Bound and listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
