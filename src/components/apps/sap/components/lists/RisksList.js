import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import animations from "../../styles/Animations.module.css";
import {List, useQuery} from "sis-aeb-core";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import RiskForm from "../forms/RiskForm";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import ProjectRequests from "../../utils/requests/ProjectRequests";

export default function RisksList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()

    const ref = useRef()
    return (
        <div style={{width: '100%'}}>

            {!open ? null :
                <div className={animations.fadeIn}>
                    <RiskForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                            console.log('settingRefresh')
                        }}

                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} project={props.project}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/risk'}
                    

                    fields={[
                        {name: 'description', type: 'string',label: 'descrição'},
                        {name: 'analysis', type: 'string', label: 'Análise', getColor: field => {
                            let res = undefined
                                switch (field){
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
                            }}
                    ]}
                    labels={['descrição', 'Análise']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => setCurrentEntity(entity)}
                    searchFieldName={'search_input'}
                    title={'Riscos'}
                    scrollableElement={'scrollableDiv'}
                    fetchSize={15}
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
                    }, ]}
                    fetchParams={{
                        project: props.project.id
                    }}
          />
            </div>
        </div>
    )
}
RisksList.propTypes = {
    project: PropTypes.object
}