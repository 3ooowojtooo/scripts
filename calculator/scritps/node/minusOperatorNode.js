import { BinaryOperatorNode } from "./binaryOperatorNode.js";
export class MinusOperatorNode extends BinaryOperatorNode {
    constructor(leftArgument, rightArgument) {
        super(leftArgument, rightArgument);
    }
    applyOperator(leftArgument, rightArgument) {
        return leftArgument.compute() - rightArgument.compute();
    }
}
