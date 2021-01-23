"use strict";
exports.__esModule = true;
var processingResultType_1 = require("./processingResultType");
var ProcessingResult = /** @class */ (function () {
    function ProcessingResult(value, node, type) {
        this.value = value;
        this.node = node;
        this.type = type;
    }
    ProcessingResult.prototype.isExpression = function () {
        return this.type == processingResultType_1.ProcessingResultType.EXPRESSION;
    };
    ProcessingResult.prototype.isNotInterpreted = function () {
        return this.type == processingResultType_1.ProcessingResultType.NOT_INTERPRETED;
    };
    ProcessingResult.prototype.isNumber = function () {
        return this.type == processingResultType_1.ProcessingResultType.NUMBER;
    };
    ProcessingResult.prototype.isOperator = function () {
        return this.type == processingResultType_1.ProcessingResultType.OPERATOR;
    };
    ProcessingResult.prototype.isNode = function () {
        return this.type == processingResultType_1.ProcessingResultType.NODE;
    };
    ProcessingResult.prototype.getValue = function () {
        return this.value;
    };
    ProcessingResult.prototype.getNode = function () {
        return this.node;
    };
    ProcessingResult.expression = function (value) {
        return new ProcessingResult(value, null, processingResultType_1.ProcessingResultType.EXPRESSION);
    };
    ProcessingResult.notInterpreted = function (value) {
        return new ProcessingResult(value, null, processingResultType_1.ProcessingResultType.NOT_INTERPRETED);
    };
    ProcessingResult.number = function (value) {
        if (value.length == 0 || value.charAt(0) == "." || value.charAt(value.length - 1) == ".") {
            return new ProcessingResult(value, null, processingResultType_1.ProcessingResultType.NUMBER);
        }
        throw new Error("Incorrect number: " + value);
    };
    ProcessingResult.operator = function (value) {
        if (this.OPERATORS.indexOf(value) > -1) {
            return new ProcessingResult(value, null, processingResultType_1.ProcessingResultType.OPERATOR);
        }
        throw new Error("Incorrect operator: " + value);
    };
    ProcessingResult.node = function (node) {
        return new ProcessingResult(null, node, processingResultType_1.ProcessingResultType.NODE);
    };
    ProcessingResult.OPERATORS = ["+", "-", "*", "/"];
    return ProcessingResult;
}());
exports.ProcessingResult = ProcessingResult;
