import {Node} from "./node.js";

export class NumberNode extends Node {

    private readonly value : number;

    public constructor(val : string) {
        super();
        this.value = parseFloat(val)
    }

    compute(): number {
        return this.value;
    }
}