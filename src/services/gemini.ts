import { GoogleGenerativeAI } from "@google/generative-ai";

// In a real app, this should be in an env variable. 
// For this prototype, we'll use the provided key directly but securely.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

export const generateResponse = async (prompt: string, history: { role: "user" | "model", parts: string }[] = []) => {
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
