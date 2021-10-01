import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import RiskForm from "../forms/RiskForm";
import {DeleteRounded} from "@material-ui/icons";
import ProjectRequests from "../../utils/requests/ProjectRequests";

export default function RisksList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()

    
    return (
        <div style={{width: '100%'}}>

            {!open ? null :
                <RiskForm
                    returnToMain={() => {
                        setOpen(false)
                    }}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} project={props.project}/>

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    onRowClick={e => setCurrentEntity(e)}
                    createOption={true}
                    hook={hook}
                    keys={[
                        {name: 'description', type: 'string', label: 'Descrição'},
                        {
                            name: 'analysis', type: 'string', label: 'Análise', getColor: field => {
                                let res = undefined
                                switch (field) {
                                    case 'baixo': {
                                        res = '#00F400'
                                        break
                                    }
                                    case 'moderado': {
                                        res = '#FFBA3E'
                                        break
                                    }
                                    case 'alto': {
                                        res = '#ff5555'
                                        break
                                    }
                                    default:
                                        break
                                }
                                return res
                            }
                        }
                    ]}
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
                    fetchParams={{
                        project: props.project.id
                    }}
                />
            </div>
        </div>
    )
}
RisksList.propTypes =
    {
        project: PropTypes.object
    }