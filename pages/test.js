import React, {useState} from "react";
import {useQuery} from "mfc-core";
import getQuery from "../components/apps/sap/queries/getQuery";
import Alert from "../components/core/feedback/alert/Alert";
import Button from "../components/core/inputs/button/Button";

export default function test() {
    const [c, sc] = useState()
    const infrastructureHook = useQuery(getQuery('infrastructure'))

    return (
        <div style={{
            padding: '64px',
            boxSizing: 'border-box', width: '100%', height: '100%', flexGrow: 1
        }}>
            <Button onClick={() => sc(true)}>
                Abrir
            </Button>
            <Alert handleClose={() => sc(false)} open={c} delay={5000} onClick={() => null} status={'info'}>
                cafe
            </Alert>
        </div>
    )
}