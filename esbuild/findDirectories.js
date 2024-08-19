import path from 'path';
import fs from 'fs';


function findDirectories(rootDir) {
    let directories = [];
    
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
    directories.push(rootDir)
    recurseDirectory(rootDir);
    return directories;
}

export default findDirectories