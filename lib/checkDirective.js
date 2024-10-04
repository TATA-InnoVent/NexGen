import fs from 'fs';
import Config from './config/parseConfig.js';

// Function to check for the directive and return the prompt if found
const checkDirective = async (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const firstLine = content.trim().split('\n')[0];
    const directivePattern = /^'use ai:\[(.*?)\]'$/m;
    const componentPromptPattern = /\/\*\*[\s\S]*?\*\//g;
  
    let matchTest = firstLine.match(directivePattern);
    let directive = "";
    if (matchTest != null) {
      directive = matchTest[1];
    }
  

    let prompt = "";
    if(Config.includeCompleteFileContent == true){
      prompt = content
    }
    else{
      let componentPromptTest = content.match(componentPromptPattern)
      if(componentPromptTest != null){
        for(let i=0;i<componentPromptTest.length;i++){
          prompt = prompt + componentPromptTest[i] + "\n\n";
        }
      }
    }
    
  
    return {
      hasDirective: directivePattern.test(firstLine),
      prompt: prompt || "",
      directive: directive
    };
  };


export default checkDirective;