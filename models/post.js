const mongoose = require('mongoose')
const postSchema = require('./postSchema')
module.exports = mongoose.model('Post', postSchema)