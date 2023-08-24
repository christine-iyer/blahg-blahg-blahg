const express = require('express')
const router = express.Router()

const posts = require('../../controller/api/posts')

router.get('/', posts.index, posts.jsonPosts)
router.delete('/:id', posts.destroy, posts.jsonPost)
router.put('/:id', posts.update, posts.jsonPost)
router.post('/', posts.create, posts.jsonPost)
router.get('/:postId', posts.getPost, posts.jsonPost)

module.exports = router
