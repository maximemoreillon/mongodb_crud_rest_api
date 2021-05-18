const express = require('express')
const controller = require('../controllers/collections.js')
const documents_router = require('./documents.js')

const router = express.Router()


router.route('/')
.get(controller.get_collections)
.post(controller.create_collection)

router.route('/:collection')
.delete(controller.drop_collection)

router.use('/:collection/documents', documents_router)


module.exports = router
