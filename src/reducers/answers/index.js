import { combineReducers } from 'redux';
import ownerType from './owner-type';
import houseType from './house-type';
import ownOrRent from './own-or-rent';
import partyFavor from './party-favor';
import excitementLevel from './excitement-level';
import giftType from './gift-type';
import congratsLevel from './congrats-level';

export default combineReducers({
    ownerType,
    houseType,
    ownOrRent,
    partyFavor,
    excitementLevel,
    giftType,
    congratsLevel,
});
