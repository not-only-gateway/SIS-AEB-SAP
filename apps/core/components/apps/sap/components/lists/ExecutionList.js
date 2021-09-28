import React, {useRef, useState} from "react";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import {List, useQuery} from "sis-aeb-core";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import animations from "../../styles/Animations.module.css";
import ExecutionForm from "../forms/ExecutionForm";
import OperationRequests from "../../utils/requests/OperationRequests";
import HandleDownload from "../../utils/shared/HandleDownload";

export default function ExecutionList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    const ref = useRef()
    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <ExecutionForm
                        returnToMain={() => {
                            setRefreshed(false)
                            setOpen(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })} workPlan={props.workPlan}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} operation={props.operation}
                    />
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'execution'}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/execution'}
                    fields={[
                        {name: 'operation_phase', type: 'object', subfield: 'phase'},
                        {name: 'operation_phase', type: 'object', subfield: 'indicator_planned'},
                        {name: 'operation_phase', type: 'object', subfield: 'estimated_cost', maskStart: 'R$ '},
                        {name: 'current_execution', type: 'string', maskEnd: ' %'},
                        {name: 'total_execution', type: 'string'},
                        {name: 'committed', type: 'number', maskStart: 'R$ '},
                        {name: 'liquidated', type: 'number', maskStart: 'R$ '},
                        {name: 'paid', type: 'number', maskStart: 'R$ '},
                    ]}
                    labels={[
                        'Fase',
                        'Indicador planejado (fase)',
                        'Custo estimado',
                        'Execução atual (%)',
                        'Execução total',
                        'Valor empenhado',
                        'Valor liquidado',
                        'Valor pago'
                    ]}
                    clickEvent={() => null}
                    controlOptions={[
                        {
                            label: 'Importar',
                            icon: <PublishRounded/>,
                            onClick: (d) => {
                                ref.current.click()
                            },
                            disabled: false
                        },
                    ]}
                    options={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            OperationRequests.deleteExecution({
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
                    setEntity={entity => {
                        setCurrentEntity(entity)
                        setOpen(true)

                    }} searchFieldName={'search_input'} title={'Execuções'}
                    fetchSize={props.workPlan !== undefined ? 1 : 15}
                    fetchParams={
                        props.workPlan !== undefined ?
                            {work_plan: props.workPlan.id}
                            :
                            {operation: props.operation.id}
                    }
                />
            </div>
        </>
    )
}
ExecutionList.propTypes = {
    operation: PropTypes.object,
    workPlan: PropTypes.object
}