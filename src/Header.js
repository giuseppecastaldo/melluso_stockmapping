import * as React from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OutboxIcon from '@mui/icons-material/Outbox';
import Box from "@mui/material/Box";
import {connect} from "react-redux";
import {Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";
import {getActions} from "./core";

function Header({ snackbar, setSnackbar, discardSaves }) {
    function returnToWebsite() {
        window.location.href = "/";
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                open={snackbar.open}
                autoHideDuration={parseInt(snackbar.timeout)}
                onClose={() => setSnackbar(false)}
            >
                <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={returnToWebsite}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Box component="div" sx={{flexGrow: 1, textAlign: 'center'}}>
                        <img src={'./melluso_logo.png'} height="30" alt="MellusoStock"/>
                    </Box>
                    <Box sx={{ width: '48px' }}/>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default connect((state) => {
    return {
        snackbar: state['app'].snackbar,
        discardSaves: state['mapping_management'].discardSaves
    }
}, {
    discardSaves: getActions('mapping_management').discardSaves,
    setSnackbar: getActions('app').setSnackbar
})(Header);

