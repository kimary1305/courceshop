const Router = require('express');
const router = new Router();
const BasketController = require('../controllers/basketcontroller');

router.get('/', BasketController.getItems);
router.post('/', BasketController.addItem);
router.delete('/:id', BasketController.removeItem);

module.exports = router;
