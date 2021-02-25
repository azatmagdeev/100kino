const fetch = require('node-fetch')
const {MongoClient} = require('mongodb')

const mongoClient = new MongoClient(
    'mongodb://localhost:27017/',
    {useUnifiedTopology: true}
)

async function run() {
    try {
        await mongoClient.connect()
        const database = mongoClient.db('test_db')
        const logCollection = database.collection('log')

        let pageNumber = await getPageNumber(logCollection)
        pageNumber++

        await getMoviesFromApi(pageNumber)





    } finally {
        await mongoClient.close();
    }
}

run().catch(console.dir);

/**
 * get number of last parsed page
 * @param collection 'log'
 * @returns {Promise<number|*|boolean>}
 */
async function getPageNumber(collection) {

    let array = await query(collection,
        {success: true}, {page: -1}, 1
    )

    if (array.length === 0) array = await query(collection,
        {success: false}, {page: -1}, 1
    )

    return array[0].page
        ? array[0].page
        : new Error('cant get page number from log collection')
}

/**
 * basic query to Array
 * @param collection
 * @param query
 * @param sort
 * @param limit
 * @returns {Promise<[]>}
 */
async function query(collection, query, sort, limit) {
    const result = [];
    const cursor = await collection
        .find(query).sort(sort).limit(limit);
    await cursor.forEach(o => result.push(o));
    return result
}

function getMoviesFromApi(page){

}


// MongoClient.connect('mongodb://localhost:27017/test_db', mongoClientCallback)
//
// function mongoClientCallback(err, db) {
//     if (err) return console.error(err)
//     console.log('db is connected...')
//
//     fetch('https://jsonplaceholder.typicode.com/users')
//         .then(res => res.json())
//         .then(data => {
//             console.log('data received...')
//             saveData(db, data)
//         })
// }
//
// function saveData(db, data) {
//     db.db().collection('test_users').insertMany(data, function (err, result) {
//         if (err) return console.error(err)
//         console.log('movies has been saved to db!')
//     });
// }

