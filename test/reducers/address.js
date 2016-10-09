import assert from 'assert';
import addressReducer from '../../src/reducers/address';
import actionTypes from '../../src/actions/types';

describe('address reducer', () => {
    it('should set the state to null by default', () => {
        const result = addressReducer(undefined, { type: 'asdlf' });
        assert.strictEqual(result, null);
    });

    it('should set the state to an address for the SET_ADDRESS action', () => {
        const result = addressReducer(undefined, {
            type: actionTypes.SET_ADDRESS,
            payload: { address: '123 main st' },
        });
        assert.strictEqual(result, '123 main st');
    });

    it('should return the same state for all other action types', () => {
        Object.keys(actionTypes).forEach(key => {
            if (key !== 'SET_ADDRESS') {
                const result = addressReducer('382 mission st', { type: actionTypes[key] });
                assert.equal(result, '382 mission st');
            }
        });
    });
});
