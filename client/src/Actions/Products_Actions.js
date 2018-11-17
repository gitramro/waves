import axios from 'axios';
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    GET_WOODS
} from './Types';

import { PRODUCT_SERVER } from '../Components/Utils/Misc';


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

export const getWoods=async()=>{
    const request = await axios.get(`${PRODUCT_SERVER}/woods`);

    return {
        type: GET_WOODS,
        payload: request.data
    }
}