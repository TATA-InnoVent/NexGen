#!/usr/bin/env node

import { execSync, spawn, spawnSync } from 'child_process';
import os from 'os';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to log and handle errors
const handleError = (action) => (err) => {
    if (err) console.error(`Error ${action}:`, err);
};

// Define config and env contents
const configContent = JSON.stringify({
    baseUrl: './src',
    paths: [],
    entryPoints: ['App.jsx'],
    depthLimit: 5,
    runOnce: true,
    includeCompleteFileContent: false,
    extensions: ['.js', '.jsx'],
    envFile: './.nexsis/.env.nexsis',
    systemPromptFile: './.nexsis/prompts/system.md',
    llmDirectives: [
        { name: 'openai', path: './.nexsis/llm/openai.js' },
        { name: 'gemini', path: './.nexsis/llm/gemini.js' },
        { name: 'groq', path: './.nexsis/llm/groq.js' },
    ],
    boilerPlate: {
        boilerPlatePromptFile: './.nexsis/prompts/boilerPlate.md',
        apiUrl: 'http://98.70.77.218:8000/retrieve',
    },
}, null, 4);

// Create config and .env files
const createFiles = async () => {
    try {
        await fs.writeFileSync('nexsis.config.json', configContent);
        console.log('Created nexsis.config.json');
    } catch (err) {
        handleError('creating files')(err);
    }
};

// Recursively copy folder
const copyFolder = async (src, dest) => {
    try {
        const files = await fs.readdir(src);
        await fs.mkdir(dest, { recursive: true });

        await Promise.all(files.map(async (file) => {
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);
            const stats = await fs.stat(srcPath);

            if (stats.isDirectory()) {
                await copyFolder(srcPath, destPath);
            } else {
                await fs.copyFile(srcPath, destPath);
                console.log(`Copied ${srcPath} to ${destPath}`);
            }
        }));
    } catch (err) {
        handleError('copying folder')(err);
    }
};

// Main execution
// (async () => {
//     const __filename = fileURLToPath(import.meta.url);
//     const __dirname = path.dirname(__filename);
//     await createFiles();
//     const sourceFolder = path.join(__dirname, './../../.nexsis');
//     const targetFolder = path.join(process.cwd(), '.nexsis');
//     await copyFolder(sourceFolder, targetFolder);
// })();



(async()=>{
    // Clone the repository based on the OS
    if (os.platform() === 'win32') {
        // For Windows systems
        execSync('git clone --quiet https://github.com/TATA-InnoVent/.nexsis.git', { stdio: 'ignore' });
        
        // Path to the .git folder in the cloned repository
        const gitFolderPath = path.join(process.cwd(), '.nexsis', '.git');
        
        // Check if the .git folder exists before attempting to delete it
        try {
            if (fs.existsSync(gitFolderPath)) {
                execSync(`rmdir /s /q "${gitFolderPath}"`, { stdio: 'ignore' });
                console.log(`Successfully deleted .git folder at ${gitFolderPath}`);
            } else {
                console.log(`.git folder not found at ${gitFolderPath}`);
            }
        } catch (error) {
            console.error('Error deleting .git folder:', error);
        }
    } else {
        // For Linux/macOS systems
        execSync('git clone --quiet https://github.com/TATA-InnoVent/.nexsis.git', { stdio: 'ignore' });

        // Path to the .git folder in the cloned repository
        const gitFolderPath = path.join(process.cwd(), '.nexsis', '.git');
        
        // Delete .git folder on Linux/macOS
        try {
            execSync(`rm -rf ${gitFolderPath}`, { stdio: 'ignore' });
            console.log(`Successfully deleted .git folder at ${gitFolderPath}`);
        } catch (error) {
            console.error('Error deleting .git folder:', error);
        }
    }

    // This will call the createFiles function after deleting the .git folder
    await createFiles();

})()
