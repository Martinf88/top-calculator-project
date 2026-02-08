const digitBtns = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");

/* TODO 5:Add a backspace button */
/* TODO: 6 Add Keyboard support */

let num1 = "0";
let num2 = "";
let operator = "";

const resetFunction = (result) => {
  if (result) {
    num1 = result;
  } else {
    num1 = "0";
  }
  num2 = "";
  operator = "";
};

const MAX_DIGITS = 16;
const MAX_DECIMALS = 2;

const formatNumber = (num) => {
  if (!Number.isFinite(num)) return "Math says no.";

  return Number(num.toFixed(MAX_DECIMALS)).toString();
};

digitBtns.forEach((digit) => {
  digit.addEventListener("click", () => {
    const isNum1 = operator === "";
    let current = isNum1 ? num1 : num2;

    if (digit.innerHTML === "." && current.includes(".")) return;

    if (current === "0" && digit.innerHTML === ".") {
      current = "0.";
    } else if (current === "0") {
      current = digit.innerHTML;
    } else {
      current += digit.innerHTML;
    }

    if (isNum1) {
      if (num1.length === MAX_DIGITS) return;
      num1 = current;
      display.innerHTML = num1;
    } else {
      if (num2.length === MAX_DIGITS) return;
      num2 = current;
      display.innerHTML = `${num1} ${operator} ${num2}`;
    }
  });
});

const hasFullOperation = () => operator !== "" && num2 !== "";

operatorBtns.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", () => {
    if (hasFullOperation()) {
      const result = operate(operator, Number(num1), Number(num2));
      display.innerHTML = result;
      resetFunction(result);
    }
    operator = operatorBtn.innerHTML;
    display.innerHTML = num1 + " " + operator;
  });
});

equalsBtn.addEventListener("click", () => {
  if (!hasFullOperation()) return;

  const result = operate(operator, Number(num1), Number(num2));
  display.innerHTML = result;
  resetFunction(result);
});

clearBtn.addEventListener("click", () => {
  display.innerHTML = "0";
  resetFunction();
});

const add = (num1, num2) => {
  return num1 + num2;
};

const subtract = (num1, num2) => {
  return num1 - num2;
};

const multiply = (num1, num2) => {
  return num1 * num2;
};

const divide = (num1, num2) => {
  return num1 / num2;
};

const operations = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

const operate = (operator, num1, num2) => {
  return formatNumber(operations[operator](num1, num2));
};
