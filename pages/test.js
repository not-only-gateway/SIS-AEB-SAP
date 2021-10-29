import Button from "../components/core/inputs/button/Button";
import React, {useState} from "react";
import TextField from "../components/core/inputs/text/TextField";
import DropDownField from "../components/core/inputs/dropdown/DropDownField";
import MultiSelectField from "../components/core/inputs/multiselect/MultiSelectField";
import {useQuery} from "mfc-core";
import getQuery from "../components/apps/sap/queries/getQuery";
import Selector from "../components/core/inputs/selector/Selector";
import associativeKeys from "../components/apps/sap/keys/associativeKeys";
import InfrastructureForm from "../components/apps/sap/components/forms/InfrastructureForm";
import FileField from "../components/core/inputs/file/FileField";
import DateField from "../components/core/inputs/date/DateField";

export default function test() {
    const [c, sc] = useState()
    const infrastructureHook = useQuery(getQuery('infrastructure'))

    return (
        <>
            <div style={{height: '10%', background: 'green'}}/>
            <div style={{height: '100%', background: 'red'}}/>
        </>
    )
}