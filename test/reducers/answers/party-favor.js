import assert from 'assert';
import actionTypes from '../../../src/actions/types';
import partyFavor from '../../../src/reducers/answers/party-favor';

describe('answers.partyFavor reducer', () => {
    it('should return null by default', () => {
        const result = partyFavor(undefined, { type: 'foobar' });
        assert.strictEqual(result, null);
    });

    it('should return partFavor payload for the SELECT_PARTY_FAVOR action', () => {
        const result = partyFavor(undefined, {
            type: actionTypes.SELECT_PARTY_FAVOR,
            payload: { partyFavor: 'food' },
        });
        assert.strictEqual(result, 'food');
    });

    it('should return the same state for all other action types', () => {
        Object.keys(actionTypes).forEach(key => {
            if (key !== 'SELECT_PARTY_FAVOR') {
                const result = partyFavor('foo bar baz', { type: actionTypes[key] });
                assert.equal(result, 'foo bar baz');
            }
        });
    });
});
