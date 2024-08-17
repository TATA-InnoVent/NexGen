const esbuild = require('esbuild');
const { customDirectivePlugin, filePaths } = require('./traverseFiles.js');

esbuild.build({
  entryPoints: ['./app/src/App.jsx'],
  bundle: true,
  plugins: [customDirectivePlugin],
  outdir: 'dist',
  metafile: true,
}).then(() => {
  console.log('Build complete. Files with custom directive:');
  console.log(filePaths);
}).catch(() => process.exit(1));
