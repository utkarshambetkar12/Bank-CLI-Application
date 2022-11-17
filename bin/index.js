#! /usr/bin/env node

const utils = require("./utils.js");
const yargs = require("yargs");
const chalk = require("chalk");

if (yargs.argv._[0] == null) {
  utils.showHelp();
  return;
}

if (yargs.argv._[0] == "CREATE") {
  let accountCode = yargs.argv._[1];
  let name = yargs.argv._[2];
  utils.createAccount(accountCode, name);
} else if (yargs.argv._[0] == "DEPOSIT") {
  let accountCode = yargs.argv._[1];
  let amount = yargs.argv._[2];
  utils.depositAmount(accountCode, amount);
} else if (yargs.argv._[0] == "WITHDRAW") {
  let accountCode = yargs.argv._[1];
  let amount = yargs.argv._[2];
  utils.withdrawAmount(accountCode, amount);
} else if (yargs.argv._[0] == "BALANCE") {
  let accountCode = yargs.argv._[1];
  utils.showBalance(accountCode);
} else {
  console.log("Wrong ACTION INPUT");
  console.log("Actions: CREATE, DEPOSIT, WITHDRAW, BALANCE");
  console.log("CREATE Example: hellobank1 CREATE ACC001 KELP");
  console.log("DEPOSIT Example: hellobank1 DEPOSIT ACC001 10000");
  console.log("WITHDRAW Example: hellobank1 WITHDRAW ACC001 1000");
  console.log("BALANCE Example: hellobank1 BALANCE ACC001");
}
