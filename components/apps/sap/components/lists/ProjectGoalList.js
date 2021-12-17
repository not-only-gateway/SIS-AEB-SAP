import PropTypes from "prop-types";
import React, {useState} from "react";


import ProjectGoalForm from "../forms/ProjectGoalForm";
import {DeleteRounded} from "@material-ui/icons";
import projectKeys from "../../keys/projectKeys";

import getQuery from "../../utils/getQuery";
import useList from "../../../../addons/useList";
import ListTemplate from "../../../../addons/ListTemplate";
import {List, Switcher, useQuery} from 'mfc-core'

export default function ProjectGoalList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('goal_project', {
        project: props.project.id
    }))

    const {
        message,
        setMessage,
        openModal,
        setOpenModal,
        onDecline,
        setCurrentEl,
        onAccept
    } = useList('goal_project', () => hook.clean())

    return (
        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
            <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

                <ProjectGoalForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()
                        setCurrentEntity(null)
                    }}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} project={props.project}/>

            <List
                createOption={true} onCreate={() => setOpen(true)}
                hook={hook}
                keys={projectKeys.goal}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        setMessage(`Deseja deletar entidade ${entity.id}?`)
                        setCurrentEl(entity.id)
                        setOpenModal(true)
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                title={'Marcos do projeto'}
                onRowClick={e => {
                    setOpen(true)
                    setCurrentEntity(e)
                }}

            />
        </Switcher></>
    )
}
ProjectGoalList.propTypes = {
    project: PropTypes.object
}