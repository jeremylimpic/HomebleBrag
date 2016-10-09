import assert from 'assert';
import step from '../../src/reducers/step';
import actionTypes from '../../src/actions/types';

describe('step reducer', () => {
    it('should return 0 by default', () => {
        const result = step(undefined, { type: 'foobar' });
        assert.equal(result, 0);
    });

    it('should add 1 to itself when the NEXT_STEP action is dispatched', () => {
        const result = step(undefined, { type: actionTypes.NEXT_STEP });
        assert.equal(result, 1);

        const result2 = step(1, { type: actionTypes.NEXT_STEP });
        assert.equal(result2, 2);
    });

    it('should return the same state for all other action types', () => {
        Object.keys(actionTypes).forEach(key => {
            if (key !== 'NEXT_STEP' && key !== 'PREVIOUS_STEP' && key !== 'LOAD_STEP') {
                const result = step(3, { type: actionTypes[key] });
                assert.equal(result, 3);
            }
        });
    });
});
