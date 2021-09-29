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
                <div className={animations.fadeIn}>
                    <FollowUpForm
                        returnToMain={() => {
                            setRefreshed(false)
                            setOpen(false)
                        }}

                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} operation={props.operation}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'follow_up_goal'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/follow_up_goal'}


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
                    }, {
                        label: 'Baixar dados',
                        icon: <GetAppRounded/>,
                        onClick: (entity) => {
                            HandleDownload(entity, entity.id)
                        },
                        disabled: false
                    }]}
                    fields={[

                        {name: 'description', type: 'string',label: 'descrição'},
                        {name: 'accomplished', type: 'bool',label: 'entregue'},
                    ]} labels={['descrição', 'entregue']}
                    clickEvent={() => null}
                    setEntity={entity => {
                        setOpen(true)
                        setCurrentEntity(entity)
                    }}  title={'Marcos do acompanhamento'}
                     fetchSize={15}
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