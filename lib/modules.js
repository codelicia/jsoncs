const fs = require("fs");
const jsdiff = require("diff");
const { globSync } = require("glob");

const blue = "\x1b[34m";
const red = "\x1b[31m";
const white = "\x1b[37m";

module.exports = {
  getFiles: (path) => {
    return globSync(path);
  },
  fixJsonFile: (shouldFix, filePath, formatted) => {
    if (!shouldFix) {
      return;
    }

    fs.writeFileSync(filePath, formatted);
  
    return filePath + " - has been fixed";
  },
  showDiff: (quiet, source, formatted, filePath) => {
    let fileWithErrors = false;
    let diff = jsdiff.diffJson(source, formatted);

    diff.forEach((part) => {
      let color = part.added ? blue : part.removed ? red : white;
  
      if (part.added || part.removed) {
        quiet || console.log(color, part.value);
        fileWithErrors = true;
      }
    });

    !fileWithErrors || console.log(white, " ============== ");
    !fileWithErrors || console.log(white, filePath, "\n");

    return fileWithErrors;
  }
};
