const test = require("tape");
const fs = require("fs");
const formatter = require("../lib/formatter.js").formatter;

test("format a simple json file", (assert) => {
  let actualJson = fs.readFileSync(__dirname + "/fixture/actual-json/1.json").toString();
  let expectedJson = fs.readFileSync(__dirname + "/fixture/expected-json/1.json").toString();
  assert.equal(formatter.formatJson(actualJson), expectedJson);
  assert.end();
});

test("format a complex json file", (assert) => {
  let actualJson = fs.readFileSync(__dirname + "/fixture/actual-json/2.json").toString();
  let expectedJson = fs.readFileSync(__dirname + "/fixture/expected-json/2.json").toString();
  assert.equal(formatter.formatJson(actualJson), expectedJson);
  assert.end();
});
