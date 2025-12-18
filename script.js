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


function numberInput (input) {
    if (/^\d$/.test(input.key) || (input.key === "." && !displayNumber.includes("."))) {
        displayNumber += input.key;
        display.innerHTML = displayNumber;
    }
}
function enableFunctions (input) {
    if (/^\d$/.test(input.key) || (input.key === "." && !displayNumber.includes("."))) {
        buttons.forEach((v) => { v.disabled = false; });
        document.removeEventListener("keypress", enableFunctions);
    }
}

function applyModifier (input) {
    if (input.target.innerHTML === "AC") {
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
}

function applyOperatorKeypress (input) {
    if ("+-*/".includes(input.key)) {
        if (subExp.innerHTML === "") {
            subExp.innerHTML = `${displayNumber} ${input.key} `;
            displayNumber = "";
            display.innerHTML = "0";
        } else {
            subExp.innerHTML.charAt(subExp.innerHTML.length - 2) = input.key;
        }
    }
}
function applyOperatorClick (input) {
    if ("+-*/".includes(input.target.innerHTML)) {
        if (subExp.innerHTML === "") {
            subExp.innerHTML = `${displayNumber} ${input.target.innerHTML} `;
            displayNumber = "";
            display.innerHTML = "0";
        } else {
            subExp.innerHTML.charAt(subExp.innerHTML.length - 2) = input.target.innerHTML;
        }
    }
}

function calculateResult () {

}
document.addEventListener("keypress", numberInput);
document.addEventListener("keypress", enableFunctions);

modifiers.forEach((v) => {
    v.addEventListener("click", applyModifier);
});

operators.forEach((v) => {
    v.addEventListener("click", applyOperatorClick);
    v.addEventListener("keypress", applyOperatorKeypress);
});

calculate.addEventListener("click", calculateResult);