const mongodb_config = require('../mongodb.js')

exports.create_document = (req, res) => {

  mongodb_config.mongo_client.connect(mongodb_config.url, mongodb_config.options, (err, db) => {

    // Handle DB connection errors
    if (err) {
      console.log(err)
      res.status(500).send(err)
      return
    }

    let new_document = req.body

    // Insert into the DB
    db.db(mongomongodb_config.db_name_name)
    .collection(req.params.collection)
    .insertOne(new_document, (err, result) => {

      // Close connection to DB
      db.close()

      // DB insertion error handling
      if (err) {
        console.log(err)
        res.status(500).send(err)
        return
      }

      console.log(`[MongoDB] Document inserted in collection ${req.params.collection}`)

      // Respond to the client
      res.send("OK")

    })
  })

}

exports.get_all_documents = (req, res) => {

  mongodb_config.mongo_client.connect(mongodb_config.url,mongodb_config.options, (err, db) => {
    // Handle DB connection errors
    if (err) {
      console.log(err)
      res.status(500).send(err)
      return
    }

    let limit = req.query.limit || 0

    db.db(mongodb_config.db_name)
    .collection(req.params.collection)
    .find({})
    .limit(limit)
    .toArray( (err, result) => {

      // Close the connection to the DB
      db.close()

      // Handle errors
      if (err) {
        console.log(err)
        res.status(500).send(err)
        return
      }

      console.log(`[MongoDB] Documents of collection ${req.params.collection} queried`)

      res.send(result)
    })
  })
}



exports.get_document = (req, res) => {

  let document_id = req.params.document_id

  if(!document_id) return res.status(400).send(`ID not specified`)

  let query = undefined
  try {
    query = { _id: ObjectID(document_id)}
  }
  catch (e) {
    console.log('Invalid ID')
    res.status(400).send('Invalid ID')
    return
  }

  mongodb_config.mongo_client.connect(mongodb_config.url,mongodb_config.options, (err, db) => {
    // Handle DB connection errors
    if (err) {
      console.log(err)
      res.status(500).send(err)
      return
    }

    db.db(mongodb_config.db_name)
    .collection(req.params.collection)
    .findOne(query,(err, result) => {

      // Close the connection to the DB
      db.close()

      // Handle DB errors
      if (err) {
        console.log(err)
        res.status(500).send(err)
        return
      }

      res.send(result)

      console.log(`[MongoDB] Document ${document_id} of collection ${req.params.collection} queried`)
    })
  })
}

exports.delete_document = (req, res) => {

  // Delete a document

  let document_id = req.params.document_id

  if(!document_id) return res.status(400).send(`ID not specified`)

  let query = undefined
  try {
    query = { _id: ObjectID(document_id)}
  }
  catch (e) {
    console.log('Invalid ID requested')
    res.status(400).send('Invalid ID')
    return
  }

  mongodb_config.mongo_client.connect(mongodb_config.url,mongodb_config.options, (err, db) => {
    // Handle DB connection errors
    if (err) {
      console.log(err)
      res.status(500).send(err)
      return
    }

    db.db(mongodb_config.db_name)
    .collection(req.params.collection)
    .deleteOne(query,(err, result) => {

      // Close the connection to the DB
      db.close()

      // Handle errors
      if (err) {
        console.log(err)
        res.status(500).send(err)
        return
      }

      res.send(result)

      console.log(`[MongoDB]  Document ${document_id} of collection ${req.params.collection} deleted`)

    })
  })
}

exports.update_document = (req, res) => {

  // Patch a document

  let document_id = req.params.document_id

  if(!document_id) return res.status(400).send(`ID not specified`)

  let query = undefined
  try {
    query = { _id: ObjectID(document_id)}
  }
  catch (e) {
    console.log('Invalid ID requested')
    res.status(400).send('Invalid ID')
    return
  }

  delete req.body._id
  let new_document_properties = {$set: req.body}


  mongodb_config.mongo_client.connect(mongodb_config.url,mongodb_config.options, (err, db) => {
    // Handle DB connection errors
    if (err) {
      console.log(err)
      res.status(500).send(err)
      return
    }


    db.db(mongodb_config.db_name)
    .collection(req.params.collection)
    .updateOne(query, new_document_properties, (err, result) => {

      // Close the connection to the DB
      db.close()

      // Handle errors
      if (err) {
        console.log(err)
        res.status(500).send(err)
        return
      }

      res.send(result)

      console.log(`[MongoDB] Document ${document_id} of collection ${req.params.collection} updated`)
    })
  })
}

exports.replace_document = (req, res) => {

  // Put a document

  let document_id = req.params.document_id

  if(!document_id) return res.status(400).send(`ID not specified`)

  let query = undefined
  try {
    query = { _id: ObjectID(document_id)}
  }
  catch (e) {
    console.log('Invalid ID')
    res.status(400).send('Invalid ID')
    return
  }

  delete req.body._id

  let new_document_properties = req.body


  mongodb_config.mongo_client.connect(mongodb_config.url,mongodb_config.options, (err, db) => {
    // Handle DB connection errors
    if (err) {
      console.log(err)
      res.status(500).send(err)
      return
    }


    db.db(mongodb_config.db_name)
    .collection(req.params.collection)
    .replaceOne(query, new_document_properties, (err, result) => {

      // Close the connection to the DB
      db.close()

      // Handle errors
      if (err) {
        console.log(err)
        res.status(500).send(err)
        return
      }

      res.send(result)

      console.log(`[MongoDB] Document ${document_id} of collection ${req.params.collection} replaced`)
    })
  })
}
