import React, {useRef, useState} from "react";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import animations from "../../styles/Animations.module.css";

import ActionItemForm from "../forms/ActionItemForm";
import OperationRequests from "../../utils/requests/OperationRequests";
import HandleDownload from "../../utils/shared/HandleDownload";
import {List, useQuery} from "sis-aeb-core";
import {action_query} from "../../queries/workplan";


export default function ActionItemList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(action_query)
    const ref = useRef()

    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <ActionItemForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }}

                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} operation={props.operation}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'action'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/action_item'}
                    labels={['Detalhamento', 'Realizada']}
                    fields={[
                        {name: 'detailing', type: 'string',label: 'Detalhamento'},
                        {name: 'accomplished', type: 'bool',label: 'Realizada'},
                    ]}

                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            OperationRequests.deleteActionItem({
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
                    clickEvent={() => null}
                    setEntity={entity => {
                        setOpen(true)
                        setCurrentEntity(entity)
                    }}  title={'Itens / Ações'}
                     fetchSize={15}
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