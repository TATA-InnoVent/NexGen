import { transformSync } from '@babel/core';
import fs from 'fs';

// Custom loader to handle .jsx files
export async function load(url, context, defaultLoad) {
  const pathname = new URL(url).pathname;

  if (pathname.endsWith('.jsx')) {
    const source = fs.readFileSync(pathname, 'utf8');
    
    // Transpile JSX to ES Modules (ESM) using Babel
    const { code } = transformSync(source, {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false, // Keep ES module syntax (import/export)
          },
        ],
        '@babel/preset-react', // Transpile JSX
      ],
      plugins: [
        '@babel/plugin-transform-runtime', // Handle ES6+ runtime transformations
        '@babel/plugin-syntax-dynamic-import', // Enable dynamic import syntax for ESM
      ],
      filename: pathname,
    });

    return {
      format: 'module', // Ensure it's returned as an ES module
      source: code,
      shortCircuit: true, // Stop further loaders
    };
  }

  // Fallback to default loader for other files
  return defaultLoad(url, context, defaultLoad);
}
