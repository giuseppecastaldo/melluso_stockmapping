import React from "react";
import {connect} from "react-redux";
import {Divider, Switch} from "@mui/material";
import {getActions} from "../../../core";
import {useFetching} from "../../../commons/hooks";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Grid from "@mui/material/Grid";

const moduleName = 'barcodes_management';

function SeasonsTable({ seasons, getSeasons, selection, getSelection, setSelection }) {
    useFetching(getSeasons)
    useFetching(getSelection)

    return (
        <>
            <Grid container spacing={1}>
                {
                    seasons.map((season) => (
                        <Grid item xs={6} sm={6}>
                            <ListItem disablePadding onClick={() => setSelection({season: season, selected: !selection.includes(season)})}>
                                <ListItemButton>
                                    <ListItemText primary={season}/>
                                    <Switch onChange={(e) => setSelection({season: season, selected: e.target.checked})} checked={selection.includes(season)}/>
                                </ListItemButton>
                            </ListItem>
                            <Divider/>
                        </Grid>))
                }
            </Grid>
        </>
    );
}

export default connect((state) => state[moduleName], {
    getSelection: getActions(moduleName).getSelection,
    setSelection: getActions(moduleName).setSelection,
    getSeasons: getActions(moduleName).getSeasons
})(SeasonsTable)