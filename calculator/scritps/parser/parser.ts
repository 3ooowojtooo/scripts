import {Node} from "../node/node";
import {ProcessingResult} from "./processingResult";

export class Parser {

    private static readonly OPEN_BRACKET : string = "(";
    private static readonly CLOSE_BRACKET : string = ")";
    private static readonly NUMBER_CHARACTERS : string[] = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    private readonly expression : string;

    public constructor(expression : string) {
        this.expression = expression.replace(" ", "");
    }

    public parse() : number {
        return this.makeNode(this.expression).compute();
    }

    private makeNode(expression : string) : Node {
        let brackets : ProcessingResult[] = Parser.makeBrackets(expression);
        let bracketsAndNumbers : ProcessingResult[] = this.makeNumbers(brackets);
        let bracketsAndAllNumbers : ProcessingResult[] = this.makeNegativeNumbers(bracketsAndNumbers);
        let operators : ProcessingResult[] = this.makeOperators(bracketsAndAllNumbers);
        this.validate(operators);
        return this.buildNode(operators);
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

    private makeNumbers(results : ProcessingResult[]) : ProcessingResult[] {

    }

    private makeNegativeNumbers(results : ProcessingResult[]) : ProcessingResult[] {

    }

    private makeOperators(results : ProcessingResult[]) : ProcessingResult[] {

    }

    private validate(results : ProcessingResult[]) : void {

    }

    private buildNode(results : ProcessingResult[]) : Node {

    }
}