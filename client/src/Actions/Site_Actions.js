import axios from 'axios';
import {
    GET_SITE_DATA,
    UPDATE_SITE_DATA
} from './Types';

import { SITE_SERVER } from '../Components/Utils/Misc';

export function getSiteData(){

    const request = axios.get(`${SITE_SERVER}/site_data`)
        .then((response) => {
                        console.log(response)
                    });

    return {
        type: GET_SITE_DATA,
        payload: request
    }

}

export function updateSiteData(dataToSubmit){

    const request = axios.post(`${SITE_SERVER}/site_data`, dataToSubmit)
        .then(response => response.data);

    return {
        type: UPDATE_SITE_DATA,
        payload: request
    }

}

