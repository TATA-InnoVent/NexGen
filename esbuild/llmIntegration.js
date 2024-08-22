import Config from "./config/parseConfig";
import structuredOutputExtractor from "./structuredOutputExtractor";

const LLMIntegration = (combinedArray) => {
  combinedArray.forEach((item) => {
    if (item.hasDirective) {
      const directive = item.directive;

      if (directive in Config.llmDirectives) {
        const model = Config.llmDirectives[directive].default;

        item.llmOutput = new Promise((resolve, reject) => {
          try {
            const result = structuredOutputExtractor(model, item.context, item.prompt)
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });

        item.llmOutput.then((data)=>{
          console.log(data.code)
        })
      }
    }
  });
};

export default LLMIntegration;
