import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY;

// Initialize safe generic client
let aiClient: GoogleGenAI | null = null;

try {
  if (apiKey) {
    aiClient = new GoogleGenAI({ apiKey });
  }
} catch (error) {
  console.error("Failed to initialize Gemini client", error);
}

export const generateTaskSuggestions = async (role: string): Promise<any[]> => {
  if (!aiClient) return [];

  try {
    const response = await aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 3 productive task suggestions for a person with the role: ${role}. Return JSON only.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              estimatedDuration: { type: Type.STRING }
            }
          }
        }
      }
    });

    const jsonStr = response.text;
    if (jsonStr) {
        return JSON.parse(jsonStr);
    }
    return [];
  } catch (error) {
    console.error("Error generating tasks:", error);
    return [];
  }
};

export const analyzeSchedule = async (events: any[]): Promise<string> => {
    if (!aiClient) return "AI services unavailable.";

    try {
        const eventContext = JSON.stringify(events);
        const response = await aiClient.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze this daily schedule and give a 2-sentence motivation or insight about the workload: ${eventContext}`,
        });
        return response.text || "Have a productive day!";
    } catch (error) {
        console.error("Error analyzing schedule", error);
        return "Stay focused and achieve your goals!";
    }
}