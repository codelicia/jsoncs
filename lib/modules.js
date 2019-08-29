const fs = require("fs");
const jsdiff = require("diff");

const blue = "\x1b[34m";
const red = "\x1b[31m";
const withe = "\x1b[37m";

module.exports = {
  getFiles: (path) => {
    if (fs.lstatSync(path).isDirectory()) {
      return readDirectory(path);
    }

    return [path];
  },
  fixJsonFile: (filePath, formatted) => {
    fs.writeFileSync(filePath, formatted);
  
    return filePath + " - has been fixed";
  },
  showDiff: (quiet, source, formatted, filePath) => {
    let fileWithErrors = false;
    let diff = jsdiff.diffJson(source, formatted);

    diff.forEach((part) => {
      let color = part.added ? blue : part.removed ? red : withe;
  
      if (part.added || part.removed) {
        quiet || console.log(color, part.value);
        fileWithErrors = true;
      }
    });

    !fileWithErrors || console.log(withe, " ============== ");
    !fileWithErrors || console.log(withe, filePath, "\n");

    return fileWithErrors;
  }
};

function readDirectory(directoryPath) {
  let files = fs.readdirSync(directoryPath);
  let filesPath = [];

  files.forEach((file) => {
    filesPath.push(directoryPath + file);
  });

  return filesPath;
}