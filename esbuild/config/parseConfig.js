import fs from 'fs';
import path from 'path';

let Config = "";
const PrepareConfig = async () => {
    const contents = fs.readFileSync('nexsis.config.json', 'utf-8');
    Config = JSON.parse(contents);

    // Convert array format to object format having llm name as key and path as value
    const directivesArray = Config.llmDirectives;
    Config.llmDirectives = directivesArray.reduce((acc, directive) => {
        acc[directive.name] = directive.path;
        return acc;
    }, {});

    //Fetching llmfunction object using path as value in the llmDirective map
    for (const key in Config.llmDirectives) {
        if (Config.llmDirectives.hasOwnProperty(key)) {
            Config.llmDirectives[key] = await import(path.resolve(Config.llmDirectives[key]));
        }
    }
    // console.log(Config.llmDirectives);
};

PrepareConfig();

export default Config;