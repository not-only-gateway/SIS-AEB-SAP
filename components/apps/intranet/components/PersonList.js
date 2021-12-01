import React from "react";

import {List, useQuery} from "mfc-core";
import {personKeys} from "../keys/keys";
import getQuery from "../queries/getQuery";


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