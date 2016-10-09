import assert from 'assert';
import _ from 'lodash';
import { isFSA } from 'flux-standard-action';
import actionTypes from '../../src/actions/types';
import {
    setAddress,
    setAddressAutocompleteNext,
    setAddressAutocompletePrev,
    submitForm,
    selectOwnerType,
    selectHouseType,
    selectOwnOrRent,
    selectPartyFavor,
    selectExcitementLevel,
    selectGiftType,
    selectCongratsLevel,
} from '../../src/actions/form-actions';

describe('form-actions', () => {
    describe('setAddress', () => {
        it('should return an action object with the expected shape', () => {
            const result = setAddress('foo bar baz');
            assert.deepEqual(result, {
                type: actionTypes.SET_ADDRESS,
                payload: {
                    address: 'foo bar baz',
                },
            });
            assert.ok(isFSA(result));
        });
    });

    describe('setAddressAutocompleteNext', () => {
        it('should return an action object with the expected shape', () => {
            const result = setAddressAutocompleteNext();
            assert.deepEqual(result, {
                type: actionTypes.AUTOFILL_SELECT_NEXT,
            });
            assert.ok(isFSA(result));
        });
    });

    describe('setAddressAutocompletePrev', () => {
        it('should return an action object with the expected shape', () => {
            const result = setAddressAutocompletePrev();
            assert.deepEqual(result, {
                type: actionTypes.AUTOFILL_SELECT_PREV,
            });
            assert.ok(isFSA(result));
        });
    });

    describe('submitForm', () => {
        it('should return an action object with the expected shape', () => {
            const address = '123 Main St.';
            const bedroomCount = 3;
            const houseStyle = 'craftsman';
            const ownerCount = 2;
            const prideLevel = 5.8;
            const result = submitForm({
                address,
                answers: {
                    bedroomCount,
                    houseStyle,
                    ownerCount,
                    prideLevel,
                },
            });

            const { payload, meta } = result;

            assert.equal(payload.address, address);
            assert.equal(payload.bedroomCount, bedroomCount);
            assert.equal(payload.houseStyle, houseStyle);
            assert.equal(payload.ownerCount, ownerCount);
            assert.equal(payload.prideLevel, prideLevel);
            assert.equal(payload.uuid.length, 36);
            assert.equal(payload.imageUrl, 'http://maps.googleapis.com/maps/api/streetview?size=550x300&location=123%20Main%20St.&key=AIzaSyC8GF4kvuZtT1UXDtkTb9TW4e2wVN60MVY');
            const { fetch } = meta;
            assert.deepEqual(_.keys(fetch), ['url', 'settings', 'actions']);
            assert.deepEqual(_.keys(fetch.settings), ['method', 'headers', 'mode', 'body']);

            assert.ok(isFSA(result));
        });
    });

    describe('selectOwnerType', () => {
        it('should return an action object with the expected shape', () => {
            const result = selectOwnerType('owners');
            assert.deepEqual(result, {
                type: actionTypes.SELECT_OWNER_TYPE,
                payload: { ownerType: 'owners' },
            });
            assert.ok(isFSA(result));
        });
    });

    describe('selectHouseType', () => {
        it('should return an action object with the expected shape', () => {
            const result = selectHouseType('apartment');
            assert.deepEqual(result, {
                type: actionTypes.SELECT_HOUSE_TYPE,
                payload: { houseType: 'apartment' },
            });
            assert.ok(isFSA(result));
        });
    });

    describe('selectOwnOrRent', () => {
        it('should return an action object with the expected shape', () => {
            const result = selectOwnOrRent('rent');
            assert.deepEqual(result, {
                type: actionTypes.SELECT_OWN_OR_RENT,
                payload: { ownOrRent: 'rent' },
            });
            assert.ok(isFSA(result));
        });
    });

    describe('selectPartyFavor', () => {
        it('should return an action object with the expected shape', () => {
            const result = selectPartyFavor('food');
            assert.deepEqual(result, {
                type: actionTypes.SELECT_PARTY_FAVOR,
                payload: { partyFavor: 'food' },
            });
            assert.ok(isFSA(result));
        });
    });

    describe('selectExcitementLevel', () => {
        it('should return an action object with the expected shape', () => {
            const result = selectExcitementLevel(1);
            assert.deepEqual(result, {
                type: actionTypes.SELECT_EXCITEMENT_LEVEL,
                payload: { excitementLevel: 1 },
            });
            assert.ok(isFSA(result));
        });
    });

    describe('selectGiftType', () => {
        it('should return an action object with the expected shape', () => {
            const result = selectGiftType('another-gift');
            assert.deepEqual(result, {
                type: actionTypes.SELECT_GIFT_TYPE,
                payload: { giftType: 'another-gift' },
            });
            assert.ok(isFSA(result));
        });
    });

    describe('selectCongratsLevel', () => {
        it('should return an action object with the expected shape', () => {
            const result = selectCongratsLevel(2);
            assert.deepEqual(result, {
                type: actionTypes.SELECT_CONGRATS_LEVEL,
                payload: { congratsLevel: 2 },
            });
            assert.ok(isFSA(result));
        });
    });
});
