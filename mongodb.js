const mongodb = require('mongodb')
const dotenv = require('dotenv')

// Parse environment variables
dotenv.config()

exports.MongoClient = mongodb.MongoClient
exports.ObjectID = mongodb.ObjectID

exports.url = process.env.MONGODB_URL || 'mongodb://mongodb:27017'
exports.db_name = process.env.MONGODB_DB_NAME || 'mongodb_crud_rest_api'

exports.options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
