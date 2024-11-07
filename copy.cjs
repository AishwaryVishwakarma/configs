const fs = require('fs').promises;
const path = require('path');

// ANSI codes for text colors
const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';

const submodulePath = path.join(__dirname, '..', 'configs');
const destinationPath = path.join(__dirname, '..');

// List of files/folders to exclude
const excludeFiles = ['.git', 'copy.cjs'];

async function copyFiles(src, dest) {
  let copiedFiles = 0;
  let skippedFiles = 0;

  try {
    const files = await fs.readdir(src);

    for (const file of files) {
      // Skip files listed in the exclude array
      if (excludeFiles.includes(file)) {
        console.log(`${YELLOW}Skipping excluded file/folder: ${file}${RESET}`);
        skippedFiles++;
        continue;
      }

      const currentPath = path.join(src, file);
      const newPath = path.join(dest, file);
      const stats = await fs.stat(currentPath);

      if (stats.isDirectory()) {
        // If it's a directory, create it and recurse
        await fs.mkdir(newPath, {recursive: true});
        await copyFiles(currentPath, newPath);
      } else {
        // If it's a file, copy it
        await fs.copyFile(currentPath, newPath);
        copiedFiles++;
      }
    }

    return {copiedFiles, skippedFiles};
  } catch (err) {
    console.error(`${RED}Error: ${err}${RESET}`);
    return {copiedFiles: 0, skippedFiles: 0};
  }
}

copyFiles(submodulePath, destinationPath)
  .then(({copiedFiles, skippedFiles}) => {
    console.log(
      `${GREEN}Copied ${copiedFiles} files.${RESET} ${CYAN}Skipped ${skippedFiles} files.${RESET}`
    );
    console.log(`${GREEN}Files copied successfully.${RESET}`);
  })
  .catch((err) => console.error(`${RED}Error copying files: ${err}${RESET}`));
