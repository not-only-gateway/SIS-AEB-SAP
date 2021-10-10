import React, {useMemo, useState} from "react";
import {useQuery} from "sis-aeb-core";
import List from "../../../../core/list/List";
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
    const relation = useMemo(() => {
        switch (true){
            case props.stage:{
                return props.stage.id
            }
            case props.workPlan:{
                return props.workPlan.id
            }
            default:
                return undefined
        }
    }, [])
    const hook = useQuery(operation_query(relation))

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
                hook={hook}
                onRowClick={entity => props.redirect(entity.id)}
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
    workPlan: PropTypes.object,
    redirect: PropTypes.func
}