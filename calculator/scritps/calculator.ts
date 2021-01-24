import {Parser} from "./parser/parser.js";

export class Calculator {
    
    public constructor() {
        const inputButtons = document.querySelectorAll('[data-input]')
        const equalsButton = document.querySelector('[data-equals]')! as HTMLButtonElement
        const clearAllButton = document.querySelector('[data-all-clear]')! as HTMLButtonElement
        const deleteButton = document.querySelector('[data-delete]')! as HTMLButtonElement

        inputButtons.forEach(btn => btn.addEventListener("click", Calculator.onClickInput))
        equalsButton.addEventListener("click", Calculator.onClickEquals)
        clearAllButton.addEventListener("click", Calculator.onClickClearAll)
        deleteButton.addEventListener("click", Calculator.onClickDelete)
    }

    private static onClickInput(event : any) {
        const input = event.target.innerText
        const textArea = document.querySelector("textarea")!;
        textArea.value += input
    }

    private static onClickEquals(event : any) {
        const textArea = document.querySelector("textarea")!;
        const expression = textArea.value
        try {
            const result = new Parser(expression).parse()
            textArea.value = result.toString()
        } catch (e) {
            window.alert(e.message)
        }
    }

    private static onClickClearAll(event : any) {
        const textArea = document.querySelector("textarea")!;
        textArea.value = ""
    }

    private static onClickDelete(event : any) {
        const textArea = document.querySelector("textarea")!;
        const currentValue = textArea.value
        if (currentValue.length > 0) {
            textArea.value = currentValue.substr(0, currentValue.length - 1)
        }
    }
}