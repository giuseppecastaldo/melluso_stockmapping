import {getActions} from "../../core";

const columns = [
    {field: 'id', headerName: 'Barcode', flex: 1},
    {field: 'product', headerName: 'Prodotto', flex: 1},
    {field: 'variation', headerName: 'Variante', flex: 1},
    {field: 'size', headerName: 'Taglia', flex: 1},
    {field: 'qty', headerName: 'Q.tà', flex: 1},
];

function createData(id, product, variation, size, qty) {
    return {id, product, variation, size, qty};
}

const rows_ = [
    createData('0000016785762', 'K58000', '211216', '38', 1),
    createData('0000103113639', 'K58001', '211218', '39', 1),
    createData('0000103113676', 'K58002', '211219', '40', 1),
    createData('0000104000593', 'K58003', '211220', '37', 1),
    createData('0000104100057', 'K58004', '211221', '38', 1),
    createData('0000105106720', 'K58005', '211222', 'XL', 1),
    createData('0000105995065', 'K58006', '211223', 'L', 1),
    createData('0000016785767', 'K58000', '211216', '38', 1),
    createData('0000103113638', 'K58001', '211218', '39', 1),
    createData('0000103113679', 'K58002', '211219', '40', 1),
    createData('00001040005910', 'K58003', '211220', '37', 1),
    createData('00001041000511', 'K58004', '211221', '38', 1),
    createData('00001051067212', 'K58005', '211222', 'XL', 1),
    createData('00001059950613', 'K58006', '211223', 'L', 1),
];

const warehouses = [
    {
        code: '001',
        description: 'Store WEB Melluso'
    },
    {
        code: '008',
        description: 'Centro commerciale Campania'
    }
];

const areas = [
    {
        code: 'B-1-A',
        rack: 'B',
        side: 'A',
        zone: '1',
        label: 'Scaff. B - Zona 1 - Lato A'
    },
    {
        code: 'C-1-D',
        rack: 'C',
        side: 'D',
        zone: '1',
        label: 'Scaff. C - Zona 1 - Lato D'
    }
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
            incrementQty: {
                next(state, action) {
                    return {
                        ...state,
                        rows: state.rows.map((row) => {
                            if (state.selection.includes(row.id)) {
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
                            if (state.selection.includes(row.id)) {
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
                        rows: state.rows.filter((row) => !state.selection.includes(row.id)),
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
                            rows: !state.rows.some(r => r.id === action.payload.barcode) ? [...state.rows, {
                                id: action.payload.barcode,
                                product: action.payload.product,
                                variation: action.payload.variation,
                                size: action.payload.size,
                                qty: 1
                            }] : state.rows.map((row) => {
                                if (row.id === action.payload.barcode) {
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
                            currentArea: action.payload,
                            canEnterBarcode: true
                        }
                    }

                    return {
                        ...state,
                        currentArea: action.payload,
                        canEnterBarcode: false
                    }

                }
            },
            discardSaves: {
                next(state, action) {
                    return {
                        ...state,
                        rows: [],
                        pendingSaves: false,
                        selectedWarehouse: "",
                        currentArea: null,
                        canEnterBarcode: false,
                        canEnterArea: false
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
            }
        },
        defaultState: {
            columns: columns,
            rows: rows_,
            selection: [],
            selectedWarehouse: "",
            currentBarcode: '000000000000',
            currentArea: '',
            canEnterArea: false,
            canEnterBarcode: false,
            areas: areas,
            warehouses: warehouses,
            pendingSaves: false,
            beep: 'STOPPED',
            beepError: 'STOPPED'
        }
    }
}