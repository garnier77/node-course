const {MongoClient, ObjectID }= require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true } ,(err, client)=> {
    if (err) {
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp')

    // db.collection('Todos').insertOne({
    //     text: "bitconnect",
    //     completed: false
    // }, (err, result) => {
    //    if(err) {
    //        return console.log('Unable to insert todo', err)
    //    }
    //    console.log(JSON.stringify(result.ops, undefined,2))
    // });

    db.collection('Users').insertOne({
        name: "Sexy Beef",
        age: 36,
        location: "Boston"
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert users, err')
        }
        console.log(JSON.stringify(result.ops, undefined, 2))
    });


    client.close();
});