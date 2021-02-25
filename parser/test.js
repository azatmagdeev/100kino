const fetch = require('node-fetch');
const {MongoClient} = require('mongodb')

const mongoClient = new MongoClient(
    'mongodb://localhost:27017/',
    {useUnifiedTopology: true}
)

async function run() {
    try {
        await mongoClient.connect();
        const database = mongoClient.db('test_db');
        const collection = database.collection('test_collection');

        const sort = {rating_imdb: -1};
        const result = await collection.find().sort(sort).limit(1);
        await result.forEach(doc => console.log(doc.title,doc.rating_imdb));
        // await result.forEach(console.dir);
        // console.log(result);
    } finally {
        // Ensures that the client will close when you finish/error
        await mongoClient.close();
    }
}

run().catch(console.dir);

// MongoClient.connect(
//     'mongodb://localhost:27017/test_db',
//     mongoClientCallback
// )
//
// function mongoClientCallback(err, db) {
//     if (err) return console.error(err)
//     console.log('db is connected...')
//
//     // db.db().collection('log')
//     //     .insertOne({
//     //         date: new Date,
//     //         page: 0,
//     //         success: true
//     //     }, (err, result) => {
//     //         if(err)console.error('insert log data is fail...',err)
//     //     })
//
//     const log_collection = db.db().collection('log')
//
//     const result = await log_collection.find({page:0})
//     console.log(result)
// }