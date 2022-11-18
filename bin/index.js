#! /usr/bin/env node

const utils = require("./utils.js"); // all the functions are stored in the utils.js
const yargs = require("yargs"); //a npm package that helps in making the CLI Application -v: 17.6.2
const chalk = require("chalk"); // a npm package that helps to style the CLI Application -v: 4.1.2

// if now argument is passed with the keyword - hellobank1
// then it will run a function showHelp() which displays the help section of the CLI Application
if (yargs.argv._[0] == null) {
  utils.showHelp();
  return;
}

// if else loop if any action other than CREATE, DEPOSIT, WITHDRAW and BALANCE is typed
// then it will throw an error stating Wrong ACTION INPUT
// it will also display a few examples as to how to type the command in CLI Application

if (yargs.argv._[0] == "CREATE") {
  let accountCode = yargs.argv._[1];
  let name = yargs.argv._[2];
  utils.createAccount(accountCode, name); // this runs the function createAccount() inside utils.js
} else if (yargs.argv._[0] == "DEPOSIT") {
  let accountCode = yargs.argv._[1];
  let amount = yargs.argv._[2];
  utils.depositAmount(accountCode, amount); // this runs the function depositAmount() inside utils.js
} else if (yargs.argv._[0] == "WITHDRAW") {
  let accountCode = yargs.argv._[1];
  let amount = yargs.argv._[2];
  utils.withdrawAmount(accountCode, amount); // this runs the function withdrawAmount() inside utils.js
} else if (yargs.argv._[0] == "BALANCE") {
  let accountCode = yargs.argv._[1];
  utils.showBalance(accountCode);
} else {
  // this runs if any of the action input is invalid

  console.log(chalk.redBright("Wrong ACTION INPUT"));
  console.log(
    chalk.hex("#FFCC00")("Actions: CREATE, DEPOSIT, WITHDRAW, BALANCE")
  );
  console.log(
    "\tCREATE Example: \t" +
      `${chalk.hex("#4B0082")("hellobank1 CREATE ACC001 KELP")}`
  );
  console.log(
    "\tDEPOSIT Example: \t" +
      `${chalk.hex("#4B0082")("hellobank1 DEPOSIT ACC001 10000")}`
  );
  console.log(
    " \tWITHDRAW Example:       " +
      `${chalk.hex("#4B0082")("hellobank1 WITHDRAW ACC001 1000")}`
  );
  console.log(
    " \tBALANCE Example: \t" +
      `${chalk.hex("#4B0082")("hellobank1 BALANCE ACC001")}`
  );
}
