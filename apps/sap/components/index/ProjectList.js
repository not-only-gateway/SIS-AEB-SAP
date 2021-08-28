import React, {useRef, useState} from "react";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import PropTypes from "prop-types";
import animations from "../../styles/Animations.module.css";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import List from "../shared/core/list/List";
import ProjectForm from "./ProjectForm";
import {
    ArrowForwardRounded,
    CloudDownloadRounded, CloudUploadRounded,
    DeleteForeverRounded, DeleteRounded,
    FileCopyRounded, GetAppRounded, PublishRounded,
    RemoveRounded
} from "@material-ui/icons";
import ProjectRequests from "../../utils/requests/ProjectRequests";

export default function ProjectList(props) {
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

                        ProjectRequests.submitProject({
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
                    <ProjectForm
                        returnToMain={() => {
                            setOpen(false)
                            props.setOpen(false)
                        }} redirect={props.redirect}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={true}
                        data={currentEntity}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/project'}
                    fields={[
                        {name: 'name', type: 'string'},
                        {name: 'description', type: 'string'},
                        {name: 'estimated_value', type: 'number', maskStart: 'R$ '},
                        {name: 'type', type: 'string', capitalize: true},
                    ]}
                    controlOptions={[
                        {
                            label: 'Baixar selecionados',
                            icon: <GetAppRounded/>,
                            onClick: (d) => {
                                let downloadAnchorNode = document.createElement('a');
                                const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(d))
                                downloadAnchorNode.setAttribute("href", data);
                                downloadAnchorNode.setAttribute("download", `projetos - ${new Date().toLocaleDateString()}.json`);
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
                    ]} triggerRefresh={!refreshed}
                    labels={['nome','descrição','Valor estimado', 'tipo']}
                    clickEvent={() => null}
                    options={[{
                        label: 'Deletar projeto',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            ProjectRequests.deleteProject({
                                pk: entity.id,
                                setRefreshed: setRefreshed
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    },
                        {
                            label: 'Abrir',
                            icon: <ArrowForwardRounded/>,
                            onClick: (entity) => {
                                props.redirect(entity.id)
                            },
                            disabled: false
                        },
                        {
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
                        }
                    ]}
                    setEntity={entity => {
                        if (entity === null || entity === undefined) {
                            setOpen(true)
                            props.setOpen(true)
                        } else
                            props.redirect(entity.id)
                    }} searchFieldName={'search_input'} title={'Projetos / Atividades'}
                    scrollableElement={'scrollableDiv'}
                    fetchSize={15}
                />
            </div>
        </>
    )
}
ProjectList.propTypes = {
    redirect: PropTypes.func
}