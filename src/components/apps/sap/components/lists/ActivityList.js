import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import {List, useQuery} from "sis-aeb-core";

import ActivityForm from "../forms/StageForm";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import workPlanKeys from "../../keys/workPlanKeys";


export default function ActivityList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()

    
    return (
        <>
            {open ?
                <ActivityForm
                    returnToMain={() => {
                        setOpen(false)
                        setCurrentEntity(null)
                    }}
                    open={open}
                    redirect={id => {
                        WorkPlanRequests.fetchStage(id).then(res => {
                            if (res !== null)
                                props.setCurrentStructure(res)
                        })
                    }}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity}
                    goal={props.goal}
                />
                :
                null
            }

            <div style={{display: open ? 'none' : undefined}}>
                <List
                    createOption={true}
                    hook={hook}
                    keys={workPlanKeys.activity}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            WorkPlanRequests.deleteStage({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    onRowClick={e => setCurrentEntity(e)}
                    title={'Etapas'}
                    fetchParams={props.goal !== null ? {
                        goal: props.goal.id
                    } : undefined}
                />
            </div>
        </>
    )
}
ActivityList.propTypes = {
    goal: PropTypes.object,
    setCurrentStructure: PropTypes.func
}