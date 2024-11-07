import Config from "./config/parseConfig.js";
import fs from "fs";

const saveFile = (combinedArray) => {
  combinedArray.forEach((item) => {
    if (item.llmOutput) {
        item.llmOutput.then(async (data) => {
          const fileContent = fs.readFileSync(item.path, 'utf-8');
          if (item.options.type == "modify") {
            let writeData = "";
            const componentPromptPattern = /\/\*\*[\s\S]*?\*\//g;
            const lines = fileContent.trim().split('\n');
            const updatedFileContent = lines.slice(1).join('\n');
            if (Config.runOnce == true) {
              writeData = updatedFileContent.replace(componentPromptPattern, convertToJSDocComment(data.extract));
            } else {
              writeData = `'use ai:[${item.directive}]'${updatedFileContent.replace(componentPromptPattern, convertToJSDocComment(data.extract))}`
            }

            fs.writeFileSync(item.path, writeData);
            console.log(`File Write Done\nFile: ${item.path}`);
          }
          if (item.options.type == "describe") {
            let writeData = "";
            const lines = fileContent.trim().split('\n');
            const updatedFileContent = lines.slice(1).join('\n');
            if (Config.runOnce == true) {
              writeData = `\n\n\n${convertToJSDocComment(data.extract)}\n\n\n${updatedFileContent}`;
            } else {
              writeData = `'use ai:[${item.directive}]'\n\n\n${convertToJSDocComment(data.extract)}\n\n\n${updatedFileContent}`;
            }

            fs.writeFileSync(item.path, writeData);
            console.log(`File Write Done\nFile: ${item.path}`);
          }
          if (item.options.type == "normal") {
            let writeData = "";
            if (Config.runOnce == true) {
              writeData = `\n\n\n${item.prompt}\n\n\n${data.extract}`;
            } else {
              writeData = `'use ai:[${item.directive}]'\n\n\n${item.prompt}\n\n\n${data.extract}`;
            }

            fs.writeFileSync(item.path, writeData);
            console.log(`File Write Done\nFile: ${item.path}`);
          }
        }).catch((error) => {
          console.error("Failed to process item:",  error.message);
        });;
      
    }
  });
};


function convertToJSDocComment(inputString) {
  const lines = inputString.split('\n');
  const formattedLines = lines.map(line => ` * ${line}`).join('\n');
  return `/**\n${formattedLines}\n */`;
}

export default saveFile;
