import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from 'langchain/prompts';

// API Key
const google_api_key = " ";

// Initialize the Gemini Pro model with API key
const gemini_llm = new ChatGoogleGenerativeAI({
    model: "gemini-pro",
    temperature: 0.3,
    google_api_key: google_api_key
});

// Define a basic template
const PROMPT_TEMPLATE = `
Generate a minimalistic and clean UI code based on the provided context and prompt.
Context: {context}
Prompt: {prompt}

Response Format:
- Use React functional components.
- No external libraries or hooks unless absolutely necessary.
- Keep the structure simple and easy to understand.
- Focus on essential HTML elements and styling using basic CSS classes.

Generated Code:
`;

// Create a prompt template
const prompt = new PromptTemplate({
    template: PROMPT_TEMPLATE,
    inputVariables: ["context", "prompt"]
});

async function geminiRun(context, promptInput) {
    // Sample context and prompt
    const input_data = {
        context: context,
        prompt: promptInput
    };

    // Format the prompt using the input data
    const formatted_prompt = prompt.format(input_data);

    // Invoke the model with the formatted prompt
    const output = await gemini_llm.invoke(formatted_prompt);

    // Return the output content
    return output.content;
}

// Example usage
const context = "This web application is designed for a modern tech company that specializes in providing cloud-based solutions. The website has a clean, minimalistic design with a focus on user experience and accessibility. The contact page should provide users with multiple ways to get in touch with the company, including a contact form, social media links, and office locations. The design should be responsive, user-friendly, and aligned with the overall branding of the company.";
const promptInput = "Write the complete code for a `contact.js` page in a React-based web application. The page should include the following: 1. A contact form with fields for name, email, subject, and message, and a submit button. 2. Social media links (Facebook, Twitter, LinkedIn) with corresponding icons. 3. A section displaying office locations with addresses and links to Google Maps. Ensure that the code is well-structured, using modern React practices. Use Tailwind CSS classes for styling.";

geminiRun(context, promptInput).then(output => {
    console.log(output);
});
