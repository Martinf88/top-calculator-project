/* ======================
   DOM SELECTORS
====================== */
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");
const backSpaceBtn = document.querySelector(".back-space");
const display = document.querySelector(".display");

/* ======================
   STATE
====================== */
let num1 = "0";
let num2 = "";
let operator = "";
let hasOperated = false;

/* ======================
   CONFIG
====================== */
const MAX_DIGITS = 16;
const MAX_DECIMALS = 2;

/* ======================
   UTILITY FUNCTIONS
====================== */
const hasFullOperation = () => operator !== "" && num2 !== "";

const formatNumber = (num) => {
  if (!Number.isFinite(num)) return "Math says no.";
  return Number(num.toFixed(MAX_DECIMALS)).toString();
};

const updateDisplay = () => {
  display.innerHTML = operator ? `${num1} ${operator} ${num2}` : num1;
};

const resetFunction = (result) => {
  num1 = result ?? "0";

  num2 = "";
  operator = "";
  hasOperated = true;
};

/* ======================
   CORE LOGIC HANDLERS
====================== */
const handleCalculate = () => {
  if (hasFullOperation()) {
    const result = operate(operator, Number(num1), Number(num2));
    resetFunction(result);
  }
};
const handleBackSpace = () => {
  if (!operator) {
    num1 = num1.length > 1 ? num1.slice(0, -1) : "0";
  } else if (num2) {
    num2 = num2.length > 1 ? num2.slice(0, -1) : "0";
  }
  hasOperated = false;
  updateDisplay();
};

const handleDelete = () => {
  resetFunction();
  updateDisplay();
};

const handleEquals = () => {
  if (!hasFullOperation()) return;

  handleCalculate();
  updateDisplay();
};

const handleOperatorBtns = (btn) => {
  if (hasFullOperation()) {
    handleCalculate();
  }

  operator = btn;
  updateDisplay();
};

const handleDigits = (btn) => {
  const shouldOverwriteValue = hasOperated && operator === "";
  const isNum1 = operator === "";
  let current = isNum1 ? num1 : num2;
  const value = btn === "," ? "." : btn;

  if (shouldOverwriteValue) {
    if (value === ".") {
      current = "0.";
    } else {
      current = value;
    }
  } else {
    if (value === "." && current.includes(".")) return;
    if (current === "0" && value === ".") {
      current = "0.";
    } else if (current === "0") {
      current = value;
    } else {
      current += value;
    }
  }

  if (isNum1) {
    if (current.length > MAX_DIGITS) return;
    num1 = current;
  } else {
    if (current.length > MAX_DIGITS) return;
    num2 = current;
  }
  hasOperated = false;
  updateDisplay();
};

/* ======================
   EVENT LISTENERS
====================== */

// Digits
digitBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    handleDigits(btn.innerHTML);
  });
});

// Operators
operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    handleOperatorBtns(btn.innerHTML);
  });
});

// Equals
equalsBtn.addEventListener("click", handleEquals);

// Clear
clearBtn.addEventListener("click", handleDelete);

// Backspace
backSpaceBtn.addEventListener("click", handleBackSpace);

// Keyboard Support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  // Handle digits (0–9)
  if (/^\d$/.test(key)) {
    e.preventDefault();
    handleDigits(key);
    return;
  }

  // Handle decimal separator
  if (key === "." || key === ",") {
    e.preventDefault();
    handleDigits(key);
    return;
  }

  // Handle operators
  if (["+", "-", "*", "/"].includes(key)) {
    e.preventDefault();
    handleOperatorBtns(key);
    return;
  }

  switch (key) {
    case "Enter":
      e.preventDefault();
      handleEquals();
      break;

    case "Backspace":
      e.preventDefault();
      handleBackSpace();
      break;

    case "Delete":
      e.preventDefault();
      handleDelete();
      break;
  }
});

/* ======================
   MATH OPERATIONS
====================== */
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operations = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

const operate = (operator, num1, num2) => {
  return formatNumber(operations[operator](num1, num2));
};
