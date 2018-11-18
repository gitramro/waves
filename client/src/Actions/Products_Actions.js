import axios from 'axios';
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    ADD_BRAND,
    GET_WOODS,
    ADD_WOOD,
    GET_PRODUCTS_TO_SHOP,
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL
} from './Types';

import { PRODUCT_SERVER } from '../Components/Utils/Misc';

export const getProductDetail=(id)=>{

    const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    .then(response=>{
        return response.data[0]
    });

    return {
        type: GET_PRODUCT_DETAIL,
        payload: request
    }

}


export const clearProductDetail=()=>{
    return {
        type: CLEAR_PRODUCT_DETAIL,
        payload:''
    }
}


export const getProductsBySell=async()=>{
    //?sortBy=sold&order=desc&limit=100
    const request = await axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)


    return {
        type: GET_PRODUCTS_BY_SELL,
        payload: request.data
    }

}

export const getProductsByArrival=async()=>{
    const request = await axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)


    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request.data
    }
}

export function getProductsToShop(skip, limit,filters =[], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${PRODUCT_SERVER}/shop`,data)
                .then(response => {
                    let newState = [
                        ...previousState,
                        ...response.data.articles
                    ];
                    return {
                        size: response.data.size,
                        articles: newState
                    }
                });

    return {
        type: GET_PRODUCTS_TO_SHOP,
        payload: request
    }

}

export const addProduct=async(datatoSubmit)=>{

    const request = await axios.post(`${PRODUCT_SERVER}/article`, datatoSubmit);


    return {
        type: ADD_PRODUCT,
        payload: request.data
    }
}

export function clearProduct(){
    return {
        type: CLEAR_PRODUCT,
        payload: ''
    }
}

////////////////////////////////////
//////        CATEGORIES
////////////////////////////////////


export const getBrands=async()=>{

    const request = await axios.get(`${PRODUCT_SERVER}/brands`);

    return {
        type: GET_BRANDS,
        payload: request.data
    }

}

// export const addBrand = (dataToSubmit, existingBrands) => {
//     const request = axios.post(`${PRODUCT_SERVER}/brand`,dataToSubmit)
//     .then(response=>{
//         let brands = [
//             ...existingBrands,
//             response.data.brand
//         ];
//         return {
//             success: response.data.success,
//             brands
//         }
//     });

//     return {
//         type: ADD_BRAND,
//         payload: request
//     }
// }

export const addBrand = async (dataToSubmit, existingBrands) => {
    let data = {
        success: false,
        brands:[]
    }
    try {
        const request = await axios.post(`${PRODUCT_SERVER}/brand`,dataToSubmit)
        let brands = [
            ...existingBrands,
            request.data.brand
        ];
        data = {
            success:request.data.success,
            brands
        }
    } catch (error) {
        return {
            success: false
        }
    }
    return {
        type: ADD_BRAND,
        payload: data
    }
}


export const addWood=async(dataToSubmit, existingWoods)=>{
    const request = axios.post(`${PRODUCT_SERVER}/wood`,dataToSubmit)
    .then(response=>{
        let woods = [
            ...existingWoods,
            response.data.wood
        ];
        return {
            success: response.data.success,
            woods
        }
    });
    return {
        type: ADD_WOOD,
        payload: request
    }
}

export const getWoods=async()=>{
    const request = await axios.get(`${PRODUCT_SERVER}/woods`);

    return {
        type: GET_WOODS,
        payload: request.data
    }
}