import Config from "./config/parseConfig";
import iterativeDeepeningDFS from "./promptChain";
import findDirectories from "./findDirectories";
import path from "path";
import LLMIntegration from "./llmIntegration";

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

      // DONE::TODO: Optimize this code from Time complexicty O(n^3) -> O(n)
      // DONE:: Do this by reducing the arr of arr to a single arr O(n^3) -> O(n^2)
      // Change the config to make a llmDriecitves to a map where the key is the direcitve O(n^2) -> O(n)

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
