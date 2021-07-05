const assert = require('assert/strict');

const { IllegalArgumentException } = require('jsexception');

const { InlineCalculator } = require('../index');

describe('InlineCalculator Test', () => {
    it('Test basic arithmetic', () => {
        let r1 = InlineCalculator.evaluate('1 + 2 * 3');
        assert.equal(r1, 7);

        let r2 = InlineCalculator.evaluate('-2 + 3');
        assert.equal(r2, 1);

        let r3 = InlineCalculator.evaluate('1.5 * 2');
        assert.equal(r3, 3);

        let r4 = InlineCalculator.evaluate('(1 + 2) * (3+4)');
        assert.equal(r4, 21);

        let r5 = InlineCalculator.evaluate('2^10 + 2^4');
        assert.equal(r5, 1024 + 16);

        let r6 = InlineCalculator.evaluate('4!');
        assert.equal(r6, 24);

        let r7 = InlineCalculator.evaluate('sqrt(4) + sqrt(9)');
        assert.equal(r7, 2 + 3);

        let r8 = InlineCalculator.evaluate('abs(-123) + abs(456)');
        assert.equal(r8, 123 + 456);

        let r9 = InlineCalculator.evaluate('round(3.14) + round(2.718)');
        assert.equal(r9, 3 + 3);

        let r10 = InlineCalculator.evaluate('trunc(3.14) + trunc(2.718)');
        assert.equal(r10, 3 + 2);

        let r11 = InlineCalculator.evaluate('log10(100) + log2(1024) + ln(E)');
        assert.equal(r11, 2 + 10 + 1);

        let r12 = InlineCalculator.evaluate('log(10,1000)');
        assert(3 - r12 < 0.01);
    });

    it('Test bitwise operators', ()=>{
        let r1 = InlineCalculator.evaluate('3 | 5'); //'0b0011 | 0b0101'
        assert.equal(r1, 0b0011 | 0b0101);

        let r2 = InlineCalculator.evaluate('3 & 5'); //'0b0011 & 0b0101'
        assert.equal(r2, 0b0011 & 0b0101);

        let r3 = InlineCalculator.evaluate('~3'); //'~0b0011'
        assert.equal(r3, ~0b0011);

        let r4 = InlineCalculator.evaluate('3 << 2'); //'0b0011 << 2'
        assert.equal(r4, 0b0011 << 2);

        let r5 = InlineCalculator.evaluate('5 >> 2'); //'0b0101 >> 2'
        assert.equal(r5, 0b0101 >> 2);
    });

    it('Test circular functions', () => {
        let r1 = InlineCalculator.evaluate('2 * PI * 3');
        assert((2 * Math.PI * 3) - r1 < 0.01);

        let r2 = InlineCalculator.evaluate('sin(PI/2) + cos(0)');
        assert(2 - r2 < 0.01);

        let r3 = InlineCalculator.evaluate('tan(PI/4)');
        assert(1 - r3 < 0.01);

        let r4 = InlineCalculator.evaluate('asin(1) + acos(1) + atan(1)');
        assert((Math.PI / 2 + 0 + Math.PI / 4) - r4 < 0.01);
    });

    it('Test invalid express', () => {
        try {
            InlineCalculator.evaluate('foo bar');
        } catch (e) {
            assert(e instanceof IllegalArgumentException)
        }
    });

});