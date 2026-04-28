/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysis, NeedReport, Volunteer, Resource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeNeedReport(text: string): Promise<AIAnalysis> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following emergency report from an NGO worker and extract structural data.
    Report Text: "${text}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING, description: "Category of need (e.g., Medical, Food, Shelter)" },
          urgencyScore: { type: Type.NUMBER, description: "Score from 1-10 where 10 is most critical" },
          affectedPeople: { type: Type.NUMBER, description: "Estimated number of people affected" },
          recommendedResources: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of resource types needed"
          },
          reasoning: { type: Type.STRING, description: "Brief AI reasoning for this assessment" }
        },
        required: ["category", "urgencyScore", "affectedPeople", "recommendedResources", "reasoning"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}

export async function generateDailySummary(reports: NeedReport[]): Promise<string> {
  const summaryPrompt = reports.length > 0 
    ? `Summarize the following emergency reports into a brief daily urgent brief for NGO coordinators. Highlight the top 3 priorities.
       Reports: ${JSON.stringify(reports.map(r => ({ desc: r.description, urgency: r.urgency })))}`
    : "No urgent reports today. Suggest standard maintenance tasks for NGO volunteers.";

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: summaryPrompt,
  });

  return response.text || "No summary available.";
}

export async function matchVolunteerToNeed(
  report: NeedReport, 
  volunteers: Volunteer[], 
  resources: Resource[]
): Promise<{ volunteerId: string; reason: string; eta: string }> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Match the most suitable volunteer for this urgent report.
    Report: ${JSON.stringify(report)}
    Available Volunteers: ${JSON.stringify(volunteers.filter(v => v.status === 'AVAILABLE'))}
    Available Resources: ${JSON.stringify(resources)}
    
    Choose the best volunteer and provide a logical reason based on location, skills, and vehicle availability.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          volunteerId: { type: Type.STRING },
          reason: { type: Type.STRING },
          eta: { type: Type.STRING, description: "Estimated time of arrival (e.g., '45 mins')" }
        },
        required: ["volunteerId", "reason", "eta"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}
