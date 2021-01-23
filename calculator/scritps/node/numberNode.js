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
var NumberNode = /** @class */ (function (_super) {
    __extends(NumberNode, _super);
    function NumberNode(val) {
        var _this = _super.call(this) || this;
        _this.value = parseFloat(val);
        return _this;
    }
    NumberNode.prototype.compute = function () {
        return 0;
    };
    return NumberNode;
}(node_1.Node));
exports.NumberNode = NumberNode;
