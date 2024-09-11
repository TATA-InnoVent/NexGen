

// Dynamically import esbuild/main.js as an ESM module
import('./esbuild/main.js').then(() => {
  console.log('Main script loaded successfully.');
}).catch((err) => {
  console.error('Error loading main script:', err);
});
