import * as React from 'react';
import Header from "./Header";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import {getActions, getModules} from "./core";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {connect} from "react-redux";
import Error401 from "./Error401";

function App({ loading, currentTab, setTab }) {


    function handleChangePage(event, newValue) {
        setTab(newValue);
    }

    return (
        <>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={ loading }>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Error401/>
            <Header/>
            <TabContext value={currentTab}>
                <TabList onChange={handleChangePage} variant="scrollable" >
                    {getModules().map((module) => <Tab key={module.manifest.moduleName} label={module.manifest.friendlyName} value={module.manifest.moduleName}/>)}
                </TabList>

                {getModules().map((module) => <TabPanel key={module.manifest.moduleName} value={module.manifest.moduleName}>{ require(`./modules/${module.manifest.moduleName}/views/MainView`).MainView() }</TabPanel>)}
            </TabContext>
        </>
    );
}

export default connect( state => state['app'], {
    setTab: getActions('app').setTab
})(App)