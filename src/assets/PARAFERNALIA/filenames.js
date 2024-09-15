const fs = require("fs");

// script used like this:
// node filenames.js ~/Desktop/fotosOriginales/

const folderName = process.argv[2];
if (!folderName) {
  console.error("Please provide a folder name as an argument.");
  process.exit(1);
}
const resizedFolderPath = folderName;

fs.readdir(resizedFolderPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  console.log("Files in the resized folder:");
  files.forEach((file) => {
    console.log(file);
  });
});
