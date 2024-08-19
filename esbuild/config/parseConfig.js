import fs from 'fs'
import path from 'path'


let Config = ""
const PrepareConfig = async() =>{
    const contents = fs.readFileSync('nexsis.config.json', 'utf-8')
    Config = JSON.parse(contents)

    for(let i=0;i<Config.llmDirectives.length;i++){
        Config.llmDirectives[i].llmFunction = await import(path.resolve(Config.llmDirectives[i].path))
    }
}

PrepareConfig()

export default Config