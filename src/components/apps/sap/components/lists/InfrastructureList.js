import React, {useRef, useState} from "react";

import {List, useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import Infrastructure from "../entities/Infrastructure";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";

export default function InfrastructureList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    
    return (
        <>
            {!open ? null :

                <Infrastructure
                    returnToMain={() => {
                        setOpen(false)
                        hook.clean()
                    }}
                    asDefault={true}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity}
                />

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List

                    createOption={true}
                    onCreate={() => setOpen(true)}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            WorkPlanRequests.deleteInfrastructure({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    onRowClick={e => setCurrentEntity(e)}
                    hook={hook}
                    keys={[
                        {key: 'name', type: 'string', label: 'Nome'},
                        {key: 'type', type: 'string', label: 'Tipo'}
                    ]} labels={['Nome', 'Tipo']}
                    title={'Infraestruturas'}

                />
            </div>
        </>
    )
}
