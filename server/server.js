let express = require('express');
let bodyParser = require('body-parser');
const {ObjectID}= require('mongodb');

let {mongoose} = require('./db/mongoose');
let{Bet} = require('./models/bets');

let app = express();
const port = process.env.PORT || 7777;

app.use(bodyParser.json());

app.post('/bets', (req, res) =>{
   let bet = new Bet({
       team: req.body.team,
       betMade: req.body.betMade
   });
    bet.save().then((doc) =>{
      res.send(doc);
    }, (e) =>{

    });
});

app.get('/bets/:id', (req, res) => {
  let id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

     Bet.findById(id).then((bet) =>{
         if (!bet) {
             return res.status(404).send();
         }
         res.send({bet});
    }).catch((e) =>{
        res.status(400).send();
     });



   // }, (e) =>{
   //     res.status(400).send(e)
   // })
});

app.get('/bets', (req, res) =>{
    Bet.find().then((bets) =>{
        res.send({bets});
    },(e) => {

        res.status(400).send(e);
    });

});

app.listen(port,() =>{

    console.log('Started on port 7777')
});

module.exports = {app};


