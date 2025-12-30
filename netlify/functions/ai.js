
import { GoogleGenAI } from "@google/genai";

/**
 * Netlify Function: AI Orchestrator
 * Uses the official Google GenAI SDK for interaction with Gemini models.
 */
export const handler = async (event, context) => {
  console.log("AI Function: Request received");

  // CORS Headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  // Handle Preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  // Only POST allowed
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  try {
    // CRITICAL: Obtain API key exclusively from process.env.API_KEY as per guidelines
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      console.error("AI Function: API Key missing");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Server Configuration Error: API Key missing in Netlify settings." })
      };
    }

    if (!event.body) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing body" }) };
    }

    const requestBody = JSON.parse(event.body);
    const { endpointType, systemInstruction, prompt, history, message, image } = requestBody;

    // Use Gemini 3 Flash Preview for text tasks as per model selection rules
    const modelName = 'gemini-3-flash-preview';
    
    // Initialize the SDK correctly with named parameter
    const ai = new GoogleGenAI({ apiKey: apiKey });

    let contents = [];

    if (endpointType === 'chat') {
      if (history && Array.isArray(history)) {
        contents = history.map(msg => ({
          role: msg.role,
          parts: msg.parts
        }));
      }

      const newParts = [];
      if (image) {
        // Multi-modal input part for image analysis
        newParts.push({
          inlineData: {
            mimeType: image.mimeType,
            data: image.data
          }
        });
        newParts.push({ text: message || "Analyze this image." });
      } else {
        newParts.push({ text: message || "" });
      }
      contents.push({ role: "user", parts: newParts });
    } else {
      // Direct prompt (e.g. for recommendations)
      contents.push({
        role: "user",
        parts: [{ text: prompt || "Hello" }]
      });
    }

    console.log(`Sending request to Google GenAI SDK (${modelName})...`);
    
    // Call generateContent with the appropriate model and contents configuration
    const response = await ai.models.generateContent({
      model: modelName,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        maxOutputTokens: 1000,
        temperature: 0.7
      }
    });

    // The SDK provides the generated text directly via the .text property (not a method)
    const text = response.text || "";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ text: text })
    };

  } catch (error) {
    console.error("Backend Error:", error);
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({ error: `Backend Error: ${error.message}` })
    };
  }
};
