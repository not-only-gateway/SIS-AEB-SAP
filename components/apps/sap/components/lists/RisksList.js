import PropTypes from 'prop-types'
import React, {useState} from "react";


import RiskForm from "../forms/RiskForm";
import {DeleteRounded} from "@material-ui/icons";
import projectKeys from "../../keys/projectKeys";

import getQuery from "../../utils/getQuery";
import useList from "../../templates/useList";
import ListTemplate from "../../templates/ListTemplate";
import {List, Switcher, useQuery} from 'mfc-core'

export default function RisksList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('risk', {
        project: props.project.id
    }))

    const {
        message,
        setMessage,
        openModal,
        setOpenModal,
        onDecline,
        setCurrentEl,
        onAccept
    } = useList('risk', () => hook.clean())

    return (
        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
            <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

                <RiskForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()
                        setCurrentEntity(null)
                    }}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} project={props.project}/>

            <List
                onRowClick={e => {
                    setOpen(true)
                    setCurrentEntity(e)
                }}
                createOption={true} onCreate={() => setOpen(true)}
                hook={hook}
                keys={projectKeys.risks}
                title={'Riscos'}
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
                },]}

            />
        </Switcher></>
    )
}
RisksList.propTypes = {
    project: PropTypes.object
}