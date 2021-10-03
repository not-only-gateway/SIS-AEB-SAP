import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";

import {DeleteRounded} from "@material-ui/icons";
import OperationRequests from "../../utils/requests/OperationRequests";
import {List, useQuery} from "sis-aeb-core";
import ResourceApplicationForm from "../forms/ResourceApplicationForm";
import associativeKeys from "../../keys/associativeKeys";
import workPlanKeys from "../../keys/workPlanKeys";


export default function ResourceApplicationList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    

    return (
        <div style={{width: '100%'}}>

            {!open ? null :

                    <ResourceApplicationForm
                        returnToMain={() => {
                            setOpen(false)
                            hook.clean()
                        }}

                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} operation={props.operation}/>

            }
            <div style={{display: open ? 'none' : undefined}}>
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
                    fetchParams={{
                        operation: props.operation.id
                    }}
                />
            </div>
        </div>
    )
}
ResourceApplicationList.propTypes = {
    operation: PropTypes.object
}