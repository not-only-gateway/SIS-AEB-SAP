import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import {List, useQuery} from "sis-aeb-core";
import ComponentForm from "../forms/ComponentForm";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";

export default function ComponentsList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    
    const hook = useQuery(component_query({
        infrastructure: props.infrastructure.id
    }))
    return (
        <Switcher openChild={open ? 0 : 1}>
                <ComponentForm
                    returnToMain={() => {
                        setOpen(false)
                        hook.clean()
                    }}

                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} infrastructure={props.infrastructure}
                />
                <List
                    createOption={true}
                    onCreate={() => setOpen(true)}

                    hook={hook}
                    keys={associativeKeys.components}
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
                    
                />
            </Switcher>
    )
}
ComponentsList.propTypes = {
    infrastructure: PropTypes.object
}