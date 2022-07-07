import * as React from 'react';
import Header from "./Header";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import {useEffect} from "react";
import {db} from "./db";
import {getModules} from "./core";

export default function App() {
    const [currentPage, setCurrentPage] = React.useState(getModules()[0].manifest.moduleName);

    useEffect(() => {
        db.barcodes.add({
            barcode: '0000000000000',
            product: 'hello',
            variation: 'jdbnf',
            size: 'sjn'
        });
    })

    function handleChangePage(event, newValue) {
        setCurrentPage(newValue);
    }

    return (
        <>
            <Header/>
            <TabContext value={currentPage}>
                <TabList onChange={handleChangePage} variant="scrollable" >
                    {getModules().map((module) => <Tab key={module.manifest.moduleName} label={module.manifest.friendlyName} value={module.manifest.moduleName}/>)}
                </TabList>

                {getModules().map((module) => <TabPanel key={module.manifest.moduleName} value={module.manifest.moduleName}>{module.manifest.mainView}</TabPanel>)}
            </TabContext>
        </>
    );
}