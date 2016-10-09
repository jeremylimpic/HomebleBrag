import assert from 'assert';
import actionTypes from '../../../src/actions/types';
import ownOrRent from '../../../src/reducers/answers/own-or-rent';

describe('answers.ownOrRent reducer', () => {
    it('should return null by default', () => {
        const result = ownOrRent(undefined, { type: 'foobar' });
        assert.strictEqual(result, null);
    });

    it('should return the ownOrRent value for the SELECT_OWN_OR_RENT action', () => {
        const result = ownOrRent(undefined, {
            type: actionTypes.SELECT_OWN_OR_RENT,
            payload: { ownOrRent: 'rent' },
        });
        assert.strictEqual(result, 'rent');
    });

    it('should return the existing state for all other action types', () => {
        Object.keys(actionTypes).forEach(key => {
            if (key !== 'SELECT_OWN_OR_RENT') {
                const result = ownOrRent('rent maybe', { type: actionTypes[key] });
                assert.equal(result, 'rent maybe');
            }
        });
    });
});
