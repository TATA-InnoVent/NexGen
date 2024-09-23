#! /usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

// Helper to log and handle errors
const handleError = (action) => (err) => {
    if (err) console.error(`Error ${action}:`, err);
};

// Define config and env contents
const configContent = JSON.stringify({
    baseUrl: "./src",
    paths: [],
    entryPoints: ["App.jsx"],
    depthLimit: 5,
    runOnce: true,
    includeCompleteFileContent: false,
    extensions: [".js", ".jsx"],
    envFile: ".env.nexsis",
    llmDirectives: [
        { name: "openai", path: "./llm/openai.js" },
        { name: "gemini", path: "./llm/gemini.js" },
        { name: "groq", path: "./llm/groq.js" }
    ],
    boilerPlate: {
        prompt: "Hello World",
        apiUrl: "http://98.70.77.218:8000/retrieve"
    }
}, null, 4);

const envContent = `
NEXSIS_OPENAI_API_KEY=""
NEXSIS_GEMINI_API_KEY=""
NEXSIS_GROQ_API_KEY=""
`.trim();

// Create config and .env files
const createFiles = async () => {
    try {
        await fs.writeFile('nexsis.config.json', configContent);
        console.log('Created nexsis.config.json');
        
        await fs.writeFile('.env.nexsis', envContent);
        console.log('Created .env.nexsis');
    } catch (err) {
        console.error('Error creating files:', err);
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
(async () => {
    await createFiles();
    const sourceFolder = path.join(__dirname, '../../llm');
    const targetFolder = path.join(process.cwd(), 'llm');
    await copyFolder(sourceFolder, targetFolder);
})();
