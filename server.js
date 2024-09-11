
// Dynamically import the server module
import('./esbuild/server/server.js').then((module) => {
  // You can interact with the module if needed
}).catch((err) => {
  console.error('Error loading server:', err);
});
