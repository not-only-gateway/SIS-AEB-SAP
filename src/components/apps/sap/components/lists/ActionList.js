import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import ActionForm from "../forms/ActionForm";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import {List, useQuery} from "sis-aeb-core";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import getQuery from "../../queries/getQuery";


export default function ActionList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('action'))
    
    return (
        <Switcher openChild={open ? 0 : 1}>
                <ActionForm
                    returnToMain={() => {
                        setOpen(false)
                        hook.clean()
                    }}
                    asDefault={true}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity}/>
            
            
                <List

                    createOption={true}
                    onCreate={() => setOpen(true)}

                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            ProjectRequests.deleteAction({
                                pk: entity.id
                            }).then(() => hook.clean())
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
            </Switcher>
    )
}