import PropTypes from 'prop-types'
import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";


import ActivityStageForm from "../forms/ActivityStageForm";
import workPlanKeys from "../../keys/workPlanKeys";

import getQuery from "../../utils/getQuery";
import useList from "../../../../hooks/useList";
import ListTemplate from "../../../../templates/ListTemplate";
import {List, Switcher, useQuery} from 'mfc-core'

export default function ActivityStageList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('activity_stage', undefined, [{
        key: 'goal',
        sub_relation: {
            key: 'work_plan'
        },
        value: props.workPlan.id,
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
    } = useList('activity_stage', () => hook.clean())


    return (
        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
            <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

            <ActivityStageForm
                handleClose={() => {
                    setOpen(false)
                    setCurrentEntity(null)
                    hook.clean()
                }} workPlan={props.workPlan}
                open={open}
                create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                data={currentEntity}
            />

            <List
                createOption={true}
                hook={hook}
                keys={workPlanKeys.activity}
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
                }]} onCreate={() => {
                setOpen(true)
            }}
                onRowClick={e => {
                    setOpen(true)
                    setCurrentEntity(e)
                }}
                title={'Etapas / Atividades'}

            />
        </Switcher></>
    )
}
ActivityStageList.propTypes = {
    workPlan: PropTypes.object
}