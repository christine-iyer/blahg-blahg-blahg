const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)
const db('connected', ()=> {
     console.log(`You are connected to ${db.name} at ${db.host}`)
})