# JSInlineCalculator

A simple in-line arithmetic evaluation module.

一个简单的行内算式求值模块。

## 支持的功能

- 正负整数或小数，如： `3`, `-6`, `3.14`, `-0.618`；
- 加减乘除余运算（即 `+ - * / %`）；
- 指数运算（幂运算），如： `3^2 = 9`, `2^10 = 1024`；
- 阶乘，如 `3! = 6`, `4! = 24`；
- 括号改变运算优先级，如： `(1+2) * 3 = 9`；
- 对数运算，如：`log10(100) = 2`, `log2(1024) = 10`, `ln(E) = 1`, `log(10,100) = 2`，其中 `log(base, n)` 表示以 base 为底的 n 的对数；
- 常用函数：绝对值 `abs`、开方 `sqrt`、四舍五入 `round`、取整 `trunc`，如：`abs(-12) = 12`, `sqrt(4) = 2`, `round(3.14) = 3`, `round(2.718) = 3`, `trunc(3.14) = 3`, `trunc(2.718) = 2`；
- 圆周率常数 π（即 PI ）和欧拉常数/自然常数 e（即 E），如 `2 * PI = 6.28`；
- 三角函数正弦 `sin`, 余弦 `cos`, 正切 `tan` 以及反正弦 `asin`, 反余弦 `acos`, 反正切 `atan`， 它们的参数的单位是 "弧度"。如：`sin(PI/2) = 1`, `cos(0) = 1`, `tan(PI/4) = 1`, `asin(1) = PI/2`, `acos(1) = 0`, `atan(1) = PI/4`。
- 位运算，如： 位或 `3 | 5`，位与 `3 & 5`，位取反 `~3`，位左移 `3 << 2`，位算术右移 `5 >> 2`。
