import assert from 'assert';
import showStreetviewPreview from '../../src/reducers/show-streetview-preview';
import actionTypes from '../../src/actions/types';

describe('showStreetviewPreview reducer', () => {
    it('should set the state to false by default', () => {
        const result = showStreetviewPreview(undefined, { type: 'fizzbuzz' });
        assert.strictEqual(result, false);
    });

    it('should return true for the SHOW_STREETVIEW_PREVIEW action', () => {
        const result = showStreetviewPreview(undefined, {
            type: actionTypes.SHOW_STREETVIEW_PREVIEW,
        });
        assert.strictEqual(result, true);
    });

    it('should return false for the NEXT_STEP action', () => {
        const result = showStreetviewPreview(true, {
            type: actionTypes.NEXT_STEP,
        });
        assert.strictEqual(result, false);
    });

    it('should return false for the CHOOSE_ADDRESS action', () => {
        const result = showStreetviewPreview(true, {
            type: actionTypes.CHOOSE_ADDRESS,
        });
        assert.strictEqual(result, false);
    });

    it('should return the same state for all other action types', () => {
        Object.keys(actionTypes).forEach(key => {
            if (key !== 'SHOW_STREETVIEW_PREVIEW' && key !== 'NEXT_STEP' && key !== 'CHOOSE_ADDRESS') {
                const result = showStreetviewPreview('someval', { type: actionTypes[key] });
                assert.equal(result, 'someval');
            }
        });
    });
});
