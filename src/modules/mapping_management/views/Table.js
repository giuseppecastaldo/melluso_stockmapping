import * as React from 'react';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
    itIT
} from "@mui/x-data-grid";
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {connect} from "react-redux";

function Table({rows, columns, selection, setRowsSelection, incrementQty, decrementQty, deleteSelectedRows}) {
    function CustomToolbar() {
        return (
            <GridToolbarContainer sx={ {float: "right" }}>
                <GridToolbarExport />
                <Button
                    startIcon={<DeleteIcon />}
                    disabled={selection.length === 0}
                    onClick={deleteSelectedRows}
                >
                    Elimina selezione
                </Button>
                <Button
                    startIcon={<AddCircleIcon/>}
                    disabled={selection.length === 0}
                    onClick={incrementQty}
                >
                    Incrementa
                </Button>
                <Button
                    startIcon={<RemoveCircleIcon/>}
                    disabled={selection.length === 0}
                    onClick={decrementQty}
                >
                    Decrementa
                </Button>
            </GridToolbarContainer>
        );
    }

    return (
        <>
            <DataGrid autoHeight
                      localeText={itIT.components.MuiDataGrid.defaultProps.localeText}
                      density="compact"
                      rows={rows}
                      checkboxSelection={true}
                      onSelectionModelChange={(ids) => {
                          setRowsSelection(ids);
                      }}
                      components={{
                          Toolbar: CustomToolbar,
                      }}
                      columns={columns}
            />
        </>
    );
}

const moduleName = 'mapping_management';

export default connect((state) => {
    return {
        ...state[moduleName],
        ...state
    }
})(Table)
