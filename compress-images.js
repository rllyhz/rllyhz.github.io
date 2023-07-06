/* eslint-disable no-console */
const path = require("path");
const fs = require("fs");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngtran = require("imagemin-pngquant");

const distLocal = path.resolve(__dirname, "dist/images");
const distProd = path.resolve(__dirname, "published_dist/images");
let shouldCompress = false;
let imagesPath = distLocal;

const compressImages = async (imageFilesPath) => {
  await imagemin([`${imageFilesPath}/*.{jpg,png}`], {
    destination: imageFilesPath,
    plugins: [
      imageminJpegtran(),
      imageminPngtran({
        quality: [0.6, 0.7],
      }),
    ],
  });

  console.log(`Images on ${imageFilesPath} are already compressed!`);
};

if (fs.existsSync(distLocal)) {
  console.log("Compressing local build images...");
  shouldCompress = true;
  imagesPath = distLocal;
} else if (fs.existsSync(distProd)) {
  console.log("Compressing production build images...");
  shouldCompress = true;
  imagesPath = distProd;
} else {
  shouldCompress = false;
  console.log("No images should be compressed...");
}

if (shouldCompress) {
  compressImages(imagesPath);
}
