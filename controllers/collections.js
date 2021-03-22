const mongodb_config = require('../mongodb.js')

exports.create_collection = (req, res) => {

  let collection_name = req.body.collection_name
    || req.body.name

  if(!collection_name) {
    console.log(`[Express] Missing collection name`)
    res.status(400).send(`Missing collection name`)
    return
  }

  mongodb_config.MongoClient.connect(mongodb_config.url, mongodb_config.options)
  .then(db => {
    return db.db(mongodb_config.db_name)
      .createCollection(collection_name)
  })
  .then(() => {
    console.log(`Collection ${collection_name} created`)
    res.send(`Collection ${collection_name} created`)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })

}

exports.get_collections = (req, res) => {

  mongodb_config.MongoClient.connect(mongodb_config.url, mongodb_config.options)
  .then(db => {
    return db.db(mongodb_config.db_name)
    .listCollections()
    .toArray()
  })
  .then(collections => {
    res.send(collections)
    console.log(`[Mongodb] Collection list queried`)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })

}

exports.drop_collection = (req, res) => {

  const collection = req.params.collection

  if(!collection) {
    console.log(`[Express] Collection not defined`)
    res.status(400).send(`Collection not defined`)
    return
  }

  mongodb_config.MongoClient.connect(mongodb_config.url, mongodb_config.options)
  .then(db => {
    return db.db(mongodb_config.db_name)
    .collection()
    .drop()
  })
  .then(() => {
    console.log(`[Mongodb] Collection ${collection} dropped`)
    res.send(`Collection ${rcollection} dropped`)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })

}
