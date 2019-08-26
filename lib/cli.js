#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const formatter = require("./formatter.js").formatter;
const commander = require("commander");
const packageVersion = require("../package").version;
const jsdiff = require("diff");

const program = new commander.Command();
const blue = "\x1b[34m";
const red = "\x1b[31m";
const withe = "\x1b[37m";

let jsonFile = "";
let hasErrors = false;
let fixedFiles = [];
let wrongFiles = [];

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
  if (fs.lstatSync(path).isDirectory()) {
    readDirectory(path).map(processFile);
  }

  if (fs.lstatSync(path).isFile()) {
    processFile(path);
  }

  if (hasErrors) {
    console.log(wrongFiles);
    process.exit(1);
  }
  
  !program.fix || console.log(fixedFiles);
  process.exit(0);
}

function readDirectory(directoryPath) {
  let files = fs.readdirSync(directoryPath);
  let filesPath = [];

  files.forEach((file) => {
    filesPath.push(directoryPath + file);
  });

  return filesPath;
}

function processFile(filePath) {
  let source = fs.readFileSync(filePath, "utf8");

  let formatted = formatter.formatJson(source);
  let diff = jsdiff.diffJson(source, formatted);

  showDiff(diff, filePath);
  fixJson(filePath, formatted);
}

function fixJson(filePath, formatted) {
  if (!program.fix) {
    return;
  }

  fs.writeFileSync(filePath, formatted);

  fixedFiles.push(filePath + " - has been fixed");
  hasErrors = false;
}

function showDiff(diff, filePath) {
  let fileWithErrors = false;

  diff.forEach((part) => {
    let color = part.added ? blue : part.removed ? red : withe;

    if (part.added || part.removed) {
      program.quiet || console.log(color, part.value);
      fileWithErrors = true;
      hasErrors = true;
    }
  });

  !fileWithErrors || wrongFiles.push(filePath);
}

function main(jsonFilePath) {
  let filePath = path.normalize(jsonFilePath);
  parse(filePath);
}

main(jsonFile);
