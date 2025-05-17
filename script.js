const display = document.querySelector(".calculator-screen");

const buttons = document.querySelectorAll(".calculator-keys>button");

// Zmienne przycisków
let buttonNum = [];
let buttonOperator = [];
let buttonFunction = [];

// Główne zmienne stanu kalkulatora
let cache = [];
let cacheValue = "";
let lastOperator = null;

// Funckcje dla przycisków działań matematycznych
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
        lastOperator = operator; // Zapamiętanie ostatniego operatora
      }
    });
  } else if (button.classList.contains("decimal")) {
    // Umożliwienie działania z liczbami dziesiętnymi
    button.addEventListener("click", (e) => {
      if (!cacheValue.includes(",")) {
        setDisplayValue(",");
      }
    });
  } else if (button.classList.contains("all-clear")) {
    buttonFunction.push(button);
    button.addEventListener("click", (e) => {
      clearDisplay();
      cache = []; // Reset pamięci
      lastOperator = null; // Reset ostatniego operatora
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

// Funkcja dodawania, w wartości float musi być kropka zamiast przecinka
function setDisplayValue(value) {
  display.innerText += value;
  console.log("value:" + value);
  cacheValue += value; // Aktualizacja wartości
}

function clearDisplay() {
  display.innerText = "";
  cacheValue = ""; // Reset wartości
}

// Dodaje liczby w kalkulatorze:
// 1. Zapamiętuje wpisaną liczbę
// 2. Jak ma dwie liczby - dodaje je i pokazuje wynik
// 3. Jak ma jedną - czyści ekran i czeka na drugą
function add(a) {
  cache.push(a);
  console.log(cache);
  if (cache.length >= 2) {
    clearDisplay();
    let sum = cache[0] + cache[1];
    cache = [sum];
    setDisplayValue(sum.toString().replace(".", ","));
    cacheValue = ""; // Reset po operacji
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

// Obsługa przycisku równości:
// Wykonuje ostatnią operację lub wyświetla wartość z cache
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
    lastOperator = null; // Reset po wykonaniu
  } else if (cache.length > 0) {
    clearDisplay();
    setDisplayValue(cache[0].toString().replace(".", ","));
  }
}

// Te zmienne nie są wykorzystywane. Dodaje się do nich przyciski z kalkulatora, ale potem nie są używane.
// Pasowałoby je usunąć z kodu.
// let buttonNum = [];
// let buttonOperator = [];
// let buttonFunction = [];

// Gdy wszystko będzie działać, dopisz komentarze wyjaśniające działanie kodu oraz udokumentuj go w plikach Markdown dokumentacji:
// https://github.com/Code-V-Craft/Documentation
// Ten kod powinien być w Moduł 0: Kalkulator
