const { Basket, BasketItem, Jewelery } = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {
    async addItem(req, res, next) {
        try {
            const { jeweleryId, quantity } = req.body;
            const basketId = req.user.id; // Предполагается, что пользователь авторизован

            // Проверяем, есть ли такой товар в корзине
            let basketItem = await BasketItem.findOne({ where: { basketId, jeweleryId } });
            if (basketItem) {
                basketItem.quantity += quantity;
                await basketItem.save();
            } else {
                basketItem = await BasketItem.create({ basketId, jeweleryId, quantity });
            }

            const basketItems = await BasketItem.findAll({
                where: { basketId },
                include: [{ model: Jewelery }],
            });

            return res.json(basketItems);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async removeItem(req, res, next) {
        try {
            const { id } = req.params;
            const basketId = req.user.id;

            await BasketItem.destroy({ where: { id, basketId } });

            const basketItems = await BasketItem.findAll({
                where: { basketId },
                include: [{ model: Jewelery }],
            });

            return res.json(basketItems);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getItems(req, res) {
        const basketId = req.user.id;

        const basketItems = await BasketItem.findAll({
            where: { basketId },
            include: [{ model: Jewelery }],
        });

        return res.json(basketItems);
    }
}

module.exports = new BasketController();
