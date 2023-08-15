const fs = require("fs").promises;
const path = require("path");

const directoryPath = path.join(__dirname, "bikePics");

async function checkAndRenameFiles() {
  try {
    const files = await fs.readdir(directoryPath);

    for (const file of files) {
      let newFileName = file;

      // Check if the file name contains blank space
      if (file.includes(" ")) {
        newFileName = newFileName.replace(/ /g, "_");
      }

      // Ensure the file extension is .png
      const fileExtension = path
        .extname(newFileName)
        .toLowerCase();
      if (fileExtension !== ".png") {
        newFileName =
          path.basename(newFileName, fileExtension) +
          ".png";
      }

      if (newFileName !== file) {
        await fs.rename(
          path.join(directoryPath, file),
          path.join(directoryPath, newFileName)
        );
        console.log(`Renamed ${file} to ${newFileName}`);
      }
    }

    console.log(
      "All files checked and renamed if necessary."
    );
  } catch (err) {
    console.error(
      `Error reading or renaming files: ${err}`
    );
  }
}

checkAndRenameFiles();
