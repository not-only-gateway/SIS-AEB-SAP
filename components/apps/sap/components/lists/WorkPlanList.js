import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";


import WorkPlanForm from "../forms/WorkPlanForm";
import {DeleteRounded} from "@material-ui/icons";
import workPlanKeys from "../../keys/workPlanKeys";

import getQuery from "../../utils/getQuery";

import projectKeys from "../../keys/projectKeys";
import tedKeys from "../../keys/tedKeys";
import useList from "../../../../addons/useList";
import ListTemplate from "../../../../addons/ListTemplate";
import {List, Switcher, useQuery} from 'mfc-core'

export default function WorkPlanList(props) {
    const [open, setOpen] = useState(false)

    const deep = useMemo(() => {
        let res = []
        if (props.workPlan === undefined && !props.project && !props.ted)
            res.push({
                key: 'apostille_work_plan',
                value: null,
                type: 'object'
            })
        else if (props.workPlan)
            res.push({
                key: 'apostille_work_plan',
                value: props.workPlan?.id,
                type: 'object'
            })

        if (props.project)
            res.push({
                key: 'activity_project',
                value: props.project?.id,
                type: 'object'
            })
        if (props.ted)
            res.push({
                key: 'ted',
                value: props.ted?.id,
                type: 'object'
            })
        return res
    }, [props])

    const hook = useQuery(getQuery('work_plan', undefined, deep))

    const keys = useMemo(() => {
        let value = [...workPlanKeys.workPlan]
        if (!props.ted)
            value.push({
                key: 'ted',
                label: 'Número do TED',
                type: 'object',
                subfieldKey: 'number',
                visible: true,
                query: {...getQuery('ted'), ...{keys: tedKeys.ted}}
            })
        if (!props.project)
            value.push({
                key: 'activity_project',
                label: 'Projeto / atividade',
                type: 'object',
                subfieldKey: 'name',
                visible: true,
                query: {...getQuery('project'), ...{keys: projectKeys.project}}
            })
        return value
    }, [props])

    const apostilleData = useMemo(() => {
        if (props.workPlan) {
            let value = {...props.workPlan}
            delete value.id

            return {...value, work_plan: props.workPlan?.id}
        } else return undefined
    }, [props.workPlan])

    const {
        message,
        setMessage,
        openModal,
        setOpenModal,
        onDecline,
        setCurrentEl,
        onAccept
    } = useList('work_plan', () => hook.clean())

    return (
        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
            <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>
                <WorkPlanForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()

                    }}
                    workPlan={props.workPlan}
                    onRowClick={e => props.redirect(`/sap?page=ted&id=${e.id}`)}
                    project={props.project}
                    ted={props.ted}
                    data={apostilleData}
                    create={true}
                />

                <List
                    createOption={true}
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
                    onRowClick={e => props.redirect('sap/?page=wp&id=' + e.id)}
                    title={props.workPlan ? 'Planos de trabalho (apostilamentos)' : 'Planos de trabalho'}
                />
            </Switcher></>
    )
}
WorkPlanList.propTypes = {
    redirect: PropTypes.func,
    ted: PropTypes.object,
    project: PropTypes.object,
    workPlan: PropTypes.object
}