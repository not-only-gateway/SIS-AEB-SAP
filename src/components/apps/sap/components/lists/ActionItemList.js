import React, {useRef, useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";

import ActionItemForm from "../forms/ActionItemForm";
import OperationRequests from "../../utils/requests/OperationRequests";
import {List, useQuery} from "sis-aeb-core";
import {action_query} from "../../queries/workplan";
import workPlanKeys from "../../keys/workPlanKeys";


export default function ActionItemList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(action_query)


    return (
        <>
            {!open ? null :
                <ActionItemForm
                    returnToMain={() => {
                        setOpen(false)
                        hook.clean()
                    }}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} operation={props.operation}
                />
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    createOption={true}
                    onCreate={() => setOpen(true)}
                    hook={hook}
                    keys={workPlanKeys.action}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            OperationRequests.deleteActionItem({
                                pk: entity.id
                            }).then(() => hook.clean())
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}

                    title={'Itens / Ações'}
                    fetchParams={{
                        operation: props.operation.id
                    }}
                />
            </div>
        </>
    )
}
ActionItemList.propTypes = {
    operation: PropTypes.object
}