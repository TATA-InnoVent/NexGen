import Config from "./config/parseConfig";
import iterativeDeepeningDFS from "./promptChain";
import findDirectories from "./findDirectories";
import path from "path";
import LLMIntegration from "./llmIntegration";



const allDirectories = findDirectories(path.resolve(Config.baseUrl));
console.log(allDirectories);

for (let index = 0; index < Config.entryPoints.length; index++) {
  iterativeDeepeningDFS(
    path.resolve(Config.baseUrl, Config.entryPoints[index]),
    Config.depthLimit,
    allDirectories
  )
    .then(({ arrOfArrs }) => {
      // TODO: Optimize this code from Time complexicty O(n^3) -> O(n)
      // Do this by reducing the arr of arr to a single arr O(n^3) -> O(n^2)
      // Change the config to make a llmDriecitves to a map where the key is the direcitve O(n^2) -> O(n)
      LLMIntegration(arrOfArrs)
      console.log("Updated Array of Arrays");
      console.log(arrOfArrs)

    })
    .catch((error) => {
      console.error("An error occurred during traversal:", error);
    });
}
