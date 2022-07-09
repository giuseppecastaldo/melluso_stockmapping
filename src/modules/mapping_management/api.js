import {api} from "../../core";

export async function getWarehouses() {
    return (await api.get('http://localhost:8083/api/stockmapping/warehouses')).data
}