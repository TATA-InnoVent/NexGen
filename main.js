#!/usr/bin/env node

import readline from 'readline';
import chalk from 'chalk';
import { spawn } from 'child_process';
import processEntryPoints from './esbuild/main.js';
import Config from "./esbuild/config/parseConfig.js";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

async function checkApiKeys() {
  // Load the .env file
  const envFilePath = path.resolve(__dirname, '.env.nexsis');
  if (!fs.existsSync(envFilePath)) {
    console.log('Error: .env file not found');
    return;
  }

  dotenv.config({ path: envFilePath });

  const llmDirectives = Config.llmDirectives;
  // console.log('print',llmDirectives)
  let hasWarnings = false;

  for(let llm in llmDirectives) {
    const envVarName = `NEXSIS_${llm.toUpperCase()}_API_KEY`;
    if (!process.env[envVarName]) {
      console.log(`${chalk.yellowBright(`Warning: Please add API key for ${llm} (${envVarName}) or remove the path from (nexsis.config.json) file.`)}`);
      hasWarnings = true;
    }
  };

  if (!hasWarnings) {
    console.log('All API keys are set.');
  }
}

// Initialize readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to create a simple spinner
function createSpinner(message) {
  const spinnerChars = ['|', '/', '-', '\\'];
  let index = 0;

  const interval = setInterval(() => {
    process.stdout.write(`\r${spinnerChars[index]} ${message}`);
    index = (index + 1) % spinnerChars.length;
  }, 100);

  return {
    stop(success = true) {
      clearInterval(interval);
      process.stdout.write(`\r${success ? chalk.green('✔') : chalk.red('✖')} ${message}\n`);
    },
  };
}

// Spawn a child process to run `server.js`
const chokidar = spawn('node', ['server.js']);

chokidar.stdout.on('data', (data) => {
  console.log(`${chalk.green('Nexai:')} ${data}`);
});

// Function to generate code with a spinner
async function generateCode(sendToLLM) {
  const spinner = createSpinner(sendToLLM?'Generating Code...\n':'Files containing Directives...\n');
  try {
    await processEntryPoints(sendToLLM);
    spinner.stop(true);
  } catch (error) {
    spinner.stop(false);
    console.error(error);
  }
}

// Function to show help
async function showHelp() {

  const helpText = `
  ${chalk.bold('Help Menu')}
  ${chalk.green('s')} => Show Files
  ${chalk.green('g')} => Generate Code
  ${chalk.green('h')} => Help
  Press ${chalk.green('Ctrl+C')} to exit
  `;

  const width = 28; // Fixed width for the box
  const topBorder = chalk.green('┌' + '─'.repeat(width - 2) + '┐');
  const bottomBorder = chalk.green('└' + '─'.repeat(width - 2) + '┘');
  // const emptyLine = chalk.green('│' + ' '.repeat(width - 2) + '│');

  const formattedLines = helpText.split('\n').map(line => {
    if (line.includes('Help Menu')) {
      return chalk.green('│ ') + chalk.bold(line.trim().padEnd(width+5)) + chalk.green(' │');
    } else if (line.includes('=>')) {
      const [key, description] = line.split('=>').map(part => part.trim());
      return chalk.green('│ ') + chalk.green(key.padEnd(2)) + ' => ' + description.padEnd(width - 9) + chalk.green(' │');
    } else if (line.includes('Ctrl+C')) {
      return chalk.green('│ ') +'Press ' + chalk.green('Ctrl+C') + ' to exit'.padEnd(width - 16) + chalk.green(' │');
    } else {
      return chalk.green('│ ') + line.padEnd(width - 4) + chalk.green(' │');
    }
  });

  console.log(topBorder);
  // console.log(emptyLine);
  console.log(formattedLines.join('\n'));
  // console.log(emptyLine);
  console.log(bottomBorder);
}

console.log(chalk.magenta('Welcome to NexAI!'));
showHelp();
checkApiKeys();


// Handle user input
rl.on('line', (data) => {
  checkApiKeys();
  const command = data.toString().trim();
  switch (command) {
    case 'g':
      generateCode(true);
      break;
    case 'h':
      showHelp();
      break;
    case 's':
      generateCode(false);
      break;
    default:
      console.log(chalk.red('Invalid option. Press "h" for help.'));
      break;
  }
});

// Handle process exit
process.on('SIGINT', () => {
  console.log(chalk.red('\nExiting...'));
  rl.close();
  process.exit();
});
