
import { ChatGroq } from "@langchain/groq";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";


const parser = StructuredOutputParser.fromNamesAndDescriptions(
  {
    code: "Here is the code which we need"
  }
);


// console.log(parser.getFormatInstructions())


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





const structuredOutputExtractor = async(model, context, prompt) =>{
  const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
      "Answer the user's question as best as possible.\n{format_instructions}\n{question}"
    ),
    model,
    parser,
  ]);

  const formattedPrompt = `
        ${PROMPT_TEMPLATE}
        Context: ${context}
        Prompt: ${prompt}
        `;

  const response = await chain.invoke({
    question: formattedPrompt,
    format_instructions: parser.getFormatInstructions(),
  });

  return response;
}

// const context =
//   "This web application is designed for a modern tech company that specializes in providing cloud-based solutions. The website has a clean, minimalistic design with a focus on user experience and accessibility. The contact page should provide users with multiple ways to get in touch with the company, including a contact form, social media links, and office locations. The design should be responsive, user-friendly, and aligned with the overall branding of the company.";
// const promptInput =
//   "Create a contact page with a contact form, social media icons, and office locations.";

// const model = new ChatGroq({ temperature: 0, apiKey: "<Enter your groq api key>" })
// const response = await structureOutput(model, context, promptInput)
// console.log(response);

export default structuredOutputExtractor

