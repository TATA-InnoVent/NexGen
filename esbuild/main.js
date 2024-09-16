import Config from "./config/parseConfig.js";
import iterativeDeepeningDFS from "./promptChain.js";
import findDirectories from "./findDirectories.js";
import path from "path";
import LLMIntegration from "./llmIntegration.js";
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config({ path: path.resolve(Config.envFile) });



async function processEntryPoints(sendToLLM=true) {
  const allDirectories = findDirectories(path.resolve(Config.baseUrl));

  for (const entryPoint of Config.entryPoints) {
    try {
      const { arrOfArrs } = await iterativeDeepeningDFS(
        path.resolve(Config.baseUrl, entryPoint),
        Config.depthLimit,
        allDirectories
      );
      
      const combinedArray = arrOfArrs.flat().filter(item => item.hasDirective);
      if (sendToLLM==true){
        LLMIntegration(combinedArray);
      }
      else{
        for (let i = 0; i < combinedArray.length; i++) {
          console.log(combinedArray[i].path)
        }
      }
    } catch (error) {
      console.error("An error occurred during traversal:", error);
    }
  }
}

export default processEntryPoints
