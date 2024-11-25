import {$authHost, $host} from "./index";



export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand', )
    return data
}

export const createJewelery = async (jewelery) => {
    const {data} = await $authHost.post('api/jewelery', jewelery)
    return data
}

export const fetchJewelerys = async (typeId, brandId, page, limit= 5) => {
    const {data} = await $host.get('api/jewelery', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneJewelery = async (id) => {
    const {data} = await $host.get('api/jewelery/' + id)
    return data
}
