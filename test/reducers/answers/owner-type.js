import assert from 'assert';
import actionTypes from '../../../src/actions/types';
import ownerType from '../../../src/reducers/answers/owner-type';

describe('answers.ownerType reducer', () => {
    it('should return null by default', () => {
        const result = ownerType(undefined, { type: 'foobar' });
        assert.strictEqual(result, null);
    });

    it("should set the value from a SELECT_OWNER_TYPE action's payload", () => {
        const result = ownerType(undefined, {
            type: actionTypes.SELECT_OWNER_TYPE,
            payload: { ownerType: 'fizzbuzz' },
        });
        assert.equal(result, 'fizzbuzz');
    });

    it('should return the same state for all other action types', () => {
        Object.keys(actionTypes).forEach(key => {
            if (key !== 'SELECT_OWNER_TYPE') {
                const result = ownerType('foo bar baz', { type: actionTypes[key] });
                assert.equal(result, 'foo bar baz');
            }
        });
    });
});
