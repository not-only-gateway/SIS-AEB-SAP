import PropTypes from "prop-types";
import React, {useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import ProjectGoalForm from "../forms/ProjectGoalForm";
import {DeleteRounded} from "@material-ui/icons";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import projectKeys from "../../keys/projectKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import getQuery from "../../queries/entities";

export default function ProjectGoalList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('goal_project', {
        project: props.project.id
    }))


    return (
        <Switcher openChild={open ? 0 : 1}>
            <ProjectGoalForm
                returnToMain={() => {
                    setOpen(false)
                }}
                create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                data={currentEntity} project={props.project}/>

            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                hook={hook}
                keys={projectKeys.goal}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        ProjectRequests.deleteObjective({
                            pk: entity.id
                        })
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                title={'Marcos do projeto'}
                onRowClick={e => setCurrentEntity(e)}

            />
        </Switcher>
    )
}
ProjectGoalList.propTypes = {
    project: PropTypes.object
}