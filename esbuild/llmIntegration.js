import Config from "./config/parseConfig";

const LLMIntegration = (arrOfArrs) => {
  for (let i = 0; i < arrOfArrs.length; i++) {
    for (let j = 0; j < arrOfArrs[i].length; j++) {
      if (arrOfArrs[i][j].hasDirective === true) {
        for (let k = 0; k < Config.llmDirectives.length; k++) {
          if (arrOfArrs[i][j].directive === Config.llmDirectives[k].name) {
            const generatedCode = new Promise((resolve, reject) => {
              try {
                const result = Config.llmDirectives[k].llmFunction.default(
                  arrOfArrs[i][j].context,
                  arrOfArrs[i][j].prompt
                );
                resolve(result);
              } catch (error) {
                reject(error);
              }
            });
            arrOfArrs[i][j].llmOutput = generatedCode;
          }
        }
      }
    }
  }
};

export default LLMIntegration;
