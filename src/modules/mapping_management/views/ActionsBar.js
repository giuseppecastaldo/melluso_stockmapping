import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React from "react";
import {connect} from "react-redux";
import {getActions} from "../../../core";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Confirm from "../../../commons/components/ConfirmDialog";

function ActionsBar({pendingSaves, discardSaves}) {
    return (
        <>
            <Box sx={{ marginBottom: '20px', padding: 0 }}>
                <Toolbar variant="dense" style={{ padding: 0 }}>
                    <Box sx={{flexGrow: 1}}/>

                    <Confirm message="Conferma" description="Sei sicuro/a di voler procedere al salvataggio dei dati?"
                             confirmAction={discardSaves}>
                        <Button variant="contained" sx={{marginLeft: '20px'}} disabled={!pendingSaves}
                                startIcon={<SaveIcon/>} color="inherit">Salva modifiche</Button>
                    </Confirm>

                    <Confirm message="Conferma"
                             description="Sei sicuro/a di voler procedere? Perderai i progressi fatti fino ad ora."
                             confirmAction={discardSaves}>
                        <Button variant="contained" sx={{marginLeft: '20px'}} disabled={!pendingSaves}
                                startIcon={<CloseIcon/>} color="inherit">Scarta modifiche</Button>
                    </Confirm>
                </Toolbar>
            </Box>
        </>
    );
}

export default connect((state) => {
    return {
        pendingSaves: state['mapping_management'].pendingSaves
    }
}, {
    discardSaves: getActions('mapping_management').discardSaves,
})(ActionsBar);