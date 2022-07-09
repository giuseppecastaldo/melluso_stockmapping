import {db} from "../../db";
import {getWarehouses} from "./api";

export default function () {
    return {
        discardSaves: (payload) => payload,
        setCurrentBarcode: (payload) => payload,
        setCurrentArea: (payload) => payload,
        setSelectedWarehouse: (payload) => payload,
        setRowsSelection: (payload) => payload,
        incrementQty: (payload) => payload,
        decrementQty: (payload) => payload,
        deleteSelectedRows: (payload) => payload,
        playStopBeep: (payload) => payload,
        playStopBeepError: (payload) => payload,
        addProductByBarcode: barcode => db.barcodes.get(barcode),
        getWarehouses: () => getWarehouses()
    }
}