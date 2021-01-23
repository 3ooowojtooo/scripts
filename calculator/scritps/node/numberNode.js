import { Node } from "./node.js";
export class NumberNode extends Node {
    constructor(val) {
        super();
        this.value = parseFloat(val);
    }
    compute() {
        return this.value;
    }
}
