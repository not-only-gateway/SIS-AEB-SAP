import PropTypes from "prop-types";
import React, {useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import ProjectGoalForm from "../forms/ProjectGoalForm";
import {DeleteRounded} from "@material-ui/icons";
import projectKeys from "../../keys/projectKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import deleteEntry from "../../utils/requests/delete";
import getQuery from "../../queries/getQuery";

export default function ProjectGoalList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('goal_project', {
        project: props.project.id
    }))


    return (
        <Switcher openChild={open ? 0 : 1}>
            <div style={{paddingTop: '32px'}}>
                <ProjectGoalForm
                    handleClose={() => {
                        setOpen(false)
                    }}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} project={props.project}/>
            </div>
            <List
                createOption={true}
                onCreate={() => setOpen(true)}
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
                onRowClick={e => setCurrentEntity(e)}

            />
        </Switcher>
    )
}
ProjectGoalList.propTypes = {
    project: PropTypes.object
}