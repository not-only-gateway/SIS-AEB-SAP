import React, {useState} from "react";
import {useQuery} from "sis-aeb-core";
import Switcher from "../../../core/misc/switcher/Switcher";
import ActionForm from "../../sap/components/forms/ActionForm";
import {DeleteRounded} from "@material-ui/icons";
import ProjectRequests from "../../sap/utils/requests/ProjectRequests";
import associativeKeys from "../../sap/keys/associativeKeys";
import {personKeys} from "../keys/keys";
import getQuery from "../queries/getQuery";
import List from "../../../core/list/List";

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