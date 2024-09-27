


import chokidar from 'chokidar'
import Config from '../config/parseConfig.js'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config({ path: path.resolve(Config.envFile) });


console.log(path.resolve(Config.baseUrl))
const watcher = chokidar.watch(path.resolve(Config.baseUrl),{
    persistent: true,
    ignoreInitial: true,
    ignored: [],
    ignorePermissionErrors: false,
    interval: 100,
    binaryInterval: 300,
    disableGlobbing: false,
    enableBinaryInterval: true,
    useFsEvents: false,
    usePolling: false,
    atomic: true,
    followSymlinks: true,
    awaitWriteFinish: false
})

watcher.on('ready',()=>{
    console.log("I am ready to watch files")
})

// Whenever file is added
watcher.on('add',async(path) => {
    let promptData = path.replace(/^.*[\\/]/, '').replace(/\.[^/.]+$/, '')
    console.log(promptData)

    // TODO: Create a fetch api for the fetching the boilerPlate from the database
    // TODO: This code is not tested Please test it properly

    const result = await fetch(Config.boilerPlate.apiUrl, {
        method:'POST',
        body:JSON.stringify({"query_text": promptData}),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const code = await result.json()
    // console.log(code)
    fs.writeFileSync(path, code.component_code)
    console.log(`BoilerPlate Written in ${path}`)
})


