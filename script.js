const digitBtns = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");

let num1 = "0";
let num2 = "";
let operator = "";

const resetFunction = (result) => {
  if (result) {
    num1 = result;
  } else {
    num1 = "";
  }
  num2 = "";
  operator = "";
};

digitBtns.forEach((digit) => {
  digit.addEventListener("click", () => {
    const isNum1 = operator === "";
    let current = isNum1 ? num1 : num2;

    if (current === "" && digit.innerHTML === ".") {
      current = "0.";
    } else {
      current += digit.innerHTML;
    }

    if (isNum1) {
      num1 = current;
      display.innerHTML = num1;
    } else {
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
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "*") {
    return multiply(num1, num2);
  } else if (operator === "/") {
    return divide(num1, num2);
  }
};
