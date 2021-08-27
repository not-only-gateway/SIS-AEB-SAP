import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import animations from "../../../../styles/Animations.module.css";
import handleObjectChange from "../../../../utils/shared/HandleObjectChange";
import List from "../../../shared/misc/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../../../utils/shared/Host";
import RiskForm from "./RiskForm";
import {CloudUploadRounded, DeleteRounded, GetAppRounded, PublishRounded, RemoveRounded} from "@material-ui/icons";
import ProjectRequests from "../../../../utils/requests/ProjectRequests";

export default function RisksList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)

    const ref = useRef()
    return (
        <div style={{width: '100%'}}>
            <input
                accept={'.json'} type={'file'} style={{display: 'none'}}
                ref={ref}
                onChange={(file) => {
                    let reader = new FileReader();
                    reader.onload = e => {
                        let data = JSON.parse(e.target.result)
                        data.id = undefined

                        ProjectRequests.submitRisk({
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
            {!open ? null :
                <div className={animations.fadeIn}>
                    <RiskForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                            console.log('settingRefresh')
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} project={props.project}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/risk'}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
                    controlOptions={[
                        {
                            label: 'Baixar selecionados',
                            icon: <GetAppRounded/>,
                            onClick: (d) => {
                                let downloadAnchorNode = document.createElement('a');
                                const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(d))
                                downloadAnchorNode.setAttribute("href", data);
                                downloadAnchorNode.setAttribute("download", `riscos - ${new Date().toLocaleDateString()}.json`);
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
                    fields={[
                        {name: 'description', type: 'string',label: 'descrição'},
                        {name: 'analysis', type: 'string', label: 'Análise', getColor: field => {
                            let res = undefined
                                switch (field){
                                    case 'baixo': {
                                        res = '#00F400'
                                        break
                                    }
                                    case 'moderado': {
                                        res = '#FFBA3E'
                                        break
                                    }
                                    case 'alto': {
                                        res = '#ff5555'
                                        break
                                    }
                                    default:
                                        break
                                }
                                return res
                            }}
                    ]}
                    labels={['descrição', 'Análise']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => setCurrentEntity(entity)}
                    searchFieldName={'search_input'}
                    title={'Riscos'}
                    scrollableElement={'scrollableDiv'}
                    fetchSize={15}
                    options={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            ProjectRequests.deleteRisk({
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
                    fetchParams={{
                        project: props.project.id
                    }}
          />
            </div>
        </div>
    )
}
RisksList.propTypes = {
    project: PropTypes.object
}