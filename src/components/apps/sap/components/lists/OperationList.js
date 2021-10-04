import React, {useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import Operation from "../entities/Operation";
import OperationRequests from "../../utils/requests/OperationRequests";
import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import {operation_query} from "../../queries/workplan";

export default function OperationList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(operation_query(props.stage !== null && props.stage !== undefined ? {
        stage: props.stage.id
    } : {
        work_plan: props.workPlan.id
    }))

    return (
        <Switcher openChild={open ? 0 : 1}>

            <Operation
                returnToMain={() => {
                    setOpen(false)
                    hook.clean()
                }}
                workPlan={props.workPlan}
                create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                data={currentEntity} stage={props.stage}
            />
            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                hook={hook} onRowClick={e => setCurrentEntity(e)}
                keys={workPlanKeys.operation}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        OperationRequests.deleteOperation({
                            pk: entity.id
                        })
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                title={'Fases / operações'}
                
            />
        </Switcher>
    )
}
OperationList.propTypes = {
    stage: PropTypes.object,
    workPlan: PropTypes.object
}