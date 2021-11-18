import PropTypes from "prop-types";
import React, {useState} from "react";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import List from "../../../../core/visualization/list/List";

import ProjectGoalForm from "../forms/ProjectGoalForm";
import {DeleteRounded} from "@material-ui/icons";
import projectKeys from "../../keys/projectKeys";
import Switcher from "../../../../core/navigation/switcher/Switcher";
import deleteEntry from "../../utils/delete";
import getQuery from "../../utils/getQuery";

export default function ProjectGoalList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('goal_project', {
        project: props.project.id
    }))


    return (
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
                        deleteEntry({
                            suffix: 'goal_project',
                            pk: entity.id
                        }).then(() => hook.clean())
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
        </Switcher>
    )
}
ProjectGoalList.propTypes = {
    project: PropTypes.object
}