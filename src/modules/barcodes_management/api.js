import axios from "axios";

export async function getBarcodes(seasons) {
    return (await axios.post('http://localhost:8083/api/barcodes', seasons )).data
}

export async function getSeasons() {
    return (await axios.get('http://localhost:8083/api/barcodes/seasons')).data
}