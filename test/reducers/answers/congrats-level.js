import assert from 'assert';
import actionTypes from '../../../src/actions/types';
import congratsLevel from '../../../src/reducers/answers/congrats-level';

describe('answers.congratsLevel reducer', () => {
    it('should return null by default', () => {
        const result = congratsLevel(undefined, { type: 'foobar' });
        assert.strictEqual(result, null);
    });

    it('should return partFavor payload for the SELECT_GIFT_TYPE action', () => {
        const result = congratsLevel(undefined, {
            type: actionTypes.SELECT_CONGRATS_LEVEL,
            payload: { congratsLevel: 3 },
        });
        assert.strictEqual(result, 3);
    });

    it('should return the same state for all other action types', () => {
        Object.keys(actionTypes).forEach(key => {
            if (key !== 'SELECT_CONGRATS_LEVEL') {
                const result = congratsLevel('foo bar baz', { type: actionTypes[key] });
                assert.equal(result, 'foo bar baz');
            }
        });
    });
});
