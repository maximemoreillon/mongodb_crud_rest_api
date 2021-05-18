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
    mongodb_url: require('./db.js').url,
    mongodb_db_name: require('./db.js').name,
  })
})


app.use('/collections', require('./routes/collections.js') )

// Start the server
app.listen(port, () => {
  console.log(`[Express] MongoDB CRUD REST API listening on ${port}`)
})
