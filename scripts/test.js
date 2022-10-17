const args = require('minimist')(process.argv.slice(2));
const path = require('path');
const figlet = require('figlet');
const versionStr = figlet.textSync('Viruni Lib');
const Printer = require('@darkobits/lolcatjs');
const ora = require('ora');
let rootDir = path.resolve(__dirname, '../');

if (args.p) {
  rootDir = rootDir + '/packages/' + args.p;
  const _version = require(rootDir + '/package.json').name;
  console.log(
    Printer.fromString(`${_version} test cases \n${versionStr}`)
  );
}

const jestArgs = ['--runInBand', '--rootDir', rootDir];
const spinner = ora(`\n ⏰ ==> running: jest ${jestArgs.join(' ')}`);

spinner.start();
require('jest').run(jestArgs);
spinner.stop();
