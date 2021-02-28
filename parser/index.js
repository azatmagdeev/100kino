const fetch = require('node-fetch')
const {MongoClient} = require('mongodb')

const mongoClient = new MongoClient(
    'mongodb://localhost:27017/',
    {useUnifiedTopology: true}
)

let database = {}
let logCollection = {}
let usersCollection = {}
let pageNumber
let i = 1
let max_i = 1

async function run() {
    try {
        await mongoClient.connect()
        console.log('db connect...')
        database = mongoClient.db('test_db')
        logCollection = database.collection('log')
        usersCollection = database.collection('users')

        await getPageNumber(logCollection)

    } finally {
        console.log('db connect close!')
        await mongoClient.close();
    }
}

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
    pageNumber = await array[0].page
    return typeof pageNumber === 'number'
        ? await getMoviesFromApi()
        : new Error('cant get page number from log collection')
}

async function getMoviesFromApi() {
    console.log('pageNumber + i = ', pageNumber + i)
    const response = await fetch('https://qjsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data
        ? await saveData(data)
        : (
            await writeLog(pageNumber + i, false),
                new Error('cant fetch movies by api')
        )
}


async function saveData(data) {
    const result = await usersCollection.insertMany(data);
    console.log('result = ',result.result);
    if (await result.result.ok) {
        await writeLog(pageNumber + i, true)
        console.log('data successfully saved!')
        i++
        if (i > max_i) {
            console.log('END PROGRAMM')
            // await mongoClient.close()
            return false
        }
        await getMoviesFromApi()
    }
    return result
}

async function writeLog(page, success) {
    const log = await logCollection.insertOne({
        date: new Date,
        page: page,
        success: success
    })
    console.log('log.result = ',log.result);
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
    console.log(result)
    return result;
}

run().catch(console.dir);