const digits = document.querySelectorAll(".digit");
const display = document.querySelector(".display");

let num1 = "";
let num2 = "";
let operator = "";

digits.forEach((digit) => {
  digit.addEventListener("click", () => {
    num1 += digit.innerHTML;
    display.innerHTML = num1;
  });
});

/*Create the functions that update one of your number variables when the calculator’s digit buttons are clicked. 
Your calculator’s display should also update to reflect the value of that number variable.*/

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
