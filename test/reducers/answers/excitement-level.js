import assert from 'assert';
import actionTypes from '../../../src/actions/types';
import excitementLevel from '../../../src/reducers/answers/excitement-level';

describe('answers.excitementLevel reducer', () => {
    it('should return null as its default state', () => {
        const result = excitementLevel(undefined, { type: 'foobar' });
        assert.strictEqual(result, null);
    });

    it('should return partFavor payload for the SELECT_EXCITEMENT_LEVEL action', () => {
        const result = excitementLevel(undefined, {
            type: actionTypes.SELECT_EXCITEMENT_LEVEL,
            payload: { excitementLevel: 1 },
        });
        assert.strictEqual(result, 1);
    });

    it('should return the same state for all other action types', () => {
        Object.keys(actionTypes).forEach(key => {
            if (key !== 'SELECT_EXCITEMENT_LEVEL') {
                const result = excitementLevel('foo bar baz', { type: actionTypes[key] });
                assert.equal(result, 'foo bar baz');
            }
        });
    });
});
