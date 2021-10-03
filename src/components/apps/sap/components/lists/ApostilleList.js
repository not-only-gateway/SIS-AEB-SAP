import React, {useRef, useState} from "react";

import {List, useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import WorkPlanForm from "../forms/WorkPlanForm";
import {apostille_query} from "../../queries/workplan";
import workPlanKeys from "../../keys/workPlanKeys";

export default function ApostilleList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(apostille_query)
    
    return (
        <>
            {!open ? null :
                <WorkPlanForm
                    returnToMain={() => {
                        setOpen(false)
                        hook.clean()
                    }}
                    asApostille={true} ted={props.ted}
                    create={currentEntity === undefined || currentEntity === null || currentEntity.id === undefined}
                    workPlan={props.workPlan.id}
                    data={currentEntity}/>
            }
            <div style={{display: open ? 'none' : undefined, width: '100%'}}>
                <List
                    createOption={true}

                    hook={hook}
                    keys={workPlanKeys.workPlan}
                    onCreate={() => setCurrentEntity(props.workPlan)}
                    onRowClick={entity => {
                        setCurrentEntity(entity)
                    }}


                    title={'Apostilamentos'}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            WorkPlanRequests.deleteAppostile({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    fetchParams={{
                        work_plan: props.workPlan.id
                    }}/>
            </div>
        </>
    )


}
ApostilleList.propTypes = {
    workPlan: PropTypes.object
}