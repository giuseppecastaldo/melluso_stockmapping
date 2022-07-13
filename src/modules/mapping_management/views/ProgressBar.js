import React from "react";
import {connect} from "react-redux";
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#d61e4c' : '#d61e4c',
    },
}));

function ProgressBar({ percentage }) {
    return (
        <BorderLinearProgress variant="determinate" value={percentage}/>
    );
}

export default connect(state => state['mapping_management'])(ProgressBar)