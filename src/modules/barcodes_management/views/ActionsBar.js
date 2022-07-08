import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React from "react";
import {connect} from "react-redux";
import {getActions} from "../../../core";
import Confirm from "../../../commons/components/ConfirmDialog";
import DownloadIcon from '@mui/icons-material/Download';

const moduleName = 'barcodes_management';

function ActionsBar({ downloadBarcodes, selection }) {
    return (
        <>
            <Box sx={{ marginBottom: '20px', padding: 0 }}>
                <Toolbar variant="dense" style={{ padding: 0 }}>
                    <Box sx={{flexGrow: 1}}/>

                    <Confirm message="Conferma" description="Sei sicuro/a di voler scaricare i barcodes? Il processo potrebbe richiedere un po' di tempo"
                             confirmAction={() => downloadBarcodes(selection)}>
                        <Button variant="contained" sx={{marginLeft: '20px'}} disabled={selection.length === 0} startIcon={<DownloadIcon/>} color="inherit">Scarica barcodes</Button>
                    </Confirm>
                </Toolbar>
            </Box>
        </>
    );
}

export default connect((state) => {
    return {
        ...state[moduleName]
    }
}, {
    downloadBarcodes: getActions(moduleName).downloadBarcodes
})(ActionsBar);