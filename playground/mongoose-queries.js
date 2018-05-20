const {mongoose} = require('./../server/db/mongoose');
const {ObjectId }= require('mongodb');

const {Bet} = require('./../server/models/bets');

let id = '5b019bcdf025f116240dd527';

if(!ObjectId.isValid(id)) {
    console.log('ID not valid');
}

Bet.find({
    _id: id
}).then((bets) =>{
    console.log('Bets', bets)
});

Bet.findOne({
    _id: id
}).then((bet) =>{
    console.log('Bets', bet)
});

Bet.findById(id).then((bet) =>{
  if(!bet) {
      return console.log('Id not found');
  }
console.log('Bets By Id', bet)
}).catch((e) => console.log(e));
