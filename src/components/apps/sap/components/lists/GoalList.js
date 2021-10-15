import PropTypes from 'prop-types'
import React, {useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import GoalForm from "../forms/GoalForm";
import {DeleteRounded} from "@material-ui/icons";
import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import deleteEntry from "../../../management/utils/delete";
import getQuery from "../../queries/getQuery";

export default function GoalList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    

    const hook = useQuery(getQuery('work_plan_goal', {
        work_plan: props.workPlan.id
    }))
    return (

            <Switcher openChild={open ? 0 : 1}>

                    <GoalForm
                        returnToMain={() => {
                            setOpen(false)
                            hook.clean()
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
                            deleteEntry({
                                suffix: 'goal',
                                pk: entity.id,
                                setRefreshed: setRefreshed
                            }).then(() => hook.clean())
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
    workPlan: PropTypes.object
}