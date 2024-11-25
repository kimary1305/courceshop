const uuid = require('uuid')
const path = require('path');
const {Jewelery, JeweleryInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class JeweleryController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".png"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const jewelery = await Jewelery.create({name, price, brandId, typeId, img: fileName});

            if(info)
            {
                info = JSON.parse(info)
                info.forEach(i => {
                    JeweleryInfo.create({
                         title: i.title,
                        description: i.description,
                        jeweleryId: jewelery.id
                    })
                   

                    
                });
            }
            return res.json(jewelery)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let jewelery;
        if (!brandId && !typeId) {
            jewelery = await Jewelery.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            jewelery = await Jewelery.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            jewelery = await Jewelery.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            jewelery = await Jewelery.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(jewelery)
    }

    async getOne(req, res) {
        const {id} = req.params;
        const jewelery = await Jewelery.findOne({
            where: {id},
            include: [{model: JeweleryInfo, as: 'jewelery_infos'}] // Corrected alias
        });
        return res.json(jewelery);
    }
    
}

module.exports = new JeweleryController()
