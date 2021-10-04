import PropTypes from 'prop-types'
import React, {useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import RiskForm from "../forms/RiskForm";
import {DeleteRounded} from "@material-ui/icons";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import projectKeys from "../../keys/projectKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import {risk_query} from "../../queries/project";

export default function RisksList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(risk_query({
        project: props.project.id
    }))


    return (
        <Switcher openChild={open ? 0 : 1}>

            <RiskForm
                returnToMain={() => {
                    setOpen(false)
                }}
                create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                data={currentEntity} project={props.project}/>

            }

            <List
                onRowClick={e => setCurrentEntity(e)}
                createOption={true}
                hook={hook}
                keys={projectKeys.risks}
                title={'Riscos'}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        ProjectRequests.deleteRisk({
                            pk: entity.id
                        })
                    },
                    disabled: false,
                    color: '#ff5555'
                },]}
                
            />
        </Switcher>
    )
}
RisksList.propTypes = {
        project: PropTypes.object
    }