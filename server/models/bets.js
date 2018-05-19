let mongoose = require('mongoose');

let Bet = mongoose.model('Bets',{
    team: {
        type: String,
        required: true
    },
    betMade: {
        type: Boolean,
        required: true
    },
    betPostedOn: {
        type: Number
    }

});

// let newBet = new Bet({
//     team: "Celtics",
//     betMade: true,
//     betPostedOn: 5/19/2018
//
// });
//
// newBet.save().then((doc) => {
//
//     console.log('Saved bet', doc);
//
//
// }, (e) =>{
//     console.log('Unable to save bet')
//
// });

module.exports = {Bet};