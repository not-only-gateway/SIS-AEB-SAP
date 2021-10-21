import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import ActionForm from "../forms/ActionForm";
import {List, useQuery} from "sis-aeb-core";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import deleteEntry from "../../utils/requests/delete";
import getQuery from "../../queries/getQuery";


export default function ActionList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('action'))
    
    return (
        <Switcher openChild={open ? 0 : 1}>
            <div style={{paddingTop: '32px'}}>
                <ActionForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()
                    }}
                    asDefault={true}
                    create={!currentEntity}
                    data={currentEntity}/>
            </div>
            
                <List

                    createOption={true}
                    onCreate={() => setOpen(true)}

                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            deleteEntry({
                                suffix: 'action',
                                pk: entity.id
                            }).then(() => hook.clean())
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    hook={hook}
                    keys={associativeKeys.action}
                    onRowClick={e => {
                        setOpen(true)
                        setCurrentEntity(e)
                    }} title={'Ações'}

                />
            </Switcher>
    )
}