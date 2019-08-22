const fs = require("fs");
const assert = require("assert");
const formatter = require("../lib/formatter.js").formatter;

exports["test pass-1"] = function () {
  let actualJson = fs.readFileSync(__dirname + "/actual-json/1.json").toString();
  let expectedJson = fs.readFileSync(__dirname + "/expected-json/1.json").toString();
  assert.equal(formatter.formatJson(actualJson), expectedJson);
}

exports["test pass-2"] = function () {
  let actualJson = fs.readFileSync(__dirname + "/actual-json/2.json").toString();
  let expectedJson = fs.readFileSync(__dirname + "/expected-json/2.json").toString();
  assert.equal(formatter.formatJson(actualJson), expectedJson);
}

if (require.main === module)
    require("test").run(exports);
