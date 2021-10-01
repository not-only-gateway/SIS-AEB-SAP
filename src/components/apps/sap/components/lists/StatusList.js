import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import StatusForm from "../forms/StatusForm";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";

export default function StatusList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()

    
    return (
        <div style={{width: '100%'}}>

            {!open ? null :

                <StatusForm
                    returnToMain={() => {
                        setOpen(false)
                    }}

                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} workPlan={props.workPlan}/>

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    createOption={true}
                    onCreate={() => setOpen(true)}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            WorkPlanRequests.deleteStatus({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    hook={hook}
                    keys={[
                        {key: 'status', type: 'string', label: 'status'},
                        {key: 'difficulties', type: 'string', label: 'Dificuldades'},
                        {key: 'update_date', type: 'date', label: 'data da atualização'},
                    ]}
                    title={'Status'}
                    onRowClick={e => setCurrentEntity(e)}
                    fetchParams={{
                        work_plan: props.workPlan.id
                    }}
                />
            </div>
        </div>
    )
}
StatusList.propTypes = {
    workPlan: PropTypes.object
}