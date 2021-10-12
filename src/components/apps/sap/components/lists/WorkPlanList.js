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
    const hook = useQuery(getQuery('work_plan', {
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
                redirect={id => {
                    WorkPlanRequests.fetchWorkPlan(id.id).then(res => {
                        if (res !== null)
                            props.setCurrentStructure(res)
                    })
                }}

                project={props.project}
                ted={props.ted}

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
                title={'Planos de trabalho'}
            />
        </Switcher>
    )
}
WorkPlanList.propTypes = {
    redirect: PropTypes.func,
    ted: PropTypes.object,
    project: PropTypes.object

}