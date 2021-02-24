const fetch = require('node-fetch');
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/test_db', mongoClientCallback)

function mongoClientCallback(err, db) {
    if (err) return console.error(err)
    console.log('db is connected...')

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => {
            console.log('data received...')
            saveData(db, data)
        })
}

function saveData(db, data) {
    db.db().collection('test_users').insertMany(data, function (err, result) {
        if (err) return console.error(err)
        console.log('movies has been saved to db!')
    });
}

