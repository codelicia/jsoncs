#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const formatter = require("./formatter.js").formatter;
const commander = require("commander");
const packageVersion = require("../package").version;
const jsdiff = require("diff");

const program = new commander.Command();

let jsonFile = "";
let hasErrors = false;

program.
  version(packageVersion,
    "-v, --version",
    "json code style version")
  .option("-f, --fix",
    "fix json file")
  .arguments("[json]")
  .action(function (json) {
    jsonFile = json;
  });

program.parse(process.argv);

function parse(filePath) {
  let source = fs.readFileSync(filePath, "utf8");

  let formatted = formatter.formatJson(source);
  let diff = jsdiff.diffJson(source, formatted);

  showDiff(diff);
  fixJson(filePath, formatted);

  if (hasErrors) {
    process.exit(1);
  }

  process.exit(0);
}

function fixJson(filePath, formatted) {
  if (!program.fix) {
    return;
  }

  fs.writeFileSync(filePath, formatted);
  console.log(filePath + " - has been fixed");
  hasErrors = false;
}

function showDiff(diff) {
  diff.forEach((part) => {
    let color = part.added ? "\x1b[34m" : part.removed ? "\x1b[31m" : "\x1b[37m";
    if (part.added || part.removed) {
      console.log(color, part.value);
      hasErrors = true;
    }
  });
}

function main(jsonFilePath) {
  let filePath = path.normalize(jsonFilePath);
  parse(filePath);
}

main(jsonFile);
