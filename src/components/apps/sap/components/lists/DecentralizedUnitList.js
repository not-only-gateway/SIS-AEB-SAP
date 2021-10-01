import React, {useRef, useState} from "react";
import {DeleteRounded, GetAppRounded} from "@material-ui/icons";
import {List, useQuery} from "sis-aeb-core";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import DecentralizedUnitForm from "../forms/DecentralizedUnitForm";


export default function DecentralizedUnitList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    
    return (
        <>
            {!open ? null :

                <DecentralizedUnitForm
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
                            ProjectRequests.deleteDecentralizedUnit({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    hook={hook}
                    keys={[
                        {key: 'name', type: 'string', label: 'Nome'},
                        {key: 'responsible', type: 'string', label: 'responsável'}
                    ]}
                    clickEvent={() => setOpen(true)}
                    onRowClick={entity => {
                        setCurrentEntity(entity)
                    }}
                    title={'Unidades descentralizadas'}

                />
            </div>
        </>
    )
}