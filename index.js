const add = (firstOperand, secondOperand) => {
    return firstOperand + secondOperand;
};

const subtract = (firstOperand, secondOperand) => {
    return firstOperand - secondOperand;
};

const multiply = (firstOperand, secondOperand) => {
    return firstOperand * secondOperand;
};

const divide = (firstOperand, secondOperand) => {
    if (secondOperand === 0) {
        alert("Sorry you cant divide by 0 😎");
        return 0;
    }
    return firstOperand / secondOperand;
};


const operate = (firstOperand, operator, secondOperand) => {
    if (operator === "+") {
        return add(firstOperand, secondOperand);
    }

    if (operator === "-") {
        return subtract(firstOperand, secondOperand);
    }

    if (operator === "*") {
        return multiply(firstOperand, secondOperand);
    }

    if (operator === "/") {
        return divide(firstOperand, secondOperand);
    }
};


const currentComputation = document.querySelector("#computation");

const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const decimalPoint = document.querySelector("#decimal-point");
const resultBtn = document.querySelector("#result-btn");

const deleteBtn = document.querySelector("#delete-btn");
const clearBtn = document.querySelector("#clear-btn");

const displayValues = {
    firstOperand: null,
    operator: null,
    secondOperand: null
};


function handleOperand(digit) {
    currentComputation.textContent += digit;
    // if there is no operator yet, that means that the value its for the first operand
    if (!displayValues.operator) {
        displayValues.firstOperand = currentComputation.textContent;
        return;
    }
    // otherwise its for the second operand, which is after the operator, to obtain it
    // the current computation string is split in two pieces by the operator, the first and second operand
    displayValues.secondOperand = currentComputation.textContent.split(displayValues.operator)[1]; 
}


operands.forEach((operand) => {
    operand.addEventListener("click", (event) => {
        handleOperand(event.target.textContent);
    });
});


function handleOperator(operator) {
    if (!displayValues.operator) {
        currentComputation.textContent += operator;
        displayValues.operator = operator;
    }
    // if there is a operator already, but there are the two operands too,
    // then its going to generate a new operation, calculating the last operation
    // and appending the new operator
    if (displayValues.firstOperand && displayValues.secondOperand) {
        const newOperator = operator;
        displayResult(newOperator);
        return;
    }
}


operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        handleOperator(event.target.id);
    });
});


function handleDecimalPoint() {
    // this conditionals have the purpose of checking if the operands have already a decimal point,
    // to avoid multiple decimal points in each operand.
    // to check to whcich operand is going to be added the decimal point, it checks if there is a operator,
    // if its true, then its the first operand, otherwise the second,
    // (!displayValues.firstOperand || !displayValues.firstOperand.includes("."))
    // checks first if the first operand is already asigned, to allow the user to input numbers like .24
    // and to avoid an error if its null, because the .includes() method
    if (!displayValues.operator && (!displayValues.firstOperand || !displayValues.firstOperand.includes("."))) {
        currentComputation.textContent += ".";
        displayValues.firstOperand += ".";
        return;
    }

    if (displayValues.operator && (!displayValues.secondOperand || !displayValues.secondOperand.includes("."))) {
        currentComputation.textContent += ".";
        displayValues.secondOperand += ".";
        return;
    }
}

decimalPoint.addEventListener("click", () => {
    handleDecimalPoint();
});

function displayResult(newOperator = null) {
    const { firstOperand, operator, secondOperand } = displayValues;
    const result = operate(Number(firstOperand), operator, Number(secondOperand));
    // there is a ternary for when the user inputs for example 12 x 3, and then puts another operator
    // (newOperator)
    currentComputation.textContent = newOperator ? result + newOperator : result;
    displayValues.firstOperand = String(result);
    displayValues.operator = newOperator;
    displayValues.secondOperand = null;
    
}


function handleResult() {
    // it checks if the three fundamental elements are present
    if (displayValues.firstOperand && displayValues.operator && displayValues.secondOperand) {
        displayResult();
    }
}


resultBtn.addEventListener("click", () => {
    handleResult();
});


function handleDelete() {
    // remove last character
    currentComputation.textContent = currentComputation.textContent.slice(0, currentComputation.textContent.length - 1);

    if (displayValues.secondOperand) {
        displayValues.secondOperand = displayValues.secondOperand.slice(0, displayValues.secondOperand.length - 1);
        return;
    }

    if (displayValues.operator) {
        displayValues.operator = null;
        return;
    }

    if (displayValues.firstOperand) {
        displayValues.firstOperand = displayValues.firstOperand.slice(0, displayValues.firstOperand.length - 1);
    }
}


deleteBtn.addEventListener("click", () => {
    handleDelete();
});


function handleClear() {
    // reset all values
    displayValues.firstOperand = null;
    displayValues.operator = null;
    displayValues.secondOperand = null;
    currentComputation.textContent = "";
}


clearBtn.addEventListener("click", () => {
    handleClear();
});


function handleKeyBoard(key) {
    const possibleDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const possibleOperators = ["+", "-", "*", "/"];
    if (possibleDigits.includes(key)) {
        handleOperand(key);
        return;
    }

    if (possibleOperators.includes(key)) {
        handleOperator(key);
        return;
    }

    if (key === ".") {
        handleDecimalPoint();
        return;
    }

    if (key === "Enter") {
        handleResult();
        return;
    }

    if (key === "Backspace") {
        handleDelete();
        return;
    }

    if (key === "Escape") {
        handleClear();
        return;
    }
}


document.addEventListener("keydown", (event) => {
    handleKeyBoard(event.key)
});