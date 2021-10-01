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
                        setCurrentEntity(null)
                    }}
                    open={open}
                    redirect={id => {
                        WorkPlanRequests.fetchStage(id).then(res => {
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
                    createOption={true}
                    fields={[
                        {name: 'stage', type: 'string', label: 'Etapa'},
                        {name: 'description', type: 'string',label: 'Descrição'},
                        {name: 'representation', type: 'string', maskEnd: ' %',label: 'Reresentação (%) da meta'},

                    ]}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            WorkPlanRequests.deleteStage({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    onRowClick={e => setCurrentEntity(e)}
                    title={'Etapas'}
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