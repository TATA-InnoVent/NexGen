import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';



const build =() =>{
    esbuild.build({
        entryPoints: ['./app/src/main.jsx'],  // Adjust to your entry point or multiple entry points
        bundle: false,  // We're not bundling, just processing files
        plugins: [],
        packages:"external"
      })
}

export default build

