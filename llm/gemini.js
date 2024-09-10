import { ChatGoogleGenerativeAI } from "@langchain/google-genai";


const geminiLLM = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-pro",
  temperature: 0.3,
  apiKey: process.env.NEXSIS_GEMINI_API_KEY,
});

  export default geminiLLM