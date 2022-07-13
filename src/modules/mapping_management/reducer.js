import {getActions} from "../../core";

const columns = [
    {field: 'barcode', headerName: 'Barcode', flex: 1},
    {field: 'product', headerName: 'Prodotto', flex: 1},
    {field: 'variation', headerName: 'Variante', flex: 1},
    {field: 'size', headerName: 'Taglia', flex: 1},
    {field: 'qty', headerName: 'Q.tà', flex: 1},
];

export default function () {
    return {
        handlers: {
            setRowsSelection: {
                next(state, action) {
                    return {
                        ...state,
                        selection: action.payload
                    }
                }
            },
            getWarehouses_FULFILLED: {
                next(state, action) {
                    return {
                        ...state,
                        warehouses: action.payload
                    };
                }
            },
            incrementQty: {
                next(state, action) {
                    return {
                        ...state,
                        rows: state.rows.map((row) => {
                            if (state.selection.includes(row.barcode)) {
                                return {...row, qty: row.qty + 1}
                            }
                            return row;
                        }),
                        pendingSaves: true
                    }
                }
            },
            decrementQty: {
                next(state, action) {
                    return {
                        ...state,
                        rows: state.rows.map((row) => {
                            if (state.selection.includes(row.barcode)) {
                                return {...row, qty: (row.qty > 0) ? row.qty - 1 : 0}
                            }
                            return row;
                        }),
                        pendingSaves: true
                    }
                }
            },
            deleteSelectedRows: {
                next(state, action) {
                    return {
                        ...state,
                        rows: state.rows.filter((row) => !state.selection.includes(row.barcode)),
                        pendingSaves: true
                    }
                }
            },
            setSelectedWarehouse: {
                next(state, action) {
                    return {
                        ...state,
                        selectedWarehouse: action.payload,
                        canEnterArea: true
                    }
                }
            },
            addProductByBarcode_FULFILLED: {
                next(state, action) {
                    if (action.payload) {
                        action.asyncDispatch(getActions('app').setSnackbar({
                            severity: 'success',
                            open: true,
                            message: `Prodotto aggiunto con successo.`,
                            timeout: 500
                        }))
                        return {
                            ...state,
                            beep: 'PLAYING',
                            pendingSaves: true,
                            last_scanned: action.payload,
                            rows: !state.rows.some(r => r.barcode === action.payload.barcode) ? [...state.rows, {
                                barcode: action.payload.barcode,
                                product: action.payload.product,
                                variation: action.payload.variation,
                                size: action.payload.size,
                                qty: 1,
                                area: state.currentArea
                            }] : state.rows.map((row) => {
                                if (row.barcode === action.payload.barcode) {
                                    return {...row, qty: row.qty + 1}
                                }
                                return row;
                            }),
                            currentBarcode: ''
                        }
                    }

                    action.asyncDispatch(getActions('app').setSnackbar({
                        severity: 'error',
                        open: true,
                        message: `Prodotto non trovato`,
                        timeout: 500
                    }))

                    return {
                        ...state,
                        beepError: 'PLAYING',
                        currentBarcode: ''
                    }
                }
            },
            setCurrentBarcode: {
                next(state, action) {
                    return {
                        ...state,
                        currentBarcode: action.payload
                    }
                }
            },
            setCurrentArea: {
                next(state, action) {
                    if (action.payload) {
                        return {
                            ...state,
                            beep: 'PLAYING',
                            currentArea: action.payload,
                            canEnterBarcode: true
                        }
                    }

                    return {
                        ...state,
                        currentArea: action.payload,
                        canEnterBarcode: false,
                        rows: []
                    }

                }
            },
            fillRows_FULFILLED: {
                next(state, action) {
                    return {
                        ...state,
                        rows: action.payload
                    }
                }
            },
            saveProgress_FULFILLED: {
                next(state, action) {
                    return {
                        ...state,
                        rows: [],
                        pendingSaves: false,
                        currentArea: null,
                        canEnterBarcode: false,
                        canEnterArea: true
                    }
                }
            },
            deleteMap_FULFILLED: {
                next(state, action) {
                    return {
                        ...state,
                        rows: [],
                        pendingSaves: false,
                        currentArea: null,
                        canEnterBarcode: false,
                        canEnterArea: true
                    }
                }
            },
            discardSaves: {
                next(state, action) {
                    return {
                        ...state,
                        rows: [],
                        pendingSaves: false,
                        currentArea: null,
                        canEnterBarcode: false,
                        canEnterArea: true
                    }
                }
            },
            playStopBeep: {
                next(state, action) {
                    return {
                        ...state,
                        beep: action.payload
                    }
                }
            },
            playStopBeepError: {
                next(state, action) {
                    return {
                        ...state,
                        beepError: action.payload
                    }
                }
            },
            getAreas_FULFILLED: {
                next(state, action) {
                    return {
                        ...state,
                        areas: action.payload
                    }
                }
            },
            getPercentage_FULFILLED: {
                next(state, action) {
                    return {
                        ...state,
                        percentage: action.payload
                    }
                }
            }
        },
        defaultState: {
            columns: columns,
            rows: [],
            selection: [],
            selectedWarehouse: "",
            currentBarcode: '',
            currentArea: '',
            canEnterArea: false,
            canEnterBarcode: false,
            areas: [],
            warehouses: [],
            pendingSaves: false,
            beep: 'STOPPED',
            beepError: 'STOPPED',
            percentage: 0.0
        }
    }
}