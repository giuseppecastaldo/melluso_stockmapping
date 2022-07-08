import React from "react";
import {connect} from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Switch} from "@mui/material";
import {getActions} from "../../../core";
import { useFetching } from "../../../commons/hooks";

const moduleName = 'barcodes_management';

function SeasonsTable({ seasons, getSeasons, selection, getSelection, setSelection }) {
    useFetching(getSeasons)
    useFetching(getSelection)

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Codice</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {seasons.map((season) => (
                        <TableRow
                            key={season}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {season}
                            </TableCell>
                            <TableCell align="right">
                                <Switch onChange={ (e) => setSelection({ season: season, selected: e.target.checked }) } checked={ selection.includes(season) } />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default connect((state) => state[moduleName], {
    getSelection: getActions(moduleName).getSelection,
    setSelection: getActions(moduleName).setSelection,
    getSeasons: getActions(moduleName).getSeasons
})(SeasonsTable)