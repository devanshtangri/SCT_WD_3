// Constant Variables //
const subExp = document.querySelector("#subExpression");
const display = document.querySelector("#display");
const operands = document.querySelectorAll(".operands");
const operators = document.querySelectorAll(".operators");
const modifiers = document.querySelectorAll(".modifiers");
const calculate = document.querySelector("#calculate");
const buttons = document.querySelectorAll("button");
// Constant Variables //


//Helper Variables //
let displayNumber = "", first, result;
//Helper Variables //


// Number Input Handlers //
function numberInput (input) {
    if (/^\d$/.test(input.key) || (input.key === "." && !displayNumber.includes("."))) {
        if (display.innerHTML === "0") {
            displayNumber = input.key;
            display.innerHTML = displayNumber;
        } else {
            displayNumber += input.key;
            display.innerHTML = displayNumber;
        }
    }
}
function numberPadInput (input) {
    if (/^\d$/.test(input.target.innerHTML) || input.target.innerHTML === "." && !displayNumber.includes(".")) {
        if (display.innerHTML === "0") { 
            displayNumber = input.target.innerHTML;
            display.innerHTML = displayNumber;
        } else {
            displayNumber += input.target.innerHTML;
            display.innerHTML = displayNumber;
        }
    }
}
function deleteCharacter (input) {
    if (input.key === "Backspace") {
        displayNumber = displayNumber.slice(0, displayNumber.length - 1);
        if (displayNumber === "") { displayNumber = "0"; }
        display.innerHTML = displayNumber;
    }
}
// Number Input Handlers //


// Enable all operations after Number Input //
function enableFunctions (input) {
    if (/^\d$/.test(input.key) || (input.key === "." && !displayNumber.includes("."))) {
        buttons.forEach((v) => { v.disabled = false; });
        document.removeEventListener("keypress", enableFunctions);
    } else if (input.type === "click") {
        buttons.forEach((v) => { v.disabled = false; });
        operands.forEach((v) => { v.removeEventListener("click", enableFunctions); })
    }
}
// Enable all operations after Number Input //


// Apply Special Operators //
function applyModifier (input) {
    if (input.target.innerHTML === "AC" || input.key === "Escape") {
        subExp.innerHTML = "";
        display.innerHTML = "0";
        displayNumber = "";
        modifiers.forEach((v) => { v.disabled = true; });
        operators.forEach((v) => { v.disabled = true; });
        document.addEventListener("keypress", enableFunctions);
    } else if (input.target.innerHTML === "+/-") {
        displayNumber = String(Number(displayNumber) * -1);
        display.innerHTML = displayNumber;
    } else if (input.target.innerHTML === "%") {
        displayNumber = String(Number(displayNumber) / 100);
        display.innerHTML = displayNumber;
    }
    input.target.blur();
}
// Apply Special Operators //


// Apply Operator Handler //
function applyOperatorKeypress (input) {
    if ("+-*/".includes(input.key)) {
        if (subExp.innerHTML === "") {
            subExp.innerHTML = `${displayNumber} ${input.key} `;
            first = Number(displayNumber);
            displayNumber = "";
            display.innerHTML = "0";
        } else {
            subExp.innerHTML = subExp.innerHTML.replace(subExp.innerHTML.charAt(subExp.innerHTML.length - 2), input.key);
        }
    }
}
function applyOperatorClick (input) {
    if ("+-*/".includes(input.target.innerHTML)) {
        if (subExp.innerHTML === "") {
            subExp.innerHTML = `${displayNumber} ${input.target.innerHTML} `;
            first = Number(displayNumber);
            displayNumber = "";
            display.innerHTML = "0";
        } else {
            subExp.innerHTML = subExp.innerHTML.replace(subExp.innerHTML.charAt(subExp.innerHTML.length - 2), input.target.innerHTML);
        }
        input.target.blur();
    }
}
// Apply Operator Handler //


// Equals Operator Handler //
function calculateResult (input) {
    if (subExp.innerHTML !== "" && (input.type === "click" || input.key === "Enter")) {
        let operator = subExp.innerHTML.charAt(subExp.innerHTML.length - 2);

        if (operator === "+") {
            display.innerHTML = String(first + Number(display.innerHTML));
        } else if (operator === "-") {
            display.innerHTML = String(first - Number(display.innerHTML));
        } else if (operator === "*") {
            display.innerHTML = String(first * Number(display.innerHTML));
        } else {
            display.innerHTML = String(first / Number(display.innerHTML));
        }

        subExp.innerHTML = "";
        displayNumber = "";
        first = 0;
        input.target.blur();
    }
}
// Equals Operator Handler //


// Event Listeners //
document.addEventListener("keypress", numberInput);
document.addEventListener("keypress", enableFunctions);
operands.forEach((v) => {
    v.addEventListener("click", numberPadInput);
    v.addEventListener("click", enableFunctions);
});
document.addEventListener("keydown", deleteCharacter);

modifiers.forEach((v) => {
    v.addEventListener("click", applyModifier);
});
document.addEventListener("keydown", applyModifier);

operators.forEach((v) => {
    v.addEventListener("click", applyOperatorClick);
});
document.addEventListener("keypress", applyOperatorKeypress);

calculate.addEventListener("click", calculateResult);
document.addEventListener("keypress", calculateResult);
// Event Listeners //