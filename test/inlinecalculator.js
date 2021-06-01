const assert = require('assert/strict');

const { IllegalArgumentException } = require('jsexception');

const { InlineCalculator } = require('../index');

describe('InlineCalculator Test', () => {
    it('Test basic arithmetic', () => {
        let r1 = InlineCalculator.evaluate('1 + 2 * 3');
        assert.equal(r1, 7);

        let r2 = InlineCalculator.evaluate('(1 + 2) * (3+4)');
        assert.equal(r2, 21);

        let r3 = InlineCalculator.evaluate('2^10 + 2^4');
        assert.equal(r3, 1024 + 16);

        let r4 = InlineCalculator.evaluate('sqrt(4) + sqrt(9)');
        assert.equal(r4, 2+3);

        let r5 = InlineCalculator.evaluate('2 * PI * 3');
        assert((2 * Math.PI * 3) - r5 < 0.01);

        let r6 = InlineCalculator.evaluate('abs(-123) + abs(456)');
        assert.equal(r6, 123+456);

        let r7 = InlineCalculator.evaluate('round(3.14) + round(2.718)');
        assert.equal(r7, 3 + 3);

        let r8 = InlineCalculator.evaluate('trunc(3.14) + trunc(2.718)');
        assert.equal(r8, 3 + 2);

        let r9 = InlineCalculator.evaluate('log10(100) + log2(1024) + log(E)');
        assert.equal(r9, 2 + 10 + 1);
    });

    it('Test circular functions', ()=>{
        let r1 = InlineCalculator.evaluate('sin(PI/2) + cos(0)');
        assert(2 - r1 < 0.01);

        let r2 = InlineCalculator.evaluate('tan(PI/4)');
        assert(1 - r2 < 0.01);

        let r3 = InlineCalculator.evaluate('asin(1) + acos(1) + atan(1)');
        assert((Math.PI/2 + 0 + Math.PI/4) - r3 < 0.01);
    });

    it('Test invalid express', ()=>{
        try{
            InlineCalculator.evaluate('foo bar');
        }catch(e) {
            assert(e instanceof IllegalArgumentException)
        }
    });

    it('Test isValid()', ()=>{
        assert(InlineCalculator.isValid('1+2*3'));
        assert(!InlineCalculator.isValid('foo bar'));
    });
});