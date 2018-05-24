require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID}= require('mongodb');

let {mongoose} = require('./db/mongoose');
let{Bet} = require('./models/bets');
let{User} = require('./models/user');
let {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/bets', (req, res) =>{

   let bet = new Bet({
       team: req.body.team,
       betMade: req.body.betMade
   });
    bet.save().then((doc) =>{
      res.send(doc);
    }, (e) =>{
    res.status(400).send(e);
  });
});

app.get('/bets', (req, res) => {
   Bet.find().then((bets) => {
    res.send({bets});
  }, (e) => {
    res.status(400).send(e);
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
});

app.delete('/bets/:id', (req, res) => {
  let id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

  Bet.findByIdAndRemove(id).then((bet) => {
    if (!bet) {
        return res.status(404).send();
    }

    res.send({bet});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/bets/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['team']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Bet.findByIdAndUpdate(id, {$set: body}, {new: true}).then((bet) => {
    if (!bet) {
      return res.status(404).send();
    }

    res.send({bet});
 }).catch((e) => {
        res.status(400).send();
  })
    });

app.post('/users', (req, res)=>{
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);

    user.save().then(() => {
    return user.generateAuthToken();
    }).then((token) =>{
    res.header('x-auth', token).send(user);
        }).catch((e) =>{
        res.status(400).send(e);
    })

});
app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send({users});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});





app.listen(port,() =>{
  console.log(`Started up at port ${port}`);
});

module.exports = {app};


