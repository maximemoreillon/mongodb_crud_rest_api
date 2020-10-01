const mongodb_config = require('../mongodb.js')

exports.create_collection = (req, res) => {

  let collection_name = req.body.collection_name
    || req.body.name

  if(!collection_name) {
    console.log(`Missing collection name`)
    res.status(400).send(`Missing collection name`)
    return
  }

  mongodb_config.MongoClient.connect(mongodb_config.url, mongodb_config.options, (err, db) => {
    // Handle DB connection errors
    if (err) {
      console.log(err)
      res.status(500).send(err)
      return
    }

    db.db(mongodb_config.db_name)
    .createCollection(collection_name, (err, collections) => {
      // Close the connection to the DB
      db.close()

      // Handle errors
      if (err) {
        console.log(err)
        res.status(500).send(err)
        return
      }

      res.send('OK')

      console.log(`[Mongodb] Collection ${collection_name} created`)
    })

  })
}

exports.get_collections = (req, res) => {

  mongodb_config.MongoClient.connect(mongodb_config.url, mongodb_config.options, (err, db) => {
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

      console.log(`[Mongodb] Collection list queried`)
    })

  })
}

exports.drop_collection = (req, res) => {

  mongodb_config.MongoClient.connect(mongodb_config.url, mongodb_config.options, (err, db) => {
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
        console.log(`[Mongodb] Collection ${req.params.collection} dropped`)
        res.send(`Collection ${req.params.collection} dropped`)
      }

    })
  })
}
