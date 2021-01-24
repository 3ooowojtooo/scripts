import { Node } from "./node.js";
export class BinaryOperatorNode extends Node {
    constructor(leftArgument, rightArgument) {
        super();
        this.leftArgument = leftArgument;
        this.rightArgument = rightArgument;
    }
    compute() {
        return this.applyOperator(this.leftArgument, this.rightArgument);
    }
}
