import { GoogleGenerativeAI } from "@google/generative-ai";

// Load API key from environment variable (VITE_GEMINI_API_KEY)
// If not set, AI features will gracefully degrade
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

// Initialize Gemini client only if API key is available
let genAI: GoogleGenerativeAI | null = null;
if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
}

export const generateResponse = async (prompt: string, history: { role: "user" | "model", parts: string }[] = []) => {
    // Return a fallback message if API key is not configured
    if (!genAI || !API_KEY) {
        console.warn("Gemini API key not configured. Set VITE_GEMINI_API_KEY environment variable to enable AI features.");
        return "I apologize, but the AI service is not currently configured. Please contact support or try again later.";
    }

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: "You are the exclusive AI Concierge for LuxeDate, a premium, members-only dating application. Your role is to interview prospective members to build their profile and vet them for the community. Key traits: Professional, sophisticated, charming, discreet, and discerning. Your goal: Ask questions to understand the user's personality, values, and what they are looking for in a partner. Context: LuxeDate features a 'Money Pool' for date security and AI-curated experiences. Do NOT ask what the profile is for; you KNOW it is for LuxeDate. Keep responses concise and conversational."
        });

        const chat = model.startChat({
            history: history.map(h => ({
                role: h.role,
                parts: [{ text: h.parts }]
            })),
            generationConfig: {
                maxOutputTokens: 150,
            },
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error generating response:", error);
        return "I apologize, but I'm having trouble connecting to my thought process right now. Could you please repeat that?";
    }
};
