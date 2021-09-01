import React, {useRef, useState} from "react";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import PropTypes from "prop-types";
import animations from "../../styles/Animations.module.css";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import List from "../shared/core/list/List";
import ProjectForm from "./ProjectForm";
import {ArrowForwardRounded, DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import HandleUpload from "../../utils/shared/HandleUpload";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import HandleDownload from "../../utils/shared/HandleDownload";

export default function ProjectList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)
    const ref = useRef()

    return (
        <>
            <input
                type={'file'} style={{display: 'none'}}
                ref={ref} accept={'.json'}
                onChange={(file) => {
                    HandleUpload(file.target.files[0]).then(res => {
                        if (res !== null) {
                            if (Array.isArray(res)) {
                                res.forEach(e => {
                                    ProjectRequests.submitProject({
                                        data: e,
                                        create: true
                                    })
                                })
                            } else {
                                res.id = undefined
                                setCurrentEntity(res)
                                setOpen(true)
                            }
                        }
                    })
                    ref.current.value = ''
                }}
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
                    listKey={'nature'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/project'}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
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
                            label: 'Abrir',
                            icon: <ArrowForwardRounded/>,
                            onClick: (entity) => {
                                props.redirect(entity.id)
                            },
                            disabled: false
                        },
                        {
                        label: 'Deletar',
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
                            label: 'Baixar dados',
                            icon: <GetAppRounded/>,
                            onClick: (entity) => {
                                HandleDownload(entity, entity.id)
                            },
                            disabled: false
                        }]}
                    fields={[
                        {name: 'name', type: 'string'},
                        {name: 'description', type: 'string'},
                        {name: 'estimated_value', type: 'number', maskStart: 'R$ '},
                        {name: 'type', type: 'string', capitalize: true},
                    ]}
                    labels={['nome','descrição','Valor estimado', 'tipo']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        if (entity === null || entity === undefined) {
                            setOpen(true)
                            props.setOpen(true)
                        } else
                            props.redirect(entity.id)
                    }} searchFieldName={'search_input'} title={'Projetos / Atividades'}

                />
            </div>
        </>
    )
}
ProjectList.propTypes = {
    redirect: PropTypes.func
}