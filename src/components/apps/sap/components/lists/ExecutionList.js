import React, {useRef, useState} from "react";
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

                    <ExecutionForm
                        returnToMain={() => {
                            setRefreshed(false)
                            setOpen(false)
                        }}
                        workPlan={props.workPlan}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} operation={props.operation}
                    />

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    createOption={true}
                    fields={[
                        {key: 'operation_phase', type: 'object', subfieldKey: 'phase', label: 'Fase'},
                        {
                            key: 'operation_phase',
                            type: 'object',
                            subfieldKey: 'indicator_planned',
                            label: 'Indicador planejado (fase)'
                        },
                        {
                            key: 'operation_phase',
                            type: 'object',
                            subfieldKey: 'estimated_cost',
                            maskStart: 'R$ ',
                            label: 'Custo estimado'
                        },
                        {key: 'current_execution', type: 'string', maskEnd: ' %', label: 'Execução atual (%)'},
                        {key: 'total_execution', type: 'string', label: 'Execução total'},
                        {key: 'committed', type: 'number', maskStart: 'R$ ', label: 'Valor empenhado'},
                        {key: 'liquidated', type: 'number', maskStart: 'R$ ', label: 'Valor liquidado'},
                        {key: 'paid', type: 'number', maskStart: 'R$ ', label: 'Valor pago'},
                    ]}
                    clickEvent={() => null}

                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            OperationRequests.deleteExecution({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    onRowClick={entity => {
                        setCurrentEntity(entity)
                    }} title={'Execuções'}

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