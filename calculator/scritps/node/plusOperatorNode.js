"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var binaryOperatorNode_1 = require("./binaryOperatorNode");
var PlusOperatorNode = /** @class */ (function (_super) {
    __extends(PlusOperatorNode, _super);
    function PlusOperatorNode(leftArgument, rightArgument) {
        return _super.call(this, leftArgument, rightArgument) || this;
    }
    PlusOperatorNode.prototype.applyOperator = function (leftArgument, rightArgument) {
        return leftArgument.compute() + rightArgument.compute();
    };
    return PlusOperatorNode;
}(binaryOperatorNode_1.BinaryOperatorNode));
exports.PlusOperatorNode = PlusOperatorNode;
