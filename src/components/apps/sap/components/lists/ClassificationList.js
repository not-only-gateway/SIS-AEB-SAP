import React, {useRef, useState} from "react";
import Cookies from "universal-cookie/lib";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import Host from "../../utils/shared/Host";
import {List, useQuery} from "sis-aeb-core";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import ClassificationForm from "../forms/ClassificationForm";

export default function ClassificationList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(classification_query)
    const ref = useRef()
    return (
        <>
            {!open ? null :

                <ClassificationForm
                    returnToMain={() => {
                        setOpen(false)
                        setRefreshed(false)
                    }}
                    asDefault={true}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity}/>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    createOption={true}
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
                    fields={[
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