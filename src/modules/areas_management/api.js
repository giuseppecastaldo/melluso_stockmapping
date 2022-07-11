import {api} from "../../core";

const base_url = 'http://192.168.0.10:8083/api';

export async function getAreas(store) {
    return (await api.get(`${base_url}/areas/${store}`)).data
}