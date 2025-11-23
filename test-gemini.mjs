import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCMBXUNM_NOuCZMYcDCjNVC2P3V7ToQqw4";
const genAI = new GoogleGenerativeAI(API_KEY);

async function test() {
    try {
        console.log("Testing Gemini API...");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent("Hello, are you there?");
        const response = await result.response;
        console.log("Success:", response.text());
    } catch (error) {
        console.error("Error Details:", JSON.stringify(error, null, 2));
        console.error("Error Message:", error.message);
    }
}

test();
