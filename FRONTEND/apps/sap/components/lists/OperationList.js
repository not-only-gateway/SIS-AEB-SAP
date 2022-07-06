import React, {useMemo, useState} from "react";


import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";

import workPlanKeys from "../../keys/workPlanKeys";

import getQuery from "../../utils/getQuery";
import OperationForm from "../forms/OperationForm";
import useList from "../../../../hooks/useList";
import ListTemplate from "../../../../templates/ListTemplate";
import {List, Switcher, useQuery} from 'mfc-core'

export default function OperationList(props) {
    const [open, setOpen] = useState(false)
    const relation = useMemo(() => {

        if (props.stage)
            return [{
                key: 'activity_stage',
                value: props.stage.id,
                type: 'object'
            }]
        else if (props.workPlan)
            return [{
                key: 'activity_stage',
                sub_relation: {key: 'goal', sub_relation: {key: 'work_plan'}},
                value: props.workPlan.id,
                type: 'object'
            }]
        else return []

    }, [])
    const hook = useQuery(getQuery('operation_phase', undefined, relation))
    const {
        message,
        setMessage,
        openModal,
        setOpenModal,
        onDecline,
        setCurrentEl,
        onAccept
    } = useList('operation_phase', () => hook.clean())

    return (
        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
            <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>
                <OperationForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()

                    }}
                    workPlan={props.workPlan}
                    create={true}
                    stage={props.stage}
                />

                <List
                    createOption={true}
                    onCreate={() => setOpen(true)}
                    onRowClick={e => props.redirect('?page=operation&id=' + e.id)}
                    hook={hook}

                    keys={workPlanKeys.operation}
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
                    title={'Fases / operações'}
                />
            </Switcher>
        </>
    )
}
OperationList.propTypes = {
    stage: PropTypes.object,
    workPlan: PropTypes.object,
    redirect: PropTypes.func
}