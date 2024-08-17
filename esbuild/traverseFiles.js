const fs = require('fs');
const path = require('path');

// Array to store file paths
const filePaths = [];

const customDirectivePlugin = {
  name: 'custom-directive',
  setup(build) {
    build.onLoad({ filter: /\.(js|jsx|ts|tsx)$/ }, async (args) => {
      // Read the file content
      const content = await fs.promises.readFile(args.path, 'utf8');
      
      // Check if the file starts with the directive
      if (content.trim().startsWith("'use ai:openai'")) {
        console.log(`Directive found in file: ${args.path}`);
        // Add the file path to the array
        filePaths.push(args.path);
      }

      return {
        contents: content,
        loader: path.extname(args.path).slice(1) === 'tsx' ? 'tsx' : 'jsx',
      };
    });
  },
};

module.exports = { customDirectivePlugin, filePaths };
