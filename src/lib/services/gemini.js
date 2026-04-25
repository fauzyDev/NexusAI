import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.SECRET_GEMINI_API_KEY;
export async function sendMessage(message) {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);
    return result
}