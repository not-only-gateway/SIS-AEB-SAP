import React, {useState} from "react";
import {useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import ExecutionForm from "../forms/ExecutionForm";
import OperationRequests from "../../utils/requests/OperationRequests";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import getQuery from "../../queries/getQuery";
import List from "../../../../core/list/List";
import workPlanKeys from "../../keys/workPlanKeys";

export default function ExecutionList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('execution',
        props.workPlan !== undefined ?
            {work_plan: props.workPlan?.id}
            :
            {operation: props.operation?.id}
    ))

    return (
        <Switcher openChild={open ? 0 : 1}>
            <ExecutionForm
                returnToMain={() => {
                    setOpen(false)
                    hook.clean()
                }}
                workPlan={props.workPlan}
                create={currentEntity === undefined}
                data={currentEntity} operation={props.operation}
            />

            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                hook={hook}
                keys={workPlanKeys.execution}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        OperationRequests.deleteExecution({
                            pk: entity.id
                        })
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                onRowClick={entity => {
                    setCurrentEntity(entity)
                }} title={'Execuções'}


            />
        </Switcher>
    )
}
ExecutionList.propTypes = {
    operation: PropTypes.object,
    workPlan: PropTypes.object
}