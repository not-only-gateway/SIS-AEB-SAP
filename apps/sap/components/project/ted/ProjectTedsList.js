import React, {useState} from "react";
import Cookies from "universal-cookie/lib";
import Host from "../../../utils/shared/Host";
import PropTypes from "prop-types";
import animations from "../../../styles/Animations.module.css";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import List from "../../shared/core/list/List";
import TedForm from "./TedForm";
import Selector from "../../shared/core/selector/Selector";
import {ArrowForwardRounded, DeleteRounded, GetAppRounded, PlaylistAddRounded} from "@material-ui/icons";
import ProjectRequests from "../../../utils/requests/ProjectRequests";
import TedRequests from "../../../utils/requests/TedRequests";
import HandleDownload from "../../../utils/shared/HandleDownload";
import SelectorModal from "../../shared/core/selector/modules/SelectorModal";

export default function ProjectTedsList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [refreshed, setRefreshed] = useState(false)
    return (
        <>

            {open ?
                null :
                <SelectorModal
                    modal={openModal}
                    setModal={() => {
                        setOpenModal(false)
                    }}
                    getEntityKey={entity => {
                        if (entity !== null && entity !== undefined)
                            return entity.id
                        else return -1
                    }} searchFieldName={'search_input'}
                    handleChange={entity => {
                        ProjectRequests.submitProjectTed({
                            data: {ted: entity.id, activity_project: props.project.id}
                        }).then(res => setRefreshed(false))
                    }} label={'Selecionar Instrumentos já cadastrados'}
                    setChanged={() => null}
                    fetchParams={{
                        project: props.project.id
                    }}
                    disabled={false}
                    fields={[
                        {name: 'number', type: 'string', label: 'Número'},
                        {name: 'responsible', type: 'object', subfield: 'acronym'},
                        {name: 'process', type: 'string', label: 'Processo'}
                    ]}
                    labels={['Número', 'Responsável', 'Processo']}
                    fetchUrl={Host() + 'list/free/project_teds'}
                    fetchToken={(new Cookies()).get('jwt')}
                    selectorKey={'teds-selector'}
                />
            }
            {!open ? null :
                <div className={animations.fadeIn}>
                    <TedForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }} redirect={props.redirect}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={true} project={props.project.id}
                        data={currentEntity}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined, width: '100%'}}>
                <List
                    listKey={'teds'} noShadow={true}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/project_ted'}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
                    fields={[
                        {name: 'number', type: 'string', label: 'Número'},
                        {name: 'responsible', type: 'object', subfield: 'acronym'},
                        {name: 'process', type: 'string', label: 'Processo'}
                    ]}
                    labels={['Número', 'Responsável', 'Processo']}
                    clickEvent={() => null}
                    setEntity={entity => {
                        if (entity === null || entity === undefined) {
                            setOpen(true)
                        } else {
                            props.redirect(entity.ted)
                        }
                    }} searchFieldName={'search_input'} title={'Instrumento de celebração'}
                    controlOptions={[
                        {
                            label: 'Adicionar ted existente',
                            icon: <PlaylistAddRounded/>,
                            onClick: () => {
                                setOpenModal(true)
                            },
                            disabled: false
                        }
                    ]}
                    options={[{
                        label: 'Remover vínculo',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            ProjectRequests.deleteProjectTed({
                                pk: entity.ted,
                                data: {project: props.project.id},
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
                                props.redirect(entity)
                            },
                            disabled: false
                        },
                        {
                            label: 'Baixar dados',
                            icon: <GetAppRounded/>,
                            onClick: (entity) => {
                                TedRequests.fetchTed(entity.ted).then(res => {
                                    HandleDownload(res, res.id)
                                })

                            },
                            disabled: false
                        }

                    ]}
                    fetchParams={{
                        project: props.project.id
                    }}
                    fetchSize={15}/>
            </div>
        </>
    )
}
ProjectTedsList.propTypes = {
    redirect: PropTypes.func,
    project: PropTypes.object
}