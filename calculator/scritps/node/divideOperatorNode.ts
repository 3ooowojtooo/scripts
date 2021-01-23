import {BinaryOperatorNode} from "./binaryOperatorNode";
import {Node} from "./node";

export class DivideOperatorNode extends BinaryOperatorNode {

    constructor(leftArgument: Node, rightArgument: Node) {
        super(leftArgument, rightArgument);
    }

    protected applyOperator(leftArgument: Node, rightArgument: Node): number {
        return leftArgument.compute() / rightArgument.compute()
    }
}