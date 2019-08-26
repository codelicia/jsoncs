JSON Code Style
=========

[![NPM Version](https://img.shields.io/npm/v/@codelicia/jsoncs)](https://www.npmjs.org/package/@codelicia/jsoncs)
[![Build Status](https://travis-ci.org/codelicia/jsoncs.svg?branch=master)](https://travis-ci.org/codelicia/jsoncs)

## Command line interface
Install jsoncs with npm to use the command line interface:

    npm install @codelicia/jsoncs --save-dev

Verify if the code style is fine:

    ./node_modules/.bin/jsoncs my/file.json

Fix the code style of a file:

    ./node_modules/.bin/jsoncs --fix my/file.json

### Options 

    $ jsoncs -h

    Usage: jsoncs [file]

    Options:
       -f, --fix                Fix the file
       -v, --version            print version and exit

### Example

* _RED_: wrong json
* _BLUE_: correct json

![](./example.png)

## TO-DO

* Make it accept multiple files
* Leave the code style to the user in a config file
