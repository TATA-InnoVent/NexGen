import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

let Config = "";
const PrepareConfig = async () => {
    const contents = fs.readFileSync('nexsis.config.json', 'utf-8');
    Config = JSON.parse(contents);

    const systemPrompt = fs.readFileSync(Config.systemPromptFile, 'utf-8');
    Config["systemPrompt"] = systemPrompt

    const boilerPlatePrompt = fs.readFileSync(Config.boilerPlate.boilerPlatePromptFile, 'utf-8');
    Config.boilerPlate["boilerPlatePrompt"] = boilerPlatePrompt

    // Convert array format to object format having llm name as key and path as value
    const directivesArray = Config.llmDirectives;
    Config.llmDirectives = directivesArray.reduce((acc, directive) => {
        acc[directive.name] = directive.path;
        return acc;
    }, {});

    //Fetching llmfunction object using path as value in the llmDirective map
    for (const key in Config.llmDirectives) {
        if (Config.llmDirectives.hasOwnProperty(key)) {
            Config.llmDirectives[key] = await import(pathToFileURL(path.resolve(Config.llmDirectives[key])));
        }
    }
    // console.log(Config.llmDirectives);
};

PrepareConfig();

export default Config;