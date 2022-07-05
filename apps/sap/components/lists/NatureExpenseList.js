import React, {useState} from "react";


import {DeleteRounded} from "@material-ui/icons";
import NatureExpenseForm from "../forms/NatureExpenseForm";
import associativeKeys from "../../keys/associativeKeys";

import getQuery from "../../utils/getQuery";
import useList from "../../../../hooks/useList";
import ListTemplate from "../../../../templates/ListTemplate";
import {List, Switcher, useQuery} from 'mfc-core'

export default function NatureExpenseList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('nature_of_expense'))
    const {
        message,
        setMessage,
        openModal,
        setOpenModal,
        onDecline,
        setCurrentEl,
        onAccept
    } = useList('nature_of_expense', () => hook.clean())

    return (
        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
            <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

                <NatureExpenseForm
                    handleClose={() => {
                        setCurrentEntity(null)
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
                        setMessage(`Deseja deletar entidade ${entity.id}?`)
                        setCurrentEl(entity.id)
                        setOpenModal(true)
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                onRowClick={e => {
                    setOpen(true)
                    setCurrentEntity(e)
                }}
                hook={hook}
                keys={associativeKeys.natureOfExpense}
                title={'Naturezas de despesa'}

            />
        </Switcher></>
    )
}
