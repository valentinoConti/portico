const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Define folder paths
const originalFolder = "./original";
const resizedFolder = "./resized";

// Ensure both folders exist
try {
  fs.accessSync(originalFolder, fs.constants.R_OK);
  fs.accessSync(resizedFolder, fs.constants.W_OK);
} catch (err) {
  console.error(`Error: ${err.path} does not exist or is not accessible.`);
  console.log(
    "Please make sure both 'original' and 'resized' folders exist and are accessible."
  );
  process.exit(1);
}

// Read all files from the "original" folder
const inputs = fs.readdirSync(originalFolder).filter((file) => {
  const ext = path.extname(file).toLowerCase();
  return [".jpg", ".jpeg", ".png"].includes(ext);
});

for (const input of inputs) {
  sharp(path.join(originalFolder, input))
    .rotate()
    .resize({
      width: 1200,
      height: 1600,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 80 })
    .toFile(
      `./resized/${
        input
          .replace(".jpg", "")
          .replace(".jpeg", "")
          .replace(".JPG", "")
          .replace(".JPEG", "") + ".webp"
      }`
    )
    .then(() => console.log(`Processed ${input}`))
    .catch((err) => console.error(`Error processing ${input}:`, err));
}
