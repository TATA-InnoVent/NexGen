#!/usr/bin/env node

import readline from 'readline';
import chalk from 'chalk';
import { spawn } from 'child_process';


// Import your function (ensure this file is also using ES modules)
import processEntryPoints from './esbuild/main.js';

// Initialize readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Spawn a child process to run `server.js`
const chokidar = spawn('node', ['server.js']);

chokidar.stdout.on('data', (data) => {
  console.log(`${chalk.green('chokidar:')} ${data}`);
});

// Boxen configuration
const boxenOptions = {
  padding: 1,
  margin: 1,
  borderColor: 'green',
  borderStyle: 'round',
};

// async function loadBoxen(){
//   return await import('boxen')
// }

// Function to generate code
async function generateCode() {
  console.log(chalk.green('Generating Code...'));
  await processEntryPoints(true);
  console.log(chalk.green('Code generated successfully!'));
}

// Function to show help
async function showHelp() {
  // const boxen = await loadBoxen()
  const helpText = `
  ${chalk.bold('Help Menu')}
  ${chalk.green('g')} => Generate Code
  ${chalk.green('h')} => Help
  Press ${chalk.green('Ctrl+C')} to exit
  `;

  // Display help in a box
  // console.log(boxen.default(helpText, boxenOptions));
}

console.log(chalk.yellow('Welcome to the CLI App!'));
showHelp();

// Handle user input
// process.stdin.on('data', (data) => {
//   const command = data.toString().trim();

//   switch (command) {
//     case 'g':
//       generateCode();
//       break;
//     case 'h':
//       showHelp();
//       break;
//     case 's':
//       processEntryPoints(false)
//       break;
//     default:
//       console.log(chalk.red('Invalid option. Press "h" for help.'));
//       break;
//   }
// });

rl.on('line', (data) => {
  const command = data.toString().trim();

  switch (command) {
    case 'g':
      generateCode();
      break;
    case 'h':
      showHelp();
      break;
    case 's':
      processEntryPoints(false);
      break;
    default:
      console.log(chalk.red('Invalid option. Press "h" for help.'));
      break;
  }
})

// Handle process exit
process.on('SIGINT', () => {
  console.log(chalk.red('\nExiting...'));
  rl.close();
  process.exit();
});
