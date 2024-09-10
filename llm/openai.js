import { OpenAI } from "@langchain/openai";

const model = new OpenAI({
  model: "gpt-3.5-turbo-instruct",
  temperature: 0.9,
  apiKey: process.env.NEXSIS_OPENAI_API_KEY,
});


export default model