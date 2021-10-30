import React, {useState} from "react";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import List from "../../../../core/visualization/list/List";

import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import FollowUpForm from "../forms/FollowUpForm";
import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/navigation/switcher/Switcher";
import deleteEntry from "../../utils/requests/delete";
import getQuery from "../../queries/getQuery";

export default function FollowUpList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('follow_up_goal', undefined, [{
        key: 'operation_phase',
        value: props.operation?.id,
        type: 'object'
    }]))

    return (
        <Switcher openChild={open ? 0 : 1} styles={{width: '100%'}}>
            <div style={{paddingTop: '32px'}}>
                <FollowUpForm
                    handleClose={() => {
                        hook.clean()
                        setOpen(false)
                    }}

                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} operation={props.operation}/>
            </div>
            <List

                createOption={true}
                onCreate={() => setOpen(true)}
                onRowClick={e => {
                    setOpen(true)
                    setCurrentEntity(e)
                }}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        deleteEntry({
                            suffix: 'follow_up_goal',
                            pk: entity.id
                        }).then(() => hook.clean())
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                hook={hook}
                keys={workPlanKeys.followup}
                title={'Marcos do acompanhamento'}
            />
        </Switcher>
    )
}
FollowUpList.propTypes = {
    operation: PropTypes.object
}