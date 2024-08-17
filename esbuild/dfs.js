import fs from "fs";
import path from "path";
import { extname, resolve } from "path";
import precinct from "precinct";


// TODO: Add extension support for the file name eg .jsx, .css, .js, etc
// Currently we need to specify the extension while importing the files in reactJS

// TODO: Make a config file to add the paths
// Create a config file for the paths and also for the LLM support
// Add multiple options for LLM and file support also think for more options

// TODO: Add a base case for termination for the dfs approch
// Also rename the function for better understanding and for the future

// TODO: Add the 'use ai' directive support while reading the files
// Can use the code specified in the travserFiles.js for implemention of directive

// TODO: Add proper templating for the prompt

// TODO: Make the code more robust for handling multiple edge cases



const dfs = async (filePath, arr, prompt) => {
  const { COMPONENT_PROMPT } = await import(filePath);

  prompt = prompt + COMPONENT_PROMPT;

  console.log(prompt);
  const deps = precinct.paperwork(filePath, {
    includeCore: false,
    fileSystem: fs,
  });

  for (let index = 0; index < deps.length; index++) {
    const resolvedPath = require.resolve(deps[index], {
      paths: [
        "/home/rohit/Desktop/my-react-app/app/src",
        "/home/rohit/Desktop/my-react-app/app/src/pages",
        "/home/rohit/Desktop/my-react-app/app/src/components",
      ],
    });

    if (!resolvedPath.includes("node_modules")) {
      arr.push(resolvedPath);
    }
  }

  console.log(arr);

  while (arr.length > 0) {
    const resolvedPath = arr.shift();
    dfs(resolvedPath, [], prompt);
  }

  return prompt;
};

dfs("/home/rohit/Desktop/my-react-app/app/src/App.jsx", [], "");
