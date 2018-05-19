let express = require('express');
let bodyParser = require('body-parser');


let {mongoose} = require('./db/mongoose');
let{Bet} = require('./models/bets');

let app = express();

app.use(bodyParser.json());

app.post('/bets', (req, res) =>{
   let bet = new Bet({
       team: req.body.team,
       betMade: req.body.betMade
   })
    bet.save().then((doc) =>{
      res.send(doc);
    }, (e) =>{

    });
});

app.listen(7777,() =>{

    console.log('Started on port 7777')
});




