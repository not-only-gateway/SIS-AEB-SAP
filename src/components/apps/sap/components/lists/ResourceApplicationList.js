import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";

import {DeleteRounded} from "@material-ui/icons";
import OperationRequests from "../../utils/requests/OperationRequests";
import {List, useQuery} from "sis-aeb-core";
import ResourceApplicationForm from "../forms/ResourceApplicationForm";
import associativeKeys from "../../keys/associativeKeys";
import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import {operation_query} from "../../queries/workplan";


export default function ResourceApplicationList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(operation_query({
        operation: props.operation.id
    }))
    

    return (
        <Switcher openChild={open ? 0 : 1}>
                    <ResourceApplicationForm
                        returnToMain={() => {
                            setOpen(false)
                            hook.clean()
                        }}

                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} operation={props.operation}/>

                <List
                    onRowClick={e => setCurrentEntity(e)}
                    createOption={true}
                    onCreate={() => setOpen(true)}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            OperationRequests.deleteResource({
                                pk: entity.id,
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    hook={hook}
                    keys={workPlanKeys.resource}
                    title={'Aplicação dos recursos'}
                    
                />
        </Switcher>
    )
}
ResourceApplicationList.propTypes = {
    operation: PropTypes.object
}