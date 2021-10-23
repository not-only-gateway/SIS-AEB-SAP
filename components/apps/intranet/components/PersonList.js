import React from "react";
import {useQuery} from "mfc-core";
import {personKeys} from "../keys/keys";
import getQuery from "../queries/getQuery";
import List from "../../../core/visualization/list/List";

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