const Formula = require('fparser');

const { IllegalArgumentException } = require('jsexception');

/**
 * 简单的单行算式求值模块
 *
 * 支持的功能：
 * - 多个数（正负、整数、小数）的加减乘除运算及指数运算（幂运算）、对数运算
 * - 括号改变运算优先级
 * - 三角函数
 * - 圆周率常数 π 和欧拉常数（自然常数）e
 *
 * 示例：
 * - 1 + 2 * 3 // =7
 * - (1+2)*(3+4) // = 21
 * - 2^10 + 2^4 // = 1024 + 16 // ^ 指数运算符号
 * - sqrt(4) + sqrt(9) // = 2 + 3 // sqrt 是开方函数
 * - 2 * PI * 3 // PI 是圆周率常数
 * - abs(-123) + abs(456) // = 123 + 456 // abs 是求绝对值函数
 * - round(3.14) + round(2.718) // = 3 + 3 // round 是求四舍五入函数
 * - trunc(3.14) + trunc(2.718) // = 3 + 2 // trunc 直接丢弃小数部分
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
        // 这里偷懒先直接使用 'fparser' 实现算式的计算，fparser 的功能完全涵盖并超越
        // 本模块的所需。部分功能是本模块不需要的，比如它支持一些不常用的函数，以及支持变量等。
        // 等以后有空再自己写吧，嗯嗯。
        try {
            return Formula.calc(arithmeticalExpression);
        } catch (e) {
            // 这里可能会抛出语法错误的异常
            throw new IllegalArgumentException('Syntax error.');
        }

    }

    /**
     * 测试一个字符串是否有效的（支持的）算式
     *
     * 这里仅对关键字作简单粗略的检测，没有对运算的规则以及关键字的格式作检测。
     * 比如对 1 ** 2, abstan(1) 等等都没检测出错误。
     *
     * @param {*} text
     * @returns
     */
    static isValid(text) {
        return /^(E|PI|abs|acos|asin|atan|cos|log|log2|log10|round|sin|sqrt|tan|trunc|[0-9.+\-*\/\^ \(\)])+$/.test(text)
    }
}

module.exports = InlineCalculator;