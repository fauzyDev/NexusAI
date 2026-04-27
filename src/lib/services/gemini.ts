import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.SECRET_GEMINI_API_KEY;

export async function sendMessage(message: string) {
    if (!apiKey) {
        throw new Error("SECRET_GEMINI_API_KEY is not defined in environment variables");
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContentStream(message);
    return result;
}
