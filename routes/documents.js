const express = require('express')
const controller = require('../controllers/documents.js')

const router = express.Router({mergeParams: true})

router.route('/')
.get(controller.get_all_documents)
.post(controller.create_document)

router.route('/:document_id')
.get(controller.get_document)
.patch(controller.update_document)
.put(controller.replace_document)
.delete(controller.delete_document)

module.exports = router
