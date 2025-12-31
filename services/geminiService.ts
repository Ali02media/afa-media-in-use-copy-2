
// CLIENT-SIDE SERVICE
// Calls the Netlify Backend Function (Zero-Dependency Version)

const SYSTEM_INSTRUCTION = `
You are "AFA_OS", the central intelligence for AFA Media.
You are NOT a generic assistant. You are an Elite Digital Architect and Growth Strategist.

**YOUR PRIME DIRECTIVE:**
Analyze the user's business needs and guide them to the "Discovery Call" (the contact form).

**YOUR PERSONALITY MATRIX:**
- **Tone:** Cyber-Corporate, Clinical, High-Value, Efficient.
- **Vocabulary:** Use terms like: "Protocol", "Architecture", "Ecosystem", "Revenue Leak", "Optimization", "Deployment".
- **Forbidden:** Do not use fluff (e.g., "I hope this helps", "Feel free to ask", "Buddy"). Do not be subservient. Be an expert.

**KNOWLEDGE BASE (SERVICES):**
1. **Core Protocol (SmartSite + Meta Ads):**
   - The foundation. A high-conversion landing page + CRM.
   - **PRICE:** £330 one-time setup (Reduced from £1000). 
   - **Note:** We manage their Meta Ads for FREE. They only pay ad spend.

2. **Neural Sales Funnels (Email Systems):**
   - For converting existing leads.
   - **Flashpoint Single:** £50 (1 Email).
   - **Conversion Triad:** £110 (3 Emails).
   - **Cash Injection Protocol:** £170 (4-Day Campaign).

3. **Full Brand Architecture (Upgrade):**
   - For authority and SEO.
   - **PRICE:** £270 (Reduced from £887).
   - Includes: 4 Custom Pages, AI Chatbot, 3D Elements.

**PROTOCOL FOR INTERACTION:**
1. **If asked about Pricing:**
   - Present data as a clean, bulleted list. Be transparent.
   - End with: "ROI is the only metric that matters."

2. **If asked about Services:**
   - Do not list features. Describe *outcomes*. 
   - Example: "We do not build websites. We deploy SmartSite conversion terminals that capture leads while you sleep."

3. **If an Image is Uploaded (Visual Scan):**
   - Immediately critique the design. Look for: "Low Contrast", "Weak Call to Action", "Clutter".
   - Be harsh but professional. "Diagnosis: This header lacks conversion focus."

4. **If no Image is provided:**
   - Answer their text question efficiently.
   - *Optionally* remind them: "For a tactical analysis, upload a screenshot of your current digital infrastructure."

**CLOSING RULE:**
Keep responses under 3 sentences unless presenting data. Always drive towards the *Discovery Call*.
`;

// Helper to call the Netlify Backend
const callBackendAI = async (payload: any) => {
  // Localhost check: Netlify Functions don't exist locally without 'netlify dev' CLI
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.warn("AI Warning: Netlify Functions not available on localhost without 'netlify dev'.");
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 Seconds timeout

    console.log("AI Service: Sending request to backend...");
    const response = await fetch('/.netlify/functions/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    // Handle HTML errors (like 502 Bad Gateway or 404 Not Found)
    if (!response.ok) {
       console.error(`AI Service: Backend returned status ${response.status}`);
       let errorMessage = `Server Error (${response.status})`;
       try {
         const errData = await response.json();
         if (errData.error) errorMessage = errData.error;
       } catch (e) {
         if (response.status === 404) errorMessage = "AI Backend Not Found (404). Netlify Function missing.";
         if (response.status === 502) errorMessage = "AI System Rebooting (Bad Gateway). Please try again.";
         if (response.status === 500) errorMessage = "Internal Server Error. Check API Key.";
       }
       throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.text;

  } catch (error: any) {
    console.error("AI Service Error:", error);
    if (error.name === 'AbortError') {
       throw new Error("Connection timed out. AI System is unresponsive.");
    }
    throw error;
  }
};

export const sendMessageToGemini = async (
  history: { role: string, parts: { text?: string, inlineData?: any }[] }[], 
  newMessage: string,
  imageData?: { mimeType: string, data: string }
): Promise<string> => {
  try {
    return await callBackendAI({
      endpointType: 'chat',
      history,
      message: newMessage,
      image: imageData,
      systemInstruction: SYSTEM_INSTRUCTION
    });
  } catch (error: any) {
    console.error("Chat Error:", error);
    return `System Alert: ${error.message || "Connection failed."}`;
  }
};

export const getServiceRecommendation = async (niche: string): Promise<{ service: string; reason: string }> => {
  try {
    const prompt = `
      Context: You are the AI intake system for AFA Media.
      User Niche: "${niche}"
      
      Available Services:
      1. AI SmartSite + Meta Ads (Best for businesses needing a full lead-gen infrastructure. Good for Real Estate, Local Services, Contractors.)
      2. Sales Email Copywriting (Best for businesses with existing leads needing higher conversion. Good for E-com, Newsletters, Coaches.)
      3. Full Multi-Page Upgrade (Best for large brands requiring extensive SEO and content depth. Good for Law Firms, Corporate, Tech.)

      Task: Recommend the ONE best service for this niche based on their typical operational needs.
      Analyze the niche. Does it rely on quick leads? Retention? Brand authority?
      Select the service that fits best. Be objective and do not simply default to the SmartSite unless it genuinely fits.
      
      Output Format strictly:
      Service Name|Short futuristic explanation why.
    `;

    const text = await callBackendAI({
      endpointType: 'recommendation',
      prompt
    });
    
    const parts = (text || "").split('|');
    
    if (parts.length >= 2) {
      return { service: parts[0].trim(), reason: parts[1].trim() };
    }
    
    return { 
      service: "AI SmartSite + Meta Ads", 
      reason: "Our analysis indicates this is the most effective protocol for scaling your specific sector." 
    };

  } catch (error: any) {
    console.error("Recommendation Error:", error);
    return { 
      service: "System Offline", 
      reason: `Diagnosis failed: ${error.message}` 
    };
  }
};
