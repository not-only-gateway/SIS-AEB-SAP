import React, {useRef, useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import animations from "../../styles/Animations.module.css";
import FollowUpForm from "../forms/FollowUpForm";
import OperationRequests from "../../utils/requests/OperationRequests";

export default function FollowUpList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    const ref = useRef()
    return (
        <>
            {!open ? null :

                <FollowUpForm
                    returnToMain={() => {
                        setRefreshed(false)
                        setOpen(false)
                    }}

                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} operation={props.operation}/>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List

                    createOption={true}

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
                    fields={[
                        {key: 'description', type: 'string', label: 'descrição'},
                        {key: 'accomplished', type: 'bool', label: 'entregue'},
                    ]}
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