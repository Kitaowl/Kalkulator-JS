const display = document.querySelector(".calculator-screen");

const buttons = document.querySelectorAll(".calculator-keys>button");

let buttonNum = [];
let buttonOperator = [];
let buttonFunction = [];
let cache = [];
let cacheValue = "";
let lastOperator = null;

buttons.forEach((button) => {
  if (button.classList.contains("operator")) {
    buttonOperator.push(button);
    const operator = button.value;
    button.addEventListener("click", (e) => {
      if (cacheValue !== "") {
        const num = parseFloat(cacheValue.replace(",", "."));
        switch (operator) {
          case "+":
            add(num);
            break;
          case "-":
            subtract(num);
            break;
          case "*":
            multiply(num);
            break;
          case "/":
            divide(num);
            break;
        }
        lastOperator = operator;
      }
    });
  } else if (button.classList.contains("decimal")) {
    button.addEventListener("click", (e) => {
      if (!cacheValue.includes(",")) {
        setDisplayValue(",");
      }
    });
  } else if (button.classList.contains("all-clear")) {
    buttonFunction.push(button);
    button.addEventListener("click", (e) => {
      clearDisplay();
      cache = [];
      lastOperator = null;
    });
  } else if (button.classList.contains("equal-sign")) {
    buttonFunction.push(button);
    button.addEventListener("click", (e) => {
      equal();
    });
  } else {
    buttonNum.push(button);
    buttonFunction.push(button);
    button.addEventListener("click", (e) => {
      setDisplayValue(e.target.value);
      console.log(e.target.value);
    });
  }
});

function setDisplayValue(value) {
  display.innerText += value;
  console.log("value:" + value);
  cacheValue += value;
}

function clearDisplay() {
  display.innerText = "";
  cacheValue = "";
}

function add(a) {
  cache.push(a);
  console.log(cache);
  if (cache.length >= 2) {
    clearDisplay();
    let sum = cache[0] + cache[1];
    cache = [sum];
    setDisplayValue(sum.toString().replace(".", ","));
    cacheValue = "";
  } else {
    clearDisplay();
    cacheValue = "";
  }
}

function subtract(a) {
  cache.push(a);
  console.log(cache);
  if (cache.length >= 2) {
    clearDisplay();
    let result = cache[0] - cache[1];
    cache = [result];
    setDisplayValue(result.toString().replace(".", ","));
    cacheValue = "";
  } else {
    clearDisplay();
    cacheValue = "";
  }
}

function multiply(a) {
  cache.push(a);
  console.log(cache);
  if (cache.length >= 2) {
    clearDisplay();
    let result = cache[0] * cache[1];
    cache = [result];
    setDisplayValue(result.toString().replace(".", ","));
    cacheValue = "";
  } else {
    clearDisplay();
    cacheValue = "";
  }
}

function divide(a) {
  cache.push(a);
  console.log(cache);
  if (cache.length >= 2) {
    clearDisplay();
    let result = cache[0] / cache[1];
    cache = [result];
    setDisplayValue(result.toString().replace(".", ","));
    cacheValue = "";
  } else {
    clearDisplay();
    cacheValue = "";
  }
}

function equal() {
  if (lastOperator && cacheValue !== "") {
    const num = parseFloat(cacheValue.replace(",", "."));
    switch (lastOperator) {
      case "+":
        add(num);
        break;
      case "-":
        subtract(num);
        break;
      case "*":
        multiply(num);
        break;
      case "/":
        divide(num);
        break;
    }
    lastOperator = null;
  } else if (cache.length > 0) {
    clearDisplay();
    setDisplayValue(cache[0].toString().replace(".", ","));
  }
}

// Metoda/funkcja dodawania liczb zmiennoprzecinkowych: dodawany jest przecinek, a wartości float muszą zawierać kropkę (np. 1.2 zamiast 1,2).

// Te zmienne nie są wykorzystywane. Dodaje się do nich przyciski z kalkulatora, ale potem nie są używane.
// Pasowałoby je usunąć z kodu.
// let buttonNum = [];
// let buttonOperator = [];
// let buttonFunction = [];

// Gdy wszystko będzie działać, dopisz komentarze wyjaśniające działanie kodu oraz udokumentuj go w plikach Markdown dokumentacji:
// https://github.com/Code-V-Craft/Documentation
// Ten kod powinien być w Moduł 0: Kalkulator
