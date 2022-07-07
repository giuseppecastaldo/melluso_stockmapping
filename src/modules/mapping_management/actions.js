import {db} from "../../db";

export const actions = {
    discardSaves: (payload) => payload,
    setCurrentBarcode: (payload) => payload,
    setCurrentArea: (payload) => payload,
    setSelectedWarehouse: (payload) => payload,
    setRowsSelection: (payload) => payload,
    incrementQty: (payload) => payload,
    decrementQty: (payload) => payload,
    deleteSelectedRows: (payload) => payload,
    setSnackbar: (payload) => payload,
    playStopBeep: (payload) => payload,
    playStopBeepError: (payload) => payload,
    addProductByBarcode: barcode => db.barcodes.get(barcode)
};