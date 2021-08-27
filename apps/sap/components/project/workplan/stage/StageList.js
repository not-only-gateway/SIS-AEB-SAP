import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import Cookies from "universal-cookie/lib";
import {CloudUploadRounded, DeleteRounded, GetAppRounded, PublishRounded, RemoveRounded} from "@material-ui/icons";
import Host from "../../../../utils/shared/Host";
import List from "../../../shared/misc/list/List";
import handleObjectChange from "../../../../utils/shared/HandleObjectChange";
import StageForm from "./StageForm";
import WorkPlanRequests from "../../../../utils/requests/WorkPlanRequests";
import OperationRequests from "../../../../utils/requests/OperationRequests";


export default function StageList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)
    const ref = useRef()
    return (
        <>
            <input
                accept={'.json'} type={'file'} style={{display: 'none'}}
                ref={ref}
                onChange={(file) => {
                    let reader = new FileReader();
                    reader.onload = e => {
                        let data = JSON.parse(e.target.result)
                        data.id = undefined

                        WorkPlanRequests.submitStage({
                            data: data,
                            create: true
                        }).then(res => {
                            if (res)
                                setRefreshed(false)
                        })
                        ref.current.value = ''

                    };
                    reader.readAsText(file.target.files[0]);
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
                                let downloadAnchorNode = document.createElement('a');
                                const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(d))
                                downloadAnchorNode.setAttribute("href", data);
                                downloadAnchorNode.setAttribute("download", `etapas/atividades - ${new Date().toLocaleDateString()}.json`);
                                document.body.appendChild(downloadAnchorNode)
                                downloadAnchorNode.click()
                                downloadAnchorNode.remove()
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
                            let downloadAnchorNode = document.createElement('a');
                            const data =  "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entity))
                            downloadAnchorNode.setAttribute("href", data);
                            downloadAnchorNode.setAttribute("download", `${entity.id}.json`);
                            document.body.appendChild(downloadAnchorNode)
                            downloadAnchorNode.click()
                            downloadAnchorNode.remove()
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