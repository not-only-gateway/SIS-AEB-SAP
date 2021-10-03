import React, {useRef, useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import ActionForm from "../forms/ActionForm";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import {List, useQuery} from "sis-aeb-core";
import {action_query} from "../../queries/workplan";
import associativeKeys from "../../keys/associativeKeys";


export default function ActionList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(action_query)
    
    return (
        <>

            {!open ? null :

                <ActionForm
                    returnToMain={() => {
                        setOpen(false)
                        hook.clean()
                    }}
                    asDefault={true}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity}/>

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List

                    createOption={true}
                    onCreate={() => setOpen(true)}

                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            ProjectRequests.deleteAction({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    hook={hook}
                    keys={associativeKeys.action}

                    onRowClick={entity => {
                        setCurrentEntity(entity)
                    }} title={'Ações'}

                />
            </div>
        </>
    )
}