import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import animations from "../../styles/Animations.module.css";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import {List, useQuery} from "sis-aeb-core";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import GoalForm from "../forms/GoalForm";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import HandleDownload from "../../utils/shared/HandleDownload";

export default function GoalList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const ref = useRef()

    const hook = useQuery()
    return (
        <div style={{width: '100%'}}>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <GoalForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        redirect={data => {
                            WorkPlanRequests.fetchGoal(data).then(res => {
                                if (res !== null)
                                    props.setCurrentStructure(res)
                            })
                        }}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} workPlan={props.workPlan}
                    />
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/work_plan_goal'}
                  labels={['Número', 'Detalhamento','unidade de medida', 'situação inicial', 'valor planejado']}
                    fields={[
                        {name: 'goal_number', type: 'string',label: 'Número'},
                        {name: 'detailing', type: 'string',label: 'Detalhamento'},
                        {name: 'unit_of_measurement', type: 'string'},
                        {name: 'initial_situation', type: 'string'},
                        {name: 'value', type: 'string'},
                    ]}
                    clickEvent={() => null}
                    setEntity={entity => {
                        if(entity !== null && entity !== undefined)
                            props.setCurrentStructure(entity)
                        else
                            setOpen(true)
                    }}
                    controlOptions={[
                        {
                            label: 'Importar',
                            icon: <PublishRounded/>,
                            onClick: (d) => {
                                ref.current.click()
                            },
                            disabled: false
                        },
                    ]}
                    options={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            WorkPlanRequests.deleteGoal({
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
                    searchFieldName={'search_input'} title={'Metas'} scrollableElement={'scrollableDiv'}
                    fetchSize={15}
                    fetchParams={{
                        work_plan: props.workPlan.id
                    }}
          />
            </div>
        </div>
    )
}
GoalList.propTypes = {
    workPlan: PropTypes.object,
    setCurrentStructure: PropTypes.func
}