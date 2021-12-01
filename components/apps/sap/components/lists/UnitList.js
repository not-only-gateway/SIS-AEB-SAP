import React, {useState} from "react";

import UnitForm from "../forms/UnitForm";
import {DeleteRounded} from "@material-ui/icons";

import getQuery from "../../utils/getQuery";

import associativeKeys from "../../keys/associativeKeys";
import useList from "../../templates/useList";
import ListTemplate from "../../templates/ListTemplate";
import {List, Switcher, useQuery} from 'mfc-core'

export default function UnitList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('unit'))
    const {
        message,
        setMessage,
        openModal,
        setOpenModal,
        onDecline,
        setCurrentEl,
        onAccept
    } = useList('unit', () => hook.clean())

    return (
        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
            <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

                <UnitForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()
                        setCurrentEntity(null)
                    }}
                    asDefault={true}
                    create={!currentEntity}
                    data={currentEntity}
                />

            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                hook={hook}
                keys={associativeKeys.responsible}
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
                title={'Unidades da AEB'}
            />
        </Switcher></>
    )
}