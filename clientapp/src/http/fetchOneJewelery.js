const { Jewelery, JeweleryInfo } = require('../models');


const fetchOneJewelery = async (id) => {
    const jewelery = await Jewelery.findOne({
        where: { id },
        include: [{
            model: JeweleryInfo,
            as: 'info',  
            attributes: ['title', 'description'] 
        }]
    });
    return jewelery;
};

module.exports = { fetchOneJewelery };
