import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey: string = process.env.SECRET_GEMINI_API_KEY!;

export async function sendMessage(message: string) {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContentStream(message);
    return result;
}