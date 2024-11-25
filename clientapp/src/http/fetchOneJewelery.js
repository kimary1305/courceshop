const { Jewelery, JeweleryInfo } = require('../models');  // Импортируем модели

// Функция для получения информации о конкретном украшении
const fetchOneJewelery = async (id) => {
    const jewelery = await Jewelery.findOne({
        where: { id },
        include: [{
            model: JeweleryInfo, // Включаем характеристики
            as: 'info',  // Можно использовать alias, если в модели так указано
            attributes: ['title', 'description'] // Запрашиваем только нужные поля
        }]
    });
    return jewelery;
};

module.exports = { fetchOneJewelery };
