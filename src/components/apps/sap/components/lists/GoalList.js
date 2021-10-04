import PropTypes from 'prop-types'
import React, {useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import GoalForm from "../forms/GoalForm";
import {DeleteRounded} from "@material-ui/icons";
import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import {goal_query} from "../../queries/workplan";

export default function GoalList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    

    const hook = useQuery(goal_query({
        work_plan: props.workPlan.id
    }))
    return (

            <Switcher openChild={open ? 0 : 1}>

                    <GoalForm
                        returnToMain={() => {
                            setOpen(false)
                            hook.clean()
                        }}

                        redirect={data => {
                            WorkPlanRequests.fetchGoal(data).then(res => {
                                if (res !== null)
                                    props.setCurrentStructure(res)
                            })
                        }}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} workPlan={props.workPlan}
                    />
            
                <List
                    createOption={true}
                    onCreate={() => setOpen(true)}
                    hook={hook}
                    keys={workPlanKeys.goal}
                    onRowClick={e => setCurrentEntity(e)}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            WorkPlanRequests.deleteGoal({
                                pk: entity.id,
                                setRefreshed: setRefreshed
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    title={'Metas'}

                    
                />
            </Switcher>
    )
}
GoalList.propTypes = {
    workPlan: PropTypes.object,
    setCurrentStructure: PropTypes.func
}