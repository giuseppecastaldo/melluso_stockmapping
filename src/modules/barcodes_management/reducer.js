import {db} from "../../db";
import {getActions} from "../../core";

const moduleName = 'barcodes_management';

export default function () {
    return {
        handlers: {
            downloadBarcodes_FULFILLED: {
                next(state, action) {
                    action.asyncDispatch(getActions('app').setSnackbar({
                        severity: 'success',
                        open: true,
                        message: `Barcodes scaricati con successo.`,
                        timeout: 2000
                    }))
                    db.barcodes.clear();
                    db.barcodes.bulkAdd(action.payload);
                    return state;
                }
            },
            getSeasons_FULFILLED: {
                next(state, action) {
                    return {
                        ...state,
                        seasons: action.payload
                    }
                }
            },
            getSelection_FULFILLED: {
                next(state, action) {
                    return {
                        ...state,
                        selection: action.payload.map((s) => s.season)
                    }
                }
            },
            setSelection: {
                next(state, action) {
                    if (action.payload.selected) {
                        db.selectedSeasons.add({ season: action.payload.season } );
                    } else {
                        db.selectedSeasons.delete(action.payload.season)
                    }

                    action.asyncDispatch(getActions(moduleName).getSelection());

                    return state
                }
            }
        },
        defaultState: {
            seasons: [],
            selection: []
        }
    }
}