import {createAction, createActions} from 'redux-actions';
import {db} from "./db";

export const SET_ROWS_SELECTION = 'SET_ROWS_SELECTION';
export const INCREMENT_QTY = 'INCREMENT_QTY';
export const DECREMENT_QTY = 'DECREMENT_QTY';
export const DELETE_SELECTED_ROWS = 'DELETE_SELECTED_ROWS';
export const SET_SELECTED_WAREHOUSE = 'SET_SELECTED_WAREHOUSE';
export const ADD_PRODUCT_BY_BARCODE = 'ADD_PRODUCT_BY_BARCODE';
export const SET_CURRENT_BARCODE = 'SET_CURRENT_BARCODE';
export const SET_CURRENT_AREA = 'SET_CURRENT_AREA';
export const SEND_DATA_TO_SERVER = 'SEND_DATA_TO_SERVER';
export const DISCARD_SAVES = 'DISCARD_SAVES';

export const APP = 'APP';

export const PLAY_STOP_BEEP = 'PLAY_STOP_BEEP';
export const PLAY_STOP_BEEP_ERROR = 'PLAY_STOP_BEEP_ERROR';
export const SNACKBAR = 'SNACKBAR';

export const setSnackbar = createAction(SNACKBAR);
export const playStopBeep = createAction(PLAY_STOP_BEEP);
export const playStopBeepError = createAction(PLAY_STOP_BEEP_ERROR)
export const sendDataToServer = createAction(SEND_DATA_TO_SERVER);
export const discardSaves = createAction(DISCARD_SAVES);
export const setCurrentBarcode = createAction(SET_CURRENT_BARCODE);
export const setCurrentArea = createAction(SET_CURRENT_AREA);
export const setSelectedWarehouse = createAction(SET_SELECTED_WAREHOUSE);
export const setRowsSelection = createAction(SET_ROWS_SELECTION);
export const incrementQty = createAction(INCREMENT_QTY);
export const decrementQty = createAction(DECREMENT_QTY);
export const deleteSelectedRows = createAction(DELETE_SELECTED_ROWS);
export const addProductByBarcode = createAction(ADD_PRODUCT_BY_BARCODE, barcode => db.barcodes.get(barcode));