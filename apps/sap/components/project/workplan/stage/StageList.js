import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import Cookies from "universal-cookie/lib";
import {CloudUploadRounded, DeleteRounded, GetAppRounded, PublishRounded, RemoveRounded} from "@material-ui/icons";
import Host from "../../../../utils/shared/Host";
import List from "../../../shared/core/list/List";
import handleObjectChange from "../../../../utils/shared/HandleObjectChange";
import StageForm from "./StageForm";
import WorkPlanRequests from "../../../../utils/requests/WorkPlanRequests";
import OperationRequests from "../../../../utils/requests/OperationRequests";
import HandleUpload from "../../../../utils/shared/HandleUpload";
import HandleDownload from "../../../../utils/shared/HandleDownload";


export default function StageList(props) {
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
            {open ?
                <StageForm
                    returnToMain={() => {
                        setOpen(false)
                        setRefreshed(false)
                        setCurrentEntity(null)
                    }}
                    open={open}
                    handleChange={event => handleObjectChange({
                        event: event,
                        setData: setCurrentEntity
                    })}
                    redirect={id => {
                        WorkPlanRequests.fetchStage(id).then(res => {
                            console.log(res)
                            if (res !== null)
                                props.setCurrentStructure(res)
                        })
                    }}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity}
                    goal={props.goal}
                />
                :
                null
            }

            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/activity'}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
                    fields={[
                        {name: 'stage', type: 'string', label: 'etapa'},
                        {name: 'description', type: 'string', label: 'descrição'},
                        {name: 'representation', type: 'string', maskEnd: ' %'},

                    ]} labels={['etapa', 'descrição', 'reresentação (%) da meta']}
                    clickEvent={() => null}
                    controlOptions={[
                        {
                            label: 'Baixar selecionados',
                            icon: <GetAppRounded/>,
                            onClick: (d) => {
                                HandleDownload(d,  `etapas - ${new Date().toLocaleDateString()}`)
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
                            WorkPlanRequests.deleteStage({
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
                        console.log(entity)
                        if (entity !== null && entity !== undefined)
                            props.setCurrentStructure(entity)
                        else
                            setOpen(true)
                    }} searchFieldName={'search_input'} title={'Etapas'} scrollableElement={'scrollableDiv'}
                    fetchSize={15}
                    fetchParams={props.goal !== null ? {
                        goal: props.goal.id
                    } : undefined}
                />
            </div>
        </>
    )
}
StageList.propTypes = {
    goal: PropTypes.object,
    setCurrentStructure: PropTypes.func
}