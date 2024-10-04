import Config from "./config/parseConfig.js";
import structuredOutputExtractor from "./structuredOutputExtractor.js";
import fs from 'fs'

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

        item.llmOutput.then(async(data)=>{
          // console.log(data.code)
          let writeData = ""
          if(Config.runOnce==true){
            writeData = `\n\n\n${item.prompt}\n\n\n${data.code}`
          }
          else{
            writeData = `'use ai:[${item.directive}]'\n\n\n${item.prompt}\n\n\n${data.code}`
          }
          
          fs.writeFileSync(item.path, writeData)
          console.log(`File Write Done\nFile: ${item.path}`)

          
        })
      }
    }
  });
};

export default LLMIntegration;
