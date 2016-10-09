import assert from 'assert';
import actionTypes from '../../../src/actions/types';
import giftType from '../../../src/reducers/answers/gift-type';

describe('answers.giftType reducer', () => {
    it('should return null by default', () => {
        const result = giftType(undefined, { type: 'foobar' });
        assert.strictEqual(result, null);
    });

    it('should return partFavor payload for the SELECT_GIFT_TYPE action', () => {
        const result = giftType(undefined, {
            type: actionTypes.SELECT_GIFT_TYPE,
            payload: { giftType: 'another-gift' },
        });
        assert.strictEqual(result, 'another-gift');
    });

    it('should return the same state for all other action types', () => {
        Object.keys(actionTypes).forEach(key => {
            if (key !== 'SELECT_GIFT_TYPE') {
                const result = giftType('foo bar baz', { type: actionTypes[key] });
                assert.equal(result, 'foo bar baz');
            }
        });
    });
});
