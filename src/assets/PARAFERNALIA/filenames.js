const fs = require("fs");
const path = require("path");

const resizedFolderPath = path.join(__dirname, "resized");

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
