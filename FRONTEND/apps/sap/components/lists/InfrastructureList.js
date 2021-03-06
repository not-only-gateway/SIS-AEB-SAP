import React, {useState} from "react";


import {DeleteRounded} from "@material-ui/icons";
import associativeKeys from "../../keys/associativeKeys";

import getQuery from "../../utils/getQuery";
import InfrastructureForm from "../forms/InfrastructureForm";
import PropTypes from "prop-types";
import useList from "../../../../hooks/useList";
import ListTemplate from "../../../../templates/ListTemplate";
import {List, Switcher, useQuery} from 'mfc-core'

export default function InfrastructureList(props) {

    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('infrastructure'))
    const {
        message,
        setMessage,
        openModal,
        setOpenModal,
        onDecline,
        setCurrentEl,
        onAccept
    } = useList('infrastructure', () => hook.clean())

    return (
        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
            <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

                <InfrastructureForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()
                    }}
                    asDefault={true}
                    create={true}
                />

            <List
                createOption={true}

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
                onCreate={() => setOpen(true)}
                onRowClick={e => props.redirect('?page=infrastructure&id=' + e.id)}
                hook={hook}
                keys={associativeKeys.infrastructure} labels={['Nome', 'Tipo']}
                title={'Infraestruturas'}
            />
        </Switcher></>
    )
}

InfrastructureList.propTypes = {
    redirect: PropTypes.func
}
