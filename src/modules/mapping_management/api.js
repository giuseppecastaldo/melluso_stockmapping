import {api} from "../../core";

const base_url = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://192.168.0.10:8083/api' : '/api';

export async function getWarehouses() {
    return (await api.get(`${base_url}/stockmapping/warehouses`)).data
}

export async function saveBarcodes(barcodes) {
    return (await api.post(`${base_url}/stockmapping/map/save`, barcodes)).data
}

export async function getBarcodes(area) {
    return (await api.post(`${base_url}/stockmapping/map`, area)).data
}

export async function getMappingPercentage(store) {
    return (await api.get(`${base_url}/stockmapping/map/percentage/${store}`)).data
}

export async function clearMap(store) {
    return (await api.delete(`${base_url}/stockmapping/map/${store}`)).data
}

