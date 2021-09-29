import PropTypes from "prop-types";
import React, {useRef, useState} from "react";
import animations from "../../styles/Animations.module.css";
import {List, useQuery} from "sis-aeb-core";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import ObjectiveForm from "../forms/ObjectiveForm";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import ProjectRequests from "../../utils/requests/ProjectRequests";

export default function ObjectivesList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    const ref = useRef()


    return (
        <div style={{width: '100%'}}>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <ObjectiveForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }}

                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} project={props.project}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/goal_project'}
                    

                    fields={[
                        {name: 'description', type: 'string'},
                        {name: 'deadline', type: 'date'},
                        {
                            name: 'status',
                            type: 'string',
                            getColor: field => {
                                let res = undefined
                                switch (field) {
                                    case 'A iniciar': {
                                        res = '#A300F5'
                                        break
                                    }
                                    case 'Em andamento': {
                                        res = '#00F400'
                                        break
                                    }
                                    case 'Pausado': {
                                        res = '#FFBA3E'
                                        break
                                    }
                                    case 'Atrasado': {
                                        res = '#ff5555'
                                        break
                                    }
                                    case 'Finalizado': {
                                        res = '#0095ff'
                                        break
                                    }
                                    default:
                                        break
                                }
                                return res
                            }
                        }
                    ]}
                    labels={['descrição', 'prazo final', 'status']}
                    clickEvent={() => setOpen(true)}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            ProjectRequests.deleteObjective({
                                pk: entity.id,
                                setRefreshed: setRefreshed
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }, {
                        label: 'Baixar dados',
                        icon: <GetAppRounded/>,
                        onClick: (entity) => {
                            HandleDownload(entity, entity.id)
                        },
                        disabled: false
                    }]}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }}  title={'Marcos do projeto'} 
                    fetchSize={15}
                    fetchParams={{
                        project: props.project.id
                    }}
                />
            </div>
        </div>
    )
}
ObjectivesList.propTypes = {
    project: PropTypes.object
}