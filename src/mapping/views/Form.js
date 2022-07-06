import * as React from 'react';
import {FormControl, MenuItem, Select, TextField} from "@mui/material";
import {connect} from "react-redux";
import {addProductByBarcode, setCurrentArea, setCurrentBarcode, setSelectedWarehouse} from "../../actions";
import {Autocomplete} from "@mui/lab";
import SoundFeedback from "./SoundFeedback";

function Form({ selectedWarehouse, setSelectedWarehouse, addProductByBarcode, setCurrentBarcode, currentBarcode, currentArea, setCurrentArea, canEnterArea, canEnterBarcode, areas, warehouses, pendingSaves }) {
    const [barcodeFocus, setBarcodeFocus] = React.useState(false);

    function handleChangedArea(e, value) {
        setCurrentArea(value)
    }

    function handleBarcodeArea(e) {
        const area = areas.find((area) => area.code === e.target.value)
        if (area) {
            setCurrentArea(`${area.rack} - ${area.zone} - ${area.side}`);
            setBarcodeFocus(true);
        }
    }

    function handleBarcodeInsertion(e) {
        const value = e.target.value;
        setCurrentBarcode(value)

        if (e.target.value.length === 13) {
            addProductByBarcode(value)
        }
    }

    function onChangeWarehouse(e) {
        setSelectedWarehouse(e.target.value);
    }

    return (
        <>
            <SoundFeedback/>
            <FormControl fullWidth>
                <Select
                    autoFocus
                    displayEmpty
                    value={selectedWarehouse}
                    disabled={pendingSaves}
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
                <Autocomplete
                    fullWidth
                    autoFocus={true}
                    options={areas}
                    value={currentArea}
                    disabled={!canEnterArea || pendingSaves}
                    onChange={handleChangedArea}
                    style={{ marginBottom: '20px'}}
                    renderInput={(params) => <TextField onChange={handleBarcodeArea} variant="filled" {...params} label="Area" />}
                />
                <TextField fullWidth
                           autoFocus={barcodeFocus}
                           label="Barcode"
                           disabled={!canEnterBarcode}
                           value={currentBarcode}
                           onChange={handleBarcodeInsertion}
                           id="barcode"
                           style={{ marginBottom: '20px' }}
                           variant="filled"/>
            </FormControl>
        </>
    );
}

export default connect(state => state, { setSelectedWarehouse, addProductByBarcode, setCurrentBarcode, setCurrentArea })(Form)
