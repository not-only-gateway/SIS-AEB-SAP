import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";

import ActionItemForm from "../forms/ActionItemForm";
import {List, useQuery} from "sis-aeb-core";
import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import deleteEntry from "../../../management/utils/delete";
import getQuery from "../../queries/getQuery";


export default function ActionItemList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('action_item', {
        operation: props.operation.id
    }))


    return (
        <Switcher openChild={open ? 0 : 1}>

                <ActionItemForm
                    returnToMain={() => {
                        setOpen(false)
                        hook.clean()
                    }}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} operation={props.operation}
                />
                <List
                    createOption={true}
                    onCreate={() => setOpen(true)}
                    hook={hook}
                    keys={workPlanKeys.action}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            deleteEntry({
                                suffix: 'action_item',
                                pk: entity.id
                            }).then(() => hook.clean())
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    title={'Itens / Ações'}
                />
        </Switcher>
    )
}
ActionItemList.propTypes = {
    operation: PropTypes.object
}