import React, {useState} from "react";
import PropTypes from "prop-types";
import ProjectForm from "../forms/ProjectForm";
import {DeleteRounded} from "@material-ui/icons";
import projectKeys from "../../keys/projectKeys";

import getQuery from "../../utils/getQuery";
import {List, Switcher, useQuery} from "mfc-core";
import useList from "../../templates/useList";
import ListTemplate from "../../templates/ListTemplate";


export default function ProjectList(props) {

    const [open, setOpen] = useState(false)

    const hook = useQuery(getQuery('project'))
    const {
        message,
        setMessage,
        openModal,
        setOpenModal,
        onDecline,
        setCurrentEl,
        onAccept
    } = useList('project', () => hook.clean())

    return (
        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
            <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

            <ProjectForm
                handleClose={() => {
                    setOpen(false)
                    hook.clean()

                }} redirect={props.redirect}

                create={true}
            />

            <List
                hook={hook}
                keys={projectKeys.project}
                createOption={true}
                title={'Projetos / Atividades'}
                controlButtons={[
                    {
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            setMessage(`Deseja deletar entidade ${entity.id}?`)
                            setCurrentEl(entity.id)
                            setOpenModal(true)
                        },
                        disabled: false,
                        color: '#ff5555'
                    }
                ]} onCreate={() => setOpen(true)}
                onRowClick={e => props.redirect(`/sap?page=project&id=${e.id}`)}
            />
        </Switcher></>
    )
}
ProjectList.propTypes = {
    redirect: PropTypes.func
}