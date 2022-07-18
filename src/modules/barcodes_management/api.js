import {api} from "../../core";

const base_url = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://192.168.0.10:8083/api' : '/api';

export async function getBarcodes(seasons) {
    return (await api.post(`${base_url}/barcodes`, seasons )).data
}

export async function getSeasons() {
    return (await api.get(`${base_url}/barcodes/seasons`)).data
}