import fs from "fs";
import path from "path";
import precinct from "precinct";
import Config from './parseConfig.js';



// NOT DONE::TODO: Add extension support for the file name eg .jsx, .css, .js, etc
// Currently we need to specify the extension while importing the files in reactJS

// NOT DONE::TODO: Make a config file to add the paths
// Create a config file for the paths and also for the LLM support
// Add multiple options for LLM and file support also think for more options

// DONE::TODO: Add a base case for termination for the dfs approch
// Also rename the function for better understanding and for the future

// DONE::TODO: Add the 'use ai' directive support while reading the files
// Can use the code specified in the travserFiles.js for implemention of directive

// NOT DONE::TODO: Add proper templating for the prompt

// DONE(need to test more)::TODO: Make the code more robust for handling multiple edge cases


function findDirectories(rootDir) {
    let directories = [];
    
    function recurseDirectory(dir) {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of items) {
            const fullPath = path.join(dir, item.name);
            if (item.isDirectory()) {
                directories.push(fullPath);
                recurseDirectory(fullPath); // Recurse into subdirectory
            }
        }
    }
    directories.push(rootDir)
    recurseDirectory(rootDir);
    return directories;
}





// Function to check for the directive and return the prompt if found
const checkForDirective = async (filePath) => {
  const content = await fs.promises.readFile(filePath, 'utf8');
  const directivePattern = /^'use ai:\[(.*?)\]'$/m;

  let matchTest = content.match(directivePattern)
  let llm = ""
  if(matchTest!=null){
    llm = matchTest[1]
  }
  

  // Import the COMPONENT_PROMPT if the directive is found
  const { COMPONENT_PROMPT } = await import(filePath);

  return {
    hasDirective: directivePattern.test(content),
    prompt: COMPONENT_PROMPT || "",
    llm:llm
  };
};

// Function to perform DFS with branch-specific visited states
const dfsWithBranchSpecificVisited = async (filePath, depthLimit, branchVisitedMap, promptsByDepth) => {
  const stack = [{ path: filePath, depth: 0, prompt: "System" }];

  while (stack.length > 0) {
    const { path: currentPath, depth, prompt } = stack.pop();

    // Initialize branch-specific visited set for current depth
    if (!branchVisitedMap.has(depth)) {
      branchVisitedMap.set(depth, new Set());
    }
    const depthVisited = branchVisitedMap.get(depth);

    if (depth > depthLimit || depthVisited.has(currentPath)) continue;
    depthVisited.add(currentPath);

    const { hasDirective, prompt: promptText, llm } = await checkForDirective(currentPath);

    // Ensure promptsByDepth is initialized for the current depth
    if (!promptsByDepth[depth]) {
      promptsByDepth[depth] = [];
    }

    // Add file path with directive and prompt
    if (prompt) {
      promptsByDepth[depth].push({
        path: currentPath,
        directive: hasDirective,
        prompt: promptText+ prompt,
        llm:llm
      });
      // console.log(`Depth ${depth}: Found directive in ${currentPath}`);
      // console.log(`Prompt added: ${promptText}`);
    } else {
      // Always include non-directive files with merged prompt
      promptsByDepth[depth].push({
        path: currentPath,
        directive: hasDirective,
        prompt: promptText+ prompt,
        llm:llm
      });
    }

    // Continue DFS for each child path
    if (depth < depthLimit) {
      const deps = precinct.paperwork(currentPath, {
        includeCore: false,
        fileSystem: fs,
      });

      for (let dep of deps) {
        const resolvedPath = require.resolve(dep, {
          paths: allDirectories,
        });

        if (!resolvedPath.includes("node_modules")) {
          stack.push({ path: resolvedPath, depth: depth + 1, prompt: promptText+prompt });
        }
      }
    }
  }
};

// Iterative Deepening DFS function with branch-specific visited states
const iterativeDeepeningDFS = async (filePath, maxDepth) => {
  let arrOfArrs = [];
  // let mergedPrompts = [];

  for (let depth = 0; depth <= maxDepth; depth++) {
    const branchVisitedMap = new Map(); // Map to hold visited sets for each depth
    const promptsByDepth = [];
    await dfsWithBranchSpecificVisited(filePath, depth, branchVisitedMap, promptsByDepth);

    // Add array of file paths with directives for this depth
    const depthArray = promptsByDepth[depth]?.map(entry => ({
      path: entry.path,
      prompt: entry.prompt,
      directive: entry.directive,
      llm: entry.llm
    })) || [];

    arrOfArrs.push(depthArray);

    // // Merge prompts for this depth
    // const mergedPromptForDepth = promptsByDepth[depth]?.map(entry => entry.prompt).join("\n") || "";
    // mergedPrompts.push(mergedPromptForDepth);

    // console.log(`Depth ${depth}: File paths with directives at this level:`, depthArray);
    // console.log(`Depth ${depth}: Merged prompts at this level:`, mergedPromptForDepth);
  }

  console.log("Final Array of Arrays by Depth:", arrOfArrs);
  // console.log("Final Merged Prompts by Depth:", mergedPrompts);
  return { arrOfArrs };
};

// Starting point for IDDFS traversal
const allDirectories = findDirectories(path.resolve(Config.baseUrl));
console.log(allDirectories)
iterativeDeepeningDFS(path.resolve(Config.baseUrl, Config.entryPoints[0]), Config.depthLimit)
  .then(({ arrOfArrs}) => {
    console.log("Traversal complete.");
  })
  .catch((error) => {
    console.error("An error occurred during traversal:", error);
  });
