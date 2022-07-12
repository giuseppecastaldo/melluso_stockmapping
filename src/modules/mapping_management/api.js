import {api} from "../../core";

const base_url = 'http://192.168.0.10:8083/api';

export async function getWarehouses() {
    return (await api.get(`${base_url}/stockmapping/warehouses`)).data
}

