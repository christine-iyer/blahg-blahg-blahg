const router = require('express').Router()
const newblahgCtrl = require('../../controllers/api/newblahgs')


router.delete('/:id', newblahgCtrl.destroyNewBlahg, newblahgCtrl.respondWithNewBlahg)
router.put('/:id', newblahgCtrl.updateNewBlahg, newblahgCtrl.respondWithNewBlahg)
router.post('/', newblahgCtrl.createNewBlahg, newblahgCtrl.respondWithNewBlahg)
router.get('/:id', newblahgCtrl.getNewBlahgs, newblahgCtrl.respondWithNewBlahg)
router.get('/', newblahgCtrl.getNewBlahgs, newblahgCtrl.respondWithNewBlahgs)
module.exports = router
