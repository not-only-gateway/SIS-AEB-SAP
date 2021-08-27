import React, {useRef, useState} from "react";
import handleObjectChange from "../../../../utils/shared/HandleObjectChange";
import List from "../../../shared/misc/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../../../utils/shared/Host";
import {CloudUploadRounded, DeleteRounded, GetAppRounded, PublishRounded, RemoveRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import animations from "../../../../styles/Animations.module.css";
import Operation from "./Operation";
import OperationRequests from "../../../../utils/requests/OperationRequests";
import HandleUpload from "../../../../utils/shared/HandleUpload";
import HandleDownload from "../../../../utils/shared/HandleDownload";

export default function OperationList(props) {
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
                    <Operation
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })} workPlan={props.workPlan}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} stage={props.stage}
                    />
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'operation_phase'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/operation_phase'}

                    fields={[

                        {name: 'phase', type: 'string',label: 'Fase'},
                        {name: 'initial_situation', type: 'string'},
                        {name: 'indicator_planned', type: 'string'},
                        {name: 'detailing', type: 'string'},
                        {name: 'estimated_cost', type: 'number', maskStart:'R$ '}

                    ]} labels={['Fase', 'Situação inicial', 'indicador planejado', 'detalhamento da fase', 'custo estimado']}
                    controlOptions={[
                        {
                            label: 'Baixar selecionados',
                            icon: <GetAppRounded/>,
                            onClick: (d) => {
                                HandleDownload(d,  `operacoes - ${new Date().toLocaleDateString()}`)
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
                            OperationRequests.deleteOperation({
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
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
                    clickEvent={() => null}
                    setEntity={entity => {
                        setOpen(true)
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Fases / operações'}
                    scrollableElement={'scrollableDiv'} fetchSize={15}
                    fetchParams={props.stage !== null && props.stage !== undefined ? {
                        stage: props.stage.id
                    } : {
                        work_plan: props.workPlan.id
                    }}
                />
            </div>
        </>
    )
}
OperationList.propTypes = {
    stage: PropTypes.object,
    workPlan: PropTypes.object
}