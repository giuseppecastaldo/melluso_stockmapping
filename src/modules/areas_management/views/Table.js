import {connect} from "react-redux";
import {DataGrid, GridToolbarContainer, GridToolbarExport, itIT} from "@mui/x-data-grid";
import * as React from "react";
import {getActions} from "../../../core";
import {Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const moduleName = 'areas_management'

function Table({ areas, areasColumns, areasSelection, setAreasSelection, deleteSelectedAreas }) {
    function CustomToolbar() {
        return (
            <GridToolbarContainer sx={ {float: "right" }}>
                <GridToolbarExport />
                <Button
                    startIcon={<DeleteIcon />}
                    disabled={areasSelection.length === 0}
                    onClick={deleteSelectedAreas}
                >
                    Elimina selezione
                </Button>
            </GridToolbarContainer>
        );
    }

    return (
        <DataGrid autoHeight
                  localeText={itIT.components.MuiDataGrid.defaultProps.localeText}
                  density="compact"
                  rows={areas}
                  selectionModel={areasSelection}
                  onSelectionModelChange={(model) => setAreasSelection(model)}
                  getRowId={(row) => row.code}
                  checkboxSelection={true}
                  components={{
                      Toolbar: CustomToolbar,
                  }}
                  columns={areasColumns}
        />
    );
}

export default connect(state => state[moduleName], {
    setAreasSelection: getActions(moduleName).setAreasSelection,
    deleteSelectedAreas: getActions(moduleName).deleteSelectedAreas
})(Table);