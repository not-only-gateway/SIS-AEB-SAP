import PropTypes from 'prop-types'
import React, {useState} from "react";
import animations from "../../../../styles/Animations.module.css";
import handleObjectChange from "../../../../utils/shared/HandleObjectChange";
import List from "../../../shared/misc/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../../../utils/shared/Host";
import {RemoveRounded} from "@material-ui/icons";
import StatusForm from "./StatusForm";
import WorkPlanRequests from "../../../../utils/fetch/WorkPlanRequests";
import Alert from "../../../shared/misc/alert/Alert";

export default function StatusList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })
    return (
        <div style={{width: '100%'}}>
            <Alert
                type={status.type} render={status.type !== undefined}
                handleClose={() => setStatus({type: undefined, message: undefined})}
                message={status.message}
            />
            {!open ? null :
                <div className={animations.fadeIn}>
                    <StatusForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} workPlan={props.workPlan}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/work_plan_status'}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
                    options={[{
                        label: 'Deletar',
                        icon: <RemoveRounded/>,
                        onClick: (entity) => {
                            WorkPlanRequests.deleteStatus({
                                pk: entity.id,
                                setStatus: setStatus,
                                setRefreshed: setRefreshed
                            })
                        },
                        disabled: false
                    }]}
                    fields={[
                        {name: 'status', type: 'string',label: 'status'},
                        {name: 'difficulties', type: 'string'},
                        {name: 'update_date', type: 'date', label: 'data da atualização'},
                    ]} labels={['status', 'dificuldades', 'data da atualização']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Status'} scrollableElement={'scrollableDiv'}
                    fetchSize={15}
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