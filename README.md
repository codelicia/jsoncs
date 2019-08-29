JSON Code Style
=========

[![NPM Version](https://img.shields.io/npm/v/@codelicia/jsoncs)](https://www.npmjs.org/package/@codelicia/jsoncs)
[![Build Status](https://travis-ci.org/codelicia/jsoncs.svg?branch=master)](https://travis-ci.org/codelicia/jsoncs)

## Command line interface
Install jsoncs with npm to use the command line interface:

    npm install @codelicia/jsoncs --save-dev

Verify if the code style is fine:

    ./node_modules/.bin/jsoncs my/file.json

Fix the code style of a file or multiple files:

    ./node_modules/.bin/jsoncs --fix my/directory/

### Options 

    $ jsoncs -h

    Usage: jsoncs [file]

    Options:
       -f, --fix                Fix the file
       -q, --quiet              Run in quiet mode
       -v, --version            print version and exit

### Example

* _RED_: wrong json
* _BLUE_: correct json

![](./example.png)

## TO-DO

* Leave the code style to the user in a config file
