import React, {useMemo, useState} from "react";
import {useQuery} from "mfc-core";
import List from "../../../../core/visualization/list/List";
import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";

import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/navigation/switcher/Switcher";
import deleteEntry from "../../utils/requests/delete";
import getQuery from "../../queries/getQuery";
import OperationForm from "../forms/OperationForm";

export default function OperationList(props) {
    const [open, setOpen] = useState(false)
    const relation = useMemo(() => {

        if (props.stage)
            return [{
                key: 'activity_stage',
                value: props.stage.id,
                type: 'object'
            }]
        else if(props.workPlan)
            return [{
                key: 'activity_stage',
                sub_relation: {key: 'goal', sub_relation: {key: 'work_plan'}},
                value: props.workPlan.id,
                type: 'object'
            }]
        else return []

    }, [])
    const hook = useQuery(getQuery('operation_phase', undefined, relation))

    return (
        <Switcher openChild={open ? 0 : 1} styles={{width: '100%'}}>
            <div style={{paddingTop: '32px'}}>
                <OperationForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()
                    }}
                    workPlan={props.workPlan}
                    create={true}
                    stage={props.stage}
                />
            </div>
            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                onRowClick={e => props.redirect('sap/?page=operation&id=' + e.id)}
                hook={hook}

                keys={workPlanKeys.operation}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        deleteEntry({
                            suffix: 'operation',
                            pk: entity.id
                        }).then(() => hook.clean())
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