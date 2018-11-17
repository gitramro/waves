import axios from 'axios';
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    GET_WOODS,
    GET_PRODUCTS_TO_SHOP,
    ADD_PRODUCT,
    CLEAR_PRODUCT
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

export const getWoods=async()=>{
    const request = await axios.get(`${PRODUCT_SERVER}/woods`);

    return {
        type: GET_WOODS,
        payload: request.data
    }
}