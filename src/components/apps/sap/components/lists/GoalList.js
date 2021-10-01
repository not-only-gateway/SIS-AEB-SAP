import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import animations from "../../styles/Animations.module.css";
import {List, useQuery} from "sis-aeb-core";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import GoalForm from "../forms/GoalForm";
import {DeleteRounded} from "@material-ui/icons";

export default function GoalList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    

    const hook = useQuery()
    return (
        <div style={{width: '100%'}}>
            {!open ? null :
                <div className={animations.fadeIn}>
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
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    createOption={true}
                    onCreate={() => setOpen(true)}
                    hook={hook}
                    keys={[
                        {key: 'goal_number', type: 'string', label: 'Número'},
                        {key: 'detailing', type: 'string', label: 'Detalhamento'},
                        {key: 'unit_of_measurement', type: 'string', label: 'unidade de medida'},
                        {key: 'initial_situation', type: 'string', label: 'situação inicial'},
                        {key: 'value', type: 'string', label: 'valor planejado'},
                    ]}
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

                    fetchParams={{
                        work_plan: props.workPlan.id
                    }}
                />
            </div>
        </div>
    )
}
GoalList.propTypes = {
    workPlan: PropTypes.object,
    setCurrentStructure: PropTypes.func
}