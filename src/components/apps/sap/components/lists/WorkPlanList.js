import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import List from "../../../../core/list/List";
import {useQuery} from "sis-aeb-core";
import WorkPlanForm from "../forms/WorkPlanForm";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import {DeleteRounded} from "@material-ui/icons";
import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import getQuery from "../../queries/getQuery";

export default function WorkPlanList(props) {
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery(props.asApostille ?'apostille' : 'work_plan', props.asApostille ? {work_plan: props.workPlan?.id} : {
        ted: props.ted ? props.ted.id : null,
        project: props.project ? props.project.id : null
    }))

    const keys = useMemo(() => {
        let value = [...workPlanKeys.workPlan]
        if (!props.ted)
            value.push({key: 'ted',label: 'Instrumento de celebração', type: 'object', subfieldKey: 'number', visible: true})
        else if (!props.project)
            value.push({key: 'project',label: 'Projeto', type: 'object', subfieldKey: 'name', visible: true})
        return value
    }, [props])

    return (
        <Switcher openChild={open ? 0 : 1}>
            <WorkPlanForm
                returnToMain={() => {
                    setOpen(false)
                }}
                onRowClick={e => props.redirect(`/sap?page=ted&id=${e.id}`)}
                project={props.project}
                ted={props.ted}
                workPlan={props.workPlan}
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
                        WorkPlanRequests.deleteWorkPlan({
                            pk: entity.id
                        })
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                onRowClick={entity => {
                    props.redirect(entity.id)
                }}
                title={props.workPlan ? 'Planos de trabalho (apostilamentos)': 'Planos de trabalho'}
            />
        </Switcher>
    )
}
WorkPlanList.propTypes = {
    redirect: PropTypes.func,
    ted: PropTypes.object,
    project: PropTypes.object,
    workPlan: PropTypes.object
}