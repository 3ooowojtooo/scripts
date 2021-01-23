import {Node} from "../node/node.js";
import {ProcessingResult} from "./processingResult.js";
import {NumberNode} from "../node/numberNode.js";
import {BinaryOperatorNode} from "../node/binaryOperatorNode.js";
import {MultiplyOperatorNode} from "../node/multiplyOperatorNode.js";
import {DivideOperatorNode} from "../node/divideOperatorNode.js";
import {PlusOperatorNode} from "../node/plusOperatorNode.js";
import {MinusOperatorNode} from "../node/minusOperatorNode.js";

export class Parser {

    private static readonly OPEN_BRACKET : string = "(";
    private static readonly CLOSE_BRACKET : string = ")";
    private static readonly NUMBER_CHARACTERS : string[] = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    private readonly expression : string;

    public constructor(expression : string) {
        this.expression = expression.replace(" ", "");
    }

    public parse() : number {
        let result = Parser.makeNode(this.expression)
        return result.compute()
    }

    private static makeNode(expression : string) : Node {
        let brackets : ProcessingResult[] = Parser.makeBrackets(expression);
        let bracketsAndNumbers : ProcessingResult[] = Parser.makeNumbers(brackets);
        let bracketsAndAllNumbers : ProcessingResult[] = Parser.makeNegativeNumbers(bracketsAndNumbers);
        let operators : ProcessingResult[] = Parser.makeOperators(bracketsAndAllNumbers);
        Parser.validate(operators);
        return Parser.buildNode(operators);
    }

    private static makeBrackets(expression : string) : ProcessingResult[] {
        let results : ProcessingResult[] = []
        let builder = "";
        let expressionInProgress = false;
        let expressionDepth = 1;
        for (let i = 0; i < expression.length; i++) {
            let currentChar = expression.charAt(i);
            if (expressionInProgress) {
                if (currentChar == Parser.OPEN_BRACKET) {
                    expressionDepth++;
                    builder = builder + currentChar;
                } else if (currentChar == Parser.CLOSE_BRACKET) {
                    if (expressionDepth == 1) {
                        if (builder.length > 0) {
                            results.push(ProcessingResult.expression(builder))
                            builder = ""
                        }
                        expressionInProgress = false
                    } else {
                        expressionDepth--;
                        builder = builder + currentChar
                    }
                } else {
                    builder = builder + currentChar
                }
            } else {
                if (currentChar == Parser.OPEN_BRACKET) {
                    if (builder.length > 0) {
                        results.push(ProcessingResult.notInterpreted(builder))
                        builder = ""
                    }
                    expressionInProgress = true
                } else {
                    builder = builder + currentChar
                }
            }
        }
        if (expressionDepth != 1 || expressionInProgress) {
            throw new Error("Bracket not closed");
        }
        if (builder.length > 0) {
            results.push(ProcessingResult.notInterpreted(builder));
        }
        return results;
    }

    private static makeNumbers(results : ProcessingResult[]) : ProcessingResult[] {
        let numbers : ProcessingResult[] = []
        results.forEach(val => {
            const split = Parser.splitIntoNumbers(val)
            split.forEach(splitVal => numbers.push(splitVal))
        })
        return numbers
    }

    private static splitIntoNumbers(item : ProcessingResult) : ProcessingResult[] {
        if (item.isExpression()) {
            return [item]
        }
        let value = item.getValue()
        let results : ProcessingResult[] = []
        let builder = ""
        let numberInProgress = false
        // @ts-ignore
        for (let i = 0; i < value.length; i++) {
            // @ts-ignore
            let currentChar = value.charAt(i)
            if (numberInProgress) {
                if (Parser.NUMBER_CHARACTERS.indexOf(currentChar) < 0) {
                    numberInProgress = false
                    results.push(ProcessingResult.number(builder))
                    builder = ""
                }
            } else {
                if (Parser.NUMBER_CHARACTERS.indexOf(currentChar) > -1) {
                    numberInProgress = true
                    results.push(ProcessingResult.notInterpreted(builder))
                    builder = ""
                }
            }
            builder = builder + currentChar
        }
        if (builder.length > 0) {
            if (numberInProgress) {
                results.push(ProcessingResult.number(builder))
            } else {
                results.push(ProcessingResult.notInterpreted(builder))
            }
        }
        return results
    }

    private static makeNegativeNumbers(items : ProcessingResult[]) : ProcessingResult[] {
        if (items.length < 2) {
            return items;
        }
        let firstResult = items[0]
        let secondResult = items[1]
        if (firstResult.getValue() == "-" && secondResult.isNumber()) {
            let results : ProcessingResult[] = []
            let negativeNumber = ProcessingResult.number("-" + secondResult.getValue())
            results.push(negativeNumber)
            for (let i = 2; i < items.length; i++) {
                results.push(items[i])
            }
            return results
        }
        return items
    }

