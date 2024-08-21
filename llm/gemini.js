import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

// API Key (replace with your actual API key)
const google_apiKey = " ";

// Initialize the Gemini Pro model with API key
const geminiLLM = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  temperature: 0.3,
  apiKey: google_apiKey,
});

  export default geminiLLM