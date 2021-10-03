import React, {useRef, useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import FollowUpForm from "../forms/FollowUpForm";
import OperationRequests from "../../utils/requests/OperationRequests";
import associativeKeys from "../../keys/associativeKeys";
import workPlanKeys from "../../keys/workPlanKeys";

export default function FollowUpList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    
    return (
        <>
            {!open ? null :

                <FollowUpForm
                    returnToMain={() => {
                        hook.clean()
                        setOpen(false)
                    }}

                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} operation={props.operation}/>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List

                    createOption={true}
                    onCreate={() => setOpen(true)}

                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            OperationRequests.deleteFollowUpGoal({
                                pk: entity.id,
                                setRefreshed: setRefreshed
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    hook={hook}
                    keys={workPlanKeys.followup}
                    title={'Marcos do acompanhamento'}

                    fetchParams={{
                        operation: props.operation.id
                    }}
                />
            </div>
        </>
    )
}
FollowUpList.propTypes = {
    operation: PropTypes.object
}