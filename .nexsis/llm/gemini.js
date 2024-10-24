import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
  baseURL:"https://generativelanguage.googleapis.com/v1beta",
  apiKey:process.env.NEXSIS_GEMINI_API_KEY
});

const model = google("gemini-1.5-pro")

export default model