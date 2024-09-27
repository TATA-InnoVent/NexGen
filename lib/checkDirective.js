import fs from 'fs';
import Config from './config/parseConfig.js';

// Function to check for the directive and return the prompt if found
const checkDirective = async (filePath) => {
    const content = await fs.promises.readFile(filePath, 'utf8');
    const directivePattern = /^'use ai:\[(.*?)\]'$/m;
  
    let matchTest = content.match(directivePattern);
    let directive = "";
    if (matchTest != null) {
      directive = matchTest[1];
    }
  
    // Import the COMPONENT_PROMPT if the directive is found
    let prompt = "";
    if(Config.includeCompleteFileContent == true){
      prompt = content
    }
    else{
      const {COMPONENT_PROMPT} = await import(filePath);
      prompt = COMPONENT_PROMPT
    }
    
  
    return {
      hasDirective: directivePattern.test(content),
      prompt: prompt || "",
      directive: directive
    };
  };


export default checkDirective;