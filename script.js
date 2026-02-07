const digitBtns = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");

/*TODO2: Fix bug whn pressing = before pressing a number or an operator/*
/*TODO3: Fix bug when num1 has a value and switching operators befor selectging num2 */
/* TODO 4: Allow only one decimal. Not 2.5.4 only 2.54 */
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

function integerLength(num) {
  return Math.floor(Math.abs(num)).toString().length;
}

const MAX_DIGITS = 16;
const MAX_DECIMALS = 2;

const formatNumber = (num) => {
  if (!Number.isFinite(num)) return "Not allowed!";

  return Number(num.toFixed(MAX_DECIMALS)).toString();
};

digitBtns.forEach((digit) => {
  digit.addEventListener("click", () => {
    const isNum1 = operator === "";
    let current = isNum1 ? num1 : num2;

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

operatorBtns.forEach((op) => {
  op.addEventListener("click", () => {
    if (operator !== "") {
      const result = operate(operator, Number(num1), Number(num2));
      display.innerHTML = result;
      resetFunction(result);
    }
    operator = op.innerHTML;
    display.innerHTML += " " + operator;
  });
});

equalsBtn.addEventListener("click", () => {
  if (num1 === "" || operator === "" || num2 === "") return;
  const result = operate(operator, Number(num1), Number(num2));
  display.innerHTML = result;
  resetFunction();
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

const operate = (operator, num1, num2) => {
  if (operator === "") return num1;

  if (operator === "+") {
    return formatNumber(add(num1, num2));
  } else if (operator === "-") {
    return formatNumber(subtract(num1, num2));
  } else if (operator === "*") {
    return formatNumber(multiply(num1, num2));
  } else if (operator === "/") {
    return formatNumber(divide(num1, num2));
  }
};
