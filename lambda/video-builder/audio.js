const foreach = require('lodash.foreach');

const audioFiles = {
    // 2 seconds
    ownerType: {
        person: 'owner-type/person.wav',
        couple: 'owner-type/couple.wav',
        family: 'owner-type/family.wav',
    },
    // 6 seconds
    houseType: {
        home: 'house-type/home.wav',
        apartment: 'house-type/apartment.wav',
        condo: 'house-type/condo.wav',
    },
    // 15 seconds
    ownOrRent: {
        'home-owner': 'own-or-rent/home-owner.wav',
        'home-renter': 'own-or-rent/home-renter.wav',
        'home-owners': 'own-or-rent/home-owner.wav',
    },
    // 31 seconds
    partyFavor: {
        food: 'party-favor/food.wav',
        drinks: 'party-favor/drinks.wav',
        conversation: 'party-favor/conversation.wav',
    },
    // 35 seconds
    congratsLevel: {
        1: 'congrats-level/1.wav',
        2: 'congrats-level/2.wav',
        3: 'congrats-level/3.wav',
    },
    // 43 seconds
    giftType: {
        gift: 'gift-type/gift.wav',
        'another-gift': 'gift-type/another-gift.wav',
        'different-gift': 'gift-type/different-gift.wav',
    },
    // 49 seconds
    excitementLevel: {
        1: 'excitement-level/1.wav',
        2: 'excitement-level/2.wav',
        3: 'excitement-level/3.wav',
    },
};

module.exports = options => {
    const result = {};
    foreach(options, (value, key) => {
        const answer = audioFiles[key];
        if (answer) {
            result[key] = `media/${answer[value]}`;
        }
    });
    return result;
};
