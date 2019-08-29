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
  .arguments("[json]")
  .action(function (json) {
    jsonFile = json;
  });

program.parse(process.argv);

function parse(path) {
  getFiles(path).map(processFile);

  if (errors.includes(true)) {
    process.exit(1);
  }
  
  !program.fix || console.log(fixedFiles);
  process.exit(0);
}

function processFile(filePath) {
  let source = fs.readFileSync(filePath, "utf8");
  let formatted = formatter.formatJson(source);
  let fileWithErrors = showDiff(program.quiet, source, formatted, filePath);

  errors.push(fileWithErrors);

  if (program.fix) {
    let fixedFile = fixJsonFile(filePath, formatted);
    fixedFiles.push(fixedFile);
    errors = [];
  }
}

function main(jsonFilePath) {
  let filePath = path.normalize(jsonFilePath);
  parse(filePath);
}

main(jsonFile);
