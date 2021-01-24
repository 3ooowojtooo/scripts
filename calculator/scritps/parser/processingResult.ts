import {Node} from "../node/node.js";
import {ProcessingResultType} from "./processingResultType.js";

export class ProcessingResult {

    private static readonly OPERATORS : string[] = ["+", "-", "*", "/"];

    private readonly value : string | null;
    private readonly node : Node | null;
    private readonly type : ProcessingResultType;

    private constructor(value : string | null, node : Node | null, type : ProcessingResultType) {
        this.value = value;
        this.node = node;
        this.type = type
    }

    public isExpression() : boolean {
        return this.type == ProcessingResultType.EXPRESSION;
    }

    public isNotInterpreted() : boolean {
        return this.type == ProcessingResultType.NOT_INTERPRETED;
    }

    public isNumber() : boolean {
        return this.type == ProcessingResultType.NUMBER;
    }

    public isOperator() : boolean {
        return this.type == ProcessingResultType.OPERATOR;
    }

    public isNode() : boolean {
        return this.type == ProcessingResultType.NODE;
    }

    public getValue() : string | null {
        return this.value;
    }

    public getNode() : Node | null {
        return this.node;
    }

    public static expression(value : string) : ProcessingResult {
        return new ProcessingResult(value, null, ProcessingResultType.EXPRESSION);
    }

    public static notInterpreted(value : string) : ProcessingResult {
        return new ProcessingResult(value, null, ProcessingResultType.NOT_INTERPRETED);
    }

    public static number(value : string) : ProcessingResult {
        if (value.length == 0 || value.charAt(0) == "." || value.charAt(value.length - 1) == ".") {
            throw new Error("Incorrect number: " + value);
        }
        return new ProcessingResult(value, null, ProcessingResultType.NUMBER);
    }

    public static operator(value : string) : ProcessingResult {
        if (this.OPERATORS.indexOf(value) > -1) {
            return new ProcessingResult(value, null, ProcessingResultType.OPERATOR);
        }
        throw new Error("Incorrect operator: " + value);
    }

    public static node(node : Node) : ProcessingResult {
        return new ProcessingResult(null, node, ProcessingResultType.NODE);
    }
}