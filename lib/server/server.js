import chokidar from 'chokidar';
import Config from '../config/parseConfig.js';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import chalk from 'chalk'; // Assuming you have chalk for colored console logs

// Load environment variables from the .env file
dotenv.config({ path: path.resolve(Config.envFile) });


// Helper function to update the directory structure file
function updateDirectoryStructureFile(watchedDir, structureFilePath) {
  const structure = scanDirectory(watchedDir).join('\n');
  fs.writeFileSync(structureFilePath, structure, 'utf-8');
  console.log(chalk.green(`Directory structure updated in: ${structureFilePath}`));
}

// Function to scan directory and return structure as an array of strings
function scanDirectory(dirPath, depth = 0) {
  const structure = [];
  const files = fs.readdirSync(dirPath, { withFileTypes: true });
  files.forEach(file => {
    const filePath = path.join(dirPath, file.name);
    const indent = ' '.repeat(depth * 2); // Adjust spacing based on depth level

    if (file.isDirectory()) {
      structure.push(`${indent}${file.name}/`);
      structure.push(...scanDirectory(filePath, depth + 1)); // Recursively scan directories
    } else {
      structure.push(`${indent}${file.name}`);
    }
  });
  return structure;
}

// Define the directory and structure file paths
const baseDir = path.resolve(Config.baseUrl); // The directory to monitor
const structureFilePath = './directory_structure.txt'; // File to store the directory structure

// Initial scan and file creation
updateDirectoryStructureFile(baseDir, structureFilePath);

// Set up chokidar watcher
const watcher = chokidar.watch(baseDir, {
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
  awaitWriteFinish: false,
});

watcher.on('ready', () => {
  console.log('I am ready to watch files');
});

// On any file addition, deletion, or renaming, update the structure file
watcher
  .on('add', () => updateDirectoryStructureFile(baseDir, structureFilePath))
  .on('unlink', () => updateDirectoryStructureFile(baseDir, structureFilePath))
  .on('addDir', () => updateDirectoryStructureFile(baseDir, structureFilePath))
  .on('unlinkDir', () => updateDirectoryStructureFile(baseDir, structureFilePath))
  .on('change', () => updateDirectoryStructureFile(baseDir, structureFilePath));

// Existing watcher logic for boilerplate fetching and file writing
watcher.on('add', async (filePath) => {
  let promptData = filePath.replace(/^.*[\\/]/, '').replace(/\.[^/.]+$/, '');
  console.log(promptData);

  // TODO: Create a fetch API for fetching boilerplate from the database
  const result = await fetch(Config.boilerPlate.apiUrl, {
    method: 'POST',
    body: JSON.stringify({ query_text: promptData }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const code = await result.json();
  fs.writeFileSync(filePath, code.component_code);
  console.log(`Boilerplate written in ${filePath}`);
});
