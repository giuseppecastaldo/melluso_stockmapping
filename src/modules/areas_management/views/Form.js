import Grid from "@mui/material/Grid";
import {Checkbox, FormControlLabel, MenuItem, Select, TextField} from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import {connect} from "react-redux";
import {getActions} from "../../../core";
import {useFetching} from "../../../commons/hooks";

const moduleName = 'areas_management';

function Form({getWarehouses, warehouses, selectedWarehouse, setSelectedWarehouse, getAreas, saveArea, generateAreas}) {
    useFetching(() => {
        getWarehouses();
        setSelectedWarehouse('')
    })

    const [side, setSide] = React.useState('');
    const [rack, setRack] = React.useState('');
    const [zone, setZone] = React.useState('');
    const [warehouse_, setWarehouse_] = React.useState('');
    const [auto, setAuto] = React.useState(false)

    function onChangeWarehouse(e) {
        const value = e.target.value;
        setSelectedWarehouse(value);
        getAreas(value)
    }

    function onButtonInsertClick() {
        if (auto) {
            generateAreas(selectedWarehouse, parseInt(rack), parseInt(side), parseInt(zone), parseInt(warehouse_))
        } else {
            saveArea({
                warehouse: warehouse_,
                rack: rack,
                side: side,
                zone: zone,
                store: selectedWarehouse
            })
        }


        setSide('')
        setRack('')
        setZone('')
        setWarehouse_('')
        setAuto(false)
    }

    return (
        <form>
            <Select
                size="small"
                autoFocus
                fullWidth
                displayEmpty
                value={selectedWarehouse}
                onChange={onChangeWarehouse}
                style={{marginBottom: '20px'}}
                variant="outlined"
            >
                <MenuItem disabled value="">
                    <em>Seleziona uno store</em>
                </MenuItem>
                {
                    warehouses.map((warehouse) => {
                        return <MenuItem key={warehouse.code}
                                         value={warehouse.code}>{warehouse.code} - {warehouse.description}</MenuItem>
                    })
                }
            </Select>
            <Grid container sx={{flexGrow: 1}} spacing={1}>
                <Grid item xs={3}>
                    <FormControlLabel
                        control={
                            <Checkbox checked={auto} onChange={(e) => setAuto(e.target.checked)}  name="auto" />
                        }
                        label="Generazione automatica aree"
                    />
                </Grid>

                <Grid item xs={9}>
                    <TextField size="small"
                               type={auto ? 'number' : 'text'}
                               fullWidth
                               disabled={selectedWarehouse === ""}
                               value={warehouse_}
                               onChange={(e) => setWarehouse_(e.target.value.toUpperCase())}
                               label="Magazzino"
                               id="warehouse"
                               style={{marginBottom: '20px'}}
                               variant="filled"/>
                </Grid>
            </Grid>
            <Grid container sx={{flexGrow: 1}} spacing={1}>
                <Grid item xs={3.3}>
                    <TextField size="small"
                               type={auto ? 'number' : 'text'}
                               fullWidth
                               disabled={warehouse_ === ""}
                               value={rack}
                               onChange={(e) => setRack(e.target.value.toUpperCase())}
                               label="Scaffale"
                               id="rack"
                               style={{marginBottom: '20px'}}
                               variant="filled"/>
                </Grid>
                <Grid item xs={3.3}>
                    <TextField size="small"
                               type={auto ? 'number' : 'text'}
                               fullWidth
                               label="Zona"
                               onChange={(e) => setZone(e.target.value.toUpperCase())}
                               disabled={selectedWarehouse === "" || rack === ''}
                               value={zone}
                               id="zone"
                               style={{marginBottom: '20px'}}
                               variant="filled"/>
                </Grid>
                <Grid item xs={3.3}>
                    <TextField size="small"
                               type={auto ? 'number' : 'text'}
                               fullWidth
                               label="Lato"
                               disabled={selectedWarehouse === "" || zone === ''}
                               value={side}
                               onChange={(e) => setSide(e.target.value.toUpperCase())}
                               id="side"
                               style={{marginBottom: '20px'}}
                               variant="filled"/>
                </Grid>

                <Grid item xs={2}>
                    <Button size="large"
                            onClick={onButtonInsertClick}
                            disabled={selectedWarehouse === "" || side === ''}
                            startIcon={<AddIcon/>}
                            fullWidth
                            variant="contained">Inserisci</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default connect(state => state[moduleName], {
    getWarehouses: getActions(moduleName).getWarehouses,
    setSelectedWarehouse: getActions(moduleName).setSelectedWarehouse,
    getAreas: getActions(moduleName).getAreas,
    saveArea: getActions(moduleName).saveArea,
    generateAreas: getActions(moduleName).generateAreas
})(Form)