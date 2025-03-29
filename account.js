export default { Account, CheckingAccount, SavingsAccount };

class Account {
  constructor(holder, balance) {
    this.holder = holder;
    this.balance = balance;
    this.log = [];
  }

  getBalance() {
    return this.balance;
  }

  getHolder() {
    return this.holder;
  }

  getLog() {
    return this.log;
  }

  setBalance(value, operation) {
    if (operation == "Deposit" || operation == "Interest") {
      this.balance += value;
    } else {
      this.balance -= value;
    }
  }

  writeLog(balance, operation, value, date) {
    this.getLog().push({
      Balance: balance,
      Operation: operation,
      Amount: value,
      Date_Operation: date, //the date is passed in iso format
    });
  }

  deposit(value, date = new Date().toISOString().split("T")[0]) {
    this.setBalance(value, "Deposit");
    console.log(
      `${this.getHolder()} has deposited ${value} and the new balance is ${this.getBalance()}`
    );
    this.writeLog(this.getBalance(), "Deposit", value, date);
  }

  withdrawal(value, date = new Date().toISOString().split("T")[0]) {
    if (this.getBalance() < value) {
      console.log(
        `You cannot withdraw, your balance: ${this.balance} is less than ${value}`
      );
    } else {
      this.setBalance(value, "Withdrawal");
      console.log(
        `${this.getHolder()} has withdrawn ${value} and the new balance is ${this.getBalance()}`
      );
      this.writeLog(this.getBalance(), "Withdrawal", value, date);
    }
  }

  printAccount() {
    console.table(this.getLog());
  }
}

class CheckingAccount extends Account {
  constructor(holder, balance, limitwithdrawals) {
    super(holder, balance);
    this.limitwithdrawals = limitwithdrawals;
    this.initialwithdrawallimit = limitwithdrawals;
    this.lastdatewithdrawal = null; //used this variable to store the last day of withdrawal, to let me reset the daily limit.
  }

  updateDailyLimit(date) {
    if (this.getLastDateWithdrawal() !== date) {
      this.setLimitsWithdrawal(this.getInitialLimit());
      this.setLastWithdrawDate(date);
    }
  }

  withdrawal(value, date = new Date().toISOString().split("T")[0]) {
    this.updateDailyLimit(date);
    if (this.getBalance() < value) {
      console.log("Can't withdraw your balance is insufficient");
    } else if (
      this.calcTotWithdrawals(date) + value >
      this.getInitialLimit()
    ) {
      console.log(
        `You can't withdraw ${value} you have exceeded the daily limit of ${this.getInitialLimit()} you can withdraw ${
          this.getInitialLimit() - this.calcTotWithdrawals(date)
        }`
      );
    } else {
      this.setBalance(value, "Withdrawal");
      this.reduceWithdrawalsLimit(value);
      console.log(
        `${this.getHolder()} withdrew ${value} and the new balance is ${this.getBalance()}`
      );
      this.writeLog(this.getBalance(), "Withdrawal", value, date);
    }
  }

  calcTotWithdrawals(date = new Date().toISOString().split("T")[0]) {
    return this.getLog()
      .filter(
        (log) => log.Operation == "Withdrawal" && log.Date_Operation == date
      ) //Filter the log based on the operation type Withdrawal and based on the date passed as input
      .reduce((amountSum, log) => amountSum + log.Amount, 0); //used the reduce function to calculate from the previous filter the sum of the amounts
  }

  getWithdrawalLimit() {
    return this.limitwithdrawals;
  }

  reduceWithdrawalsLimit(value) {
    this.limitwithdrawals -= value;
  }

  getInitialLimit() {
    return this.initialwithdrawallimit;
  }

  setLimitsWithdrawal(value) {
    this.limitwithdrawals = value;
  }

  setLastWithdrawDate(date) {
    this.lastdatewithdrawal = date;
  }

  getLastDateWithdrawal() {
    return this.lastdatewithdrawal;
  }
}

class SavingsAccount extends Account {
  constructor(holder, balance, interestrate) {
    super(holder, balance);
    this.interestrate = interestrate;
  }

  getInterestRate() {
    return this.interestrate;
  }

  calcInterest(days, date = new Date().toISOString().split("T")[0]) {
    let result = (this.getBalance() * this.interestrate * days) / 36500;
    result = Math.round(result * 100) / 100;
    this.setBalance(result, "Interest");
    console.log(
      `Matured interest: ${result}, in ${days} days with an interest rate of ${this.getInterestRate()}%, the new balance is: ${this.getBalance()}`
    );
    this.writeLog(this.getBalance(), "Matured interest", result, date);
  }
}

const oldDate = new Date(2025, 2, 25).toISOString().split("T")[0];
const account = new Account("Luke", 0);
account.deposit(2000, oldDate);//set a specific date
account.withdrawal(200, oldDate);
account.withdrawal(400);//set a default date which is today
account.printAccount();
const ca = new CheckingAccount("Antony", 0, 500);
ca.deposit(3000, oldDate);//set a specific date
ca.withdrawal(500, oldDate);
ca.withdrawal(50, oldDate);
ca.withdrawal(500);//set a default date which is today
ca.printAccount();
const sa = new SavingsAccount("Mary", 0, 2); //interest of 2%
sa.deposit(2000);
sa.calcInterest(400);//400 days
sa.printAccount();