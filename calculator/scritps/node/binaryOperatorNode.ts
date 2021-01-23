import {Node} from "./node";

export abstract class BinaryOperatorNode extends Node {

    private readonly leftArgument: Node;
    private readonly rightArgument: Node;

    protected constructor(leftArgument: Node, rightArgument: Node) {
        super();
        this.leftArgument = leftArgument;
        this.rightArgument = rightArgument;
    }


    compute(): number {
        return this.applyOperator(this.leftArgument, this.rightArgument);
    }

    protected abstract applyOperator(leftArgument: Node, rightArgument: Node) : number;

}
