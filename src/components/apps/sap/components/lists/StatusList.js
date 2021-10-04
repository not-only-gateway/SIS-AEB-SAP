import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import StatusForm from "../forms/StatusForm";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import {status_query} from "../../queries/workplan";

export default function StatusList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(status_query({
        work_plan: props.workPlan.id
    }))


    return (
        <Switcher openChild={open ? 0 : 1}>
            <StatusForm
                returnToMain={() => {
                    setOpen(false)
                }}

                create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                data={currentEntity} workPlan={props.workPlan}/>

            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        WorkPlanRequests.deleteStatus({
                            pk: entity.id
                        })
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                hook={hook}
                keys={workPlanKeys.status}
                title={'Status'}
                onRowClick={e => setCurrentEntity(e)}
                
            />
        </Switcher>
    )
}
StatusList.propTypes = {
    workPlan: PropTypes.object
}