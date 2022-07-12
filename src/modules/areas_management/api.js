import {api} from "../../core";

const base_url = 'http://192.168.0.10:8083/api';

export async function getAreas(store) {
    return (await api.get(`${base_url}/areas/${store}`)).data
}

export async function saveArea(area) {
    return (await api.post(`${base_url}/areas/save`, area)).data
}

export async function deleteArea(area) {
    return (await api.post(`${base_url}/areas/delete`, area)).data
}