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
            }
        },
        defaultState: {
            snackbar: {
                severity: 'success',
                open: false,
                message: '',
                timeout: 0
            }
        }
    }
}