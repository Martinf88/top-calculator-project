let num1;
let num2;
let operator;

const add = (num1, num2) => {
  return `add: ${num1 + num2}`;
};

const subtract = (num1, num2) => {
  return `subtract: ${num1 - num2}`;
};

const multiply = (num1, num2) => {
  return `multiply: ${num1 * num2}`;
};

const divide = (num1, num2) => {
  return `divide: ${num1 / num2}`;
};

const operate = (operator, num1, num2) => {
  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "*") {
    return multiply(num1, num2);
  } else if (operator === "/") {
    return divide(num1, num2);
  }
};

console.log(operate("/", 5, 2));
