const {mongoose} = require('./../server/db/mongoose');
const {ObjectId }= require('mongodb');

const {Bet} = require('./../server/models/bets');

// Bet.remove({}).then((result)=>{
//    console.log(result);
// });

//Bet.findOneAndRemove
//Bet.findByIdAndRemove

Bet.findByIdAndRemove('5b01f164c0b40531355e05a2').then((bet) =>{
console.log(bet);
});