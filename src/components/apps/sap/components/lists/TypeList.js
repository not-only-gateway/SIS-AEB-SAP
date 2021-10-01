import React, {useRef, useState} from "react";
import animations from "../../styles/Animations.module.css";
import {List, useQuery} from "sis-aeb-core";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import TypeForm from "../forms/TypeForm";

export default function TypeList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    const ref = useRef()
    return (
        <>

            {!open ? null :

                    <TypeForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }} asEntity={true}
                         asDefault={true}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity}/>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    createOption={true}
                    onRowClick={e => setCurrentEntity(e)}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            ProjectRequests.deleteType({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    fields={[
                        {key: 'type', type: 'string', label: 'Tipo'},
                    ]}
                    title={'Tipos'}
                />
            </div>
        </>
    )
}
