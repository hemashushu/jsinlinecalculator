const fs = require('fs');
const path = require('path');
const jison = require("jison");

const { IllegalArgumentException } = require('jsexception');

// https://zaa.ch/jison/docs/

const bnfFilePath = path.join(__dirname, 'calculator.jison');
const bnf = fs.readFileSync(bnfFilePath, 'utf-8');
const parser = new jison.Parser(bnf);

// 计算阶乘
const factorial = (n) => {
    let r = 1;
    for (let i = 1; i <= n; i++) {
        r = r * i;
    }
    return r;
};

parser.yy.functions = {
    fact: factorial, // 阶乘

    // 大部分函数直接使用 JavaScript 的内置 Math 对象提供的功能，
    // Math 对象支持的函数见这里：
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math

    log10: Math.log10,
    log2: Math.log2,
    ln: Math.log,
    log: (base, n) => { return Math.log(n) / Math.log(base); },
    abs: Math.abs,
    sqrt: Math.sqrt,
    cbrt: Math.cbrt,
    round: Math.round,
    trunc: Math.trunc,
    ceil: Math.ceil,
    floor: Math.floor,
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    asin: Math.asin,
    acos: Math.acos,
    atan: Math.atan
};

/**
 * 简单的单行算式求值模块
 *
 * 支持的功能包括四则运算、常用函数、比较、逻辑、位运算等。
 *
 */
class InlineCalculator {

    /**
     * 计算算式的值
     *
     * @param {*} arithmeticalExpression
     * @returns 返回结算的结果，即一个数字，如果出错则
     *     抛出 IllegalArgumentException 异常。
     */
    static evaluate(arithmeticalExpression) {
        try {
            return parser.parse(arithmeticalExpression);
        } catch (e) {
            // 这里可能会抛出表达式语法错误的异常
            throw new IllegalArgumentException('Syntax error.');
        }

    }
}

module.exports = InlineCalculator;