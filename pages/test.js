import React, {useState} from "react";
import {useQuery} from "mfc-core";
import getQuery from "../components/apps/sap/queries/getQuery";
import TedForm from "../components/apps/sap/components/forms/TedForm";

export default function test() {
    const [c, sc] = useState()
    const infrastructureHook = useQuery(getQuery('infrastructure'))

    return (
        <div style={{padding: '64px',
        boxSizing: 'border-box', width: '100%', height: '100%', flexGrow: 1}}>
            <TedForm />
        </div>
    )
}