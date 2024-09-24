import fs from "fs";
import path from "path";
import precinct from "precinct";
import Config from './config/parseConfig.js';
import checkDirective from "./checkDirective.js";

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// NOT DONE::TODO: Add extension support for the file name eg .jsx, .css, .js, etc
// Currently we need to specify the extension while importing the files in reactJS

// DONE::TODO: Make a config file to add the paths
// Create a config file for the paths and also for the LLM support
// Add multiple options for LLM and file support also think for more options

// DONE::TODO: Add a base case for termination for the dfs approch
// Also rename the function for better understanding and for the future

// DONE::TODO: Add the 'use ai' directive support while reading the files
// Can use the code specified in the travserFiles.js for implemention of directive

// NOT DONE::TODO: Add proper templating for the prompt

// DONE(need to test more)::TODO: Make the code more robust for handling multiple edge cases





// Function to perform DFS with branch-specific visited states
const dfsWithBranchSpecificVisited = async (filePath, depthLimit, branchVisitedMap, promptsByDepth, allDirectories) => {
  const stack = [{ path: filePath, depth: 0, context: "System: ", prompt: "" }];

  while (stack.length > 0) {
    const { path: currentPath, depth, context, prompt } = stack.pop();

    // Initialize branch-specific visited set for current depth
    if (!branchVisitedMap.has(depth)) {
      branchVisitedMap.set(depth, new Set());
    }
    const depthVisited = branchVisitedMap.get(depth);

    if (depth > depthLimit || depthVisited.has(currentPath)) continue;
    depthVisited.add(currentPath);

    const { hasDirective, prompt: promptText, directive } = await checkDirective(currentPath);

    // Ensure promptsByDepth is initialized for the current depth
    if (!promptsByDepth[depth]) {
      promptsByDepth[depth] = [];
    }

    // Add file path with directive, context, and prompt
    promptsByDepth[depth].push({
      path: currentPath,
      hasDirective: hasDirective,
      context: context,
      prompt: promptText,
      directive: directive
    });

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
          stack.push({ 
            path: resolvedPath, 
            depth: depth + 1, 
            context: context + promptText,
            prompt: ""
          });
        }
      }
    }
  }
};

// Iterative Deepening DFS function with branch-specific visited states
const iterativeDeepeningDFS = async (filePath, maxDepth, allDirectories) => {
  let arrOfArrs = [];

  for (let depth = 0; depth <= maxDepth; depth++) {
    const branchVisitedMap = new Map(); // Map to hold visited sets for each depth
    const promptsByDepth = [];
    await dfsWithBranchSpecificVisited(filePath, depth, branchVisitedMap, promptsByDepth, allDirectories);

    // Add array of file paths with directives for this depth
    const depthArray = promptsByDepth[depth]?.map(entry => ({
      path: entry.path,
      context: entry.context,
      prompt: entry.prompt,
      hasDirective: entry.hasDirective,
      directive: entry.directive
    })) || [];

    arrOfArrs.push(depthArray);
  }

  // console.log("Final Array of Arrays by Depth:", arrOfArrs);
  return { arrOfArrs };
};

// Starting point for IDDFS traversal




export default iterativeDeepeningDFS;