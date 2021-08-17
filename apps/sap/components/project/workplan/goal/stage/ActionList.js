import React, {useState} from "react";
import handleObjectChange from "../../../../../utils/shared/HandleObjectChange";
import List from "../../../../shared/misc/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../../../../utils/shared/Host";
import {EditRounded, RemoveRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import animations from "../../../../../styles/Animations.module.css";

import ActionForm from "./ActionForm";
import WorkPlanRequests from "../../../../../utils/fetch/WorkPlanRequests";
import Alert from "../../../../shared/misc/alert/Alert";
import OperationRequests from "../../../../../utils/fetch/OperationRequests";

export default function ActionList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })
    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined}
                handleClose={() => setStatus({type: undefined, message: undefined})}
                message={status.message}
            />
            {!open ? null :
                <div className={animations.fadeIn}>
                    <ActionForm
                        returnToMain={() => {
                            setOpen(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} operation={props.operation}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'action'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/action'}
                    labels={['Detalhamento', 'Realizada']}
                    fields={[

                        {name: 'detailing', type: 'string',label: 'Detalhamento'},
                        {name: 'accomplished', type: 'bool',label: 'Realizada'},
                    ]}
                    options={[{
                        label: 'Deletar',
                        icon: <RemoveRounded/>,
                        onClick: (entity) => {
                            OperationRequests.deleteAction({
                                pk: entity.id,
                                setStatus: setStatus,
                                setRefreshed: setRefreshed
                            })
                        },
                        disabled: false
                    }]}
                    clickEvent={() => null}
                    setEntity={entity => {
                        setOpen(true)
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Itens / Ações'}
                    scrollableElement={'scrollableDiv'} fetchSize={15}
                    fetchParams={{
                        operation: props.operation.id
                    }}
                />
            </div>
        </>
    )
}
ActionList.propTypes = {
    operation: PropTypes.object
}