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
var node_1 = require("./node");
var BinaryOperatorNode = /** @class */ (function (_super) {
    __extends(BinaryOperatorNode, _super);
    function BinaryOperatorNode(leftArgument, rightArgument) {
        var _this = _super.call(this) || this;
        _this.leftArgument = leftArgument;
        _this.rightArgument = rightArgument;
        return _this;
    }
    BinaryOperatorNode.prototype.compute = function () {
        return this.applyOperator(this.leftArgument, this.rightArgument);
    };
    return BinaryOperatorNode;
}(node_1.Node));
exports.BinaryOperatorNode = BinaryOperatorNode;
