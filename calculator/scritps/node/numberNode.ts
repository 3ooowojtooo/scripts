import {Node} from "./node";

export class NumberNode extends Node {

    private readonly value : number;

    public constructor(val : string) {
        super();
        this.value = parseFloat(val)
    }

    compute(): number {
        return 0;
    }
}