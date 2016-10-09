import assert from 'assert';
import actionTypes from '../../../src/actions/types';
import houseType from '../../../src/reducers/answers/house-type';

describe('answers.houseType reducer', () => {
    it('should return null by default', () => {
        const result = houseType(undefined, { type: 'foobar' });
        assert.strictEqual(result, null);
    });

    it('should return the house type for a SELECT_HOUSE_TYPE action', () => {
        const result = houseType(undefined, {
            type: actionTypes.SELECT_HOUSE_TYPE,
            payload: { houseType: 'apartment' },
        });
        assert.deepEqual(result, 'apartment');
    });

    it('should return the same state for all other action types', () => {
        Object.keys(actionTypes).forEach(key => {
            if (key !== 'SELECT_HOUSE_TYPE') {
                const result = houseType('whatever', { type: actionTypes[key] });
                assert.equal(result, 'whatever');
            }
        });
    });
});
