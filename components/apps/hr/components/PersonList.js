import React from "react";

import {personKeys} from "../keys/keys";
import getQuery from "../queries/getQuery";
import {List, useQuery} from 'mfc-core';

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