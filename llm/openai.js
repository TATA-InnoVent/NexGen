import { createAzure } from '@ai-sdk/azure';

const openai = createAzure({
  resourceName: 'NexGenOpenAI', // Azure resource name
  apiKey: process.env.NEXSIS_OPENAI_API_KEY,
});


const model = openai('gpt-4o-mini')

export default model