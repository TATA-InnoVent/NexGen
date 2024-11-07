import Config from "./config/parseConfig.js";
import structuredOutputExtractor from "./structuredOutputExtractor.js";
import fs from "fs";
import { modify, describe, normal } from "./options.js";
import { fileURLToPath } from "url";

const LLMIntegration = (combinedArray) => {
  combinedArray.forEach((item) => {
    if (item.hasDirective) {
      const directive = item.directive;

      if (directive in Config.llmDirectives) {
        const model = Config.llmDirectives[directive].default;

        item.llmOutput = new Promise((resolve, reject) => {
          try {
            const componentPromptPattern = /\/\*\*[\s\S]*?\*\//g;
            if (item.options.type == 'describe' && item.fileContent.match(componentPromptPattern) != null) {
              reject(new Error(`${fileURLToPath(item.path)} File already contains a prompt`));
            }
            const result = structuredOutputExtractor(
              model,
              item.context,
              item.prompt,
              item.fileContent,
              item.options
            );
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });

      }
    }
  });
};




export default LLMIntegration;
