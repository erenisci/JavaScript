'use strict';

/*
// Functions
function logger() {
  console.log('My name is Eren');
}

logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

// Function declaration
function calcAge1(birthYear) {
  return 2037 - birthYear;
}
const age1 = calcAge1(1991);

// Function expression
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};
const age2 = calcAge2(1991);

console.log(age1, age2);

// Arrow functions
const calcAge3 = birthYear => 2037 - birthYear;
const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  return `${firstName} retires in ${retirement} years`;
};

console.log(yearsUntilRetirement(2001, 'Eren'));
console.log(yearsUntilRetirement(2002, 'Sarah'));

// Functions Calling Other Functions
function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} piece of apple and ${orangePieces} pieces of orange.`;
  return juice;
}
console.log(fruitProcessor(2, 3));

// Reviewing Functions
const calcAge = function (birthYear) {
  return 2037 - birthYear;
};

const yearsUntilRetirement2 = function (birthYear, firstName) {
  const age = calcAge(birthYear);
  const retirement = 65 - age;

  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement;
  } else {
    console.log(`${firstName} has already retired 🎉`);
    return -1;
  }
};

console.log(yearsUntilRetirement(2001, 'Eren'));
console.log(yearsUntilRetirement(2002, 'Sarah'));
*/

/*
// Introduction to Arrays
const friend1 = 'Michael';
const friend2 = 'Steven';
const friend3 = 'Peter';

const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);

const y = new Array(1991, 1984, 2008, 2020);

console.log(friends[0]);
console.log(friends[2]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = 'Jay';
console.log(friends);

const firstName = 'Eren';
const eren = [firstName, 'Isci', 2037 - 1991, 'Software Engineer', friends];
console.log(eren);
console.log(eren.length);
*/

/*
// Basic Array Operations (Methods)
const friends = ['Michael', 'Steven', 'Peter'];

// Add elements
const newLength = friends.push('Jay');
console.log(friends);
console.log(newLength);

friends.unshift('John');
console.log(friends);

// Remove elements
friends.pop();
const popped = friends.pop();
console.log(popped);
console.log(friends);

friends.shift();
console.log(friends);

console.log(friends.indexOf('Steven'));
console.log(friends.indexOf('Bob'));

friends.push(23);
console.log(friends);
console.log(friends.includes('Steven'));
console.log(friends.includes('Bob'));
console.log(friends.includes(23));

if (friends.includes('Steven')) {
  console.log('You have a friend called Steven');
}
*/

/*
// Introduction to Objects
const erenArray = [
  'Eren',
  'Isci',
  2037 - 1991,
  'Software Engineer',
  ['Michael', 'Peter', 'Steven'],
];

const eren = {
  firstName: 'Eren',
  lastName: 'Isci',
  age: 2037 - 1991,
  job: 'Software Engineer',
  friends: ['Michael', 'Peter', 'Steven'],
};

// Dot vs. Bracket Notation
console.log(eren);

console.log(eren.lastName);
console.log(eren['lastName']);

const nameKey = 'Name';
console.log(eren['first' + nameKey]);
console.log(eren['last' + nameKey]);

const interestedIn = prompt(
  'What do you want to know about Eren? Choose between firstName, lastName, age, job, and friends'
);

if (eren[interestedIn]) {
  console.log(eren[interestedIn]);
} else {
  console.log(
    'Wrong request! Choose between firstName, lastName, age, job, and friends'
  );
}

eren.location = 'Turkey';
eren['twitter'] = '@erenisci.com';
console.log(eren);

console.log(
  `${eren.firstName} has ${eren.friends.length} friends, and his best friend is called ${eren.friends[0]}`
);
*/

/*
// Object Methods
const eren = {
  firstName: 'eren',
  lastName: 'Isci',
  birthYear: 1991,
  job: 'Software Engineer',
  friends: ['Michael', 'Peter', 'Steven'],
  hasDriversLicense: true,

  calcAge: function () {
    this.age = 2037 - this.birthYear;
    return this.age;
  },

  getSummary: function () {
    return `${
      this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1)
    } is a ${this.calcAge()} year old ${eren.job}, and he has ${
      this.hasDriversLicense ? 'a' : 'no'
    } driver's license.`;
  },
};

console.log(eren.calcAge());

console.log(eren.age);
console.log(eren.age);
console.log(eren.age);

console.log(eren.getSummary());
*/

/*
const mark = {
  fullName: 'Mark Miller',
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};

const john = {
  fullName: 'John Smith',
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};

mark.calcBMI();
john.calcBMI();

console.log(mark.bmi, john.bmi);

if (mark.bmi > john.bmi) {
  console.log(
    `${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s BMI (${john.bmi})`
  );
} else if (john.bmi > mark.bmi) {
  console.log(
    `${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s BMI (${mark.bmi})`
  );
}
*/

/*
// Iteration: The for Loop
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}

// Looping Arrays, Breaking and Continuing
const eren = [
  'Eren',
  'Isci',
  2037 - 1991,
  'Software Engineer',
  ['Michael', 'Peter', 'Steven'],
  true,
];
const types = [];

for (let i = 0; i < eren.length; i++) {
  console.log(eren[i], typeof eren[i]);
  types.push(typeof eren[i]);
}

console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[i]);
}
console.log(ages);

console.log('--- ONLY STRINGS ---');
for (let i = 0; i < eren.length; i++) {
  if (typeof eren[i] !== 'string') continue;
  console.log(eren[i], typeof eren[i]);
}

console.log('--- BREAK WITH NUMBER ---');
for (let i = 0; i < eren.length; i++) {
  if (typeof eren[i] === 'number') break;
  console.log(eren[i], typeof eren[i]);
}
*/

/*
// Looping Backwards and Loops in Loops
const eren = [
  'Eren',
  'Isci',
  2037 - 1991,
  'Software Engineer',
  ['Michael', 'Peter', 'Steven'],
  true,
];

for (let i = eren.length - 1; i >= 0; i--) {
  console.log(i, eren[i]);
}

for (let exercise = 1; exercise < 4; exercise++) {
  console.log(`-------- Starting exercise ${exercise}`);
  for (let rep = 1; rep < 6; rep++) {
    console.log(`Exercise ${exercise}: Lifting weight repetition ${rep} 🏋️‍♀️`);
  }
}
*/

/*
// The while Loop
for (let rep = 1; rep <= 10; rep++) {
  console.log(`FOR: Lifting weights repetition ${rep} 🏋️‍♀️`);
}

let rep = 1;
while (rep <= 10) {
  console.log(`WHILE: Lifting weights repetition ${rep} 🏋️‍♀️`);
  rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;
while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
}
console.log('Loop is about to end...');
*/
