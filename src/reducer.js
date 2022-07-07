import { handleActions } from 'redux-actions';
import {
    ADD_PRODUCT_BY_BARCODE,
    DECREMENT_QTY,
    DELETE_SELECTED_ROWS,
    DISCARD_SAVES,
    INCREMENT_QTY,
    PLAY_STOP_BEEP,
    PLAY_STOP_BEEP_ERROR,
    SEND_DATA_TO_SERVER,
    SET_CURRENT_AREA,
    SET_CURRENT_BARCODE,
    SET_ROWS_SELECTION,
    SET_SELECTED_WAREHOUSE, setSelectedWarehouse, SNACKBAR
} from "./actions";

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
    createData('0000103113638', 'K58001', '211218', '39', 1),
    createData('0000103113676', 'K58002', '211219', '40', 1),
    createData('0000104000593', 'K58003', '211220', '37', 1),
    createData('0000104100057', 'K58004', '211221', '38', 1),
    createData('0000105106720', 'K58005', '211222', 'XL', 1),
    createData('0000105995065', 'K58006', '211223', 'L', 1),
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
        rack: 'Scaff. B',
        side: 'Lato A',
        zone: 'Zona 1',
        label: 'Scaff. B - Zona 1 - Lato A'
    },
    {
        code: 'C-1-D',
        rack: 'Scaff. C',
        side: 'Lato D',
        zone: 'Zona 1',
        label: 'Scaff. C - Zona 1 - Lato D'
    }
];

export default handleActions({
    [SET_ROWS_SELECTION]: {
        next(state, action){
            return {
                ...state,
                selection: action.payload
            }
        }
    },
    [INCREMENT_QTY]: {
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
    [DECREMENT_QTY]: {
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
    [DELETE_SELECTED_ROWS]: {
        next(state, action) {
            return {
                ...state,
                rows: state.rows.filter((row) => !state.selection.includes(row.id)),
                pendingSaves: true
            }
        }
    },
    SET_SELECTED_WAREHOUSE: {
        next(state, action) {
            console.log(state);
            return {
                ...state,
                selectedWarehouse: action.payload,
                canEnterArea: true
            }
        }
    },
    [ADD_PRODUCT_BY_BARCODE]: {
        next(state, action) {
            if (action.payload) {
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
                    currentBarcode: '',
                    snackbar: {
                        severity: 'success',
                        open: true,
                        message: `Prodotto aggiunto con successo.`,
                        timeout: 1000
                    }
                }
            }

            return {
                ...state,
                beepError: 'PLAYING',
                currentBarcode: '',
                snackbar: {
                    severity: 'error',
                    open: true,
                    message: `Prodotto non trovato.`,
                    timeout: 1000
                }
            }
        }
    },
    [SET_CURRENT_BARCODE]: {
        next(state, action) {
            return {
                ...state,
                currentBarcode: action.payload
            }
        }
    },
    [SET_CURRENT_AREA]: {
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
    [SEND_DATA_TO_SERVER]: {
        next(state, action) {
            return {
                ...state,
                rows: [],
                pendingSaves: false,
                selectedWarehouse: "",
                currentArea: null,
            }
        }
    },
    [DISCARD_SAVES]: {
        next(state, action) {
            return {
                ...state,
                rows: [],
                pendingSaves: false,
                selectedWarehouse: "",
                currentArea: null,
            }
        }
    },
    [PLAY_STOP_BEEP]: {
        next(state, action) {
            return {
                ...state,
                beep: action.payload
            }
        }
    },
    [PLAY_STOP_BEEP_ERROR]: {
        next(state, action) {
            return {
                ...state,
                beepError: action.payload
            }
        }
    },
    [SNACKBAR]: {
        next(state, action) {
            return {
                ...state,
                snackbar: {
                    severity: !state.snackbar.open ? action.payload.severity: state.snackbar.severity,
                    open: action.payload.open,
                    message: !state.snackbar.open ? action.payload.message: state.snackbar.message,
                    timeout: !state.snackbar.open ? action.payload.timeout: state.snackbar.message
                }
            }
        }
    }
}, {
    columns: columns,
    rows: [],
    selection: [],
    selectedWarehouse: "",
    currentBarcode: '',
    currentArea: '',
    canEnterArea: false,
    canEnterBarcode: false,
    areas: areas,
    warehouses: warehouses,
    pendingSaves: false,
    beep: 'STOPPED',
    beepError: 'STOPPED',
    snackbar: {
        severity: 'success',
        open: false,
        message: '',
        timeout: 0
    }
});