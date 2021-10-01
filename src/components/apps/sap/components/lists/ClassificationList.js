import React, {useRef, useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import {List, useQuery} from "sis-aeb-core";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import ClassificationForm from "../forms/ClassificationForm";

export default function ClassificationList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(classification_query)
    
    return (
        <>
            {!open ? null :

                <ClassificationForm
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
                            ProjectRequests.deleteClassification({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    hook={hook}
                    keys={[
                        {name: 'classification', type: 'string', label: 'classificação'},
                        {name: 'type', type: 'string', label: 'tipo'}
                    ]}

                    onRowClick={entity => {
                        setCurrentEntity(entity)
                    }}
                    title={'Componentes'}


                />
            </div>
        </>
    )
}