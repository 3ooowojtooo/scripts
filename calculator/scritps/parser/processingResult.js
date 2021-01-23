import { ProcessingResultType } from "./processingResultType.js";
export class ProcessingResult {
    constructor(value, node, type) {
        this.value = value;
        this.node = node;
        this.type = type;
    }
    isExpression() {
        return this.type == ProcessingResultType.EXPRESSION;
    }
    isNotInterpreted() {
        return this.type == ProcessingResultType.NOT_INTERPRETED;
    }
    isNumber() {
        return this.type == ProcessingResultType.NUMBER;
    }
    isOperator() {
        return this.type == ProcessingResultType.OPERATOR;
    }
    isNode() {
        return this.type == ProcessingResultType.NODE;
    }
    getValue() {
        return this.value;
    }
    getNode() {
        return this.node;
    }
    static expression(value) {
        return new ProcessingResult(value, null, ProcessingResultType.EXPRESSION);
    }
    static notInterpreted(value) {
        return new ProcessingResult(value, null, ProcessingResultType.NOT_INTERPRETED);
    }
    static number(value) {
        if (value.length == 0 || value.charAt(0) == "." || value.charAt(value.length - 1) == ".") {
            throw new Error("Incorrect number: " + value);
        }
        return new ProcessingResult(value, null, ProcessingResultType.NUMBER);
    }
    static operator(value) {
        if (this.OPERATORS.indexOf(value) > -1) {
            return new ProcessingResult(value, null, ProcessingResultType.OPERATOR);
        }
        throw new Error("Incorrect operator: " + value);
    }
    static node(node) {
        return new ProcessingResult(null, node, ProcessingResultType.NODE);
    }
}
ProcessingResult.OPERATORS = ["+", "-", "*", "/"];
