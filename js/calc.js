let first_number = "0";
let second_number = "0";
let result = "0";
let current_operator;
let exp = [];
const display = document.querySelector(".display");
const btnContainer = document.querySelector(".btn-container");

btnContainer.addEventListener('click', function(e) {
    e.stopImmediatePropagation()
    onButtonPress(e);
});

function onButtonPress (e) {
    switch(e.target.getAttribute('data-button-type')) {
        case "digit":
            AssignNumber(e)
            break;
        case "operator":
            AssignOperation(e)
            break;
    }

    Render(e);
}

function AssignNumber(e) {

    if(exp.length <= 1) {
        first_number = first_number == "0" 
            ? e.target.getAttribute("data-value")
            : first_number + e.target.getAttribute("data-value")

        if(exp.length == 1) exp.shift();
        exp.push(first_number)
        result = first_number;
        return;
    }

    if (exp.length >= 2) {
        second_number = second_number == "0"
            ? e.target.getAttribute("data-value")
            : second_number + e.target.getAttribute("data-value");

        if(exp.length == 3) exp.pop();
        exp.push(second_number);
        result = second_number;
    }
}

function AssignOperation(e) {
    current_operator = e.target.getAttribute('data-value');

    // Exclusive operations that can be performed with one number, in the case of clear it can be executed even when the exp array is empty
    if(current_operator == "%" || current_operator == "+/-" || current_operator == "clear" || current_operator == "=") return Operate();

    if(exp.length == 3) Operate();
    if(exp.length == 2) exp.pop();
    exp.splice(1, 1, current_operator);
}

function Operate() { 
    if(current_operator == "%" && exp.length) {
        let number = parseInt(exp[exp.length - 1])
        result =  (number / 100).toString();
        exp.splice(exp.length - 1, 1, result);
        return;
    }

    if(current_operator == "+/-" && exp.length) {
        result = (exp[exp.length - 1] * -1).toString();
        exp.splice(exp.length - 1, 1, result);
        return;
    }

    if(current_operator == "clear") {
        
        if(exp.length <= 2) {
            first_number = "0";
            exp = [];
            result = "0";
            return;
        }
    
        if(exp.length == 3) {
            second_number = "0";
            exp = [first_number.toString()]
            result = first_number.toString();
            return;
        }

    }

    if(exp.length == 3) {
        result = (eval(exp.join().replace(/,/g, ""))).toString();
        first_number = result;
        second_number = "0";
        exp = [first_number]
    }
}

function Render(e) {
    const clear_button = document.querySelector('div[data-value="clear"]');

    let new_operator_button = e.target;

    let last_operator_button = document.querySelector('.selected_operation');

    last_operator_button ? last_operator_button.classList.remove('selected_operation') : null;
    new_operator_button ? new_operator_button.classList.add('selected_operation') : null;

    // change display's font-size
    switch(result.toString().length) {
        case 7:
            display.style.fontSize = "4.7rem"
            break;
        case 8:
            display.style.fontSize = "4.1rem"
            break;
        case 9: 
            display.style.fontSize = "3.65rem"
            break
    }

    if(result.toString().length > 9) {
        display.innerText = parseFloat(result).toPrecision(3);
    } else {
        display.innerText = result;
    }

    exp.length == "0"
        ? clear_button.innerText = 'AC'
        : clear_button.innerText = 'C'

    
}