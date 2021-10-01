import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import {List, useQuery} from "sis-aeb-core";
import ComponentForm from "../forms/ComponentForm";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";

export default function ComponentsList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    
    const hook = useQuery()
    return (
        <>

            {!open ? null :
                <ComponentForm
                    returnToMain={() => {
                        setOpen(false)
                        hook.clean()
                    }}

                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} infrastructure={props.infrastructure}
                />

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    createOption={true}
                    onCreate={() => setOpen(true)}

                    hook={hook}
                    keys={[
                        {key: 'classification', type: 'object',subfieldKey: 'classification', label: 'classificação'},
                        {key: 'classification', type: 'object',subfieldKey: 'type', label: 'tipo'},
                        {key: 'situation', type: 'string',label: 'situação'}
                    ]}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            WorkPlanRequests.deleteComponent({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    onRowClick={entity => {
                        setCurrentEntity(entity)
                    }}
                    title={'Situações Operacionais de Componentes'}
                    fetchParams={{
                        infrastructure: props.infrastructure.id
                    }}
                />
            </div>
        </>
    )
}
ComponentsList.propTypes = {
    infrastructure: PropTypes.object
}