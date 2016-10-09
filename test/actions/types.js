import assert from 'assert';
import actionTypes from '../../src/actions/types';

describe('action types', () => {
    it('all type constant keys and values match', () => {
        Object.keys(actionTypes)
            .forEach(type => assert.equal(type, actionTypes[type]));
    });
});
