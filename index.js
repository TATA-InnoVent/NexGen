#! /usr/bin/env node

// Import the necessary modules using dynamic imports
import 'ignore-styles'; // This is used to ignore CSS and other style imports in Node.js environment.
import path from 'path'

import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Register the custom Babel loader
register(pathToFileURL(path.join(__dirname, './babel-loader.js')));

// Now, proceed to load your app
import './cli.js';
