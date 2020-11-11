import Axios from "axios";
import fs from "fs";
import Jimp from "jimp";
import Path from "path";

export async function downloadImage(inputURL: string): Promise<string> {
  const path = Path.resolve(__dirname, "files", "imageToBeFiltered.jpg");

  const response = await Axios({
    method: "GET",
    url: inputURL,
    responseType: "stream",
  });

  response.data.pipe(fs.createWriteStream(path));

  return new Promise((resolve, reject) => {
    response.data.on("end", () => {
      resolve(path);
    });
    response.data.on("error", (e: any) => {
      reject(e);
    });
  });
}

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve) => {
    const photo = await Jimp.read(inputURL);

    const fileName = "filtered." + Math.floor(Math.random() * 2000) + ".jpg";
    const outpath = Path.resolve(__dirname, "tmp", fileName);

    await photo
      .resize(256, 256) // resize
      .quality(60) // set JPEG quality
      .greyscale() // set greyscale
      .write(outpath, (img) => {
        resolve(outpath);
      });
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
