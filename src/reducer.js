export default function () {
    return {
        handlers: {
            setSnackbar: {
                next(state, action) {
                    return {
                        ...state,
                        snackbar: {
                            severity: !state.snackbar.open ? action.payload.severity : state.snackbar.severity,
                            open: action.payload.open,
                            message: !state.snackbar.open ? action.payload.message : state.snackbar.message,
                            timeout: !state.snackbar.open ? action.payload.timeout : state.snackbar.message
                        }
                    }
                }
            },
            setLoading: {
                next(state, action) {
                    return {
                        ...state,
                        loading: action.payload
                    }
                }
            },
            setTab: {
                next(state, action) {
                    return {
                        ...state,
                        currentTab: action.payload
                    }
                }
            },
            setTokenExpired: {
                next(state, action) {
                    return {
                        ...state,
                        tokenExpired: action.payload
                    }
                }
            }
        },
        defaultState: {
            loading: false,
            snackbar: {
                severity: 'success',
                open: false,
                message: '',
                timeout: 0
            },
            currentTab: 'mapping_management',
            tokenExpired: false
        },
    }
}