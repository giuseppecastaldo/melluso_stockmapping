import {api} from "../../core";

const base_url = 'http://192.168.0.10:8083/api';

export async function getBarcodes(seasons) {
    return (await api.post(`${base_url}/barcodes`, seasons )).data
}

export async function getSeasons() {
    return (await api.get(`${base_url}/barcodes/seasons`)).data
}