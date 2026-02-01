const digitBtns = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");

let num1 = "";
let num2 = "";
let operator = "";

digitBtns.forEach((digit) => {
  digit.addEventListener("click", () => {
    /* if (num1 === "" && digit.innerHTML === ".") {
      display.innerHTML === "0.1";
    }*/
    /*TODO: fix so that if the display displays 0 and . is pressed it shows 0.1 */
    if (operator === "") {
      num1 += digit.innerHTML;
      display.innerHTML = num1;
    } else {
      num2 += digit.innerHTML;
      display.innerHTML = num1 + " " + operator + " " + num2;
    }
  });
});

operatorBtns.forEach((op) => {
  op.addEventListener("click", () => {
    if (operator !== "") return;
    operator = op.innerHTML;
    display.innerHTML += " " + operator;
  });
});

equalsBtn.addEventListener("click", () => {
  const result = operate(operator, Number(num1), Number(num2));
  display.innerHTML = result;
  num1 = "";
  num2 = "";
  operator = "";
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
