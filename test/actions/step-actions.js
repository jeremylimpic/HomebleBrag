import assert from 'assert';
import { isFSA } from 'flux-standard-action';
import actionTypes from '../../src/actions/types';
import { nextStep, showStreetviewPreview } from '../../src/actions/step-actions';

describe('step-actions', () => {
    describe('nextStep', () => {
        it('should return an action object with the expected shape', () => {
            const result = nextStep();
            assert.deepEqual(result, {
                type: actionTypes.NEXT_STEP,
            });
            assert.ok(isFSA(result));
        });
    });

    describe('showStreetviewPreview', () => {
        it('should return an action object with the expected shape', () => {
            const result = showStreetviewPreview();
            assert.deepEqual(result, {
                type: actionTypes.SHOW_STREETVIEW_PREVIEW,
            });
            assert.ok(isFSA(result));
        });
    });
});
