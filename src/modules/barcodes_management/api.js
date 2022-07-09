import {api} from "../../core";

export async function getBarcodes(seasons) {
    return (await api.post('http://localhost:8083/api/barcodes', seasons )).data
}

export async function getSeasons() {
    return (await api.get('http://localhost:8083/api/barcodes/seasons')).data
}