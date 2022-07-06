import PropTypes from 'prop-types'
import React, {useState} from "react";


import {DeleteRounded} from "@material-ui/icons";
import StatusForm from "../forms/StatusForm";
import workPlanKeys from "../../keys/workPlanKeys";

import getQuery from "../../utils/getQuery";
import useList from "../../../../hooks/useList";
import ListTemplate from "../../../../templates/ListTemplate";
import {List, Switcher, useQuery} from 'mfc-core'

export default function StatusList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('status', {
        work_plan: props.workPlan.id
    }))
    const {
        message,
        setMessage,
        openModal,
        setOpenModal,
        onDecline,
        setCurrentEl,
        onAccept
    } = useList('status', () => hook.clean())


    return (
        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
            <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

                <StatusForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()
                        setCurrentEntity(null)
                    }}

                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} workPlan={props.workPlan}/>

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
                keys={workPlanKeys.status}
                title={'Status'}
                onRowClick={e => {
                    setOpen(true)
                    setCurrentEntity(e)
                }}

            />
        </Switcher></>
    )
}
StatusList.propTypes = {
    workPlan: PropTypes.object
}