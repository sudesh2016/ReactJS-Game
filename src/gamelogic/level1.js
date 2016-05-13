const OPERATORS = {
    MULTIPLICATION: '*',
    ADD: '+',
    SUB: '-',
    DIVIDE: '/'
};

function getFactors(num) {
    let factorsOfnum = [],
        i;

    for (i = 1; i <= Math.floor(Math.sqrt(num)); i += 1) {
        if (num % i === 0) {
            factorsOfnum.push(i);
            if (num / i !== i) {
                factorsOfnum.push(num / i);
            }
        }
    }

    return factorsOfnum;
}

function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// currentState is function passed from action
function checkAnswer(expresion) {
    let answer = eval(expresion);
    return answer;
}

// leastFactor(n)
// returns the smallest prime that divides n
//     NaN if n is NaN or Infinity
//      0  if n=0
//      1  if n=1, n=-1, or n is not an integer

function leastFactor(n) {
    if (isNaN(n) || !isFinite(n)) return NaN;
    if (n === 0) return 0;
    if (n % 1 || n * n < 2) return 1;
    if (n % 2 === 0) return 2;
    if (n % 3 === 0) return 3;
    if (n % 5 === 0) return 5;
    const m = Math.sqrt(n);
    for (let i = 7; i <= m; i += 30) {
        if (n % i === 0) return i;
        if (n % (i + 4) === 0) return i + 4;
        if (n % (i + 6) === 0) return i + 6;
        if (n % (i + 10) === 0) return i + 10;
        if (n % (i + 12) === 0) return i + 12;
        if (n % (i + 16) === 0) return i + 16;
        if (n % (i + 22) === 0) return i + 22;
        if (n % (i + 24) === 0) return i + 24;
    }
    return n;
}

function isPrime(n) {
    if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false;
    if (n === leastFactor(n)) return true;
    return false;
}

function generateTarget(min, max) {
    let n = getRandomInt(min, max);

    while (isPrime(n)) {
        n = getRandomInt(min, max);
    }
    return n;
}

function pushToArray(numArray, first, second) {
    numArray.push(first);
    numArray.push(second);
}

function getAdd(playnumbers, target, factors) {
    let addNumber = 0,
        index;
    do {
        index = getRandomInt(0, factors.length);
        addNumber = target - index;
    } while (addNumber === target);

    pushToArray(playnumbers, addNumber, index);

    return;
}

function getSub(playnumbers, target, factors) {
    let subNumber = 0,
        index;
    do {
        index = getRandomInt(0, factors.length);
        subNumber = factors[index] + target;
    } while (subNumber === target);

    pushToArray(playnumbers, subNumber, factors[index]);

    return;
}

function getMulti(playnumbers, target, factors) {
    let number = 0,
        firstIndex, secondIndex;
    while (number !== target) {
        firstIndex = getRandomInt(0, factors.length);
        secondIndex = getRandomInt(0, factors.length);
        let expression = factors[firstIndex] + ' ' + OPERATORS.MULTIPLICATION + ' ' +
            factors[secondIndex];
        number = checkAnswer(expression);
    }

    pushToArray(playnumbers, factors[firstIndex], factors[secondIndex]);

    return;
}

function getSingleNumber(gameNumbers, target) {
    let number = target;

    while (number === target) {
        number = gameNumbers[gameNumbers.length - 1] + getRandomInt(50, 100);
    }

    return number;
}


function getDiv(playnumbers, target, factors) {
    let divNumber = 0,
        index, i = 0;
    do {
        index = getRandomInt(0, factors.length);
        divNumber = factors[index] * target;
        if (i > 4) return;
        i++;
    } while (divNumber === target);

    pushToArray(playnumbers, divNumber, factors[index]);

    return;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function isAnswer(num1, num2, target) {
    let answer = null,
        result = {},
        double = false,
        doublePoints = ['*', '/'];

    for (let i in OPERATORS) {
        if (target === checkAnswer(num1 + OPERATORS[i] + num2)) {
            answer = `${num1} ${OPERATORS[i]}  ${num2}`;
            if (doublePoints.includes(OPERATORS[i])) {
                double = true;
            }
            break;
        }
    }
    result = {
        double,
        answer
    };
    return result;
}


function getTargetAndFactors(min, max) {
    let targetNumber, factors;
    do {
        targetNumber = generateTarget(min, max);
        factors = getFactors(targetNumber);
    } while (factors.length === 3);

    let allnumbers = { factors, targetNumber };

    return allnumbers;
}

function getplayNumbers(min, max) {
    let { factors, targetNumber } = getTargetAndFactors(min, max),
        dice = ['add', 'sub', 'div', 'multi'],
        diceResult = shuffle(dice),
        gameNumbers = [];

    // We don't care about the number 1
    factors.splice(factors.indexOf(1), 1);
    // We don't care about the Target Number itself
    factors.splice(factors.indexOf(targetNumber), 1);

    for (let i = 0; i < 2; i++) {
        if (diceResult[i] === 'add') {
            getAdd(gameNumbers, targetNumber, factors);
        } else if (diceResult[i] === 'sub') {
            getSub(gameNumbers, targetNumber, factors);
        } else if (diceResult[i] === 'div') {
            getDiv(gameNumbers, targetNumber, factors);
        } else {
            getMulti(gameNumbers, targetNumber, factors);
        }
    }

    for (let i = 0; i < gameNumbers.length; i++) {
        gameNumbers[i] = Math.abs(gameNumbers[i]);
    }

    do {
        gameNumbers = gameNumbers.filter(onlyUnique);
        gameNumbers.push(getSingleNumber(gameNumbers, targetNumber));
    } while (gameNumbers.length < 5);

    do {
        gameNumbers = shuffle(gameNumbers);
    } while (isAnswer(gameNumbers[0], gameNumbers[1], targetNumber).answer);

    return {
        playnumbers: shuffle(gameNumbers),
        targetNumber
    };
}

const level1 = {
    getRandomInt,
    isAnswer,
    getplayNumbers
};

export default level1;
