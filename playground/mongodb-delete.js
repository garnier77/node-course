const {MongoClient, ObjectID }= require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true } ,(err, client)=> {
    if (err) {
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

     //deleteMany
    // db.collection('Users').deleteMany({name: 'Sexy Beef'}).then((result) =>{
    //   console.log(result);
    //
    // })
         //deleteOne
     // db.collection('Users').deleteOne({name: 'juan'}).then((result) => {
     //     console.log(result);
     // });

    //findOneAndDelete

     db.collection('Users').findOneAndDelete({name: 'juan'}).then((result) => {
         console.log(result);
     });




});

