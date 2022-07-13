import * as React from 'react';
import {FormControl, MenuItem, Select, TextField} from "@mui/material";
import {connect} from "react-redux";
import { Autocomplete } from '@mui/material';
import SoundFeedback from "./SoundFeedback";
import {getActions} from "../../../core";
import {useFetching} from "../../../commons/hooks";

const moduleName = 'mapping_management';

function Form({ fillRows, getPercentage, selectedWarehouse, setSelectedWarehouse, addProductByBarcode, setCurrentBarcode, currentBarcode, currentArea, setCurrentArea, canEnterArea, canEnterBarcode, areas, warehouses, pendingSaves, getWarehouses, getAreas }) {
    useFetching(() => {
        getWarehouses();

        if (selectedWarehouse !== '') {
            getAreas(selectedWarehouse);
            getPercentage(selectedWarehouse);
        }
    })
    const barcodeTextRef = React.useRef();

    function handleChangedArea(e, value) {
        setCurrentArea(value);
        if (value) {
            fillRows(value);
        }
    }

    function handleBarcodeArea(e) {
        const area = areas.find((area) => area.code === e.target.value)
        if (area) {
            setCurrentArea(area);
            fillRows(area);
        }
    }

    function handleBarcodeInsertion(e) {
        const value = e.target.value;
        setCurrentBarcode(value)
    }

    function onChangeWarehouse(e) {
        const value = e.target.value;
        setSelectedWarehouse(value);
        getAreas(value);
        setCurrentArea(null);
        getPercentage(value);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            addProductByBarcode(currentBarcode)
        }
    }

    function handleAreaKeyDown(e) {
        if (e.key === 'Enter') {
            barcodeTextRef.current.focus();
        }
    }

    return (
        <>
            <SoundFeedback/>
            <FormControl fullWidth>
                <Select
                    size="small"
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
                    size="small"
                    autoHighlight
                    fullWidth
                    noOptionsText="Non sono presenti aree"
                    options={areas}
                    value={currentArea}
                    disabled={!canEnterArea || pendingSaves}
                    isOptionEqualToValue={(option, value) => option.code === value}
                    onChange={handleChangedArea}
                    style={{ marginBottom: '20px'}}
                    renderInput={(params) => <TextField onChange={handleBarcodeArea} onKeyDown={handleAreaKeyDown} variant="filled" {...params} label="Area" />}
                />
                <TextField fullWidth
                           size="small"
                           label="Barcode"
                           disabled={!canEnterBarcode}
                           value={currentBarcode}
                           inputRef={barcodeTextRef}
                           onChange={handleBarcodeInsertion}
                           onKeyDown={handleKeyDown}
                           id="barcode"
                           style={{ marginBottom: '20px' }}
                           variant="filled"/>
            </FormControl>
        </>
    );
}

export default connect(state => state[moduleName], {
    setSelectedWarehouse: getActions(moduleName).setSelectedWarehouse,
    addProductByBarcode: getActions(moduleName).addProductByBarcode,
    setCurrentBarcode: getActions(moduleName).setCurrentBarcode,
    setCurrentArea: getActions(moduleName).setCurrentArea,
    getWarehouses: getActions(moduleName).getWarehouses,
    getAreas: getActions(moduleName).getAreas,
    fillRows: getActions(moduleName).fillRows,
    getPercentage: getActions(moduleName).getPercentage
})(Form)
