import fs from 'fs';
import path from 'path';

function checkFileExists(filePath, extensions) {
    for (const ext of extensions) {
        const extensionPath = `${filePath}.${ext}`;
        try {
            const fullPath = path.resolve(extensionPath);
            if (fs.existsSync(fullPath)) {
                return { status: true, fullPath: fullPath };
            }
        } catch (e) {
            console.error(`Error checking file with extension ${ext}:`, e.message);
        }
    }

    return { status: false, fullPath: undefined };
}

export default checkFileExists;
