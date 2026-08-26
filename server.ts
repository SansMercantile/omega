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
      const { prompt, history, file, patient_profile } = req.body;
      const backendUrl = process.env.OMEGA_BACKEND_URL?.replace(/\/$/, "");

      if (backendUrl) {
        const backendResponse = await fetch(`${backendUrl}/api/diagnose`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, history, file, patient_profile }),
        });
        const responseBody = await backendResponse.text();
        res.status(backendResponse.status).type("application/json").send(responseBody);
        return;
      }

      const client = getGeminiClient();

      const systemInstruction = `You are the OMEGA advisory clinical-information assistant.
Do not diagnose, prescribe, claim a cure, or invent test results. State uncertainty and recommend professional care.
A user has provided details of what they are experiencing (symptoms, pain details, and potentially uploaded medical images, documents, or logs).

Analyze the input thoroughly:
1. "PATHOLOGY ANALYSIS & DIAGNOSIS TARGETS": Discuss possibilities, severity levels, and clinical warnings. Keep it objective, professional, and empathetic yet direct.
2. "INFORMATION & NEXT STEPS": Discuss only evidence-based general information, questions to ask a clinician, reasonable monitoring, and when to seek urgent care. Never provide a custom drug, peptide, cure, dosage, or prescription.
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

        res.json({
          text: response.text,
          provider: "gemini",
          simulation: false,
          timestamp: new Date().toISOString(),
        });
      } else {
        res.status(503).json({
          error: "No diagnostic provider is configured. Set OMEGA_BACKEND_URL or GEMINI_API_KEY.",
          code: "DIAGNOSTIC_PROVIDER_UNAVAILABLE",
        });
        return;
        // No provider means no analysis. Never fabricate a medical result.
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
T, "0.0.0.0", () => {
    console.log(`[Omega Server] Bound and listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
