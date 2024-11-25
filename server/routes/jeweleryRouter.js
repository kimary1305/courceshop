const Router = require('express')
const router = new Router()
const jeweleryController = require('../controllers/jeweleryController')

router.post('/', jeweleryController.create)
router.get('/', jeweleryController.getAll)
router.get('/:id', jeweleryController.getOne)

module.exports = router
