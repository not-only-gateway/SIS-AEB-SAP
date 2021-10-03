import PropTypes from "prop-types";
import React, {useRef, useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import ProjectGoalForm from "../forms/ObjectiveForm";
import {DeleteRounded} from "@material-ui/icons";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import associativeKeys from "../../keys/associativeKeys";
import projectKeys from "../../keys/projectKeys";

export default function ProjectGoalList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    


    return (
        <div style={{width: '100%'}}>
            {!open ? null :
                <ProjectGoalForm
                    returnToMain={() => {
                        setOpen(false)
                    }}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} project={props.project}/>

            }
            <div style={{display: open ? 'none' : undefined}}>
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
                    fetchParams={{
                        project: props.project.id
                    }}
                />
            </div>
        </div>
    )
}
ProjectGoalList.propTypes = {
    project: PropTypes.object
}