#!/usr/bin/env node

import chalk from 'chalk';
import boxen from 'boxen';
import ora from 'ora';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import figlet from 'figlet';
import { spawn } from 'child_process';
import processEntryPoints from './lib/main.js';
import Config from "./lib/config/parseConfig.js";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { pathToFileURL } from 'url';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parseDirectoryStructure(filePath) {
  const structure = [];
  const lines = fs.readFileSync(filePath, 'utf-8').split('\n');

  const stack = []; // To keep track of the current path
  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return; // Skip empty lines

    // Calculate depth based on the number of leading spaces
    const depth = line.match(/^\s*/)[0].length / 2; // Assume 2 spaces per depth level

    // Create a new directory or file entry
    const isFile = trimmedLine.includes('.');
    const item = { name: trimmedLine, type: isFile ? 'file' : 'directory' };

    // Ensure the stack has the required depth
    if (depth === 0) {
      structure.push(item); // Top-level item
      stack[depth] = item; // Update stack
    } else {
      if (!stack[depth - 1]) {
        console.error(chalk.red(`Error: Invalid structure at line: "${line}"`));
        return; // Skip if the parent doesn't exist
      }
      stack[depth - 1].children = stack[depth - 1].children || []; // Ensure children array exists
      stack[depth - 1].children.push(item); // Add to the children of the parent
      stack[depth] = item; // Update stack
    }
  });

  return structure;
}

function createStructure(baseDir, structure) {
  structure.forEach(item => {
    const currentPath = path.join(baseDir, item.name); // Combine base directory with item name

    try {
      if (item.type === 'directory') {
        // If the item is a directory, create it
        if (!fs.existsSync(currentPath)) {
          fs.mkdirSync(currentPath, { recursive: true }); // Create directory
          console.log(chalk.green(`Created directory: ${currentPath}`));
        } else {
          console.log(chalk.yellow(`Directory already exists: ${currentPath}`));
        }
        // Recursively create the substructure if it has children
        if (item.children) {
          createStructure(currentPath, item.children);
        }
      } else if (item.type === 'file') {
        // If the item is a file, create it
        if (!fs.existsSync(currentPath)) {
          fs.writeFileSync(currentPath, '', { flag: 'w' }); // Create empty file
          console.log(chalk.green(`Created file: ${currentPath}`));
        } else {
          console.log(chalk.yellow(`File already exists: ${currentPath}`));
        }
      }
    } catch (error) {
      console.error(chalk.red(`Error creating ${item.type} at ${currentPath}: ${error.message}`));
    }
  });
}




// Function to check API Keys
async function checkApiKeys() {
  const envFilePath = pathToFileURL(path.resolve(Config.envFile));
  if (!fs.existsSync(envFilePath)) {
    console.log(chalk.red('Error: .env file not found.'));
    return;
  }

  dotenv.config({ path: envFilePath });

  const llmDirectives = Config.llmDirectives;
  let hasWarnings = false;

  for (let llm in llmDirectives) {
    const envVarName = `NEXSIS_${llm.toUpperCase()}_API_KEY`;
    if (!process.env[envVarName]) {
      console.log(
        chalk.yellowBright(
          `Warning: Please add API key for ${llm} (${envVarName}) or remove the path from (nexsis.config.json) file.`
        )
      );
      hasWarnings = true;
    }
  }

  if (!hasWarnings) {
    console.log(chalk.green('All API keys are set!'));
  }
}

// Function to create a spinner with `ora`
async function generateCode(sendToLLM) {
  const spinner = ora({
    text: sendToLLM ? 'Generating code...' : 'Listing files...',
    color: 'cyan',
  }).start();

  try {
    await processEntryPoints(sendToLLM);
    spinner.succeed(chalk.green('Operation successful!'));
  } catch (error) {
    spinner.fail(chalk.red('Error while generating code.'));
    console.error(error);
  } finally {
    console.log('\n');
  }
}

// CLI Welcome Banner with Figlet for bold big text
console.log(
  gradient.pastel.multiline(
    figlet.textSync('NexAI', { horizontalLayout: 'full' })
  )
);

// Help box display function
function displayHelpBox() {
  const helpText = `
${chalk.bold.green('NexAI CLI Help')}
  
${chalk.cyanBright('s')} : Show Files
${chalk.cyanBright('g')} : Generate Code
${chalk.cyanBright('c')} : Create Directory Structure
${chalk.cyanBright('h')} : Show Help
Press ${chalk.yellow('e')} to exit.
`;

  const boxedHelp = boxen(helpText, {
    padding: {left: 4, right: 4 },
    margin: 1,
    borderStyle: 'round',
    borderColor: 'blue',
  });

  console.log(boxedHelp);
}

// Using `inquirer` for better user input handling with options directly
async function promptUser() {
  const { command } = await inquirer.prompt([{
    type: 'input',
    name: 'command',
    message: 'Enter a command (type "h" for help):',
  }]);

  return command.trim();
}

// // Prompt user for a directory to create the structure
// async function promptBaseDirectory() {
//   const { baseDir } = await inquirer.prompt([{
//     type: 'input',
//     name: 'baseDir',
//     message: 'Enter the base directory where the structure should be created:',
//     default: process.cwd(), // Default to current working directory
//   }]);
  
//   return baseDir.trim();
// }

// Handle user commands based on input
async function handleCommand(command) {
  switch (command) {
    case 'g':
      await generateCode(true);
      break;
    case 's':
      await generateCode(false);
      break;
    case 'h':
      displayHelpBox();
      break;
    case 'c':
      try {
        const baseDir = path.resolve(Config.baseUrl);
        const structureFilePath = path.resolve(Config.directoryStructure.structureFileUrl);
        const structure = parseDirectoryStructure(structureFilePath);
        createStructure(baseDir, structure); 
        console.log(chalk.green('Directory structure created successfully!'));
      } catch (error) {
        console.error(chalk.red('Error creating directory structure:', error.message));
      }
      break;
    case 'e':
      console.log(chalk.red('Exiting...'));
      process.exit();
    default:
      console.log(chalk.red('Invalid option. Please try again.'));
      break;
  }
}

// Start CLI by checking API keys and showing prompt
async function startCLI() {
  await checkApiKeys();
  await delay(500);
  
  // Display help box the first time
  displayHelpBox();
  
  while (true) {
    const command = await promptUser(); 
    await handleCommand(command);
  }
}

// Launch child process for `server.js`
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serverProcess = spawn('node', [path.join(__dirname, './lib/server/server.js')]);

serverProcess.stdout.on('data', (data) => {
  console.log(`${chalk.green('NexAI:')} ${data}`);
});

serverProcess.stderr.on('data', (data) => {
  console.error(`${chalk.red('Error:')} ${data}`);
});

serverProcess.on('close', (code) => {
  console.log(chalk.red(`Child process exited with code ${code}`));
});

// Call startCLI function to initialize
startCLI();
