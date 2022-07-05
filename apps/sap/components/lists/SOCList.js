import PropTypes from 'prop-types'
import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";


import SOCForm from "../forms/SOCForm";
import associativeKeys from "../../keys/associativeKeys";

import getQuery from "../../utils/getQuery";
import useList from "../../../../hooks/useList";
import ListTemplate from "../../../../templates/ListTemplate";
import {List, Switcher, useQuery} from 'mfc-core'

export default function SOCList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    const hook = useQuery(getQuery('component', {
        infrastructure: props.infrastructure.id
    }))

    const {
        message,
        setMessage,
        openModal,
        setOpenModal,
        onDecline,
        setCurrentEl,
        onAccept
    } = useList('component', () => hook.clean())
    let keys = [...associativeKeys.classificationInfrastructure]
    keys.splice(2, 1)

    return (
        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
            <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

                <SOCForm
                    handleClose={() => {
                        setCurrentEntity(null)
                        setOpen(false)
                        hook.clean()
                    }}

                    create={currentEntity === null}
                    data={currentEntity} infrastructure={props.infrastructure}
                />

                <List
                    createOption={true}
                    onCreate={() => setOpen(true)}
                    noFilters={true}
                    hook={hook}
                    keys={[...keys, {
                        key: 'situation',
                        type: 'string',
                        label: 'Situação operacional',
                        visible: true
                    }]}
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
                    title={'Situação Operacional de Componentes'}

                />
            </Switcher></>
    )
}
SOCList.propTypes = {
    infrastructure: PropTypes.object
}