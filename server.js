const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const path = require("path");
const sharp = require("sharp");

const app = express();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "src", "assets", "PARAFERNALIA", "original"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/assets", express.static(path.join(__dirname, "src", "assets")));

const productsFile = path.join(
  __dirname,
  "src",
  "assets",
  "PARAFERNALIA",
  "index.ts"
);

app.get("/", (req, res) => {
  const products = getProducts();
  res.render("index", { products });
});

app.post("/add-product", upload.array("images"), async (req, res) => {
  const { name, price, description, category, stock } = req.body;
  const images = req.files;

  try {
    const webpImages = await Promise.all(images.map(processImage));
    addProduct(name, price, description, category, stock, webpImages);
    res.redirect("/");
  } catch (error) {
    console.error("Error processing images:", error);
    res.status(500).send("Error processing images");
  }
});

app.post("/update-product", (req, res) => {
  const { id, name, price, description, stock, category } = req.body;
  updateProduct(id, name, price, description, stock, category);
  res.redirect("/");
});

app.post("/remove-product", (req, res) => {
  const { id } = req.body;
  removeProduct(id);
  res.redirect("/");
});

async function processImage(file) {
  const originalPath = file.path;
  const filename = path.parse(file.filename).name;
  const outputPath = path.join(
    __dirname,
    "src",
    "assets",
    "PARAFERNALIA",
    "resized",
    `${filename}.webp`
  );

  await sharp(originalPath)
    .rotate()
    .resize({
      width: 1200,
      height: 1600,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 80 })
    .toFile(outputPath);

  return `${filename}.webp`;
}

function getProducts() {
  const content = fs.readFileSync(productsFile, "utf8");
  const productMatches = content.match(/(\w+):\s*{[^}]+}/g) || [];
  return productMatches.map((product) => {
    const [, key] = product.match(/(\w+):\s*{/) || [];
    const nameMatch = product.match(/name:\s*"([^"]+)"/);
    const priceMatch = product.match(/price:\s*(\d+)/);
    const descriptionMatch = product.match(/description:\s*`([^`]+)`/);
    const stockMatch = product.match(/stock:\s*(\d+)/);
    const categoryMatch = product.match(/category:\s*"([^"]+)"/);
    const imageSrcMatch = product.match(/imageSrcs:\s*\[([^\]]+)\]/);
    const imageSrc = imageSrcMatch
      ? imageSrcMatch[1].split(",")[0].replace(/['"]/g, "").trim() + ".webp"
      : null;

    return {
      id: key,
      name: nameMatch ? nameMatch[1] : key,
      price: priceMatch ? parseInt(priceMatch[1]) : 0,
      description: descriptionMatch ? descriptionMatch[1] : "",
      stock: stockMatch ? parseInt(stockMatch[1]) : 0,
      category: categoryMatch ? categoryMatch[1] : "",
      imageSrc: imageSrc,
    };
  });
}

function addProduct(name, price, description, category, stock, images) {
  const content = fs.readFileSync(productsFile, "utf8");

  // Generate import statements for new images
  const importStatements = images
    .map(
      (img) =>
        `import ${img.split(".")[0].toUpperCase()} from "./resized/${img}";`
    )
    .join("\n");

  // Add import statements at the top of the file
  const updatedContent = content.replace(
    /(import .+;\n)+/,
    `$&${importStatements}\n`
  );

  const newProduct = `
  ${name.toUpperCase().replaceAll(" ", "_")}: {
    name: "${name}",
    imageSrcs: [${images
      .map((img) => img.split(".")[0].toUpperCase())
      .join(", ")}],
    price: ${price},
    description: \`${description}\`,
    stock: ${stock},
    category: "${category}",
  },`;

  const finalContent = updatedContent.replace(
    "export const PRODUCTOS: Record<string, Item> = {",
    `export const PRODUCTOS: Record<string, Item> = {\n${newProduct}`
  );

  fs.writeFileSync(productsFile, finalContent);
}

function updateProduct(id, name, price, description, stock, category) {
  const content = fs.readFileSync(productsFile, "utf8");
  const productRegex = new RegExp(`(${id}:\\s*{[^}]+})`, "g");

  const updatedProduct = content.replace(productRegex, (match) => {
    return match
      .replace(/name:\s*"[^"]+"/, `name: "${name}"`)
      .replace(/price:\s*\d+/, `price: ${price}`)
      .replace(/description:\s*`[^`]+`/, `description: \`${description}\``)
      .replace(/stock:\s*\d+/, `stock: ${stock}`)
      .replace(/category:\s*"[^"]+"/, `category: "${category}"`);
  });

  fs.writeFileSync(productsFile, updatedProduct);
}

function removeProduct(id) {
  const content = fs.readFileSync(productsFile, "utf8");
  const updatedContent = content.replace(
    new RegExp(`\\s*${id}:\\s*{[^}]+},?`, "g"),
    ""
  );
  fs.writeFileSync(productsFile, updatedContent);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
