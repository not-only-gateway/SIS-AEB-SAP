import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import List from "../../../../core/list/List";

import WorkPlanForm from "../forms/WorkPlanForm";
import {DeleteRounded} from "@material-ui/icons";
import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import deleteEntry from "../../utils/requests/delete";
import getQuery from "../../queries/getQuery";
import useQuery from "../../../../core/shared/hooks/useQuery";

export default function WorkPlanList(props) {
    const [open, setOpen] = useState(false)
    const relations = useMemo(() => {
        if (props.workPlan) {
            return {work_plan: props.workPlan?.id}
        } else if (props.project) {
            return {project: props.project.id}
        } else if (props.ted) {
            return {ted: props.ted.id}
        } else return {}
    }, [props.project, props.ted])
    const hook = useQuery(getQuery('work_plan', relations))

    const keys = useMemo(() => {
        let value = [...workPlanKeys.workPlan]
        if (!props.project)
            value.push({
                key: 'ted',
                label: 'Instrumento de celebração',
                type: 'object',
                subfieldKey: 'number',
                visible: true,
                query: getQuery('ted')
            })
        if (!props.ted)
            value.push({
                key: 'activity_project',
                label: 'Projeto',
                type: 'object',
                subfieldKey: 'name',
                visible: true,
                query: getQuery('project')
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

    return (
        <Switcher openChild={open ? 0 : 1}>
            <div style={{paddingTop: '32px'}}>
                <WorkPlanForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()
                    }} asApostille={props.workPlan}
                    onRowClick={e => props.redirect(`/sap?page=ted&id=${e.id}`)}
                    project={props.project}
                    ted={props.ted}
                    data={apostilleData}
                    create={true}
                />
            </div>
            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                hook={hook}
                keys={keys}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        deleteEntry({
                            suffix: 'work_plan',
                            pk: entity.id
                        }).then(() => hook.clean())
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                onRowClick={e => props.redirect('sap/?page=wp&id=' + e.id)}
                title={props.workPlan ? 'Planos de trabalho (apostilamentos)' : 'Planos de trabalho'}
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