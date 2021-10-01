import React, {useState} from "react";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import PropTypes from "prop-types";
import animations from "../../styles/Animations.module.css";
import {List, useQuery} from "sis-aeb-core";
import TedForm from "../forms/TedForm";
import {ArrowForwardRounded, DeleteRounded, GetAppRounded, PlaylistAddRounded} from "@material-ui/icons";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import TedRequests from "../../utils/requests/TedRequests";


export default function ProjectTedsList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const hook = useQuery()
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
                    }}
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

                        create={true} project={props.project.id}
                        data={currentEntity}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined, width: '100%'}}>
                <List
                    createOption={true}
                    fields={[
                        {key: 'number', type: 'string', label: 'Número'},
                        {key: 'responsible', type: 'object', subfield: 'acronym', label: 'Responsável'},
                        {key: 'process', type: 'string', label: 'Processo'}
                    ]}

                    onRowClick={entity => {
                        props.redirect(entity.ted)
                    }}
                    title={'Instrumento de celebração'}

                    controlButtons={[{
                        label: 'Remover vínculo',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            ProjectRequests.deleteProjectTed({
                                pk: entity.ted,
                                data: {project: props.project.id}
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
                        }
                    ]}
                    fetchParams={{
                        project: props.project.id
                    }}
                />
            </div>
        </>
    )
}
ProjectTedsList.propTypes = {
    redirect: PropTypes.func,
    project: PropTypes.object
}