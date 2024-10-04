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
import { pathToFileURL, fileURLToPath } from 'url';
import { dirname } from 'path';
import { parseDirectoryStructure, createStructure } from './lib/directoryStructure.js';


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// Function to check API Keys
async function checkApiKeys() {
  const envFilePath = pathToFileURL(path.resolve(Config.envFile))
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serverProcess = spawn('node', [path.join(__dirname, './lib/server/server.js')]);

serverProcess.stdout.on('data', (data) => {
  console.log(`\n${chalk.green('NexAI:')} ${data}`);
});

serverProcess.stderr.on('data', (data) => {
  console.error(`${chalk.red('Error:')} ${data}`);
});

serverProcess.on('close', (code) => {
  console.log(chalk.red(`Child process exited with code ${code}`));
});

startCLI();
