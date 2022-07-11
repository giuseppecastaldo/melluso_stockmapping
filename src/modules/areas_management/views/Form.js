import Grid from "@mui/material/Grid";
import {MenuItem, Select, TextField} from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import {connect} from "react-redux";
import {getActions} from "../../../core";
import {useFetching} from "../../../commons/hooks";

const moduleName = 'areas_management';

function Form({ getWarehouses, warehouses, selectedWarehouse, setSelectedWarehouse, getAreas }) {
    useFetching(getWarehouses)

    function onChangeWarehouse(e) {
        const value = e.target.value;
        setSelectedWarehouse(value);
        getAreas(value)
    }

    return (
        <>
            <Select
                size="small"
                autoFocus
                fullWidth
                displayEmpty
                value={selectedWarehouse}
                onChange={onChangeWarehouse}
                style={{ marginBottom: '20px' }}
                variant="outlined"
            >
                <MenuItem disabled value="">
                    <em>Seleziona uno store</em>
                </MenuItem>
                {
                    warehouses.map((warehouse) => {
                        return <MenuItem key={warehouse.code} value={warehouse.code}>{warehouse.code} - {warehouse.description}</MenuItem>
                    })
                }
            </Select>
            <Grid container sx={{ flexGrow: 1 }} spacing={1}>
                <Grid item xs={3.3}>
                    <TextField size="small"
                               fullWidth
                               disabled={selectedWarehouse === ""}
                               label="Scaffale"
                               id="rack"
                               style={{ marginBottom: '20px' }}
                               variant="filled"/>
                </Grid>
                <Grid item xs={3.3}>
                    <TextField size="small" fullWidth
                               label="Zona"
                               disabled={selectedWarehouse === ""}
                               id="zone"
                               style={{ marginBottom: '20px' }}
                               variant="filled"/>
                </Grid>
                <Grid item xs={3.3}>
                    <TextField size="small" fullWidth
                               label="Lato"
                               disabled={selectedWarehouse === ""}
                               id="side"
                               style={{ marginBottom: '20px' }}
                               variant="filled"/>
                </Grid>

                <Grid item xs={2}>
                    <Button size="large" disabled={selectedWarehouse === ""} startIcon={<AddIcon/>} fullWidth variant="contained">Inserisci</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default connect(state => state[moduleName], {
    getWarehouses: getActions(moduleName).getWarehouses,
    setSelectedWarehouse: getActions(moduleName).setSelectedWarehouse,
    getAreas: getActions(moduleName).getAreas
})(Form)