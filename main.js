#!/usr/bin/env node



// TODO: Find avaliable LLMs and show them using cli
// TODO: Show the files which currently have the directives present in it

const readline = require('readline');
const chalk = require('chalk');
const { spawn } = require('child_process');


// Dynamically import boxen when needed
async function loadBoxen() {
  return await import('boxen');
}

// Boxen configuration for drawing the box
const boxenOptions = {
  padding: 1,
  margin: 1,
  borderColor: 'green',
  borderStyle: 'round',
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const chokidar = spawn('node', ['server.js']);

chokidar.stdout.on('data', (data) => {
  console.log(`${chalk.green('chokidar:')} ${data}`);
});

// Function to generate code (you can replace this with actual logic)
function generateCode() {
  console.log(chalk.green('Generating Code...'));
  const nexsis = spawn('node', ['index.js']);
  nexsis.stdout.on('data', (data) => {
    console.log(`nexsis: ${data}`);
  });
  console.log(chalk.green('Code generated successfully!'));
}


// Function to display help using boxen
async function showHelp() {
  const boxen = await loadBoxen();
  const helpText = `
  ${chalk.bold('Help Menu')}
  ${chalk.green('g')} => Generate Code
  ${chalk.green('h')} => Help
  Press ${chalk.green('Ctrl+C')} to exit
  `;
  
  // Display help inside a box
  console.log(boxen.default(helpText, boxenOptions));
}

console.log(chalk.yellow('Welcome to the CLI App!'));
showHelp();

process.stdin.on('data', (data) => {
  const command = data.toString().trim();

  switch (command) {
    case 'g':
      generateCode();
      break;
    case 'h':
      showHelp();
      break;
    default:
      console.log(chalk.red('Invalid option. Press "h" for help.'));
      break;
  }


});

rl.on('line', (input) => {
  // Process the input from readline if needed
});

process.on('SIGINT', () => {
  console.log(chalk.red('\nExiting...'));
  rl.close();
  process.exit();
});
