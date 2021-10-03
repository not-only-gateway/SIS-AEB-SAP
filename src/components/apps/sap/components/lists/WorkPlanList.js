import React, {useRef, useState} from "react";
import PropTypes from "prop-types";

import {List, useQuery} from "sis-aeb-core";
import WorkPlanForm from "../forms/WorkPlanForm";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import {DeleteRounded} from "@material-ui/icons";
import workPlanKeys from "../../keys/workPlanKeys";

export default function WorkPlanList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    
    return (
        <>
            {!open ? null :

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
                    data={currentEntity}
                />

            }
            <div style={{display: open ? 'none' : undefined}}>
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
                        props.setCurrentStructure(entity)
                    }}
                    title={'Planos de trabalho'}
                    fetchParams={{
                        ted: props.ted.id,
                        project: props.project.id
                    }}
                />
            </div>
        </>
    )
}
WorkPlanList.propTypes = {
    setCurrentStructure: PropTypes.func,
    ted: PropTypes.object,
    project: PropTypes.object

}