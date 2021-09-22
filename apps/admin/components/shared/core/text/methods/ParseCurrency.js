import React from "react";

export default function ParseCurrency(event) {
    let value = event;

    value = value + '';
    value = parseInt(value.replace(/[\D]+/g, ''));
    value = value + '';
    value = value.replace(/([0-9]{2})$/g, ".$1");

    return value
}