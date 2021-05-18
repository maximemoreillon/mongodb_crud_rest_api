const mongodb = require('mongodb')
const dotenv = require('dotenv')

// Load .env file content as environment variables
dotenv.config()

const db_url = process.env.MONGODB_URL || 'mongodb://mongodb:27017'
const db_name = process.env.MONGODB_DB_NAME || 'mongodb_crud_rest_api'

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

let db = undefined

const MongoClient = mongodb.MongoClient

MongoClient.connect(db_url, options)
.then(client => {
  console.log(`[MongoDB] Connected`)
  db = client.db(db_name)
})
.catch(console.log)

exports.url = db_url
exports.name = db_name
exports.get_db = () => db
