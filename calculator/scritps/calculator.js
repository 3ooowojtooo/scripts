import { Parser } from "./parser/parser.js";
export class Calculator {
    constructor() {
        const inputButtons = document.querySelectorAll('[data-input]');
        const equalsButton = document.querySelector('[data-equals]');
        const clearAllButton = document.querySelector('[data-all-clear]');
        const deleteButton = document.querySelector('[data-delete]');
        inputButtons.forEach(btn => btn.addEventListener("click", Calculator.onClickInput));
        equalsButton.addEventListener("click", Calculator.onClickEquals);
        clearAllButton.addEventListener("click", Calculator.onClickClearAll);
        deleteButton.addEventListener("click", Calculator.onClickDelete);
    }
    static onClickInput(event) {
        const input = event.target.innerText;
        const textArea = document.querySelector("textarea");
        textArea.value += input;
    }
    static onClickEquals(event) {
        const textArea = document.querySelector("textarea");
        const expression = textArea.value;
        try {
            const result = new Parser(expression).parse();
            textArea.value = result.toString();
        }
        catch (e) {
            window.alert(e.message);
        }
    }
    static onClickClearAll(event) {
        const textArea = document.querySelector("textarea");
        textArea.value = "";
    }
    static onClickDelete(event) {
        const textArea = document.querySelector("textarea");
        const currentValue = textArea.value;
        if (currentValue.length > 0) {
            textArea.value = currentValue.substr(0, currentValue.length - 1);
        }
    }
}
