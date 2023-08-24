const express = require('express')
const router = express.Router()
const comments = require('../../controller/api/comments')

router.get('/:postId', comments.index, comments.jsonComments)
router.delete('/:postId/:id', comments.destroy, comments.jsonComment)
router.put('/:postId/:id', comments.update, comments.jsonComment)
router.post('/:postId', comments.create, comments.jsonComment)
router.get('/:commentId', comments.show, comments.jsonComment)

module.exports = router