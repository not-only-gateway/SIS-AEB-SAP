import React, {useState} from "react";

import {List, useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import WorkPlanForm from "../forms/WorkPlanForm";
import {apostille_query} from "../../queries/workplan";
import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";

export default function ApostilleList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(apostille_query({
        work_plan: props.workPlan.id
    }))

    return (
        <Switcher openChild={open ? 0 : 1}>
            <WorkPlanForm
                returnToMain={() => {
                    setOpen(false)
                    hook.clean()
                }}
                asApostille={true} ted={props.ted}
                create={currentEntity === undefined || currentEntity === null || currentEntity.id === undefined}
                workPlan={props.workPlan.id}
                data={currentEntity}/>

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
                />
        </Switcher>
    )


}
ApostilleList.propTypes = {
    workPlan: PropTypes.object
}