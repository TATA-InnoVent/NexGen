import Config from "./config/parseConfig";

const LLMIntegration = (combinedArray) => {
  combinedArray.forEach((item) => {
    if (item.hasDirective) {
      const directive = item.directive;

      if (directive in Config.llmDirectives) {
        const llmFunction = Config.llmDirectives[directive].default;

        item.llmOutput = new Promise((resolve, reject) => {
          try {
            const result = llmFunction(item.context, item.prompt);
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
