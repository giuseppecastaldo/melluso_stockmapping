const areasColumns = [
    {field: 'code', headerName: 'Codice', flex: 1},
    {field: 'rack', headerName: 'Scaffale', flex: 1},
    {field: 'zone', headerName: 'Zona', flex: 1},
    {field: 'side', headerName: 'Lato', flex: 1}
];

export default function () {
    return {
        handlers: {
            setAreasSelection: {
                next(state, action) {
                    return {
                        ...state,
                        areasSelection: action.payload
                    }
                }
            },
            deleteArea_FULFILLED: {
                next(state, action) {
                    return {
                        ...state,
                        areas: state.areas.filter((area) => !state.areasSelection.includes(area.code)),
                    }
                }
            },
            getWarehouses_FULFILLED: {
                next(state, action) {
                    return {
                        ...state,
                        warehouses: action.payload
                    }
                }
            },
            setSelectedWarehouse: {
                next(state, action) {
                    if (action.payload === '') {
                        return {
                            ...state,
                            selectedWarehouse: action.payload,
                            areas: []
                        }
                    }

                    return {
                        ...state,
                        selectedWarehouse: action.payload
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
            saveArea_FULFILLED: {
                next(state, action) {
                    return {
                        ...state,
                        areas: [action.payload.entity, ...state.areas]
                    }
                }
            }
        },
        defaultState: {
            areas: [],
            areasColumns: areasColumns,
            areasSelection: [],
            warehouses: [],
            selectedWarehouse: "",
        }
    }
}