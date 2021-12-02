import React, {useState} from "react";


import {DeleteRounded} from "@material-ui/icons";
import TypeForm from "../forms/TypeForm";
import associativeKeys from "../../keys/associativeKeys";


import {List, Switcher, useQuery} from 'mfc-core';
import getQuery from "../../utils/getQuery";
import useList from "../../templates/useList";
import ListTemplate from "../../templates/ListTemplate";

export default function TypeList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('type'))
    const {
        message,
        setMessage,
        openModal,
        setOpenModal,
        onDecline,
        setCurrentEl,
        onAccept
    } = useList('type', () => hook.clean())

    return (
        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
            <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

                <TypeForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()
                        setCurrentEntity(null)
                    }} asEntity={true}
                    asDefault={true}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity}/>

            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                onRowClick={e => {
                    setOpen(true)
                    setCurrentEntity(e)
                }}
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
                keys={associativeKeys.type}
                title={'Tipos'}
            />
        </Switcher></>
    )
}
