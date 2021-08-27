import React, {useRef, useState} from "react";
import handleObjectChange from "../../../../utils/shared/HandleObjectChange";
import List from "../../../shared/misc/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../../../utils/shared/Host";
import {CloudUploadRounded, DeleteRounded, GetAppRounded, PublishRounded, RemoveRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import animations from "../../../../styles/Animations.module.css";
import ExecutionForm from "./ExecutionForm";
import OperationRequests from "../../../../utils/requests/OperationRequests";
import HandleUpload from "../../../../utils/shared/HandleUpload";
import HandleDownload from "../../../../utils/shared/HandleDownload";

export default function ExecutionList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)

    const ref = useRef()
    return (
        <>
            <input
                accept={'.sap'} type={'file'} style={{display: 'none'}}
                ref={ref}
                onChange={(file) => {
                    HandleUpload(file.target.files[0]).then(res => {
                        if(res !== null){
                            res.id = undefined
                            setCurrentEntity(res)
                            setOpen(true)
                        }
                    })
                    ref.current.value = ''
                }}
                multiple={false}
            />
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
                        })}
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
                        {name: 'current_execution', type: 'string', maskEnd: ' %'},
                        {name: 'committed', type: 'number', maskStart: 'R$ '},
                        {name: 'liquidated', type: 'number', maskStart: 'R$ '},
                        {name: 'paid', type: 'number', maskStart: 'R$ '},
                        {name: 'execution_date', type: 'date'}
                    ]}
                    labels={['Execução atual (%)', 'Valor empenhado', 'Valor liquidado', 'Valor pago', 'Data da execução']}
                    clickEvent={() => null}
                    controlOptions={[
                        {
                            label: 'Baixar selecionados',
                            icon: <GetAppRounded/>,
                            onClick: (d) => {
                                HandleDownload(d,  `exec - ${new Date().toLocaleDateString()}`)
                            }
                        },
                        {
                            label: 'Importar multiplos',
                            icon: <CloudUploadRounded/>,
                            onClick: (d) => {
                            },
                            disabled: true
                        },
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