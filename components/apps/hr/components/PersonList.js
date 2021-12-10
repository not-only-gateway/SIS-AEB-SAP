import React from "react";
import {useQuery} from "mfc-core";
import {personKeys} from "../keys/keys";
import getQuery from "../queries/getQuery";
import {request, SelectField, TextField} from "mfc-core";

export default function PersonList(){
    const hook = useQuery(getQuery('person'))

    return (
        <>

            <List
                hook={hook}
                keys={personKeys}
                title={'Colaboradores'}
            />
        </>
    )
}