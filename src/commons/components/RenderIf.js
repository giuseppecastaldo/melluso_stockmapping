import React from "react";

export default function RenderIf(props) {
    return (props.if) ? props.children : null;
}