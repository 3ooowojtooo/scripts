import {Parser} from "./parser/parser.js";

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')

const expression = "2+3"
const result = new Parser(expression).parse()
window.alert("Result is " + result)