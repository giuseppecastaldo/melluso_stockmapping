import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {connect} from "react-redux";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";

function Error401({ tokenExpired }) {
    function backToHome() {
        window.location.href = "/";
    }

    return (
        <Dialog open={tokenExpired}>
            <DialogTitle>Sessione scaduta</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Clicca su "Torna alla homepage" per eseguire nuovamente l'accesso

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={backToHome}>Torna alla homepage</Button>
            </DialogActions>
        </Dialog>
    );
}

export default connect(state => state['app'])(Error401)

