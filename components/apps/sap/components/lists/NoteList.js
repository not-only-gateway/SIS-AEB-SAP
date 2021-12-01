import React, {useState} from "react";


import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import NoteForm from "../forms/NoteForm";

import getQuery from "../../utils/getQuery";
import workPlanKeys from "../../keys/workPlanKeys";
import useList from "../../templates/useList";
import ListTemplate from "../../templates/ListTemplate";
import {List, Switcher, useQuery} from 'mfc-core'

export default function NoteList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('commitment_note',  undefined, [{
        key: 'operation_phase',
        value: props.operation?.id,
        type: 'object'
    }]))
    const {
        message,
        setMessage,
        openModal,
        setOpenModal,
        onDecline,
        setCurrentEl,
        onAccept
    } = useList('commitment_note', () => hook.clean())

    return (
        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
            <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

                <NoteForm
                    handleClose={() => {
                        setCurrentEntity(null)
                        hook.clean()
                        setOpen(false)
                    }}

                    create={!currentEntity}
                    operation={props.operation}
                    data={currentEntity}/>

            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                hook={hook}
                keys={workPlanKeys.note}
                title={'Notas de empenho'}
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
            />
        </Switcher></>
    )


}
NoteList.propTypes = {
    operation: PropTypes.object
}