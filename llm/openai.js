import { createAzure } from '@ai-sdk/azure';

const openai = createAzure({
  resourceName: 'your-resource-name', // Azure resource name
  apiKey: process.env.NEXSIS_OPENAI_API_KEY,
});


export default openai