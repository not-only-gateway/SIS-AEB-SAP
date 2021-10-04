import React, {useState} from "react";
import PropTypes from "prop-types";

import {List, useQuery} from "sis-aeb-core";
import WorkPlanForm from "../forms/WorkPlanForm";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import {DeleteRounded} from "@material-ui/icons";
import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import {work_plan_query} from "../../queries/workplan";

export default function WorkPlanList(props) {
    const [open, setOpen] = useState(false)
    const hook = useQuery(work_plan_query({
        ted: props.ted.id,
        project: props.project.id
    }))

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
                create={true} ted={props.ted}
            />

            <List
                createOption={true}
                onCreate={() => setOpen(true)}

                hook={hook}
                keys={workPlanKeys.workPlan}
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