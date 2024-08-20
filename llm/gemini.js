import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';

// API Key (replace with your actual API key)
const google_apiKey = " ";

// Initialize the Gemini Pro model with API key
const geminiLLM = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  temperature: 0.3,
  apiKey: google_apiKey
});

// Define a more specific prompt template
const PROMPT_TEMPLATE = `
Generate a minimalistic and clean UI code based on the provided context and prompt.

Context: {context}
Prompt: {prompt}

Requirements:
- Use React functional components and hooks (useState, useEffect).
- No external libraries or hooks unless absolutely necessary.
- Keep the structure simple and easy to understand.
- Focus on essential HTML elements and styling using basic inline CSS classes.

Generated Code:
`;

// Create a prompt template
const prompt = new PromptTemplate({
  template: PROMPT_TEMPLATE,
  inputVariables: ["context", "prompt"]
});

async function geminiRun(context, promptInput) {
  try {
    const inputData = {
      context: context,
      prompt: promptInput
    };

    const formattedPrompt = `
        ${PROMPT_TEMPLATE}
        Context: ${context}
        Prompt: ${promptInput}
        `;

const output = await geminiLLM.invoke(formattedPrompt);

    

    // Consider parsing the output here if needed
    return output.content;
  } catch (error) {
    console.error("Error:", error);
    return null; // Or handle the error appropriately
  }
}

// Example usage
const context = "This web application is designed for a modern tech company that specializes in providing cloud-based solutions. The website has a clean, minimalistic design with a focus on user experience and accessibility. The contact page should provide users with multiple ways to get in touch with the company, including a contact form, social media links, and office locations. The design should be responsive, user-friendly, and aligned with the overall branding of the company.";
const promptInput = "Create a contact page with a contact form, social media icons, and office locations.";

geminiRun(context, promptInput)
  .then(output => {
    console.log(output);
  })
  .catch(error => {
    console.error("Error:", error);
  });
