import assert from 'assert';
import sinon from 'sinon';
import googleMapSearch from '../../../src/store/middleware/google-maps';

describe('google maps middleware', () => {
    it('should call the next action every time', () => {
        const next = sinon.spy();
        const action = { type: 'FOO_BAR' };

        googleMapSearch()(next)(action);
        assert.ok(next.calledWith(action));
    });
});
