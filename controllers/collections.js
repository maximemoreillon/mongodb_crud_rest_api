const mongodb_config = require('../mongodb.js')


exports.get_collections = (req, res) => {

  mongodb_config.mongo_client.connect(mongodb_config.url, mongodb_config.options, (err, db) => {
    // Handle DB connection errors
    if (err) {
      console.log(err)
      res.status(500).send(err)
      return
    }

    db.db(mongodb_config.db_name)
    .listCollections()
    .toArray( (err, collections) => {
      // Close the connection to the DB
      db.close()

      // Handle errors
      if (err) {
        console.log(err)
        res.status(500).send(err)
        return
      }

      res.send(collections)

      console.log(`Collection list queried`)
    })

  })
}

exports.drop_collection = (req, res) => {

  mongodb_config.mongo_client.connect(mongodb_config.url, mongodb_config.options, (err, db) => {
    // Handle DB connection errors
    if (err) {
      console.log(err)
      res.status(500).send(err)
      return
    }

    db.db(mongodb_config.db_name)
    .collection(req.params.collection)
    .drop( (err, delOK) => {
      // Close the connection to the DB
      db.close()

      // Handle errors
      if (err) {
        console.log(err)
        res.status(500).send(err)
        return
      }

      if (delOK) {
        console.log(`Collection ${req.params.collection} dropped`)
        res.send(`Collection ${req.params.collection} dropped`)
      }

    })
  })
}
