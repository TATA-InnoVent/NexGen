const readline = require('readline');
const { spawn } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Keystroke server started. Press any key and press Enter to send. Press Ctrl+C to exit.');
const chokidar = spawn('node', ['server.js']);

chokidar.stdout.on('data', (data) => {
  console.log(`chokidar: ${data}`);
});

rl.on('line', (input) => {
  console.log(`Received input: ${input}`);
});


process.stdin.on('data', (data) => {
  const key = data.toString().trim();
  if(key == 'n'){
    const nexsis = spawn('node', ['index.js'])
    nexsis.stdout.on('data', (data)=>{
      console.log(`nexsis : ${data}`)
    })
  }
  console.log(`Key pressed: ${key}`);
});


process.on('SIGINT', () => {
  console.log('Server is shutting down...');
  rl.close();
  process.exit();
});
