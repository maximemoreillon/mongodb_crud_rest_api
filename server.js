// Importing modules
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const pjson = require('./package.json')

// Parse environment variables
dotenv.config()

const port = process.env.APP_PORT || 80

const app = express()

app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => {
  res.send({
    application_name: pjson.name,
    version: pjson.version,
    author: pjson.author,
    mongodb_url: require('./mongodb.js').url,
    mongodb_db: require('./mongodb.js').db_name,
  })
})

const document_controller = require('./controllers/documents.js')
const collection_controller = require('./controllers/collections.js')

app.route('/collections')
  .get(collection_controller.get_collections)
  .post(collection_controller.create_collection)

app.route('/collections/:collection')
  .delete(collection_controller.drop_collection)
  .get(document_controller.get_all_documents)
  .post(document_controller.create_document)

app.route('/collections/:collection/:document_id')
  .get(document_controller.get_document)
  .patch(document_controller.update_document)
  .put(document_controller.replace_document)
  .delete(document_controller.delete_document)

// Start the server
app.listen(port, () => {
  console.log(`[Express] MongoDB CRUD REST API listening on ${port}`)
})
