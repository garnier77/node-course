const {MongoClient, ObjectID }= require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true } ,(err, client)=> {
    if (err) {
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

     //findOneAndUpdate

    db.collection('Users').findOneAndUpdate({name: 'juan'},

        {
            $set:{
                mlbBets: "Boston Red Sox",
                moneyLine: -186,
                nbaBets: "Boston Celtics",
                spread: +6.5
            }
        }, {

           returnOriginal: false

    }).then((result)=>{
        console.log(result);
    });

      client.close();


});