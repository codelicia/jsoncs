const test = require("tape");
const fs = require("fs");
const { fixJsonFile, getFiles, showDiff } = require("../lib/modules.js");

test("test write formatted json on the file", (assert) => {
  let path = __dirname + "/fixture/actual-json/temp_json_file.json";
  let result = fixJsonFile(true, path, "{a}");
  let file = fs.readFileSync(path).toString();

  assert.equal(path + " - has been fixed", result);
  assert.equal("{a}", file);
  assert.end();
});

test("test not write formatted json on the file", (assert) => {
  let path = __dirname + "/fixture/actual-json/temp_json_file.json";
  let result = fixJsonFile(false, path, "{a}");

  assert.equal(undefined, result);
  assert.end();
});

test("test get file path", (assert) => {
  let path = __dirname + "/fixture/actual-json/temp_json_file.json";
  fs.writeFileSync(path, "");
  let result = getFiles(path);

  assert.equal(result.length, 1);
  assert.equal(result[0], path);
  assert.end();
});

test("test get directory path", (assert) => {
  let path = __dirname + "/fixture/expected-json/*.json";
  let result = getFiles(path);

  assert.equal(result.length, 2);
  assert.end();
});

test("test get all files inside a directory path", (assert) => {
  let path = __dirname + "/fixture/*/*.json";
  let result = getFiles(path);

  assert.equal(result.length, 5);
  assert.end();
});

test("test show diff between two different json objects", (assert) => {
  let json1 = {foo:"bar"};
  let json2 = {ble:"bar"};
  let path = __dirname + "/fixture/expected-json/any.json";
  let quiet = false;

  let result = showDiff(quiet, json1, json2, path);

  assert.true(result);
  assert.end();
});

test("test show diff between two equal json objects", (assert) => {
  let json1 = {foo:"bar"};
  let json2 = {foo:"bar"};
  let path = __dirname + "/fixture/expected-json/any.json";
  let quiet = false;

  let result = showDiff(quiet, json1, json2, path);

  assert.false(result);
  assert.end();
});
