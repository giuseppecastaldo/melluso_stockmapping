import {api} from "../../core";

const base_url = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://192.168.0.10:8083/api' : '/api';

export async function getAreas(store) {
    return (await api.get(`${base_url}/areas/${store}`)).data
}

export async function saveArea(area) {
    return (await api.post(`${base_url}/areas/save`, area)).data
}

export async function generateAreas(store, nrack, nside, nzone, nwarehouse) {
    return (await api.post(`${base_url}/areas/generate`, {
        store, nrack, nside, nzone, nwarehouse
    })).data
}

export async function deleteArea(area) {
    return (await api.post(`${base_url}/areas/delete`, area)).data
}