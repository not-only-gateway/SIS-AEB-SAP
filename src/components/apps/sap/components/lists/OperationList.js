import React, {useMemo, useState} from "react";
import {useQuery} from "sis-aeb-core";
import List from "../../../../core/list/List";
import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";

import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import deleteEntry from "../../utils/requests/delete";
import getQuery from "../../queries/getQuery";
import OperationForm from "../forms/OperationForm";

export default function OperationList(props) {
    const [open, setOpen] = useState(false)
    const relation = useMemo(() => {
        switch (true) {
            case props.stage: {
                return props.stage.id
            }
            case props.workPlan: {
                return props.workPlan.id
            }
            default:
                return undefined
        }
    }, [])
    const hook = useQuery(getQuery('operation_phase', relation))

    return (
        <Switcher openChild={open ? 0 : 1}>
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