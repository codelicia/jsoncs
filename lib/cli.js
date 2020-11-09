#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const formatter = require("./formatter.js").formatter;
const commander = require("commander");
const packageVersion = require("../package").version;
const { getFiles, fixJsonFile, showDiff } = require("./modules.js");

const program = new commander.Command();

let jsonFile = "";
let errors = [];
let fixedFiles = [];

program.
  version(packageVersion,
    "-v, --version",
    "json code style version")
  .option("-f, --fix",
    "fix json file")
  .option("-q, --quiet",
    "quiet mode")
  .option("-s, --spaces <integer>",
    "quantity of spaces to indent the json",
    2)
  .arguments("[json]")
  .action(function (json) {
    jsonFile = json;
  });

program.parse(process.argv);

function parse(path) {
  getFiles(path).map(processFile);

  !program.fix || console.log(fixedFiles);

  if (errors.includes(true)) {
    process.exit(1);
  }

  process.exit(0);
}

function processFile(filePath) {
  try {
    const source = fs.readFileSync(filePath, "utf8");
    const indentation = parseInt(program.spaces);
    const formatted = formatter.formatJson(source, indentation);
    const fileWithErrors = showDiff(program.quiet, source, formatted, filePath);

    errors.push(fileWithErrors);

    let fixedFile = fixJsonFile(program.fix, filePath, formatted);
    fixedFiles.push(fixedFile);
  } catch (e) {
    if (typeof program.spaces != "number") {
      console.log("-s / --spaces should receive integer as parameter");
      process.exit(1);
    }

    console.log("Couldn't read the file / directory");
    console.log("Try to:");
    console.log("  - use quotes (eg: jsoncs 'my/file.json')");
    console.log("  - use glob pattern (eg: jsoncs 'my/*.json')");
    console.log("  - use glob pattern (eg: jsoncs 'my/*/*.json')");
    process.exit(1);
  }
}

function main(jsonFilePath) {
  if (jsonFilePath == undefined) {
    program.help();
  }
  let filePath = path.normalize(jsonFilePath);
  parse(filePath);
}

main(jsonFile);
