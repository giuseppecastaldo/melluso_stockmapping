import React from "react";
import Form from "./Form";
import ProductsTable from "./Table";
import ActionsBar from "./ActionsBar";

export function MainView() {
    return (
        <>
            <ActionsBar/>
            <Form/>
            <ProductsTable/>
        </>
    );
}