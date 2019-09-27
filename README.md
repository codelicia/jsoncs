JSON Code Style
=========

[![NPM Version](https://img.shields.io/npm/v/@codelicia/jsoncs)](https://www.npmjs.org/package/@codelicia/jsoncs)
![](https://github.com/codelicia/jsoncs/workflows/Continous%20Integration/badge.svg)

## Command line interface
Install jsoncs with npm to use the command line interface:

    npm install @codelicia/jsoncs --save-dev

Verify if the code style is fine:

    ./node_modules/.bin/jsoncs 'my/file.json'

or to multiple files

    ./node_modules/.bin/jsoncs 'my/*.json'

Fix the code style of a file or multiple files:

    ./node_modules/.bin/jsoncs --fix 'my/directory/*'

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
