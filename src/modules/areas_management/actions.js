import {getWarehouses} from "../mapping_management/api";
import {deleteArea, generateAreas, getAreas, saveArea} from "./api";

export default function () {
    return {
        setAreasSelection: payload => payload,
        getWarehouses: () => getWarehouses(),
        setSelectedWarehouse: payload => payload,
        getAreas: (store) => getAreas(store),
        saveArea: (area) => saveArea(area),
        deleteArea: (area) => deleteArea(area),
        generateAreas: (store, nrack, nside, nzone, nwarehouse) => generateAreas(store, nrack, nside, nzone, nwarehouse)
    }
}