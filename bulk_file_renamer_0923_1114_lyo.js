// 代码生成时间: 2025-09-23 11:14:30
// Ionic import statements
const fs = require('fs');
const path = require('path');

/**
 * Renames all files in the specified directory according to the provided renaming function.
 * @param {string} directoryPath - The path to the directory containing the files to rename.
 * @param {Function} renameFunction - A function that takes a filename and returns the new filename.
 * @param {Function} [callback] - An optional callback function to handle the result.
 */
function bulkRenameFiles(directoryPath, renameFunction, callback) {
  try {
    // Check if the directory exists
    if (!fs.existsSync(directoryPath)) {
      throw new Error('Directory does not exist.');
    }

    // Read all files in the directory
    const files = fs.readdirSync(directoryPath);

    // Iterate over each file and rename it
    files.forEach((file) => {
      const oldPath = path.join(directoryPath, file);
      const stats = fs.statSync(oldPath);
      if (stats.isFile()) {
        const newName = renameFunction(file);
        const newPath = path.join(directoryPath, newName);
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed ${oldPath} to ${newPath}`);
      }
    });

    // Call the callback function if provided
    if (callback) {
      callback(null, 'Files have been renamed successfully.');
    }
  } catch (error) {
    // Call the callback function with error if provided
    if (callback) {
      callback(error, null);
    } else {
      // If no callback, throw the error
      throw error;
    }
  }
}

/**
 * Example usage of the bulkRenameFiles function.
 * Renames all .txt files in the specified directory by adding a prefix to their names.
 */
bulkRenameFiles(
  './documents',
  filename => {
    const extension = path.extname(filename);
    const name = path.basename(filename, extension);
    // Add prefix and keep the original extension
    return `prefix_${name}${extension}`;
  },
  (error, result) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log(result);
    }
  }
);
