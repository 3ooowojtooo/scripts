import {BinaryOperatorNode} from "./binaryOperatorNode.js";
import {Node} from "./node.js";

export class MinusOperatorNode extends BinaryOperatorNode {

    constructor(leftArgument: Node, rightArgument: Node) {
        super(leftArgument, rightArgument);
    }

    protected applyOperator(leftArgument: Node, rightArgument: Node): number {
        return leftArgument.compute() - rightArgument.compute()
    }
}