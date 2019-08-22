#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const formatter = require("./formatter.js").formatter;
const commander = require("commander");
const packageVersion = require("../package").version;
const jsdiff = require("diff");

const program = new commander.Command();

program.
    version(packageVersion, 
    "-v, --version",
    "json code style version")
    .arguments("[json]")
    .action(function (json) {
       jsonFile = json;
    });

program.parse(process.argv);

function parse(source) {
  let formatted = formatter.formatJson(source);	
  let diff = jsdiff.diffJson(source, formatted);
  let hasChanges = false;

  diff.forEach((part) => { 
    let color = part.added ? "\x1b[34m" : part.removed ? "\x1b[31m" : "\x1b[37m";

    if (part.added || part.removed) {
      console.log(color, part.value);
      hasChanges = true;
    }
  });

  if (hasChanges) {
    process.exit(1);
  }

  process.exit(0);
}

function main (args) {
  let json = path.normalize(args);
  parse(fs.readFileSync(json, "utf8"));
}

main(jsonFile);
