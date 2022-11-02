import axios from 'axios';

import {
    GET_DOGS,
    GET_NAME,
    POST_DOG,
    GET_TEMP,
    GET_DETAIL,
    ALPHABETICAL_SORT,
    WEIGHT_SORT,
    TEMP_FILTER,
    CREATED_FILTER
} from './comunes/utils'

export const server = 'https://pi-dogs-production-0601.up.railway.app'

export function getDogs() {
    return async function (dispatch) {
        var response = await axios.get(`${server}/dogs`)
        return dispatch({
            type: GET_DOGS,
            payload: response.data
        })
    }
}



export function getNameDogs(payload) {
    return {
        type: GET_NAME,
        payload
    }

}

export function postNewDogs(data) {
    return async function (dispatch) {
        var response = await axios.post(`${server}/create`, data);
        return dispatch({
            type: POST_DOG,
            payload: response.data
        })
    }
}

export function getTemperament() {
    return async function (dispatch) {
        var response = await axios.get(`${server}/temperament`);
        return dispatch({
            type: GET_TEMP,
            payload: response.data
        })
    }
}

export function getDetail(data) {
    const id = data.match.params.id
    return async function (dispatch) {
        var response = await axios.get(`${server}/dogs/${id}`);
        return dispatch({
            type: GET_DETAIL,
            payload: response.data
        })

    }
}

export function sortByName(payload) {
    return ({
        type: ALPHABETICAL_SORT,
        payload
    })
}

export function weightSort(payload) {
    return ({
        type: WEIGHT_SORT,
        payload

    })
}

export function filterByTemp(payload) {
    return ({
        type: TEMP_FILTER,
        payload
    })
}

export function filterByCreated(payload) {
    return ({
        type: CREATED_FILTER,
        payload
    })
}

