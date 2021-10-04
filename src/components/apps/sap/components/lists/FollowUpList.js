import React, {useRef, useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import FollowUpForm from "../forms/FollowUpForm";
import OperationRequests from "../../utils/requests/OperationRequests";
import associativeKeys from "../../keys/associativeKeys";
import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import {followup_goal_query} from "../../queries/workplan";

export default function FollowUpList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(followup_goal_query({
        operation: props.operation.id
    }))
    
    return (
        <Switcher openChild={open ? 0 : 1}>
                <FollowUpForm
                    returnToMain={() => {
                        hook.clean()
                        setOpen(false)
                    }}

                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} operation={props.operation}/>
            
                <List

                    createOption={true}
                    onCreate={() => setOpen(true)}

                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            OperationRequests.deleteFollowUpGoal({
                                pk: entity.id
                            }).then(() => hook.clean())
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    hook={hook}
                    keys={workPlanKeys.followup}
                    title={'Marcos do acompanhamento'}
                />
            </Switcher>
    )
}
FollowUpList.propTypes = {
    operation: PropTypes.object
}