const { Schema, model } = require('mongoose')

const newblahgSchema = new Schema({
     author: String, 
     title: String, 
     category: String, 
     text: String,
     image: String 
}, {
timestamps: true
})

module.exports = model('Newblahg', newblahgSchema)