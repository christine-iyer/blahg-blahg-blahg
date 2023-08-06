require('dotenv').config()
const NewBlahg = require('../../models/newblahg')

const destroyNewBlahg = async (req, res, next) => {
     try {
         const deletedNewBlahg = await NewBlahg.findByIdAndDelete(req.params.id)
         res.locals.data.newblahg = deletedNewBlahg
         next()
     } catch (error) {
         res.status(400).json({ msg: error.message })
     }
 }
 
 const updateNewBlahg = async (req, res, next) => {
     try {
         const updatedNewBlahg = await NewBlahg.findByIdAndUpdate(req.params.id, req.body, { new: true })
         res.locals.data.newblahg = updatedNewBlahg
         next()
     } catch (error) {
         res.status(400).json({ msg: error.message })
     }
 }
 
 const createNewBlahg = async (req, res, next) => {
     try {
         const createdNewBlahg = await NewBlahg.create(req.body)
         res.locals.data.newblahg = createdNewBlahg
         next()
     } catch (error) {
         res.status(400).json({ msg: error.message })
     }
 }
 
 const getNewBlahgs= async (req, res, next) => {
     try {
         
         const newblahgs = await NewBlahg.find(req.body)
         res.locals.data.newblahgs = newblahgs 
         next()
     } catch (error) {
         res.status(400).json({ msg: error.message })
     }
 }
 const respondWithNewBlahgs = (req, res) => {
     res.json(res.locals.data.newblahgs)
 }
 
 const respondWithNewBlahg = (req, res) => {
     res.json(res.locals.data.newblahg)
 }
 
 
 
 module.exports = {
     destroyNewBlahg,
     updateNewBlahg,
     getNewBlahgs,
     createNewBlahg,
     respondWithNewBlahg, 
     respondWithNewBlahgs
 }