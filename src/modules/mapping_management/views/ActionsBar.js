import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React from "react";
import {connect} from "react-redux";
import {getActions} from "../../../core";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Confirm from "../../../commons/components/ConfirmDialog";

function ActionsBar({ deleteMap, currentArea, pendingSaves, discardSaves, rows, saveProgress, selectedWarehouse, getPercentage }) {
    function saveProgressHandler() {
        saveProgress({
            area: currentArea,
            barcodes: rows
        });
        setTimeout(() => {
            getPercentage(selectedWarehouse);
        }, 1000)
    }

    function deleteMapHandler() {
        setTimeout(() => {
            getPercentage(selectedWarehouse);
        }, 1000)
        deleteMap(selectedWarehouse);
    }

    return (
        <>
            <Box sx={{ marginBottom: '20px', padding: 0 }}>
                <Toolbar variant="dense" style={{ padding: 0 }}>
                    <Box sx={{flexGrow: 1}}/>

                    <Confirm message="Conferma"
                             description="Sei sicuro/a di voler procedere? Perderai tutti i dati associati al negozio."
                             confirmAction={deleteMapHandler} passphrase="elimina mappatura">
                        <Button variant="contained" sx={{marginLeft: '20px'}} disabled={selectedWarehouse === ''}
                                startIcon={<CloseIcon/>}>Elimina mappatura</Button>
                    </Confirm>

                    <Confirm message="Conferma"
                             description="Sei sicuro/a di voler procedere? Perderai i progressi fatti fino ad ora."
                             confirmAction={discardSaves}>
                        <Button variant="contained" sx={{marginLeft: '20px'}} disabled={!pendingSaves}
                                startIcon={<CloseIcon/>} color="inherit">Scarta modifiche</Button>
                    </Confirm>

                    <Confirm message="Conferma" description="Sei sicuro/a di voler procedere al salvataggio dei dati?"
                             confirmAction={saveProgressHandler}>
                        <Button variant="contained" sx={{marginLeft: '20px'}} disabled={!pendingSaves}
                                startIcon={<SaveIcon/>} color="inherit">Salva modifiche</Button>
                    </Confirm>
                </Toolbar>
            </Box>
        </>
    );
}

export default connect((state) => {
    return {
        pendingSaves: state['mapping_management'].pendingSaves,
        rows: state['mapping_management'].rows,
        selectedWarehouse: state['mapping_management'].selectedWarehouse,
        currentArea: state['mapping_management'].currentArea
    }
}, {
    discardSaves: getActions('mapping_management').discardSaves,
    saveProgress: getActions('mapping_management').saveProgress,
    getPercentage: getActions('mapping_management').getPercentage,
    deleteMap: getActions('mapping_management').deleteMap
})(ActionsBar);