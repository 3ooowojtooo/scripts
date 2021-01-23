"use strict";
exports.__esModule = true;
var processingResult_1 = require("./processingResult");
var numberNode_1 = require("../node/numberNode");
var multiplyOperatorNode_1 = require("../node/multiplyOperatorNode");
var divideOperatorNode_1 = require("../node/divideOperatorNode");
var plusOperatorNode_1 = require("../node/plusOperatorNode");
var minusOperatorNode_1 = require("../node/minusOperatorNode");
var Parser = /** @class */ (function () {
    function Parser(expression) {
        this.expression = expression.replace(" ", "");
    }
    Parser.prototype.parse = function () {
        return Parser.makeNode(this.expression).compute();
    };
    Parser.makeNode = function (expression) {
        var brackets = Parser.makeBrackets(expression);
        var bracketsAndNumbers = Parser.makeNumbers(brackets);
        var bracketsAndAllNumbers = Parser.makeNegativeNumbers(bracketsAndNumbers);
        var operators = Parser.makeOperators(bracketsAndAllNumbers);
        Parser.validate(operators);
        return Parser.buildNode(operators);
    };
    Parser.makeBrackets = function (expression) {
        var results = [];
        var builder = "";
        var expressionInProgress = false;
        var expressionDepth = 1;
        for (var i = 0; i < expression.length; i++) {
            var currentChar = expression.charAt(i);
            if (expressionInProgress) {
                if (currentChar == Parser.OPEN_BRACKET) {
                    expressionDepth++;
                    builder = builder + currentChar;
                }
                else if (currentChar == Parser.CLOSE_BRACKET) {
                    if (expressionDepth == 1) {
                        if (builder.length > 0) {
                            results.push(processingResult_1.ProcessingResult.expression(builder));
                            builder = "";
                        }
                        expressionInProgress = false;
                    }
                    else {
                        expressionDepth--;
                        builder = builder + currentChar;
                    }
                }
                else {
                    builder = builder + currentChar;
                }
            }
            else {
                if (currentChar == Parser.OPEN_BRACKET) {
                    if (builder.length > 0) {
                        results.push(processingResult_1.ProcessingResult.notInterpreted(builder));
                        builder = "";
                    }
                    expressionInProgress = true;
                }
                else {
                    builder = builder + currentChar;
                }
            }
        }
        if (expressionDepth != 1 || expressionInProgress) {
            throw new Error("Bracket not closed");
        }
        if (builder.length > 0) {
            results.push(processingResult_1.ProcessingResult.notInterpreted(builder));
        }
        return results;
    };
    Parser.makeNumbers = function (results) {
        var numbers = [];
        results.forEach(function (val) {
            var split = Parser.splitIntoNumbers(val);
            split.forEach(function (splitVal) { return numbers.push(splitVal); });
        });
        return numbers;
    };
    Parser.splitIntoNumbers = function (item) {
        if (item.isExpression()) {
            return [item];
        }
        var value = item.getValue();
        var results = [];
        var builder = "";
        var numberInProgress = false;
        for (var i = 0; i < value.length; i++) {
            var currentChar = value.charAt(i);
            if (numberInProgress) {
                if (Parser.NUMBER_CHARACTERS.indexOf(currentChar) < 0) {
                    numberInProgress = false;
                    results.push(processingResult_1.ProcessingResult.number(builder));
                    builder = "";
                }
            }
            else {
                if (Parser.NUMBER_CHARACTERS.indexOf(currentChar) > -1) {
                    numberInProgress = true;
                    results.push(processingResult_1.ProcessingResult.notInterpreted(builder));
                    builder = "";
                }
            }
            builder = builder + currentChar;
        }
        if (builder.length > 0) {
            if (numberInProgress) {
                results.push(processingResult_1.ProcessingResult.number(builder));
            }
            else {
                results.push(processingResult_1.ProcessingResult.notInterpreted(builder));
            }
        }
        return results;
    };
    Parser.makeNegativeNumbers = function (items) {
        if (items.length < 2) {
            return items;
        }
        var firstResult = items[0];
        var secondResult = items[1];
        if (firstResult.getValue() == "-" && secondResult.isNumber()) {
            var results = [];
            var negativeNumber = processingResult_1.ProcessingResult.number("-" + secondResult.getValue());
            results.push(negativeNumber);
            for (var i = 2; i < items.length; i++) {
                results.push(items[i]);
            }
            return results;
        }
        return items;
    };
    Parser.makeOperators = function (results) {
        var operators = [];
        results.forEach(function (val) {
            var split = Parser.splitIntoOperators(val);
            split.forEach(function (splitVal) { return operators.push(splitVal); });
        });
        return operators;
    };
    Parser.splitIntoOperators = function (item) {
        if (item.isNotInterpreted()) {
            var results = [];
            var value = item.getValue();
            for (var i = 0; i < value.length; i++) {
                results.push(processingResult_1.ProcessingResult.operator(value.charAt(i)));
            }
            return results;
        }
        return [item];
    };
    Parser.validate = function (results) {
        if (results.length == 0) {
            throw new Error("Empty expression");
        }
        if (results.length % 2 == 0) {
            throw new Error("Some operator does not have arguments");
        }
        for (var i = 0; i < results.length; i++) {
            var current = results[i];
            if (i % 2 == 0 && !(current.isExpression() || current.isNumber())) {
                throw new Error("Incorrect expressions and operators order");
            }
            else if (i % 2 == 1 && !current.isOperator()) {
                throw new Error("Incorrect expressions and operators order");
            }
            else if (current.isNotInterpreted()) {
                throw new Error("Incorrect characters in expression");
            }
        }
    };
    Parser.buildNode = function (results) {
        if (results.length == 0) {
            throw new Error("Cannot build Node from empty results");
        }
        else if (results.length == 1) {
            return Parser.mapToNode(results[0]);
        }
        else {
            var first = Parser.processResultsForOperator(results, "*");
            var second = Parser.processResultsForOperator(first, "/");
            var third = Parser.processResultsForOperator(second, "+");
            var fourth = Parser.processResultsForOperator(third, "-");
            if (fourth.length == 1 && fourth[0].isNode()) {
                return fourth[0].getNode();
            }
            else {
                throw new Error("Final processing result is incorrect");
            }
        }
    };
    Parser.processResultsForOperator = function (elements, operator) {
        if (elements.length == 1) {
            return elements;
        }
        var index = 1;
        while (index < elements.length) {
            var operatorResult = elements[index];
            if (operatorResult.getValue() != operator) {
                index += 2;
            }
            else {
                var leftIndex = index - 1;
                var rightIndex = index + 2;
                var processedOperator = Parser.mapToOperatorNodeResult(elements[leftIndex], operatorResult, elements[rightIndex]);
                var processedList = Parser.mapListFromTo(elements, leftIndex, rightIndex, processedOperator);
                return Parser.processResultsForOperator(processedList, operator);
            }
        }
    };
    Parser.mapListFromTo = function (elements, leftIndex, rightIndex, between) {
        var result = [];
        if (leftIndex > 0) {
            for (var i = 0; i < leftIndex; i++) {
                result.push(elements[i]);
            }
        }
        result.push(between);
        if (rightIndex < (elements.length - 1)) {
            for (var i = (rightIndex + 1); i < elements.length; i++) {
                result.push(elements[i]);
            }
        }
        return result;
    };
    Parser.mapToOperatorNodeResult = function (left, operator, right) {
        if (!operator.isOperator() || left.isNotInterpreted() || left.isOperator() || right.isNotInterpreted() || right.isOperator()) {
            throw new Error("Cannot create operator");
        }
        var leftNode = Parser.mapToNode(left);
        var rightNode = Parser.mapToNode(right);
        var operatorNode = Parser.makeBinaryOperatorNode(leftNode, operator.getValue(), rightNode);
        return processingResult_1.ProcessingResult.node(operatorNode);
    };
    Parser.mapToNode = function (result) {
        if (result.isNode()) {
            return result.getNode();
        }
        else if (result.isNumber()) {
            return new numberNode_1.NumberNode(result.getValue());
        }
        else if (result.isExpression()) {
            return Parser.makeNode(result.getValue());
        }
        else {
            throw new Error("Cannot create node result");
        }
    };
    Parser.makeBinaryOperatorNode = function (left, operator, right) {
        switch (operator) {
            case "*":
                return new multiplyOperatorNode_1.MultiplyOperatorNode(left, right);
            case "/":
                return new divideOperatorNode_1.DivideOperatorNode(left, right);
            case "+":
                return new plusOperatorNode_1.PlusOperatorNode(left, right);
            case "-":
                return new minusOperatorNode_1.MinusOperatorNode(left, right);
            default:
                throw new Error(operator + " is not valid operator character");
        }
    };
    Parser.OPEN_BRACKET = "(";
    Parser.CLOSE_BRACKET = ")";
    Parser.NUMBER_CHARACTERS = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return Parser;
}());
exports.Parser = Parser;
