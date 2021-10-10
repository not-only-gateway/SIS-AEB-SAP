import React, {useState} from "react";
import PropTypes from "prop-types";
import {List, useQuery} from "sis-aeb-core";
import TedForm from "../forms/TedForm";
import {ArrowForwardRounded, DeleteRounded} from "@material-ui/icons";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import Switcher from "../../../../core/misc/switcher/Switcher";
import getQuery from "../../queries/entities";


export default function ProjectTedsList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const hook = useQuery(getQuery('project_ted', {
        project: props.project.id
    }))
    return (
        <Switcher openChild={open ? 0 : 1}>
            {/*<SelectorModal*/}
            {/*    modal={openModal}*/}
            {/*    setModal={() => {*/}
            {/*        setOpenModal(false)*/}
            {/*    }}*/}
            {/*    getEntityKey={entity => {*/}
            {/*        if (entity !== null && entity !== undefined)*/}
            {/*            return entity.id*/}
            {/*        else return -1*/}
            {/*    }}*/}
            {/*    handleChange={entity => {*/}
            {/*        ProjectRequests.submitProjectTed({*/}
            {/*            data: {ted: entity.id, activity_project: props.project.id}*/}
            {/*        }).then(res => hook.clean())*/}
            {/*    }} label={'Selecionar Instrumentos já cadastrados'}*/}
            {/*    setChanged={() => null}*/}
            {/*    fetchParams={{*/}
            {/*        project: props.project.id*/}
            {/*    }}*/}
            {/*    disabled={false}*/}
            {/*    fields={[*/}
            {/*        {name: 'number', type: 'string', label: 'Número'},*/}
            {/*        {name: 'responsible', type: 'object', subfield: 'acronym'},*/}
            {/*        {name: 'process', type: 'string', label: 'Processo'}*/}
            {/*    ]}*/}
            {/*    labels={['Número', 'Responsável', 'Processo']}*/}
            {/*    fetchUrl={Host() + 'list/free/project_teds'}*/}
            {/*    fetchToken={(new Cookies()).get('jwt')}*/}
            {/*    selectorKey={'teds-selector'}*/}
            {/*/>*/}

            <TedForm
                returnToMain={() => {
                    setOpen(false)
                    hook.clean()
                }} redirect={props.redirect}

                create={true} project={props.project.id}
                data={currentEntity}/>


            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                hook={hook}
                keys={[
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

            />
        </Switcher>
    )
}
ProjectTedsList.propTypes = {
    redirect: PropTypes.func,
    project: PropTypes.object
}