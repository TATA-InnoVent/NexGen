import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({ temperature: 0, apiKey: "", model: 'llama-3.1-70b-versatile' })


export default model