    private static makeOperators(results : ProcessingResult[]) : ProcessingResult[] {
        let operators : ProcessingResult[] = []
        results.forEach(val => {
            const split = Parser.splitIntoOperators(val)
            split.forEach(splitVal => operators.push(splitVal))
        })
        return operators
    }

    private static splitIntoOperators(item : ProcessingResult) : ProcessingResult[] {
        if (item.isNotInterpreted()) {
            let results : ProcessingResult[] = []
            let value = item.getValue()
            // @ts-ignore
            for (let i = 0; i < value.length; i++) {
                // @ts-ignore
                results.push(ProcessingResult.operator(value.charAt(i)))
            }
            return results
        }
        return [item]
    }

    private static validate(results : ProcessingResult[]) : void {
        if (results.length == 0) {
            throw new Error("Empty expression")
        }
        if (results.length % 2 == 0) {
            throw new Error("Some operator does not have arguments")
        }
        for (let i = 0; i < results.length; i++) {
            let current = results[i]
            if (i % 2 == 0 && !(current.isExpression() || current.isNumber())) {
                throw new Error("Incorrect expressions and operators order")
            } else if (i % 2 == 1 && !current.isOperator()) {
                throw new Error("Incorrect expressions and operators order")
            } else if (current.isNotInterpreted()) {
                throw new Error("Incorrect characters in expression")
            }
        }
    }

    private static buildNode(results : ProcessingResult[]) : Node {
        if (results.length == 0) {
            throw new Error("Cannot build Node from empty results")
        } else if (results.length == 1) {
            return Parser.mapToNode(results[0])
        } else {
            const first = Parser.processResultsForOperator(results, "*")
            const second = Parser.processResultsForOperator(first, "/")
            const third = Parser.processResultsForOperator(second, "+")
            const fourth = Parser.processResultsForOperator(third, "-")
            if (fourth.length == 1 && fourth[0].isNode()) {
                // @ts-ignore
                return fourth[0].getNode()
            } else {
                throw new Error("Final processing result is incorrect")
            }
        }
    }

    private static processResultsForOperator(elements : ProcessingResult[], operator : string) : ProcessingResult[] {
        if (elements.length == 1) {
            return elements
        }
        let index = 1
        while (index < elements.length) {
            let operatorResult = elements[index]
            if (operatorResult.getValue() != operator) {
                index += 2
            } else {
                let leftIndex = index - 1
                let rightIndex = index + 1
                let processedOperator = Parser.mapToOperatorNodeResult(elements[leftIndex], operatorResult, elements[rightIndex])
                let processedList = Parser.mapListFromTo(elements, leftIndex, rightIndex, processedOperator)
                return Parser.processResultsForOperator(processedList, operator)
            }
        }
        return elements
    }

    private static mapListFromTo(elements : ProcessingResult[], leftIndex : number, rightIndex : number, between : ProcessingResult) : ProcessingResult[] {
        let result : ProcessingResult[] = []
        if (leftIndex > 0) {
            for (let i = 0; i < leftIndex; i++) {
                result.push(elements[i])
            }
        }
        result.push(between)
        if (rightIndex < (elements.length - 1)) {
            for (let i = (rightIndex + 1); i < elements.length; i++) {
                result.push(elements[i])
            }
        }
        return result
    }

    private static mapToOperatorNodeResult(left : ProcessingResult, operator : ProcessingResult, right : ProcessingResult) : ProcessingResult {
        if (!operator.isOperator() || left.isNotInterpreted() || left.isOperator() || right.isNotInterpreted() || right.isOperator()) {
            throw new Error("Cannot create operator")
        }
        let leftNode = Parser.mapToNode(left)
        let rightNode = Parser.mapToNode(right)
        // @ts-ignore
        let operatorNode = Parser.makeBinaryOperatorNode(leftNode, operator.getValue(), rightNode)
        return ProcessingResult.node(operatorNode)
    }

    private static mapToNode(result : ProcessingResult) : Node {
        if (result.isNode()) {
            // @ts-ignore
            return result.getNode()
        } else if (result.isNumber()) {
            // @ts-ignore
            return new NumberNode(result.getValue())
        } else if (result.isExpression()) {
            // @ts-ignore
            return Parser.makeNode(result.getValue())
        } else {
            throw new Error("Cannot create node result")
        }
    }

    private static makeBinaryOperatorNode(left : Node, operator : string, right : Node) : BinaryOperatorNode {
        switch (operator) {
            case "*":
                return new MultiplyOperatorNode(left, right)
            case "/":
                return new DivideOperatorNode(left, right)
            case "+":
                return new PlusOperatorNode(left, right)
            case "-":
                return new MinusOperatorNode(left, right)
            default:
                throw new Error(operator + " is not valid operator character")
        }
    }
}