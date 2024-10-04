import chokidar from 'chokidar';
import Config from '../config/parseConfig.js';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import chalk from 'chalk'; // Assuming you have chalk for colored console logs

// Load environment variables from the .env file
dotenv.config({ path: path.resolve(Config.envFile) });

// Helper function to update the directory structure file
function updateDirectoryStructureFile(watchedDir) {
  const structureFilePath = path.resolve(Config.directoryStructure.structureFileUrl);
  const structure = scanDirectory(watchedDir).join('\n');
  fs.writeFileSync(structureFilePath, structure, 'utf-8');
  // console.log(chalk.green(`Directory structure updated in: ${structureFilePath}`));
}

// Function to scan directory and return structure as an array of strings
function scanDirectory(dirPath, depth = 0) {
  const structure = [];
  const files = fs.readdirSync(dirPath, { withFileTypes: true });
  if (Config.directoryStructure.indentationSpaces === 0) {
    console.error(chalk.red('Error: indentationSpaces must not be zero.'));
    process.exit(1);
  }
  const currentIndent = ' '.repeat(Config.directoryStructure.indentationSpaces * depth);

  files.forEach(file => {
    const filePath = path.join(dirPath, file.name);
    if (file.isDirectory()) {
      structure.push(`${currentIndent}${file.name}/`);
      structure.push(...scanDirectory(filePath, depth + 1)); // Recursively scan directories
    } else {
      structure.push(`${currentIndent}${file.name}`);
    }
  });
  return structure;
}

// Define the directory to monitor
const baseDir = path.resolve(Config.baseUrl); // The directory to monitor

// Initial scan and file creation
updateDirectoryStructureFile(baseDir);

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
  .on('add', () => updateDirectoryStructureFile(baseDir))
  .on('unlink', () => updateDirectoryStructureFile(baseDir))
  .on('addDir', () => updateDirectoryStructureFile(baseDir))
  .on('unlinkDir', () => updateDirectoryStructureFile(baseDir))
  .on('change', () => updateDirectoryStructureFile(baseDir));

// Default template code in case of API failure
const defaultTemplateCode = `
'use ai:[openai]'

/**
 * Write the prompt here for this component.
 */
import React from 'react';

const Component = () => {
  return (
    <div>
      <h1>This is a default component template</h1>
      <p>Please replace this with actual implementation.</p>
    </div>
  );
};

export default Component;
`;

// Existing watcher logic for boilerplate fetching and file writing with fallback
watcher.on('add', async (filePath) => {
  let promptData = filePath.replace(/^.*[\\/]/, '').replace(/\.[^/.]+$/, '');
  console.log(`Fetching boilerplate for: ${promptData}`);

  try {
    // Call the API to fetch boilerplate
    const result = await fetch(Config.boilerPlate.apiUrl, {
      method: 'POST',
      body: JSON.stringify({ query_text: promptData }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!result.ok) {
      throw new Error(`API returned status code ${result.status}`);
    }

    const code = await result.json();
    fs.writeFileSync(filePath, code.component_code);
    console.log(chalk.green(`Boilerplate written in ${filePath}`));
  } catch (error) {
    console.log(chalk.yellow(`Writing default template to ${filePath}`));

    // Write default template code to the file
    fs.writeFileSync(filePath, defaultTemplateCode);
  }
});
