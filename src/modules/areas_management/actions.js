import {getWarehouses} from "../mapping_management/api";
import {getAreas} from "./api";

export default function () {
    return {
        setAreasSelection: payload => payload,
        deleteSelectedAreas: payload => payload,
        getWarehouses: () => getWarehouses(),
        setSelectedWarehouse: payload => payload,
        getAreas: (store) => getAreas(store)
    }
}