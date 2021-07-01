const fs = require('fs');
const path = require('path');
const jison = require("jison");

const { IllegalArgumentException } = require('jsexception');

// https://zaa.ch/jison/docs/

const bnfFilePath= path.join(__dirname, 'calculator.jison');
const bnf = fs.readFileSync(bnfFilePath, 'utf-8');
const parser = new jison.Parser(bnf);

const factorial = (n) => {
    let r = 1;
    for (let i = 1; i <= n; i++) {
        r = r * i;
    }
    return r;
};

parser.yy.functions = {
    factorial: factorial,

    log10: Math.log10,
    log2: Math.log2,
    ln: Math.log,
    log: (base, n) => { return Math.log(n) / Math.log(base); },
    abs: Math.abs,
    sqrt: Math.sqrt,
    round: Math.round,
    trunc: Math.trunc,
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
 * 支持的功能：
 * - 多个数（正负整数或小数，即 + - .）的加减乘除运算及指数运算（幂运算）
 *   （即 + - * / % ^），阶乘（!）
 * - 圆周率常数 π 和欧拉常数（自然常数）e，即 PI 和 E
 * - 括号改变运算优先级，即 "(" 和 ")"
 * - 对数运算（即 log10, log2, ln, log(m,n) ）
 * - 常用函数，比如 绝对值、开方、四舍五入、取整，即 abs，sqrt，round，trunc
 * - 三角函数， sin, cos, tan 以及 asin, acos, atan
 * - 变量，以字母开头的字符串，即 [a-zA-Z][a-zA-Z0-9_]*
 *
 * 示例：
 * - 1 + 2 * 3 // =7
 * - (1+2)*(3+4) // = 21
 * - 2^10 + 2^4 // = 1024 + 16 // ^ 指数运算符号
 * - 3! = 1 * 2 * 3 = 6   !阶乘
 * - sqrt(4) + sqrt(9) // = 2 + 3 // sqrt 是开方函数
 * - abs(-123) + abs(456) // = 123 + 456 // abs 是求绝对值函数
 * - round(3.14) + round(2.718) // = 3 + 3 // round 是求四舍五入函数
 * - trunc(3.14) + trunc(2.718) // = 3 + 2 // trunc 直接丢弃小数部分
 * - 2 * PI * 3 // PI 是圆周率常数
 * - log10(100) + log2(1024) + log(E) // = 2 + 10 + 1 // log10, log2, log 分别是
 *   以 10, 2 和 e 为底的对数运算，其中 log(x) 表示 ln(x)，但这里不支持 ln 这种写法。
 * - sin(PI/2) + cos(0) // = 1 + 1 // sin 和 cos 分别是求正弦，余弦函数。单位：弧度
 * - tan(PI/4) // = 1 // 正切，可使用 1/tan(x) 求得余切，这里不支持 cot(x) 这种写法。
 * - asin(1) + acos(1) + atan(1) // = PI/2 + 0 + PI/4 // asin, acos, atan 分别是
 *   反正弦、反余弦、反正切函数
 *
 * JavaScript 的 Math 对象支持的函数见这里：
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
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

InlineCalculator.evaluate('E');

module.exports = InlineCalculator;