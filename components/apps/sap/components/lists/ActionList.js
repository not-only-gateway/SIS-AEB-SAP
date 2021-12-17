import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import ActionForm from "../forms/ActionForm";


import associativeKeys from "../../keys/associativeKeys";

import getQuery from "../../utils/getQuery";
import useList from "../../../../addons/useList";
import ListTemplate from "../../../../addons/ListTemplate";
import {List, Switcher, useQuery} from 'mfc-core'

export default function ActionList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('action'))
    const {
        message,
        setMessage,
        openModal,
        setOpenModal,
        onDecline,
        setCurrentEl,
        onAccept
    } = useList('action', () => hook.clean())

    return (
        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
          <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>
                <ActionForm
                    handleClose={() => {
                        setCurrentEntity(null)
                        setOpen(false)
                        hook.clean()
                    }}
                    asDefault={true}
                    create={!currentEntity}
                    data={currentEntity}/>
                <List

                    createOption={true}
                    onCreate={() => setOpen(true)}

                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            setMessage(`Deseja deletar entidade ${entity.id}?`)
                            setCurrentEl(entity.id)
                            setOpenModal(true)
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
        </>
    )
}