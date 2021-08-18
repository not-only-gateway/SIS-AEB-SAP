import React, {useState} from "react";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import List from "../../shared/misc/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../../utils/shared/Host";
import {RemoveRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import animations from "../../../styles/Animations.module.css";
import ExecutionForm from "./ExecutionForm";
import Alert from "../../shared/misc/alert/Alert";
import OperationRequests from "../../../utils/fetch/OperationRequests";

export default function ExecutionList(props) {
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
                    <ExecutionForm
                        returnToMain={() => {
                            setOpen(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} operation={props.operation}
                    />
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'execution'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/execution'}

                    fields={[
                        {name: 'current_execution', type: 'string', maskEnd: ' %'},
                        {name: 'committed', type: 'number',maskStart: 'R$ '},
                        {name: 'liquidated', type: 'number', maskStart: 'R$ '},
                        {name: 'paid', type: 'number', maskStart: 'R$ '},
                        {name: 'execution_date', type: 'date' }
                    ]}
                    labels={['Execução atual (%)','Valor empenhado','Valor liquidado', 'Valor pago', 'Data da execução']}
                    clickEvent={() => null}
                    options={[{
                        label: 'Deletar',
                        icon: <RemoveRounded/>,
                        onClick: (entity) => {
                            OperationRequests.deleteExecution({
                                pk: entity.id,
                                setStatus: setStatus,
                                setRefreshed: setRefreshed
                            })
                        },
                        disabled: false
                    }]}
                    setEntity={entity => {
                        if(entity === null || entity === undefined)
                            setOpen(true)
                        else
                            props.setExecution(entity)
                    }} searchFieldName={'search_input'} title={'Execuções'}
                    scrollableElement={'scrollableDiv'} fetchSize={15}
                    fetchParams={{
                        operation: props.operation.id
                    }}
                />
            </div>
        </>
    )
}
ExecutionList.propTypes = {
    operation: PropTypes.object
}