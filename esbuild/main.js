import Config from "./config/parseConfig";
import iterativeDeepeningDFS from "./promptChain";
import findDirectories from "./findDirectories";
import path from "path";
import LLMIntegration from "./llmIntegration";


require('dotenv').config({ path: path.resolve(Config.envFile) })

const allDirectories = findDirectories(path.resolve(Config.baseUrl));
console.log(allDirectories);

async function processEntryPoints() {
  for (const entryPoint of Config.entryPoints) {
    try {
      const { arrOfArrs } = await iterativeDeepeningDFS(
        path.resolve(Config.baseUrl, entryPoint),
        Config.depthLimit,
        allDirectories
      );
      
      const combinedArray = arrOfArrs.flat().filter(item => item.hasDirective);
      LLMIntegration(combinedArray);

      console.log("Updated Array:");
      console.log(combinedArray);
    } catch (error) {
      console.error("An error occurred during traversal:", error);
    }
  }
}

processEntryPoints();
