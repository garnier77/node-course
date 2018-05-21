const expect= require('expect');
const request = require('supertest');
const {ObjectID}= require('mongodb');

const {app } = require('./../server');
const{Bet} = require('./../models/bets');

const bets = [{
    _id: new ObjectID(),
  team: 'San Diego Padres'
}, {
  _id: new ObjectID(),
    team: "Atlanta Braves"
}];


// const bets = [{
//   team: 'Celtics'
// },{
//   team: 'Red Sox'
// }];

beforeEach((done) => {
  Bet.remove({}).then(() => {
    return Bet.insertMany(bets);
    }).then(() => done());
});

describe('POST /bets', () => {
   it('should create a new bet', (done)=>{
    let team = 'Red Sox';

       request(app)
      .post('/bets')
      .send({team})
           .expect(200)
           .expect((res) =>{
        expect(res.body.team).toBe(team);
           })
           .end((err, res) =>{
            if(err){
                return done(err);
            }

        Bet.find({team}).then((bets) => {
          expect(bets.length).toBe(1);
          expect(bets[0].team).toBe(team);
                done();
            }).catch((e) =>  done(e));
      });
});

  it('should not create bet with an invalid body data', (done) => {
    request(app)
      .post('/bets')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Bet.find().then((bets) => {
          expect(bets.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /bets', () => {
  it('should get all bets', (done) => {
        request(app)
      .get('/bets')
            .expect(200)
            .expect((res) => {
        expect(res.body.bets.length).toBe(2);
            })
            .end(done);
  });
});

describe ('Get /bets/:id', () =>{
    it('should return bet doc', (done) =>{
        request(app)
            .get(`/bets/${bets[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) =>{
                expect(res.body.bet.team).toBe(bets[0].team);
            })
            .end(done);
  });

  it('should return 404 if bet not found', (done) => {
    let hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/bets/123abc')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /bets/:id', () => {
  it('should remove a bet', (done) => {
    let hexId = bets[1]._id.toString();

        request(app)
      .delete(`/bets/${hexId}`)
            .expect(200)
            .expect((res) => {
        expect(res.body.bet._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Bet.findById(hexId).then((bet) => {
                    expect(bet).toNotExist();
                    done();

                }).catch((e) => done(e));

            });
});

  it('should return 404 if bet not found', (done) => {
    let hexId = new ObjectID().toString();

    request(app)
      .delete(`/bets/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/bets/123abc')
      .expect(404)
      .end(done);
  });
});
