import PropTypes from 'prop-types'
import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import {List, useQuery} from "sis-aeb-core";

import ActivityForm from "../forms/ActivityForm";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import getQuery from "../../queries/getQuery";


export default function ActivityList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('activity', {
        workPlan: props.workPlan.id
    }))


    return (
        <Switcher openChild={open ? 0 : 1}>
            <ActivityForm
                returnToMain={() => {
                    setOpen(false)
                    setCurrentEntity(null)
                }}
                open={open}
                create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                data={currentEntity}
            />
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

            />
        </Switcher>
    )
}
ActivityList.propTypes = {
    workPlan: PropTypes.object
}