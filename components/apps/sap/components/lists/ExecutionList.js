import React, {useMemo, useState} from "react";
import useQuery from "../../../../core/visualization/hooks/useQuery";

import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import ExecutionForm from "../forms/ExecutionForm";
import Switcher from "../../../../core/navigation/switcher/Switcher";
import deleteEntry from "../../utils/requests/delete";
import getQuery from "../../queries/getQuery";
import List from "../../../../core/visualization/list/List";
import workPlanKeys from "../../keys/workPlanKeys";

export default function ExecutionList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const relation = useMemo(() => {
            if (props.operation)
                return [{
                    key: 'operation_phase',
                    value: props.operation.id,
                    type: 'object'
                }]
            else
                return [{
                    key: 'operation_phase',
                    sub_relation: {
                        key: 'activity_stage',
                        sub_relation: {
                            key: 'goal',
                            sub_relation: {
                                key: 'work_plan'
                            }
                        }
                    },
                    value: props.workPlan.id,
                    type: 'object'
                }]
        }, [props]
    )

    const hook = useQuery(getQuery('execution', undefined, relation))

    return (
        <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

                <ExecutionForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()
                    }}
                    workPlan={props.workPlan}
                    create={!currentEntity}
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
                        deleteEntry({
                            suffix: 'execution',
                            pk: entity.id
                        }).then(() => hook.clean())
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                onRowClick={e => {
                    setOpen(true)
                    setCurrentEntity(e)
                }} title={'Execuções'}


            />
        </Switcher>
    )
}
ExecutionList.propTypes = {
    operation: PropTypes.object,
    workPlan: PropTypes.object
}