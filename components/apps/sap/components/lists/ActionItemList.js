import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";

import ActionItemForm from "../forms/ActionItemForm";

import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/navigation/switcher/Switcher";

import getQuery from "../../queries/getQuery";
import deleteEntry from "../../utils/requests/delete";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import List from "../../../../core/visualization/list/List";


export default function ActionItemList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('action_item', undefined, [{
        key: 'operation_phase',
        value: props.operation?.id,
        type: 'object'
    }]))

    return (
        <Switcher openChild={open ? 0 : 1}>
                <div style={{paddingTop: '32px'}}>
                    <ActionItemForm
                        handleClose={() => {
                            setOpen(false)
                            hook.clean()
                        }}
                        create={!currentEntity}
                        data={currentEntity} operation={props.operation}
                    />
                </div>

                <List
                    createOption={true}
                    onCreate={() => setOpen(true)}
                    hook={hook}
                    onRowClick={e => {
                        setOpen(true)
                        setCurrentEntity(e)
                    }}
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