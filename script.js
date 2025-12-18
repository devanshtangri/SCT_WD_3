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
let first = "", second = "", result;
//Helper Variables //


function numberInput (input) {
    if (/^\d$/.test(input.key) || (input.key === "." && !first.includes("."))) {
        first += input.key;
        display.innerHTML = first;
    }
}
function enableFunctions (input) {
    if (/^\d$/.test(input.key) || (input.key === "." && !first.includes("."))) {
        buttons.forEach((v) => { v.disabled = false; });
        document.removeEventListener("keypress", enableFunctions);
    }
}

function applyModifier (input) {
    if (input.target.innerHTML === "AC") {
        subExp.innerHTML = "";
        display.innerHTML = "0";
        first = "";
        modifiers.forEach((v) => { v.disabled = true; });
        operators.forEach((v) => { v.disabled = true; });
        document.addEventListener("keypress", enableFunctions);
    } else if (input.target.innerHTML === "+/-") {
        first = String(Number(first) * -1);
        display.innerHTML = first;
    } else if (input.target.innerHTML === "%") {
        first = String(Number(first) / 100);
        display.innerHTML = first;
    }
}


document.addEventListener("keypress", numberInput);
document.addEventListener("keypress", enableFunctions);

modifiers.forEach((v) => { v.addEventListener("click", applyModifier) });