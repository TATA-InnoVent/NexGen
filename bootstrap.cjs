
require('ignore-styles'); // This is used to ignore CSS and other style imports in Node.js environment.

require('@babel/register')({
    ignore: [/(node_modules)/], // Ignore files in node_modules directory from being transpiled by Babel.
    presets: [
        "@babel/preset-env", // Preset for compiling modern JavaScript down to an older version for compatibility.
        [
            "@babel/preset-react", // Preset for compiling JSX and React to JavaScript.
            {
                runtime: "automatic" // Use automatic runtime for React to handle JSX transforms.
            }
        ],
    ],
    plugins: [
        "@babel/transform-runtime", // Plugin for transforming ES6+ syntax and runtime helpers.
        "@babel/plugin-syntax-dynamic-import", // Plugin for enabling syntax support for dynamic import().
        "babel-plugin-dynamic-import-node" // Plugin for optimizing dynamic imports in Node.js environment.
    ]
});


import('./main.js')

// require('./main.js')