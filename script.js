const digitBtns = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");
const backSpaceBtn = document.querySelector(".back-space");

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

const updateDisplay = () => {
  display.innerHTML = operator ? `${num1} ${operator} ${num2}` : num1;
};

const MAX_DIGITS = 16;
const MAX_DECIMALS = 2;

const formatNumber = (num) => {
  if (!Number.isFinite(num)) return "Math says no.";

  return Number(num.toFixed(MAX_DECIMALS)).toString();
};

const handleBackSpace = () => {
  if (!operator) {
    num1 = num1.length > 1 ? num1.slice(0, -1) : "0";
  } else if (num2) {
    num2 = num2.length > 1 ? num2.slice(0, -1) : "0";
  }
  updateDisplay();
};
const handleOperate = () => {
  if (!hasFullOperation()) return;

  const result = operate(operator, Number(num1), Number(num2));

  resetFunction(result);
  updateDisplay();
};
const handleDelete = () => {
  resetFunction();
  updateDisplay();
};

backSpaceBtn.addEventListener("click", () => {
  handleBackSpace();
});
document.addEventListener("keydown", (e) => {
  let key = e.key;
  if (key === "Enter") {
    e.preventDefault();
    handleOperate();
  }
  if (key === "Backspace") {
    e.preventDefault();
    handleBackSpace();
  }
  if (key === "Delete") {
    e.preventDefault();
    handleDelete();
  }
});

digitBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const isNum1 = operator === "";
    let current = isNum1 ? num1 : num2;

    if (btn.innerHTML === "." && current.includes(".")) return;

    if (current === "0" && btn.innerHTML === ".") {
      current = "0.";
    } else if (current === "0") {
      current = btn.innerHTML;
    } else {
      current += btn.innerHTML;
    }

    if (isNum1) {
      if (num1.length === MAX_DIGITS) return;
      num1 = current;
    } else {
      if (num2.length === MAX_DIGITS) return;
      num2 = current;
    }
    updateDisplay();
  });
});

const hasFullOperation = () => operator !== "" && num2 !== "";

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (hasFullOperation()) {
      const result = operate(operator, Number(num1), Number(num2));

      resetFunction(result);
    }
    const newOperator = btn.innerHTML;
    operator = newOperator;
    updateDisplay();
  });
});

equalsBtn.addEventListener("click", () => {
  handleOperate();
});

clearBtn.addEventListener("click", () => {
  handleDelete();
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
