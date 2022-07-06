import * as React from 'react';
import Header from "./Header";
import ProductsMapping from "./mapping/views/ProductMapping";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import {useEffect} from "react";
import {db} from "./db";

export default function App() {
    const [currentPage, setCurrentPage] = React.useState('1');

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
                    <Tab label="Prodotti" value="1"/>
                    <Tab label="Aree" value="2"/>
                    <Tab label="Barcodes" value="3"/>
                </TabList>
                <TabPanel value="1">
                    <ProductsMapping/>
                </TabPanel>
                <TabPanel value="2">
                </TabPanel>
                <TabPanel value="3">
                </TabPanel>
            </TabContext>
        </>
    );
}