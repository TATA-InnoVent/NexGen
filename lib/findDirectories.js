import path from 'path';
import fs from 'fs';
import {fileURLToPath} from 'url';

function findDirectories(rootDir) {
    let directories = [];
    let dirPath = fileURLToPath(rootDir)
    
    function recurseDirectory(dir) {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of items) {
            const fullPath = path.join(dir, item.name);
            if (item.isDirectory()) {
                directories.push(fullPath);
                recurseDirectory(fullPath);
            }
        }
    }
    directories.push(dirPath)
    recurseDirectory(dirPath)
    return directories;
}

export default findDirectories