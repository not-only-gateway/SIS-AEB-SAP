import React, {useRef, useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import TypeForm from "../forms/TypeForm";
import workPlanKeys from "../../keys/workPlanKeys";
import associativeKeys from "../../keys/associativeKeys";

export default function TypeList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    
    return (
        <>

            {!open ? null :

                    <TypeForm
                        returnToMain={() => {
                            setOpen(false)
                            hook.clean()
                        }} asEntity={true}
                         asDefault={true}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity}/>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    createOption={true}
                    onCreate={() => setOpen(true)}
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
                    hook={hook}
                    keys={associativeKeys.type}
                    title={'Tipos'}
                />
            </div>
        </>
    )
}
