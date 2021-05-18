const {get_db} = require('../db.js')

exports.create_document = (req, res) => {

  const collection = req.params.collection
  if(!collection) return res.status(400).send(`Collection not defined`)

  const new_document = req.body

  get_db()
  .collection(collection)
  .insertOne(new_document)
  .then(result => {
    res.send(result.ops[0])
    console.log(`[MongoDB] Document ${result.ops[0]._id} inserted in collection ${collection}`)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })
}

exports.get_all_documents = (req, res) => {

  const collection = req.params.collection
  if(!collection) return res.status(400).send(`Collection not defined`)

  const limit = req.query.limit || 0
  get_db()
  .collection(collection)
  .find({})
  .limit(Number(limit))
  .toArray()
  .then(result => {
    res.send(result)
    console.log(`[MongoDB] Documents of collection ${collection} queried`)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })

}



exports.get_document = (req, res) => {

  const collection = req.params.collection
  if(!collection) return res.status(400).send(`Collection not defined`)

  const document_id = req.params.document_id
  if(!document_id) return res.status(400).send(`ID not specified`)

  let query = undefined
  try {
    query = { _id: mongodb_config.ObjectID(document_id)}
  }
  catch (e) {
    return res.status(400).send('Invalid ID')
  }

  get_db()
  .collection(collection)
  .findOne(query)
  .then(result => {
    res.send(result)
    console.log(`[MongoDB] Document ${document_id} of collection ${collection} queried`)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })

}

exports.delete_document = (req, res) => {

  const collection = req.params.collection
  if(!collection) return res.status(400).send(`Collection not defined`)

  const document_id = req.params.document_id
  if(!document_id) return res.status(400).send(`ID not specified`)

  let query = undefined
  try {
    query = { _id: mongodb_config.ObjectID(document_id)}
  }
  catch (e) {
    return res.status(400).send('Invalid ID')
  }

  get_db()
  .collection(collection)
  .deleteOne(query)
  .then(result => {
    res.send(result)
    console.log(`[MongoDB]  Document ${document_id} of collection ${collection} deleted`)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })

}

exports.update_document = (req, res) => {

  // Patch a document

  const collection = req.params.collection
  if(!collection) return res.status(400).send(`Collection not defined`)

  const document_id = req.params.document_id
  if(!document_id) return res.status(400).send(`ID not specified`)

  let query = undefined
  try {
    query = { _id: mongodb_config.ObjectID(document_id)}
  }
  catch (e) {
    return res.status(400).send('Invalid ID')
  }

  delete req.body._id
  const new_document_properties = {$set: req.body}



  get_db()
  .collection(collection)
  .updateOne(query, new_document_properties)
  .then(result => {
    res.send(result)
    console.log(`[MongoDB] Document ${document_id} of collection ${collection} updated`)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })

}

exports.replace_document = (req, res) => {

  // Put a document
  const collection = req.params.collection
  if(!collection) return res.status(400).send(`Collection not defined`)

  const document_id = req.params.document_id
  if(!document_id) return res.status(400).send(`ID not specified`)

  let query = undefined
  try {
    query = { _id: mongodb_config.ObjectID(document_id)}
  }
  catch (e) {
    return res.status(400).send('Invalid ID')
  }

  delete req.body._id

  const new_document_properties = req.body

  get_db()
  .collection(collection)
  .replaceOne(query, new_document_properties)
  .then(result => {
    res.send(result)
    console.log(`[MongoDB] Document ${document_id} of collection ${collection} replaced`)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })
}
