const post = require('./post')
const Schema = require('mongoose').Schema
const postSchema = new Schema({
     username: { type: String, required: true },
     post: { type: String, required:true },
     likes: { type: Number, default: 0 }, 
     comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
     url: { type: String }, 
     wigs: { type: String },
     anon: {type: Boolean, required: true },
}, {
     timestamps: true
})
module.exports = postSchema