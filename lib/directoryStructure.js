// lib/directoryStructure.js
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import Config from "./config/parseConfig.js";

export function parseDirectoryStructure(filePath) {
  const structure = [];
  const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
  
  const stack = []; // To keep track of the current path

  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return; // Skip empty lines

    // Calculate depth based on the number of leading spaces
    const depth = line.match(/^\s*/)[0].length / Config.directoryStructure.indentationSpaces;

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

export function createStructure(baseDir, structure) {
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