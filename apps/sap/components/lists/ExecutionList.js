import React, {useMemo, useState} from "react";

import {List, Switcher, useQuery} from 'mfc-core'
import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import ExecutionForm from "../forms/ExecutionForm";

import getQuery from "../../utils/getQuery";

import workPlanKeys from "../../keys/workPlanKeys";
import useList from "../../../../hooks/useList";
import ListTemplate from "../../../../templates/ListTemplate";

export default function ExecutionList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const relation = useMemo(() => {
            if (props.operation)
                return [{
                    key: 'operation_phase',
                    value: props.operation.id,
                    type: 'object'
                }]
            else
                return [{
                    key: 'operation_phase',
                    sub_relation: {
                        key: 'activity_stage',
                        sub_relation: {
                            key: 'goal',
                            sub_relation: {
                                key: 'work_plan'
                            }
                        }
                    },
                    value: props.workPlan.id,
                    type: 'object'
                }]
        }, [props]
    )

    const keys = useMemo(() => {
        if (props.workPlan)
            return [ {

                key: 'operation_phase',
                type: 'object',
                label: 'Fase/operação',
                subfieldKey: 'phase',
                subType: 'string',
                query: {
                    ...getQuery('operation_phase', undefined, [{
                        key: 'activity_stage',
                        sub_relation: {key: 'goal', sub_relation: {key: 'work_plan'}},
                        value: props.workPlan.id,
                        type: 'object'
                    }]), ...{
                        keys: workPlanKeys.operation
                    }
                },
                visible: true

            }, ...workPlanKeys.execution,]
        else return workPlanKeys.execution
    }, [props.workPlan])
    const hook = useQuery(getQuery('execution', undefined, relation))
    const {
        message,
        setMessage,
        openModal,
        setOpenModal,
        onDecline,
        setCurrentEl,
        onAccept
    } = useList('execution', () => hook.clean())


    return (
        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
            <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

            <ExecutionForm
                handleClose={() => {
                    setCurrentEntity(null)
                    setOpen(false)
                    hook.clean()
                }}
                workPlan={props.workPlan}
                create={!currentEntity}
                data={currentEntity} operation={props.operation}
            />

            <List
                createOption={props.workPlan === undefined || props.workPlan === null}
                onCreate={() => setOpen(true)}
                hook={hook}
                keys={keys}
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
                }} title={'Execuções'}


            />
        </Switcher></>
    )
}
ExecutionList.propTypes = {
    operation: PropTypes.object,
    workPlan: PropTypes.object
}