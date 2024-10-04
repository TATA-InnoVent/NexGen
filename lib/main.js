import Config from "./config/parseConfig.js";
import iterativeDeepeningDFS from "./promptChain.js";
import findDirectories from "./findDirectories.js";
import path from "path";
import LLMIntegration from "./llmIntegration.js";
import dotenv from 'dotenv';
import { fileURLToPath, pathToFileURL } from 'url';

// Load environment variables from the .env file
dotenv.config({ path: path.resolve(Config.envFile) });



async function processEntryPoints(sendToLLM=true) {
  const allDirectories = findDirectories(pathToFileURL(path.resolve(Config.baseUrl)));

  for (const entryPoint of Config.entryPoints) {
    try {
      const { arrOfArrs } = await iterativeDeepeningDFS(
        pathToFileURL(path.resolve(Config.baseUrl, entryPoint)),
        Config.depthLimit,
        allDirectories
      );
      
      const combinedArray = arrOfArrs.flat().filter(item => item.hasDirective);
      if (sendToLLM==true){
        LLMIntegration(combinedArray);
      }
      else{
        for (let i = 0; i < combinedArray.length; i++) {
          console.log(fileURLToPath(combinedArray[i].path).toString())
        }
      }
    } catch (error) {
      console.error("An error occurred during traversal:", error);
    }
  }
}

export default processEntryPoints
