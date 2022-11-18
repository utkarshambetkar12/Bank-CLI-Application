const axios = require("axios"); // for API Navigation
const chalk = require("chalk"); // for styling console log statements

// exports all the functions to index.js
module.exports = {
  showHelp: showHelp,
  createAccount: createAccount,
  showBalance: showBalance,
  depositAmount: depositAmount,
  withdrawAmount: withdrawAmount,
};

// usage and example statement
const usage =
  "\nUsage: hellobank1 <action> <account code> <name/amount>" +
  "\n > CREATE Example: " +
  `${chalk.hex("#4B0082")("hellobank1 CREATE ACC001 KELP")}` +
  " \n > DEPOSIT Example: " +
  `${chalk.hex("#4B0082")("hellobank1 DEPOSIT ACC001 10000")}` +
  " \n > WITHDRAW Example: " +
  `${chalk.hex("#4B0082")("hellobank1 WITHDRAW ACC001 1000")}` +
  " \n > BALANCE Example: " +
  `${chalk.hex("#4B0082")("hellobank1 BALANCE ACC001")}`;

// show help function
function showHelp() {
  console.log(
    chalk.greenBright.bold.underline(
      "Welcome to Hello Bank! How may I help you?"
    )
  );
  console.log(usage);
  console.log("\nOptions:\r");
  console.log(
    "\t--version\t      " + "Show version number." + "\t\t" + "[boolean]\r"
  );
  console.log("\t--help\t\t      " + "Show help." + "\t\t\t" + "[boolean]\n");
}

// create account function
// checks first if account code demanded already exists
// if doesn't exist -> new account is created
// if exists -> throws error -> account already exists try with another account code

function createAccount(accountCode, name) {
  axios
    .get("http://localhost:3000/accounts?q=" + accountCode)
    .then((res) => {
      if (res.data.length === 0) {
        if (accountCode == null)
          return console.log(
            chalk.redBright("Please Enter a Account Code"),
            "CREATE EXAMPLE ->",
            chalk.hex("#4B0082")("hellobank1 CREATE ACC001 KELP")
          );
        if (name == null)
          return console.log(
            chalk.redBright("Please Enter a Name"),
            "CREATE EXAMPLE ->",
            chalk.hex("#4B0082")("hellobank1 CREATE ACC001 KELP")
          );
        axios({
          method: "POST",
          url: "http://localhost:3000/accounts",
          data: {
            [accountCode]: {
              accountCode,
              name,
              balance: 0,
            },
          },
          headers: {
            "Content-Type": "application/json",
          },
        }).then(console.log(chalk.greenBright("Account Created Successfully")));
      } else {
        console.log(
          chalk.redBright(
            "Sorry! This Account already exists. Please try with another account code"
          )
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// deposit amount function
// checks first if the account code demanded already exists
// if doesn't exist -> throws error -> account not found please try again with a different account code
// if exists -> adds the deposit amount to the balance amount

function depositAmount(accountCode, amount) {
  if (accountCode == null)
    return console.log(
      chalk.redBright("Please Enter a Account Code"),
      "CREATE EXAMPLE ->",
      chalk.hex("#4B0082")("hellobank1 DEPOSIT ACC001 10000")
    );
  if (amount == null || isNaN(amount))
    return console.log(
      chalk.redBright("Please Enter a proper numeric amount"),
      "CREATE EXAMPLE ->",
      chalk.hex("#4B0082")("hellobank1 DEPOSIT ACC001 10000")
    );
  axios.get("http://localhost:3000/accounts?q=" + accountCode).then((res) => {
    if (res.data.length === 0) {
      console.log(
        chalk.redBright(
          "Sorry! Account NOT FOUND! Please try again with a different account code"
        )
      );
    } else {
      let id = res.data[0].id;
      let name = res.data[0][accountCode].name;
      let currentBalance = res.data[0][accountCode].balance;
      let newBalance = currentBalance + amount;
      axios({
        method: "PUT",
        url: "http://localhost:3000/accounts/" + id,
        data: {
          [accountCode]: {
            accountCode,
            name,
            balance: newBalance,
          },
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) =>
        console.log(chalk.greenBright("Amount Deposited Successfully"))
      );
    }
  });
}

// withdraw amount function
// checks first if the account code demanded already exists
// if doesn't exist -> throws error -> account not found try again with another account code
// if exists -> checks if balance is equal to zero (0) -> if true -> throws error -> insufficient balance
//                                                     -> if false -> checks if after withdrawal, balance is less than zero(0) -> if true -> throws error -> insufficient balance
//                                                                                                                             -> if false -> amount is withdrawn successfully

function withdrawAmount(accountCode, amount) {
  if (accountCode == null)
    return console.log(
      chalk.redBright("Please Enter a Account Code"),
      "CREATE EXAMPLE ->",
      chalk.hex("#4B0082")("hellobank1 WITHDRAW ACC001 1000")
    );
  else if (amount == null || isNaN(amount))
    return console.log(
      chalk.redBright("Please Enter a proper numeric amount"),
      "CREATE EXAMPLE ->",
      chalk.hex("#4B0082")("hellobank1 WITHDRAW ACC001 1000")
    );
  axios.get("http://localhost:3000/accounts?q=" + accountCode).then((res) => {
    if (res.data.length === 0) {
      console.log(
        chalk.redBright(
          "Sorry! Account NOT FOUND! Please try again with a different account code"
        )
      );
    } else {
      let id = res.data[0].id;
      let name = res.data[0][accountCode].name;
      let currentBalance = res.data[0][accountCode].balance;
      if (currentBalance <= 0)
        return console.log(
          chalk.redBright(
            "Insufficient Balance! Current Balance Available is " +
              currentBalance
          )
        );
      let newBalance = currentBalance - amount;
      if (newBalance < 0)
        return console.log(
          chalk.redBright(
            "Insufficient Balance! Current Balance Available is " +
              currentBalance
          )
        );
      axios({
        method: "PUT",
        url: "http://localhost:3000/accounts/" + id,
        data: {
          [accountCode]: {
            accountCode,
            name,
            balance: newBalance,
          },
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) =>
        console.log(chalk.greenBright("Amount Withdrawn Successfully"))
      );
    }
  });
}

// show balance function
// checks if account code already exists
// if doesn't exist -> throws error -> account not found please try again with a different account code
// if exists -> shows the balance in the account

function showBalance(accountCode) {
  if (accountCode == null)
    return console.log(
      chalk.redBright("Please Enter a Account Code"),
      "CREATE EXAMPLE ->",
      chalk.hex("#4B0082")("hellobank1 BALANCE ACC001 ")
    );

  axios.get("http://localhost:3000/accounts?q=" + accountCode).then((res) => {
    if (res.data.length === 0) {
      console.log(
        chalk.redBright(
          "Sorry! Account NOT FOUND! Please try again with a different account code"
        )
      );
    } else {
      console.log(
        chalk.greenBright(
          res.data[0][accountCode].name,
          res.data[0][accountCode].balance
        )
      );
    }
  });
}
