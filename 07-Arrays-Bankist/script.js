'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">
        ${i + 1} ${type}
      </div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

const calcDisplaySummary = acc => {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)
    .toFixed(2);
  labelSumIn.textContent = `${incomes}€`;

  const out = Math.abs(acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)).toFixed(2);
  labelSumOut.textContent = `${out}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0)
    .toFixed(2);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = accs => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = curAcc => {
  // Display movements
  displayMovements(curAcc.movements);

  // Display balance
  calcDisplayBalance(curAcc);

  // Display summary
  calcDisplaySummary(curAcc);
};

// Evemt Handler
let currentAccount;

btnLogin.addEventListener('click', e => {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (currentAccount && currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 1;

    // Clear input field
    inputLoginUsername.value = inputLoginPin.value = '';

    // Clear last selected input field blink
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // UpdateUI
    updateUI(currentAccount);
  }

  inputLoanAmount.blur();
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);

    // Delete account
    accounts.splice(index, 1);

    // Find UI
    containerApp.style.opacity = 0;
  }

  inputClosePin.blur();
  inputCloseUsername.value = inputClosePin.value = '';
  labelWelcome.textContent = 'Log in to get started';
});

let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();

  sorted = !sorted;
  displayMovements(currentAccount.movements, sorted);
});

/////////////////////////////////////////////////
// LECTURES

/* 
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
*/

/////////////////////////////////////////////////

/* 
// Challenge #1
const checkDogs = (dogsJulia, dogsKate) => {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-1);
  const dogs = dogsJuliaCorrected.concat(dogsKate);

  dogs.forEach((dog, i) => {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
*/

/* 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map((mov, i, arr) => {
  // if (mov > 0) {
  //   return `Movement ${i + 1}: You deposited ${mov}`;
  // } else {
  //   return `Movement ${i + 1}: You withdraw ${mov}`;
  // }
  return `Movement ${i + 1}: You ${
    mov > 0 ? 'deposited' : 'withdraw'
  } ${Math.abs(mov)}`;
});
console.log(movementsDescriptions);
*/

/* 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(mov => mov > 0);
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
*/

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

const balance = movements.reduce((acc, cur, i, arr) => {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0);
console.log('Balance:', balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log('Balance2:', balance2);

const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);
*/

/* 
// Challenge #2
const calcAverageHumanAge = ages => {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAges.filter(age => age >= 18);
  console.log(humanAges);
  console.log(adults);

  const average = adults.reduce(
    (acc, cur, i, arr) => acc + cur / arr.length,
    0
  );
  return average;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
*/

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    console.log(arr[i]);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
*/

/* 
// Challenge #3
const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];
const calcAverageHumanAge = ages => {
  const average = ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  return average;
};
const avg1 = calcAverageHumanAge(data1);
const avg2 = calcAverageHumanAge(data2);
console.log(avg1, avg2);
*/

/* 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(typeof account);
console.log(account);
*/

/* 
// is movements array includes -130 (Equality)
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
console.log(movements.includes(-130));
console.log(movements.some(mov => mov !== -130));

// Some: is movements array includes any value greater than 5000 (Condition)
const anyDeposits = movements.some(mov => mov > 5000);
console.log(anyDeposits);

// Every: is returns if everything is true in the condition
console.log(movements.every(mov => mov > 300));
console.log(account4.movements.every(mov => mov > 0));

// Seperate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/

/* 
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

// .flat('level' of array);
const arrDeep = [[[1, 2], 3], [[4, 5], 6], 7, 8];
console.log(arrDeep.flat(2));

// Get every movement in accounts
// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance); 

// Flat : can change the level-deep
const overallBalanceFlat = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalanceFlat);

// FlatMap : can't change, 1 level-deep
const overallBalanceFlatMap = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);
console.log(overallBalanceFlatMap);
*/

/* 
// String
const owners = ['Jonas', 'Eren', 'Zach', 'Selin'];
// Sort : is mutating the original array
console.log(owners.sort());
console.log(owners);

// Numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// Working like a string if no argument in the function
// console.log(movements);
// console.log(movements.sort());

// Ascending Order --->
console.log('Ascending Order:');
console.log('Original', movements);
console.log(
  movements.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
  })
);
console.log(movements.sort((a, b) => a - b));

// Descending Order --->
console.log('Descending Order:');
console.log('Original', movements);
console.log(
  movements.sort((a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
  })
);
console.log(movements.sort((a, b) => b - a));
*/

/* 
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty arrays + fill method
const y = new Array(1, 2);
console.log(y);

const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5));

// x.fill(1);
x.fill(1, 3, 5);
console.log(x);

arr.fill(23, 2, 5);
console.log(arr);

// Array.from
const z = Array.from({ length: 7 }, () => 1);
console.log(z);

const a = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(a);

// const b = Array.from({ length: 100 }, (_, i) => (i = Math.trunc(Math.random() * 100 + 1)));
// console.log(b);

labelBalance.addEventListener('click', () => {
  // const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
  // console.log(movementsUI.map(el => Number(el.textContent.replace('€', ''))));

  const movementsUI = Array.from(document.querySelectorAll('.movements__value'), el =>
    Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  // const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  // console.log(movementsUI2);
});
*/

/* 
// Array Methods Practice
// 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

// 2.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);

// Prefixed ++ oeprator
let a = 10;
console.log(++a);
console.log(a);

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

/* 
// Challenge #4
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));

// 2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(`Sarah's dog is eating too ${dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'} `);

// 3.
const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recFood).flatMap(dog => dog.owners);
// .flat();
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recFood).flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4.
// "Matilda and Alice and Bob's dogs eat too much!"
//  "Sarah and John and Michael's dogs eat too little!"
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6.
// current > (recommended * 0.90) && current < (recommended * 1.10)
const checkEatingOkay = dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.some(checkEatingOkay));

// 7.
console.log(dogs.filter(checkEatingOkay));

// 8.
// sort it by recommended food portion in an ascending order [1,2,3]
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
*/
