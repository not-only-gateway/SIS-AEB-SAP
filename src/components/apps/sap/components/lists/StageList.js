import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import Cookies from "universal-cookie/lib";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import Host from "../../utils/shared/Host";
import {List, useQuery} from "sis-aeb-core";

import StageForm from "../forms/StageForm";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";


export default function StageList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()

    const ref = useRef()
    return (
        <>

            {open ?
                <StageForm
                    returnToMain={() => {
                        setOpen(false)
                        setRefreshed(false)
                        setCurrentEntity(null)
                    }}
                    open={open}

                    redirect={id => {
                        WorkPlanRequests.fetchStage(id).then(res => {
                            console.log(res)
                            if (res !== null)
                                props.setCurrentStructure(res)
                        })
                    }}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity}
                    goal={props.goal}
                />
                :
                null
            }

            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/activity'}
                    
                    fields={[
                        {name: 'stage', type: 'string', label: 'etapa'},
                        {name: 'description', type: 'string', label: 'descrição'},
                        {name: 'representation', type: 'string', maskEnd: ' %'},

                    ]} labels={['etapa', 'descrição', 'reresentação (%) da meta']}
                    clickEvent={() => null}

                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            WorkPlanRequests.deleteStage({
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
                        console.log(entity)
                        if (entity !== null && entity !== undefined)
                            props.setCurrentStructure(entity)
                        else
                            setOpen(true)
                    }}  title={'Etapas'} 
                    fetchSize={15}
                    fetchParams={props.goal !== null ? {
                        goal: props.goal.id
                    } : undefined}
                />
            </div>
        </>
    )
}
StageList.propTypes = {
    goal: PropTypes.object,
    setCurrentStructure: PropTypes.func
}